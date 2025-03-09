import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalState {
  isTransparent: boolean;
  currentCorner: string;
  toggleMode: (newMode: "transparent" | "normal" | "hidden" | null) => void;
  toggleCorner: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
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

  const handleMouseEnter = () => {
    window.ipcRenderer.invoke("set-ignore-mouse", false);
  };

  const handleMouseLeave = () => {
    window.ipcRenderer.invoke("set-ignore-mouse", true && isTransparent);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        isTransparent,
        currentCorner,
        toggleMode,
        toggleCorner,
        handleMouseEnter,
        handleMouseLeave,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
