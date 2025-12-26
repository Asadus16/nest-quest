import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHostProgress } from "../../redux/AppSlice";
import nestLogo from "../../asset/nestLogo.svg";
import MobileFooter from "../Footer/MobileFooter";

// Three dots loader component
const ThreeDotsLoader = ({ color = "white" }) => {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <div
        className={`w-2 h-2 rounded-full`}
        style={{
          backgroundColor: color,
          animation: "bounce 1.4s infinite",
          animationDelay: "0s",
        }}
      ></div>
      <div
        className={`w-2 h-2 rounded-full`}
        style={{
          backgroundColor: color,
          animation: "bounce 1.4s infinite",
          animationDelay: "0.2s",
        }}
      ></div>
      <div
        className={`w-2 h-2 rounded-full`}
        style={{
          backgroundColor: color,
          animation: "bounce 1.4s infinite",
          animationDelay: "0.4s",
        }}
      ></div>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

const HostStep1PropertySelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);

  // Step 1 - First segment: ~5% (1/7 of first segment)
  useEffect(() => {
    dispatch(setHostProgress(5));
  }, [dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/step-1");
    }, 500);
  };

  const handleNext = () => {
    if (selectedPropertyType) {
      setIsLoading(true);
      setTimeout(() => {
        // Navigate to place type selection
        navigate("/host/place-type");
      }, 500);
    }
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

  const handlePropertyTypeClick = (type) => {
    setSelectedPropertyType(type);
  };

  // SVG Icon Components
  const PropertyIcon = ({ children }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-8 h-8 text-gray-900"
    >
      {children}
    </svg>
  );

  // Property types with SVG icons
  const propertyTypes = [
    {
      id: "house",
      name: "House",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </PropertyIcon>
      ),
    },
    {
      id: "apartment",
      name: "Apartment",
      icon: (
        <PropertyIcon>
          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
          <path d="M17 21v-8H7v8" />
          <path d="M7 3v5h8" />
        </PropertyIcon>
      ),
    },
    {
      id: "barn",
      name: "Barn",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <path d="M9 21v-8h6v8" />
        </PropertyIcon>
      ),
    },
    {
      id: "bed-breakfast",
      name: "Bed & breakfast",
      icon: (
        <PropertyIcon>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <path d="M12 13a3 3 0 100-6 3 3 0 000 6z" />
        </PropertyIcon>
      ),
    },
    {
      id: "boat",
      name: "Boat",
      icon: (
        <PropertyIcon>
          <path d="M3 18h18M3 18l2-8h14l2 8M3 18H1m20 0h2M7 10l5-5 5 5" />
        </PropertyIcon>
      ),
    },
    {
      id: "cabin",
      name: "Cabin",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </PropertyIcon>
      ),
    },
    {
      id: "camper-rv",
      name: "Camper/RV",
      icon: (
        <PropertyIcon>
          <rect x="3" y="8" width="18" height="10" rx="2" />
          <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" />
          <path d="M7 12h10" />
        </PropertyIcon>
      ),
    },
    {
      id: "casa-particular",
      name: "Casa particular",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <path d="M9 21v-8h6v8" />
        </PropertyIcon>
      ),
    },
    {
      id: "castle",
      name: "Castle",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <path d="M7 8h2m6 0h2M7 12h2m6 0h2" />
        </PropertyIcon>
      ),
    },
    {
      id: "cave",
      name: "Cave",
      icon: (
        <PropertyIcon>
          <path d="M12 3c-4 0-8 2-8 6s4 6 8 6 8-2 8-6-4-6-8-6z" />
          <path d="M12 15c-4 0-8 2-8 6v3h16v-3c0-4-4-6-8-6z" />
        </PropertyIcon>
      ),
    },
    {
      id: "container",
      name: "Container",
      icon: (
        <PropertyIcon>
          <rect x="3" y="6" width="18" height="12" rx="1" />
          <path d="M7 6v12M17 6v12" />
        </PropertyIcon>
      ),
    },
    {
      id: "cycladic-home",
      name: "Cycladic home",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <circle cx="12" cy="8" r="2" />
        </PropertyIcon>
      ),
    },
    {
      id: "dammuso",
      name: "Dammuso",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <path d="M9 21v-8h6v8" />
        </PropertyIcon>
      ),
    },
    {
      id: "dome",
      name: "Dome",
      icon: (
        <PropertyIcon>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
        </PropertyIcon>
      ),
    },
    {
      id: "earth-home",
      name: "Earth home",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <circle cx="12" cy="16" r="2" />
        </PropertyIcon>
      ),
    },
    {
      id: "farm",
      name: "Farm",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <path d="M9 21v-8h6v8" />
          <circle cx="12" cy="8" r="1" />
        </PropertyIcon>
      ),
    },
    {
      id: "guesthouse",
      name: "Guesthouse",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </PropertyIcon>
      ),
    },
    {
      id: "hotel",
      name: "Hotel",
      icon: (
        <PropertyIcon>
          <rect x="3" y="8" width="18" height="12" rx="1" />
          <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" />
          <path d="M7 12h2m6 0h2M7 16h2m6 0h2" />
        </PropertyIcon>
      ),
    },
    {
      id: "houseboat",
      name: "Houseboat",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <path d="M3 18h18" />
        </PropertyIcon>
      ),
    },
    {
      id: "kezhan",
      name: "Kezhan",
      icon: (
        <PropertyIcon>
          <rect x="3" y="8" width="18" height="12" rx="1" />
          <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" />
          <circle cx="12" cy="14" r="2" />
        </PropertyIcon>
      ),
    },
    {
      id: "minsu",
      name: "Minsu",
      icon: (
        <PropertyIcon>
          <rect x="3" y="8" width="18" height="12" rx="1" />
          <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" />
          <path d="M9 12h6" />
        </PropertyIcon>
      ),
    },
    {
      id: "riad",
      name: "Riad",
      icon: (
        <PropertyIcon>
          <rect x="3" y="6" width="18" height="14" rx="1" />
          <path d="M7 6V4a2 2 0 012-2h6a2 2 0 012 2v2" />
          <circle cx="12" cy="13" r="2" />
        </PropertyIcon>
      ),
    },
    {
      id: "ryokan",
      name: "Ryokan",
      icon: (
        <PropertyIcon>
          <rect x="3" y="8" width="18" height="12" rx="1" />
          <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" />
          <path d="M9 12h6M9 16h6" />
        </PropertyIcon>
      ),
    },
    {
      id: "shepherds-hut",
      name: "Shepherd's hut",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </PropertyIcon>
      ),
    },
    {
      id: "tent",
      name: "Tent",
      icon: (
        <PropertyIcon>
          <path d="M3 20l9-9 9 9M12 11v9" />
        </PropertyIcon>
      ),
    },
    {
      id: "tiny-home",
      name: "Tiny home",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </PropertyIcon>
      ),
    },
    {
      id: "tower",
      name: "Tower",
      icon: (
        <PropertyIcon>
          <rect x="9" y="4" width="6" height="16" rx="1" />
          <path d="M9 8h6M9 12h6M9 16h6" />
          <path d="M12 2v2M12 20v2" />
        </PropertyIcon>
      ),
    },
    {
      id: "treehouse",
      name: "Treehouse",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <path d="M12 2v4M8 6h8" />
        </PropertyIcon>
      ),
    },
    {
      id: "trullo",
      name: "Trullo",
      icon: (
        <PropertyIcon>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <circle cx="12" cy="8" r="2" />
        </PropertyIcon>
      ),
    },
    {
      id: "windmill",
      name: "Windmill",
      icon: (
        <PropertyIcon>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1M20.66 3.34l-4.24 4.24m0 4.24l4.24 4.24M3.34 20.66l4.24-4.24m0-4.24L3.34 7.94" />
        </PropertyIcon>
      ),
    },
    {
      id: "yurt",
      name: "Yurt",
      icon: (
        <PropertyIcon>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
        </PropertyIcon>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Simple Header - Logo and Save & Exit */}
      <div className="w-full ">
        <div className="w-full mx-auto px-8 1xz:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={nestLogo}
              alt="Nest Quest"
              className="h-8 w-auto"
            />
          </div>
          <button
            onClick={handleSaveAndExit}
            className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-900 font-semibold hover:border-gray-400 transition-colors text-sm 1xz:text-base"
          >
            Save & exit
          </button>
        </div>
      </div>

      {/* Main Content - Property Type Selection */}
      <div className="w-full mx-auto px-6 1xz:px-8 py-8 pb-32">
        <div className="w-full max-w-5xl mx-auto">
          {/* Question Title */}
          <h1 className="text-2xl 1xz:text-3xl 1lg:text-4xl font-semibold text-gray-900 mb-8 1lg:mb-10">
            Which of these best describes your place?
          </h1>

          {/* Property Type Grid */}
          <div className="grid grid-cols-2 1lg:grid-cols-3 gap-4 1lg:gap-5">
            {propertyTypes.map((property) => (
              <button
                key={property.id}
                onClick={() => handlePropertyTypeClick(property.id)}
                className={`
                  flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all duration-200
                  ${
                    selectedPropertyType === property.id
                      ? "border-black bg-gray-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }
                `}
              >
                {/* Icon */}
                <div className="mb-3 flex items-center justify-center">
                  {property.icon}
                </div>
                {/* Label */}
                <span
                  className={`text-sm 1xz:text-base font-medium text-center ${
                    selectedPropertyType === property.id
                      ? "text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  {property.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Progress Bar, Back and Next */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        {/* Progress Bar - Not filled (0%) */}
        <div className="w-full h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-pink to-dark-pink transition-all duration-300"
            style={{ width: '0%' }}
          ></div>
        </div>
        
        {/* Navigation */}
        <div className="">
          <div className="w-full mx-auto px-8 1xz:px-8 py-6 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={isBackLoading || isLoading}
              className="text-gray-700 hover:text-black font-medium transition-colors underline disabled:opacity-70 disabled:cursor-not-allowed min-w-[60px] flex items-center justify-center"
            >
              {isBackLoading ? <ThreeDotsLoader color="#374151" /> : "Back"}
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedPropertyType || isLoading || isBackLoading}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors min-w-[80px] flex items-center justify-center
                ${
                  selectedPropertyType && !isLoading && !isBackLoading
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-300 text-white cursor-not-allowed"
                }
              `}
            >
              {isLoading ? <ThreeDotsLoader /> : "Next"}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed footer */}
      <div className="h-24"></div>

      {/* Mobile Footer */}
      <div className="w-full 1xz:hidden">
        <MobileFooter />
      </div>
    </div>
  );
};

export default HostStep1PropertySelection;

