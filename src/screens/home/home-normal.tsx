import HeaderFrame from "@/components/headerFrame/headerFrame";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import capibaraImage from "@/assets/testAssets/test-capibara.png"; // Importando a imagem
import { useSystemState } from "@/context/systemStateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faShirt, faStore } from "@fortawesome/free-solid-svg-icons";

interface HomeNormalProps {}

const HomeNormal: React.FC<HomeNormalProps> = ({}) => {
  const { toggleMode, handleMouseEnter, handleMouseLeave, toggleSize } =
    useSystemState();

  useEffect(() => {
    toggleSize(720, 720);
  }, []);

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
        <div className="flex flex-col items-center justify-between h-screen overflow-hidden">
          <div className=" w-full h-10 mt-16 mx-10 flex items-center justify-center">
            <button
              className="appearance-none bg-[#8f4704] border-2 border-[#633000] border-solid p-3
            rounded-xl flex items-center justify-center text-[#d69851] font-bold text-md"
            >
              Capivara Rangel
            </button>
          </div>

          <div className="-mb-24">
            <div className="relative w-36 h-36">
              <img
                src={capibaraImage}
                alt="capivara"
                className="absolute w-28 h-28 z-30 top-4 left-3"
              />
            </div>
            <div className="relative w-0 h-0">
              <div
                className="absolute bg-[#8f4704] w-24 h-24 z-20"
                style={{
                  top: -68,
                  left: 25,
                  borderRadius: "50%",
                  transform: "scaleY(0.3)",
                }}
              />
            </div>

            <div className="relative w-0 h-0">
              <div
                className={`absolute bg-[#a45409] z-10 w-64 h-64`}
                style={{
                  left: -55,
                  bottom: -115,
                  transform: "scaleY(0.4) rotate(45deg)",
                  border: "4px solid #6a4819",
                }}
              />
            </div>

            <div className="relative w-0 h-0">
              <div
                className={`absolute bg-[#c78f40] z-10 w-64 h-64`}
                style={{
                  left: -231,
                  bottom: 144,
                  transform: "scaleY(0.38) rotate(46.5deg) scaleX(0.98)",
                  borderWidth: "0px 4px 0px 0px",
                  borderStyle: "solid",
                  borderColor: "#6a4819",
                }}
              />
            </div>

            <div className="relative w-0 h-0">
              <div
                className={`absolute bg-[#f5b657] z-5 h-64`}
                style={{
                  width: 184,
                  left: -109,
                  bottom: 17,
                  transform: "scaleX(1) scaleY(1)",
                  borderWidth: "0px 2px 0px 2px",
                  borderStyle: "solid",
                  borderColor: "#6a4819",
                }}
              />
            </div>

            <div className="relative w-0 h-0">
              <div
                className={`absolute bg-[#c78f40] z-10 w-64 h-64`}
                style={{
                  left: 125,
                  bottom: 146,
                  transform: "scaleY(0.38) rotate(41.5deg) scaleX(0.98)",
                  borderWidth: "0px 0px 4px 0px",
                  borderStyle: "solid",
                  borderColor: "#6a4819",
                }}
              />
            </div>

            <div className="relative w-0 h-0">
              <div
                className={`absolute bg-[#e8a848] z-5 h-64`}
                style={{
                  width: 184,
                  left: 75,
                  bottom: 17,
                  transform: "scaleX(1) scaleY(1)",
                  borderWidth: "0px 2px 0px 2px",
                  borderStyle: "solid",
                  borderColor: "#6a4819",
                }}
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center bg-[#8f4704] pt-4 border-t-4 border-solid border-[#633000]">
            <div className="w-full h-16 mb-4 flex gap-10 items-center justify-center">
              <div className="bg-[#c08440] hover:bg-[#d69851] w-14 h-14 rounded-full border-[#633000] border-4 border-solid flex items-center justify-center cursor-pointer">
                <FontAwesomeIcon
                  icon={faStore}
                  style={{ fontSize: 23 }}
                  color="#4d330e"
                />
              </div>
              <div className="bg-[#c08440] hover:bg-[#d69851] w-14 h-14 rounded-full border-[#633000] border-4 border-solid flex items-center justify-center cursor-pointer">
                <FontAwesomeIcon
                  icon={faShirt}
                  style={{ fontSize: 23 }}
                  color="#4d330e"
                />
              </div>
              <div className="bg-[#c08440] hover:bg-[#d69851] w-14 h-14 rounded-full border-[#633000] border-4 border-solid flex items-center justify-center cursor-pointer">
                <FontAwesomeIcon
                  icon={faGear}
                  style={{ fontSize: 23 }}
                  color="#4d330e"
                />
              </div>
            </div>

            <button
              className={`appearance-none mb-5 bg-[#c08440] hover:bg-[#d69851]
            text-[#4d330e] py-2 px-4 cursor-pointer font-bold
            rounded border-solid border-[#633000] border-2`}
              style={{}}
              onClick={() => toggleMode("transparent")}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Alternar para Modo Transparente
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNormal;
