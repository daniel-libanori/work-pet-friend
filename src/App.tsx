import React, { useEffect, useState } from 'react'

function App() {
  // Inicialmente, definimos o modo transparente
  // const [isTransparent, setIsTransparent] = useState(() => {
  //   const savedState = localStorage.getItem('isTransparent')
  //   return savedState !== null ? JSON.parse(savedState) : true
  // })
  const [isTransparent, setIsTransparent] = useState(false)
  const [currentCorner, setCurrentCorner] = useState('right')

    // useEffect(() => {
    //   localStorage.setItem('isTransparent', JSON.stringify(isTransparent))
    // }, [isTransparent])

  const handleToggleMode = () => {
    setIsTransparent(prev => !prev)
    window.ipcRenderer.invoke('toggle-window-mode').then(() => {
      // Atualiza o estado; se estava transparente, passa a normal, e vice-versa
      // setIsTransparent(prev => !prev)
    })
  }

  const handleToggleCorner = () => {
    setCurrentCorner(prev => prev === 'right' ? 'left' : 'right')
    window.ipcRenderer.invoke('toggle-window-corner')
  }

  const handleMouseEnter = () => {
    window.ipcRenderer.invoke('set-ignore-mouse', false)
  }

  const handleMouseLeave = () => {
    window.ipcRenderer.invoke('set-ignore-mouse', true && isTransparent)
  }

  return (
    <div style={{  width: '100%', height: '100%', display: 'flex', flexDirection: currentCorner === 'right' ?'row': 'row-reverse', 
      justifyContent: 'flex-end', 
      alignItems: 'center'}}>
      <button
        style={{ }}
        onClick={handleToggleMode}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Alternar para Modo {isTransparent ? 'Normal' : 'Transparente'}
      </button>
      {isTransparent && (
        <button
          style={{ }}
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
