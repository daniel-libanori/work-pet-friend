import HeaderFrame from "@/components/headerFrame/headerFrame";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import capibaraImage from "@/assets/testAssets/test-capibara.png"; // Importando a imagem
import { useGlobalState } from "@/context/globalStateContext";

interface HomeNormalProps {}

const HomeNormal: React.FC<HomeNormalProps> = ({}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { toggleMode, handleMouseEnter, handleMouseLeave } = useGlobalState();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleButton = () => {
    window.ipcRenderer.invoke("toggle-size", 150, 150);
  };

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
          <div className=" w-full h-10 mt-10 mx-10 flex items-center justify-center">
            <div
              className="bg-[#f00] border-2 border-[#6a4819] px-3 py-3
            rounded-xl flex items-center justify-center"
            >
              Capivara Rangel
            </div>
          </div>
          <div>
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

            {/* <div className="flex justify-center items-center">
              <div
                className="absolute overflow-hidden z-20"
                style={{
                  width: 185,
                  height: 75.75,
                  bottom: 566.0,
                  left: 129,
                  transform: "scaleX(-1)",
                  borderWidth: "0px 0px 0px 2px",
                  borderStyle: "solid",
                  borderColor: "#6a4819",
                }}
              >
                <div
                  className={`absolute bg-[#f5b657] z-20 h-64`}
                  style={{
                    width: 238,
                    left: -56,
                    bottom: -217.5,
                    transform: "scaleX(1) scaleY(1) rotate(201.75deg)",
                    borderWidth: "0px 0px 2px 0px",
                    borderStyle: "solid",
                    borderColor: "#6a4819",
                  }}
                />
              </div>
              <div
                className="absolute overflow-hidden"
                style={{
                  width: 185,
                  height: 75.75,
                  bottom: 566.4,
                  left: 314,
                  borderWidth: "0px 0px 0px 2px",
                  borderStyle: "solid",
                  borderColor: "#6a4819",
                }}
              >
                <div
                  className={`absolute bg-[#e8a848] z-20 h-64`}
                  style={{
                    width: 238,
                    left: -56,
                    bottom: -217.5,
                    transform: "scaleX(1) scaleY(1) rotate(201.75deg)",
                    borderWidth: "0px 0px 2px 0px",
                    borderStyle: "solid",
                    borderColor: "#6a4819",
                  }}
                />
              </div>
            </div> */}

            {/* <div className="flex justify-center items-center">
              <div
                className="absolute overflow-hidden z-20"
                style={{
                  width: 185,
                  height: 75.75,
                  bottom: 566.0,
                  left: 129,
                  transform: "scaleX(-1)",
                  borderWidth: "0px 0px 0px 2px",
                  borderStyle: "solid",
                  borderColor: "#6a4819",
                }}
              >
                <div
                  className={`absolute bg-[#f5b657] z-20 h-64`}
                  style={{
                    width: 238,
                    left: -56,
                    bottom: -217.5,
                    transform: "scaleX(1) scaleY(1) rotate(201.75deg)",
                    borderWidth: "0px 0px 2px 0px",
                    borderStyle: "solid",
                    borderColor: "#6a4819",
                  }}
                />
              </div>
              <div
                className="absolute overflow-hidden"
                style={{
                  width: 185,
                  height: 75.75,
                  bottom: 566.4,
                  left: 314,
                  borderWidth: "0px 0px 0px 2px",
                  borderStyle: "solid",
                  borderColor: "#6a4819",
                }}
              >
                <div
                  className={`absolute bg-[#e8a848] z-20 h-64`}
                  style={{
                    width: 238,
                    left: -56,
                    bottom: -217.5,
                    transform: "scaleX(1) scaleY(1) rotate(201.75deg)",
                    borderWidth: "0px 0px 2px 0px",
                    borderStyle: "solid",
                    borderColor: "#6a4819",
                  }}
                />
              </div>
            </div> */}

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
          <button
            className={`appearance-none mb-5 bg-blue-500 
            text-white py-2 px-4 
            rounded border-dashed border-white border-2`}
            style={{}}
            onClick={() => toggleMode("transparent")}
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
