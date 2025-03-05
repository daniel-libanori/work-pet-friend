import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

interface HiddenCapyProps {
    hiddenCapibaraImage: string;
    setHide: (hide: boolean) => void;
    hide: boolean;
    currentCorner: string;
}

const HiddenCapy: React.FC<HiddenCapyProps> = ({ hiddenCapibaraImage, setHide, hide, currentCorner }) => {
    const [showButton, setShowButton] = useState(false);

    return (
        <div className="overflow-hidden">
            <div
                className="relative w-full flex justify-end"
                style={{ transform: currentCorner === "right" ? "scaleX(1)" : "scaleX(-1)"}}
            >
                {showButton && (
                    <button
                        className="absolute right-8 top-10 bg-gray-200 p-2 h-8 rounded-full shadow-md hover:bg-gray-300 rotate-180 z-20"
                        onClick={() => setHide(!hide)}
                        onMouseEnter={() => setShowButton(true)}
                        onMouseLeave={() => setShowButton(false)}
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                )}
                <img
                    src={hiddenCapibaraImage}
                    alt="capivara"
                    className={`w-28 h-28 z-10  ${showButton ? "opacity-75 -mr-12": "opacity-30 -mr-14"}  -rotate-90 scale-75`}
                    onMouseEnter={() => setShowButton(true)}
                    onMouseLeave={() => setShowButton(false)}
                />
            </div>
        </div>
    );
};

export default HiddenCapy;