import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import HeaderFrame from "@/components/headerFrame/headerFrame";
import { useSystemState } from "@/context/systemStateContext";
import capybaraImage from "@/assets/testAssets/test-capibara-silhouette.png";

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { toggleMode, handleMouseEnter, handleMouseLeave, toggleSize } =
    useSystemState();

  const handleButtonClick = () => {
    navigate("/home");
  };
  useEffect(() => {
    toggleSize(720, 720);

    const handleClick = () => {
      handleButtonClick();
    };

    const handleKeyDown = () => {
      handleButtonClick();
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className=" bg-[#c78f40]">
      <HeaderFrame />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="font-mono text-3xl tracking-[0.27em] -mb-8 ml-3">
            MY FRIEND
          </h2>
          <h1 className="font-mono text-5xl">Capybara</h1>
        </div>
        <img src={capybaraImage} alt="capibara" className="h-64 -mt-20" />
        <button
          onClick={handleButtonClick}
          className="bg-transparent border-none font-sans cursor-pointer
          font-bold text-xl mt-6"
        >
          press any key to start
        </button>
      </div>
    </div>
  );
};

export default Welcome;
