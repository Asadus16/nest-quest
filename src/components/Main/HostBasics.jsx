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

const HostBasics = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [basics, setBasics] = useState({
    guests: 4,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);

  // Step 1 - First segment complete: 33%
  useEffect(() => {
    dispatch(setHostProgress(33));
  }, [dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/pin-location");
    }, 500);
  };

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/host/step-2-intro");
    }, 500);
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

  const updateCount = (field, delta) => {
    setBasics((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] + delta),
    }));
  };

  const CounterItem = ({ label, value, onDecrease, onIncrease, min = 0 }) => (
    <div className="flex items-center justify-between py-5 border-b border-gray-200 last:border-b-0">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={onDecrease}
          disabled={value <= min}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center transition-colors border-2
            ${
              value <= min
                ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white border-black text-black hover:bg-gray-50"
            }
          `}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
        </button>
        <span className="text-lg font-semibold text-gray-900 w-10 text-center">{value}</span>
        <button
          onClick={onIncrease}
          className="w-10 h-10 rounded-full bg-white border-2 border-black text-black flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );

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
      <div className="w-full min-h-[calc(100vh-180px)] flex items-center justify-center px-6 1xz:px-8 py-12">
        <div className="w-full max-w-3xl">
          <h1 className="text-3xl 1xz:text-4xl font-semibold text-gray-900 mb-3">
            Share some basics about your place
          </h1>
          <p className="text-base text-gray-600 mb-10">
            You'll add more details later, like bed types.
          </p>

          {/* Counters */}
          <div className="bg-white overflow-hidden">
            <CounterItem
              label="Guests"
              value={basics.guests}
              onDecrease={() => updateCount("guests", -1)}
              onIncrease={() => updateCount("guests", 1)}
              min={1}
            />
            <CounterItem
              label="Bedrooms"
              value={basics.bedrooms}
              onDecrease={() => updateCount("bedrooms", -1)}
              onIncrease={() => updateCount("bedrooms", 1)}
              min={0}
            />
            <CounterItem
              label="Beds"
              value={basics.beds}
              onDecrease={() => updateCount("beds", -1)}
              onIncrease={() => updateCount("beds", 1)}
              min={0}
            />
            <CounterItem
              label="Bathrooms"
              value={basics.bathrooms}
              onDecrease={() => updateCount("bathrooms", -1)}
              onIncrease={() => updateCount("bathrooms", 1)}
              min={0}
            />
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

export default HostBasics;

