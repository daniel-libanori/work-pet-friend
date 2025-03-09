import React from "react";
import "./headerFrame.css"; // Certifique-se de criar este arquivo CSS
import { useSystemState } from "@/context/systemStateContext";

const HeaderFrame: React.FC = () => {
  const { handleMinimize, handleClose } = useSystemState();

  return (
    <div className="title-bar">
      <div className="title-bar-buttons mr-2 flex gap-2">
        <button
          className="w-3 h-3 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#fb0" }}
          onClick={handleMinimize}
        >
          <p className="text-black text-md pb-3 opacity-0 hover:opacity-100 font-bold">
            _
          </p>
        </button>
        <button
          className="w-3 h-3 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#f55" }}
          onClick={handleClose}
        >
          <p className="text-black text-xs pb-0.5 opacity-0 hover:opacity-100 ">
            x
          </p>
        </button>
        {/* <button onClick={handleMinimize} className='rounded bg-[#ff0000] w-10 h-10'>—</button>
                <button onClick={handleClose}>X</button> */}
      </div>
    </div>
  );
};

export default HeaderFrame;
