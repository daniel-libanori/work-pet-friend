import React, { createContext, useContext, useState, ReactNode } from "react";

interface SystemState {
  isTransparent: boolean;
  currentCorner: string;
  toggleMode: (newMode: "transparent" | "normal" | "hidden" | null) => void;
  toggleCorner: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  toggleSize: (width: number, height: number) => void;
  togglePosition: () => void;
  handleMinimize: () => void;
  handleClose: () => void;
}

const SystemStateContext = createContext<SystemState | undefined>(undefined);

export const SystemStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isTransparent, setIsTransparent] = useState(false);
  const [currentCorner, setCurrentCorner] = useState("right");

  const toggleMode = (
    newMode: "transparent" | "normal" | "hidden" | null = "normal"
  ) => {
    setIsTransparent(newMode === "transparent" || newMode === "hidden");
    window.ipcRenderer.invoke("toggle-window-mode", newMode).then(() => {});
  };

  const toggleCorner = () => {
    setCurrentCorner((prev) => (prev === "right" ? "left" : "right"));
    window.ipcRenderer.invoke("toggle-window-corner");
  };

  const toggleSize = (width: number, height: number) => {
    window.ipcRenderer.invoke("toggle-size", width, height);
  };

  const togglePosition = () => {
    window.ipcRenderer.invoke("toggle-position");
  };

  const handleMouseEnter = () => {
    window.ipcRenderer.invoke("set-ignore-mouse", false);
  };

  const handleMouseLeave = () => {
    window.ipcRenderer.invoke("set-ignore-mouse", true && isTransparent);
  };

  const handleMinimize = () => {
    window.ipcRenderer.send("minimize-window");
  };

  const handleClose = () => {
    window.ipcRenderer.send("close-window");
  };

  return (
    <SystemStateContext.Provider
      value={{
        isTransparent,
        currentCorner,
        toggleMode,
        toggleCorner,
        handleMouseEnter,
        handleMouseLeave,
        toggleSize,
        togglePosition,
        handleMinimize,
        handleClose,
      }}
    >
      {children}
    </SystemStateContext.Provider>
  );
};

export const useSystemState = (): SystemState => {
  const context = useContext(SystemStateContext);
  if (context === undefined) {
    throw new Error("useSystemState must be used within a SystemStateProvider");
  }
  return context;
};
