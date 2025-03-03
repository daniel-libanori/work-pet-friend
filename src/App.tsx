import React, { useEffect, useState } from 'react'

function App() {
  // Inicialmente, definimos o modo transparente
  const [isTransparent, setIsTransparent] = useState(() => {
    const savedState = localStorage.getItem('isTransparent')
    return savedState !== null ? JSON.parse(savedState) : true
  })

  useEffect(() => {
    localStorage.setItem('isTransparent', JSON.stringify(isTransparent))
  }, [isTransparent])

  const handleToggleMode = () => {
    setIsTransparent(prev => !prev)
    window.ipcRenderer.invoke('toggle-window-mode').then(() => {
      // Atualiza o estado; se estava transparente, passa a normal, e vice-versa
      // setIsTransparent(prev => !prev)
    })
  }

  const handleToggleCorner = () => {
    window.ipcRenderer.invoke('toggle-window-corner')
  }

  const handleMouseEnter = () => {
    window.ipcRenderer.invoke('set-ignore-mouse', false)
  }

  const handleMouseLeave = () => {
    window.ipcRenderer.invoke('set-ignore-mouse', true && isTransparent)
  }

  return (
    <div style={{ WebkitAppRegion: 'drag', width: '100%', height: '100%' , backgroundColor: 'red'}}>
      <button
        style={{ WebkitAppRegion: 'no-drag', marginBottom: '1rem' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => console.log('Botão click-through clicado')}
      >
        Botão Interativo (click-through)
      </button>
      <button
        style={{ WebkitAppRegion: 'no-drag', marginBottom: '1rem' }}
        onClick={handleToggleMode}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Alternar para Modo {isTransparent ? 'Normal' : 'Transparente'}
      </button>
      {isTransparent && (
        <button
          style={{ WebkitAppRegion: 'no-drag' }}
          onClick={handleToggleCorner}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Alternar posição da janela (canto)
        </button>
      )}
    </div>
  )
}

export default App
