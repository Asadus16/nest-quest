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

const HostWeekendPrice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [weekendPrice, setWeekendPrice] = useState("10");
  const [premium, setPremium] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);

  // Step 3 - Third segment: ~91% (66 + 25%)
  useEffect(() => {
    dispatch(setHostProgress(91));
  }, [dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/pricing");
    }, 500);
  };

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/host/discounts");
    }, 500);
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

  const handlePremiumChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPremium(value);
    // Calculate weekend price based on weekday price + premium
    const weekdayPrice = 10; // This should come from previous step
    const newWeekendPrice = Math.round(weekdayPrice * (1 + value / 100));
    setWeekendPrice(newWeekendPrice.toString());
  };

  const guestPrice = parseFloat(weekendPrice) || 0;
  const serviceFee = Math.round(guestPrice * 0.15);
  const hostEarnings = guestPrice - serviceFee;

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
        <div className="w-full text-center">
          <h1 className="text-3xl 1xz:text-4xl font-semibold text-gray-900 mb-3">
            Set a weekend price
          </h1>
          <p className="text-base text-gray-600 mb-10">
            Add a premium for Fridays and Saturdays.
          </p>

          {/* Weekend Price Display */}
          <div className="mb-8">
            <div className="text-7xl 1xz:text-8xl font-semibold text-gray-900 mb-4">
              ${weekendPrice}
            </div>

            {/* Earnings Info */}
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="text-base text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2 mx-auto mb-4"
            >
              You earn ${hostEarnings}
              <svg
                className={`w-4 h-4 transition-transform ${showBreakdown ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Breakdown */}
            {showBreakdown && (
              <div className="mt-4 max-w-md mx-auto border border-gray-200 rounded-lg p-4 text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Guest price before taxes</span>
                  <span className="text-sm font-medium text-gray-900">${guestPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Host service fee</span>
                  <span className="text-sm font-medium text-gray-900">-${serviceFee}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-900">You earn</span>
                  <span className="text-sm font-semibold text-gray-900">${hostEarnings}</span>
                </div>
                <button
                  onClick={() => setShowBreakdown(false)}
                  className="mt-3 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  Show less
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Weekend Premium Slider */}
          <div className="max-w-md mx-auto text-left">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Weekend premium</h3>
                <p className="text-sm text-gray-500">Tip: Try 2%</p>
              </div>
              <div className="text-2xl font-semibold text-gray-900">{premium}%</div>
            </div>
            <input
              type="range"
              min="0"
              max="99"
              value={premium}
              onChange={handlePremiumChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              style={{
                background: `linear-gradient(to right, black 0%, black ${premium}%, #E5E7EB ${premium}%, #E5E7EB 100%)`,
              }}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>0%</span>
              <span>99%</span>
            </div>
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

export default HostWeekendPrice;

