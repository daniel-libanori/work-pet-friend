import React from 'react';
import './headerFrame.css'; // Certifique-se de criar este arquivo CSS

const HeaderFrame: React.FC = () => {
    const handleMinimize = () => {
        console.log(window)
        window.ipcRenderer.send('minimize-window');
    };

    const handleClose = () => {
        window.ipcRenderer.send('close-window');
    };

    return (
        <div className='title-bar'>
            <div className='title-bar-buttons'>
                <button onClick={handleMinimize}>_</button>
                <button onClick={handleClose}>X</button>
            </div>
        </div>
    );
};

export default HeaderFrame;