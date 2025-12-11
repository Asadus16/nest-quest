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

const HostHighlights = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedHighlights, setSelectedHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);

  // Step 2 - Second segment: ~58% (33 + 25%)
  useEffect(() => {
    dispatch(setHostProgress(58));
  }, [dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/title");
    }, 500);
  };

  const handleNext = () => {
    if (selectedHighlights.length >= 2) {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/host/description");
      }, 500);
    }
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

  const toggleHighlight = (id) => {
    setSelectedHighlights((prev) => {
      if (prev.includes(id)) {
        return prev.filter((h) => h !== id);
      } else if (prev.length < 2) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const highlights = [
    {
      id: "peaceful",
      name: "Peaceful",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m8.25-8.25h-8.25m0 0l-3.75 3.75m3.75-3.75l3.75 3.75M3.75 21V3.545m0 0l3.75 3.75"
          />
        </svg>
      ),
    },
    {
      id: "unique",
      name: "Unique",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m4.5 0a12.05 12.05 0 003.478-.397m-9.956 0a12.05 12.05 0 01-3.478-.397m12.956 0a12.06 12.06 0 004.5 0m-4.5 0a12.05 12.05 0 00-3.478-.397M9.75 9a3.75 3.75 0 117.5 0"
          />
        </svg>
      ),
    },
    {
      id: "family-friendly",
      name: "Family-friendly",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
    },
    {
      id: "stylish",
      name: "Stylish",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      id: "central",
      name: "Central",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
    },
    {
      id: "spacious",
      name: "Spacious",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-5.09 9.38 9.38 0 01-2.625-.372M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
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
              className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-900 font-semibold hover:border-gray-400 transition-colors text-sm 1xz:text-base leading-none select-none"
            >
              Questions?
            </button>
            <button
              onClick={handleSaveAndExit}
              className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-900 font-semibold hover:border-gray-400 transition-colors text-sm 1xz:text-base leading-none select-none"
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
            Next, let's describe your house
          </h1>
          <p className="text-base text-gray-600 mb-10 text-start">
            Choose up to 2 highlights. We'll use these to get your description
            started.
          </p>

          {/* Highlights Grid - Horizontal Row */}
          <div className="flex flex-wrap gap-3">
            {highlights.map((highlight) => {
              const isSelected = selectedHighlights.includes(highlight.id);
              return (
                <button
                  key={highlight.id}
                  onClick={() => toggleHighlight(highlight.id)}
                  disabled={!isSelected && selectedHighlights.length >= 2}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200 whitespace-nowrap
                    ${
                      isSelected
                        ? "border-black bg-gray-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  <div
                    className={`flex-shrink-0 ${
                      isSelected ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {highlight.icon}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isSelected ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {highlight.name}
                  </span>
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
              className="text-gray-700 hover:text-black font-medium transition-colors underline disabled:opacity-70 disabled:cursor-not-allowed min-w-[60px] flex items-center justify-center text-base leading-none select-none"
            >
              {isBackLoading ? <ThreeDotsLoader color="#374151" /> : "Back"}
            </button>
            <button
              onClick={handleNext}
              disabled={
                selectedHighlights.length < 2 || isLoading || isBackLoading
              }
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors min-w-[80px] flex items-center justify-center text-base leading-none select-none
                ${
                  selectedHighlights.length >= 2 && !isLoading && !isBackLoading
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

export default HostHighlights;
