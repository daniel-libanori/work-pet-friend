import React, { useState } from "react";
import { useNavigate } from "react-router";

interface HomeNormalProps {
    handleToggleMode: () => void;
    handleToggleCorner: () => void;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    currentCorner: string;
  }

const HomeTransparent: React.FC <HomeNormalProps> = ({
    handleToggleMode,
    handleToggleCorner,
    handleMouseEnter,
    handleMouseLeave,
    currentCorner,
  }) => {

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: currentCorner === "right" ? "row" : "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <button
        style={{}}
        onClick={handleToggleMode}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Alternar para Modo Normal
      </button>
      
        <button
          style={{}}
          onClick={handleToggleCorner}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Alternar posição da janela (canto)
        </button>
      
    </div>
  );
};

export default HomeTransparent;
