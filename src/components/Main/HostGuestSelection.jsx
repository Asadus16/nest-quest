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

const HostGuestSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedGuest, setSelectedGuest] = useState("any-guest");
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);

  // Step 3 - Third segment: ~75% (66 + 9%)
  useEffect(() => {
    dispatch(setHostProgress(75));
  }, [dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/booking-settings");
    }, 500);
  };

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/host/pricing");
    }, 500);
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

  const guestOptions = [
    {
      id: "any-guest",
      title: "Any Airbnb guest",
      description: "Get reservations faster when you welcome anyone from the Airbnb community.",
    },
    {
      id: "experienced-guest",
      title: "An experienced guest",
      description: "For your first guest, welcome someone with a good track record on Airbnb who can offer tips for how to be a great Host.",
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
      <div className="w-full max-w-3xl mx-auto px-6 1xz:px-8 py-12 flex items-center justify-center min-h-[calc(100vh-180px)]">
        <div className="w-full">
          <h1 className="text-3xl 1xz:text-4xl font-semibold text-gray-900 mb-3 text-start">
            Choose who to welcome for your first reservation
          </h1>
          <p className="text-base text-gray-600 mb-10 text-start">
            After your first guest, anyone can book your place.{" "}
            <a href="#" className="underline">Learn more</a>
          </p>

          {/* Guest Options */}
          <div className="space-y-4">
            {guestOptions.map((option) => {
              const isSelected = selectedGuest === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedGuest(option.id)}
                  style={{ borderRadius: '20px' }}
                  className={`
                    w-full p-6 border-2 text-left transition-all duration-200
                    ${
                      isSelected
                        ? "border-black bg-gray-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    {/* Radio Button */}
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${
                            isSelected
                              ? "border-black"
                              : "border-gray-300"
                          }
                        `}
                      >
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {option.title}
                      </h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
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
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
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

export default HostGuestSelection;

