import React, { useState, useEffect } from "react";
import capibaraImage from "@/assets/testAssets/test-capibara.png";
import hiddenCapibaraImage from "@/assets/testAssets/test-capibara-hidden.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faExchangeAlt,
  faWindowRestore,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import HiddenCapy from "./hidden-capy/hidden-capy";
import { useNavigate } from "react-router";

interface HomeNormalProps {
  handleToggleMode: () => void;
  handleToggleCorner: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  currentCorner: string;
}

const HomeTransparent: React.FC<HomeNormalProps> = ({
  handleToggleMode,
  handleToggleCorner,
  handleMouseEnter,
  handleMouseLeave,
  currentCorner,
}) => {
  const [message, setMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [hide, setHide] = useState(false);
  const [hoveredButton, setHoveredButton] = useState("");
  const messages = [
    "Keep going!",
    "You're doing great!",
    "Believe in yourself!",
    "Stay positive!",
    "Never give up!",
  ];

  useEffect(() => {
    const interval = setInterval(
      () => {
        setShowBubble((prev) => !prev);
        if (showBubble && messages.length > 0) {
          setMessage(messages[Math.floor(Math.random() * messages.length)]);
        }
      },
      showBubble ? 3000 : 5000
    );
    return () => clearInterval(interval);
  }, [showBubble, messages]);

  return hide ? (
    <HiddenCapy
      hiddenCapibaraImage={hiddenCapibaraImage}
      setHide={setHide}
      hide={hide}
      currentCorner={currentCorner}
    />
  ) : (
    <div
      className="overflow-hidden"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        transform: currentCorner === "right" ? "scaleX(1)" : "scaleX(-1)",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        className="relative w-36 h-36 flex flex-col items-center ml-16"
        style={{ transform: "none" }}
      >
        {showBubble && (
          <div
            className="absolute top-[-50px] bg-white p-2 rounded shadow-md border-2 border-black z-30"
            style={{
              fontFamily: "Comic Sans MS, sans-serif",
              position: "relative",
              transform: currentCorner === "right" ? "scaleX(1)" : "scaleX(-1)",
            }}
          >
            <div className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-black left-1/2 transform -translate-x-1/2 top-full"></div>
            {message}
          </div>
        )}
        <div className="absolute bg-[#ffff00CC] w-32 h-32 z-10 rounded-full left-1.5 opacity-0" />
        <img
          src={capibaraImage}
          alt="capivara"
          className="absolute w-28 h-28 z-20 top-6 left-3 z-30"
        />
        <div
          className="absolute bg-[#ff9900] w-48 h-16 z-10 rounded-full mt-24 z-20"
          style={{
            borderRadius: "50%",
            transform: "scaleY(0.4)",
            borderStyle: "solid",
            borderWidth: "4px",
            borderColor: "#472720",
          }}
        />
        <div
          className="absolute bg-[#ca7f0f] w-48 h-32 z-10 mt-[130px] flex justify-between"
          style={{
            borderStyle: "solid",
            borderWidth: "0px 3px 0px 3px",
            borderColor: "#472720",
          }}
        >
          <div className="h-32 w-5 bg-[#d98c18] z-20" />
          <div className="h-32 w-5 bg-[#b67007] z-20" />
        </div>
        <div
          className="absolute z-30 top-44"
          style={{
            transform: currentCorner === "right" ? "scaleX(1)" : "scaleX(-1)",
          }}
        >
          <p
            style={{
              fontFamily: "Comic Sans MS, sans-serif",
              fontSize: "16px",
            }}
          >
            {hoveredButton}
          </p>
        </div>
      </div>
      <div className="absolute right-6 flex flex-col space-y-2 top-20 z-40 ">
        <button
          className="bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
          onClick={handleToggleMode}
          onMouseEnter={() => {
            handleMouseEnter();
            setHoveredButton("Capy's Room");
          }}
          onMouseLeave={() => {
            handleMouseLeave();
            setHoveredButton("");
          }}
        >
          <FontAwesomeIcon icon={faWindowRestore} />
        </button>
        <button
          className="bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
          onClick={() => setHide((hide) => !hide)}
          onMouseEnter={() => {
            handleMouseEnter();
            setHoveredButton("Hide Capy");
          }}
          onMouseLeave={() => {
            handleMouseLeave();
            setHoveredButton("");
          }}
        >
          <FontAwesomeIcon icon={faRightToBracket} />
        </button>
        <button
          className="bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
          onClick={handleToggleCorner}
          onMouseEnter={() => {
            handleMouseEnter();
            setHoveredButton("Change Capy Side");
          }}
          onMouseLeave={() => {
            handleMouseLeave();
            setHoveredButton("");
          }}
        >
          <FontAwesomeIcon icon={faExchangeAlt} />
        </button>
      </div>
    </div>
  );
};

export default HomeTransparent;
