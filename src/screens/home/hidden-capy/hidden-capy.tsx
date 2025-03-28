import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSystemState } from "@/context/systemStateContext";

interface HiddenCapyProps {
  hiddenCapibaraImage: string;
  hide: boolean;
  handleHideCapy: (newMode: "transparent" | "normal" | "hidden" | null) => void;
}

const HiddenCapy: React.FC<HiddenCapyProps> = ({
  hiddenCapibaraImage,
  hide,
  handleHideCapy,
}) => {
  const [showButton, setShowButton] = useState(false);
  const {
    currentCorner,
    handleMouseEnter,
    handleMouseLeave,
    toggleSize,
    togglePosition,
  } = useSystemState();

  useEffect(() => {
    toggleSize(70, 115);
    togglePosition("hidden");
  }, [hide]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault(); // Prevent default drag behavior
      const startX = e.clientX;
      const startY = e.clientY;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;
        window.ipcRenderer.invoke("move-window", deltaX, deltaY);
      };

      const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      // Ensure the image captures all mouse events during the drag
      // @ts-ignore
      (e.target as HTMLElement).setCapture();
    };

    const imgElement = document.querySelector(".draggable-image");
    // @ts-ignore
    imgElement?.addEventListener("mousedown", handleMouseDown);

    return () => {
      // @ts-ignore
      imgElement?.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        className="relative w-full flex justify-end overflow-hidden"
        style={{
          transform: currentCorner === "right" ? "scaleX(1)" : "scaleX(-1)",
        }}
      >
        {showButton && (
          <button
            className="absolute right-8 top-10 bg-gray-200 p-2 h-8 rounded-full shadow-md hover:bg-gray-300 rotate-180 z-20"
            onClick={() => handleHideCapy("transparent")}
            onMouseEnter={() => {
              handleMouseEnter();
              setShowButton(true);
            }}
            onMouseLeave={() => {
              handleMouseLeave();
              setShowButton(false);
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        )}
        <img
          src={hiddenCapibaraImage}
          alt="capivara"
          className={`w-28 h-28 z-10 draggable-image ${
            showButton ? "opacity-75 -mr-12" : "opacity-30 -mr-16"
          }  -rotate-90 scale-75 cursor-move`}
          onMouseEnter={() => {
            handleMouseEnter();
            setShowButton(true);
          }}
          onMouseLeave={() => {
            handleMouseLeave();
            setShowButton(false);
          }}
        />
      </div>
    </div>
  );
};

export default HiddenCapy;
