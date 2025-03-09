import { app, BrowserWindow, shell, ipcMain, screen } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";
import { update } from "./update";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "../..");
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

if (os.release().startsWith("6.1")) app.disableHardwareAcceleration();
if (process.platform === "win32") app.setAppUserModelId(app.getName());
if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
const preload = path.join(__dirname, "../preload/index.mjs");
const indexHtml = path.join(RENDERER_DIST, "index.html");

// Variável para controlar o modo atual: 'transparent' ou 'normal'
let currentMode: "transparent" | "normal" | "hidden" = "normal";
// Variável para controlar o canto atual da janela no modo transparente
let currentCorner: "right" | "left" = "right";

/**
 * Posiciona a janela no canto inferior, à direita ou esquerda,
 * de acordo com a variável currentCorner.
 */
function positionWindow(window: BrowserWindow) {
  if (currentMode === "transparent" || currentMode === "hidden") {
    const display = screen.getPrimaryDisplay();
    const { width: winWidth, height: winHeight } = window.getBounds();
    // Usa bounds totais da tela, que incluem toda a área
    const {
      x: scrX,
      y: scrY,
      width: scrWidth,
      height: scrHeight,
    } = display.bounds;

    let posX: number;
    posX = currentCorner === "right" ? scrX + scrWidth - winWidth : scrX;
    const posY = scrY + scrHeight - winHeight;
    window.setPosition(posX, posY);
  } else {
    // Centraliza a janela na tela no modo normal
    window.center();
  }
}

async function createWindow(
  mode: "transparent" | "normal" | "hidden" = "normal",
  bounds?: Electron.Rectangle
) {
  const isTransparent = mode === "transparent";
  const alwaysOnTop = isTransparent;
  // No modo transparente, removemos a borda (frame: false). No modo normal, podemos usar o frame padrão.
  const frame = isTransparent ? false : true;

  win = new BrowserWindow({
    title: "Main window",
    transparent: true,
    alwaysOnTop: alwaysOnTop,
    frame: false,
    width: 500,
    height: 500,
    minWidth: 300,
    minHeight: 300,
    icon: path.join(process.env.VITE_PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
    },
  });

  if (bounds) {
    win.setBounds(bounds);
  }

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    // win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  ipcMain.on("minimize-window", () => {
    if (win) {
      win.minimize();
    }
  });

  ipcMain.on("close-window", () => {
    if (win) {
      win.close();
    }
  });

  win.webContents.on("did-finish-load", () => {
    if (isTransparent && !!win) {
      // Se o modo for transparente, ativamos o encaminhamento de eventos de mouse
      // win?.setIgnoreMouseEvents(true, { forward: true })
      // Posiciona a janela de acordo com currentCorner
      positionWindow(win);
    } else if (!isTransparent && !!win) {
      // win?.setIgnoreMouseEvents(false)
      // Centraliza a janela no modo normal
      win.center();
    }
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  update(win);
}

app.whenReady().then(() => createWindow(currentMode));

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow(currentMode);
  }
});

// Handler para criar novas janelas (mantido conforme sua implementação)
ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});

// Handler para ajustar o comportamento de ignore do mouse
ipcMain.handle("set-ignore-mouse", (_, ignore: boolean) => {
  if (win) {
    if (ignore) {
      win.setIgnoreMouseEvents(true, { forward: true });
    } else {
      win.setIgnoreMouseEvents(false);
    }
  }
});

ipcMain.handle("move-window", (_, deltaX: number, deltaY: number) => {
  if (win) {
    const [currentX, currentY] = win.getPosition();
    const newY = currentY + deltaY;
    const display = screen.getPrimaryDisplay();
    const { width: scrWidth } = display.bounds;
    const { width: winWidth } = win.getBounds();
    const newX = currentCorner === "right" ? scrWidth - winWidth : 0;
    win.setPosition(newX, newY);
  }
});
ipcMain.handle(
  "toggle-window-mode",
  async (_, mode: "transparent" | "normal" | "hidden") => {
    if (!win) return;

    currentMode = mode;
    const isTransparent =
      currentMode === "transparent" || currentMode === "hidden";
    const isHidden = currentMode === "hidden";

    win.setOpacity(1);
    win.setAlwaysOnTop(isTransparent);
    win.setIgnoreMouseEvents(currentMode === "transparent", { forward: true });
    win.setResizable(!isTransparent);
    win.setMovable(isHidden || !isTransparent);
    win.setFullScreenable(!isTransparent);
    win.setHasShadow(!isTransparent);

    if (currentMode === "transparent") {
      win.setBounds({ ...win.getBounds(), width: 300, height: 300 });
      win.setMinimumSize(300, 300);
      positionWindow(win);
    } else if (currentMode === "hidden") {
      win.setBounds({ ...win.getBounds(), width: 50, height: 50 });
      win.setMinimumSize(50, 50);
      // Position the window on the side of the screen but allow moving along the side
      const display = screen.getPrimaryDisplay();
      const { width: scrWidth, height: scrHeight } = display.bounds;
      const { width: winWidth, height: winHeight } = win.getBounds();
      const posX = currentCorner === "right" ? scrWidth - winWidth : 0;
      const posY = Math.min(
        Math.max(win.getBounds().y, 0),
        scrHeight - winHeight
      );
      win.setPosition(posX, posY);
    } else {
      win.setBounds({ ...win.getBounds(), width: 500, height: 500 });
      win.center();
    }

    win.webContents.send("main-process-message", new Date().toLocaleString());
  }
);

// Handler para alternar o canto da janela no modo transparente
ipcMain.handle("toggle-window-corner", () => {
  if (currentMode !== "transparent" || !win) return;
  // Alterna a posição entre 'right' e 'left'
  currentCorner = currentCorner === "right" ? "left" : "right";
  // Atualiza a posição da janela
  positionWindow(win);
});

ipcMain.handle("toggle-size", async (_, width: number, height: number) => {
  if (!win) return;

  win.setBounds({ ...win.getBounds(), width: width, height: height });
  win.setMinimumSize(width, height);
});

ipcMain.handle("toggle-position", async () => {
  if (!win) return;

  const display = screen.getPrimaryDisplay();
  const { width: scrWidth, height: scrHeight } = display.bounds;
  const { width: winWidth, height: winHeight } = win.getBounds();
  const posX = currentCorner === "right" ? scrWidth - winWidth : 0;
  const posY = Math.min(Math.max(win.getBounds().y, 0), scrHeight - winHeight);
  win.setPosition(posX, posY);
});
