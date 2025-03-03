import React from 'react';
import { useNavigate } from 'react-router';
// import HeaderFrame from '@/components/headerFrame/headerFrame';

const Welcome: React.FC = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/app');
    };


    return (
        <div className='window'>
            {/* <HeaderFrame/> */}
            <div className='content'>
                <h1>Welcome</h1>
                <button onClick={handleButtonClick}>
                    press to start
                </button>
            </div>
        </div>
    );
};

export default Welcome;