import React from 'react';
import { useNavigate } from 'react-router';


const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/app');
    };

    return (
        <div className='w-full h-full bg-[#ab6f2b] flex items-center justify-center' style={{flexDirection:'column'}}>
            <h1>Home</h1>

        </div>
    );
};



export default Home;