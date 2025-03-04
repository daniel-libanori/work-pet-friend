import HeaderFrame from "@/components/headerFrame/headerFrame";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import capibaraImage from "@/assets/testAssets/test-capibara.png"; // Importando a imagem

interface HomeNormalProps {
  handleToggleMode: () => void;
  handleToggleCorner: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

const HomeNormal: React.FC<HomeNormalProps> = ({
  handleToggleMode,
  handleToggleCorner,
  handleMouseEnter,
  handleMouseLeave,
}) => {

  return (
    <>
      <HeaderFrame />
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#c78f40",
        }}
      >
        <div className="flex flex-col items-center justify-between h-screen px-2">
          <div className="bg-[#ff0] w-full h-10 mt-10 mx-10 flex items-center justify-center">
            Capivara
          </div>
          <div>
            <div className="relative w-36 h-36">
              <div className="absolute bg-[#ffff00CC] w-32 h-32 z-10 rounded-full left-1.5" />
              <img
                src={capibaraImage}
                alt="capivara"
                className="absolute w-28 h-28 z-20 top-4 left-3"
              />
              <div className="absolute bg-[#ff9900] w-36 h-14 z-10 rounded-full mt-24" 
              style={{
                borderRadius: "50%",
                transform: 'scaleY(0.4)',

              }}
              />
            </div>
          </div>
          <button
            className={`appearance-none mb-5 bg-blue-500 
            text-white py-2 px-4 
            rounded border-dashed border-white border-2`}
            style={{}}
            onClick={handleToggleMode}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Alternar para Modo Transparente
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeNormal;
