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

const HostPricing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [price, setPrice] = useState("0");
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);

  // Step 3 - Third segment: ~83% (66 + 17%)
  useEffect(() => {
    if (parseFloat(price) > 0) {
      dispatch(setHostProgress(83));
    } else {
      dispatch(setHostProgress(66));
    }
  }, [price, dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/guest-selection");
    }, 500);
  };

  const handleNext = () => {
    if (parseFloat(price) > 0) {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/host/weekend-price");
      }, 500);
    }
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPrice(value);
  };

  const guestPrice = parseFloat(price) || 0;
  const serviceFee = Math.round(guestPrice * 0.15); // 15% service fee
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

      {/* Main Content - Centered */}
      <div className="w-full max-w-3xl mx-auto px-6 1xz:px-8 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-180px)]">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl 1xz:text-4xl font-semibold text-gray-900 mb-3 text-center">
            Now, set a weekday base price
          </h1>
          <p className="text-base text-gray-600 mb-10 text-center">
            Tip: $17. You'll set a weekend price next.
          </p>

          {/* Price Input - Editable Large Input - Centered */}
          <div className="mb-6 w-full flex items-center justify-center">
            <div className="flex items-center" style={{ width: '20%' }}>
              <span className="font-bold text-7xl 1xz:text-8xl font-semibold text-gray-900">
                $
              </span>
              <input
                type="text"
                value={price}
                onChange={handlePriceChange}
                className="font-bold text-7xl 1xz:text-8xl font-semibold text-gray-900 border-none outline-none bg-transparent w-auto min-w-[100px] focus:outline-none"
                placeholder="0"
                style={{ caretColor: "black" }}
                autoFocus
              />
            </div>
          </div>

          {/* Earnings Info */}
          <div className="mb-8">
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="text-base text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2 mx-auto"
            >
              You earn ${hostEarnings}
              <svg
                className={`w-4 h-4 transition-transform ${
                  showBreakdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Breakdown */}
            {showBreakdown && (
              <div className="mt-4 max-w-md mx-auto border border-gray-200 rounded-lg p-4 text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Guest price before taxes
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    ${guestPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Host service fee
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    -${serviceFee}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-900">
                    You earn
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${hostEarnings}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* View Similar Listings Button */}
          <button className="px-6 py-3 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-50 transition-colors mb-3 flex items-center gap-2 mx-auto shadow-md">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            View similar listings
          </button>

          {/* Learn More Link */}
          <a href="#" className="text-sm text-gray-500 underline block text-center">
            Learn more about pricing
          </a>
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
              disabled={parseFloat(price) <= 0 || isLoading || isBackLoading}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors min-w-[80px] flex items-center justify-center
                ${
                  parseFloat(price) > 0 && !isLoading && !isBackLoading
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

export default HostPricing;
