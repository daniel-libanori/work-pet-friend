import { app, BrowserWindow, shell, ipcMain, screen } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'
import { update } from './update'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '../..')
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()
if (process.platform === 'win32') app.setAppUserModelId(app.getName())
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

// Variável para controlar o modo atual: 'transparent' ou 'normal'
let currentMode: 'transparent' | 'normal' = 'transparent'
// Variável para controlar o canto atual da janela no modo transparente
let currentCorner: 'right' | 'left' = 'right'

/**
 * Posiciona a janela no canto inferior, à direita ou esquerda, 
 * de acordo com a variável currentCorner.
 */
function positionWindow(window: BrowserWindow) {
  if (currentMode === 'transparent') {
    const display = screen.getPrimaryDisplay()
    const { width: winWidth, height: winHeight } = window.getBounds()
    // Usa bounds totais da tela, que incluem toda a área
    const { x: scrX, y: scrY, width: scrWidth, height: scrHeight } = display.bounds

    let posX: number
    posX = currentCorner === 'right'
      ? scrX + scrWidth - winWidth
      : scrX
    const posY = scrY + scrHeight - winHeight 
    window.setPosition(posX, posY)
  }
}

async function createWindow(
  mode: 'transparent' | 'normal' = 'transparent',
  bounds?: Electron.Rectangle
) {
  const isTransparent = mode === 'transparent'
  const alwaysOnTop = isTransparent
  // No modo transparente, removemos a borda (frame: false). No modo normal, podemos usar o frame padrão.
  const frame = isTransparent ? false : true

  win = new BrowserWindow({
    title: 'Main window',
    transparent: isTransparent,
    alwaysOnTop: alwaysOnTop,
    frame: frame,
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
    },
  })

  if (bounds) {
    win.setBounds(bounds)
  }

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  win.webContents.on('did-finish-load', () => {
    if (isTransparent) {
      // Se o modo for transparente, ativamos o encaminhamento de eventos de mouse
      // win?.setIgnoreMouseEvents(true, { forward: true })
      // Posiciona a janela de acordo com currentCorner
      positionWindow(win)
    }
    else{
      // win?.setIgnoreMouseEvents(false)
    }
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  update(win)
}

app.whenReady().then(() => createWindow(currentMode))

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow(currentMode)
  }
})

// Handler para criar novas janelas (mantido conforme sua implementação)
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

// Handler para ajustar o comportamento de ignore do mouse
ipcMain.handle('set-ignore-mouse', (_, ignore: boolean) => {
  if (win) {
    console.log(ignore)
    if (ignore) {
      win.setIgnoreMouseEvents(true, { forward: true })
    } else {
      win.setIgnoreMouseEvents(false)
    }
  }
})

// Handler para alternar entre modos: transparente e normal
ipcMain.handle('toggle-window-mode', async () => {
  if (!win) return
  const bounds = win.getBounds()
  win.destroy()
  currentMode = currentMode === 'transparent' ? 'normal' : 'transparent'
  await createWindow(currentMode, bounds)
})

// Handler para alternar o canto da janela no modo transparente
ipcMain.handle('toggle-window-corner', () => {
  if (currentMode !== 'transparent' || !win) return
  // Alterna a posição entre 'right' e 'left'
  currentCorner = currentCorner === 'right' ? 'left' : 'right'
  // Atualiza a posição da janela
  positionWindow(win)
})
