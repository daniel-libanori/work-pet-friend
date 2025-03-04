import React from "react";
import { useNavigate } from "react-router";
import HeaderFrame from "@/components/headerFrame/headerFrame";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/home");
  };

  return (
    <div className="">
      <HeaderFrame />
      <div className="flex flex-col items-center justify-center h-screen" 
      >
        <div>Welcome</div>
        <button onClick={handleButtonClick}>press to start</button>
      </div>
    </div>
  );
};

export default Welcome;
