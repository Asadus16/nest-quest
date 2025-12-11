import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHostProgress } from "../../redux/AppSlice";
import nestLogo from "../../asset/nestLogo.svg";
import MobileFooter from "../Footer/MobileFooter";
import SegmentedProgressBar from "../Common/SegmentedProgressBar";

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

const HostPlaceType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedPlaceType, setSelectedPlaceType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);

  // Step 1 - First segment: ~11% (2/7 of first segment)
  useEffect(() => {
    dispatch(setHostProgress(11));
  }, [dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/step-1/property-type");
    }, 500);
  };

  const handleNext = () => {
    if (selectedPlaceType) {
      setIsLoading(true);
      setTimeout(() => {
        // Navigate to location search
        navigate("/host/location-search");
      }, 500);
    }
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

  const placeTypes = [
    {
      id: "entire-place",
      title: "An entire place",
      description: "Guests have the whole place to themselves.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "room",
      title: "A room",
      description: "Guests have their own room in a home, plus access to shared spaces.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M3 12h18M3 12l4-4m-4 4l4 4m14-4l-4-4m4 4l-4 4M3 12v8a2 2 0 002 2h14a2 2 0 002-2v-8" />
        </svg>
      ),
    },
    {
      id: "shared-room",
      title: "A shared room in a hostel",
      description: "Guests sleep in a shared room in a professionally managed hostel with staff onsite 24/7.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="w-full border-b border-gray-200">
        <div className="w-full mx-auto px-6 1xz:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <img src={nestLogo} alt="Nest Quest" className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveAndExit}
              className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-900 font-semibold hover:border-gray-400 transition-colors text-sm 1xz:text-base"
            >
              Questions?
            </button>
            <button
              onClick={handleSaveAndExit}
              className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-900 font-semibold hover:border-gray-400 transition-colors text-sm 1xz:text-base"
            >
              Save & exit
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-3xl mx-auto px-6 1xz:px-8 py-12">
        <h1 className="text-3xl 1xz:text-4xl font-semibold text-gray-900 mb-10">
          What type of place will guests have?
        </h1>

        {/* Place Type Options */}
        <div className="space-y-4 mb-12">
          {placeTypes.map((place) => (
            <button
              key={place.id}
              onClick={() => setSelectedPlaceType(place.id)}
              className={`
                w-full p-6 border-2 transition-all duration-200 text-left
                flex items-start justify-between gap-6
                ${
                  selectedPlaceType === place.id
                    ? "border-black bg-gray-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }
              `}
              style={{ borderRadius: '20px' }}
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {place.title}
                </h3>
                <p className="text-base text-gray-600">
                  {place.description}
                </p>
              </div>
              <div className={`flex-shrink-0 ${selectedPlaceType === place.id ? "text-black" : "text-gray-400"}`}>
                {place.icon}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer - Progress Bar, Back and Next */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        {/* Segmented Progress Bar */}
        <SegmentedProgressBar />

        {/* Navigation */}
        <div className="py-4 px-6">
          <div className="w-full mx-auto flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={isBackLoading || isLoading}
              className="text-gray-700 hover:text-black font-medium transition-colors underline disabled:opacity-70 disabled:cursor-not-allowed min-w-[60px] flex items-center justify-center"
            >
              {isBackLoading ? <ThreeDotsLoader color="#374151" /> : "Back"}
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedPlaceType || isLoading || isBackLoading}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors min-w-[80px] flex items-center justify-center
                ${
                  selectedPlaceType && !isLoading && !isBackLoading
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

export default HostPlaceType;

