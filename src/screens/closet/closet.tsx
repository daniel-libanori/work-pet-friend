import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import HeaderFrame from "@/components/headerFrame/headerFrame";
import { useSystemState } from "@/context/systemStateContext";
import capibaraImage from "@/assets/testAssets/test-capibara.png";

const Closet: React.FC = () => {
  const navigate = useNavigate();
  const { toggleMode, handleMouseEnter, handleMouseLeave, toggleSize } =
    useSystemState();

  const handleButtonClick = () => {
    navigate("/home");
  };

  return (
    <div className=" bg-[#c78f40] overflow-hidden h-full">
      <HeaderFrame />
      <div className="flex flex-col  pt-10 px-4 pb-4 overflow-hidden">
        <button
          onClick={handleButtonClick}
          className="bg-transparent font-sans cursor-pointer
          font-bold text-xl mt-6 absolute top-4 left-4"
        >
          Back
        </button>

        <div className="bg-[#fff] h-64 w-full mt-10"></div>
        <div className="bg-[#f00] w-full mt-5" style={{ height: 340 }}></div>
        <div
          className={`absolute bg-[#633000] w-full h-64 bottom-0`}
          style={{}}
        />
      </div>
    </div>
  );
};

export default Closet;
