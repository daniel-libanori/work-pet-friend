import React from 'react';
import { useNavigate } from 'react-router';
import HeaderFrame from '@/components/headerFrame/headerFrame';

const Welcome: React.FC = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/app');
    };


    return (
        <div className=''>
            <HeaderFrame/>
                <div>Welcome</div>
                <button onClick={handleButtonClick}>
                    press to start
                </button>
        </div>
    );
};

export default Welcome;