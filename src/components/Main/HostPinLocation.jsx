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

const HostPinLocation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);

  const address = "Plaza no, 95FP+PPR Commercial, 131 b C, Sector C Commercial Area Sector C Bahria Town, Lahore, 00457, Pakistan";

  // Set progress (step 4 - second segment starts filling)
  useEffect(() => {
    dispatch(setHostProgress(28));
  }, [dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/confirm-address");
    }, 500);
  };

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/host/basics");
    }, 500);
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

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
      <div className="w-full max-w-6xl mx-auto px-6 1xz:px-8 py-8">
        <h1 className="text-3xl 1xz:text-4xl font-semibold text-gray-900 mb-3 text-center">
          Is the pin in the right spot?
        </h1>
        <p className="text-base text-gray-600 mb-6 text-center">
          Your address is only shared with guests after they've made a reservation.
        </p>

        {/* Address Display */}
        <div className="mb-4">
          <div className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
            <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-base text-gray-900 flex-1">{address}</span>
          </div>
        </div>

        {/* Map Placeholder with Pin */}
        <div className="w-full h-[500px] bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center relative overflow-hidden">
          {/* Pin Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              {/* Red pin */}
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  fill="#FF385C"
                />
                <circle cx="12" cy="9" r="3" fill="white" />
              </svg>
            </div>
          </div>

          {/* Instruction Box */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg text-sm">
            Drag the map to reposition the pin
          </div>

          {/* Map placeholder content */}
          <div className="text-center text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
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
              disabled={isLoading || isBackLoading}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors min-w-[80px] flex items-center justify-center
                ${
                  !isLoading && !isBackLoading
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

export default HostPinLocation;

