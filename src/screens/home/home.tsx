import React, { useState } from "react";
import { useNavigate } from "react-router";
import HomeTransparent from "./home-transparent";
import HomeNormal from "./home-normal";

const Home: React.FC = () => {
  const [isTransparent, setIsTransparent] = useState(false);
  const [currentCorner, setCurrentCorner] = useState("right");

  const handleToggleMode = (
    newMode: "transparent" | "normal" | "hidden" | null = null
  ) => {
    let mode = newMode ? newMode : isTransparent ? "normal" : "transparent";
    if (!newMode) {
      setIsTransparent((prev) => !prev);
    } else {
      setIsTransparent(newMode === "transparent" || newMode === "hidden");
    }

    window.ipcRenderer.invoke("toggle-window-mode", newMode).then(() => {});
  };

  const handleToggleCorner = () => {
    setCurrentCorner((prev) => (prev === "right" ? "left" : "right"));
    window.ipcRenderer.invoke("toggle-window-corner");
  };

  const handleMouseEnter = () => {
    window.ipcRenderer.invoke("set-ignore-mouse", false);
  };

  const handleMouseLeave = () => {
    window.ipcRenderer.invoke("set-ignore-mouse", true && isTransparent);
  };

  if (isTransparent) {
    return (
      <HomeTransparent
        handleToggleMode={handleToggleMode}
        handleToggleCorner={handleToggleCorner}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        currentCorner={currentCorner}
      />
    );
  } else {
    return (
      <HomeNormal
        handleToggleMode={handleToggleMode}
        handleToggleCorner={handleToggleCorner}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    );
  }
};

export default Home;
