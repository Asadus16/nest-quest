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

const HostSafetyDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraDescription, setCameraDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);

  // Set progress - final segment filled
  useEffect(() => {
    dispatch(setHostProgress(100));
  }, [dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/discounts");
    }, 500);
  };

  const handleCreateListing = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Navigate to home or success page
      navigate("/");
    }, 500);
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

  const toggleItem = (id) => {
    if (id === "exterior-camera") {
      setShowCameraModal(true);
    }
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const safetyItems = [
    {
      id: "exterior-camera",
      name: "Exterior security camera present",
    },
    {
      id: "noise-monitor",
      name: "Noise decibel monitor present",
    },
    {
      id: "weapon",
      name: "Weapon(s) on the property",
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
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-3xl mx-auto px-6 1xz:px-8 py-12 min-h-[calc(100vh-180px)] flex items-center justify-center">
        <div className="w-full">
          <h1 className="text-3xl 1xz:text-4xl font-semibold text-gray-900 mb-6 text-center">
            Share safety details
          </h1>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              Does your place have any of these?
              <button className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <span className="text-xs text-gray-600">i</span>
              </button>
            </h2>

            {/* Safety Items */}
            <div className="space-y-4 mb-8">
              {safetyItems.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    disabled={isLoading || isBackLoading}
                    className={`
                      w-full p-4 rounded-lg border-2 transition-all duration-200 text-left
                      flex items-center justify-between
                      ${
                        isSelected
                          ? "border-black bg-gray-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }
                      disabled:opacity-70 disabled:cursor-not-allowed
                    `}
                  >
                    <span className="text-base font-medium text-gray-900">{item.name}</span>
                    <div
                      className={`
                        w-6 h-6 rounded border-2 flex items-center justify-center transition-colors
                        ${
                          isSelected
                            ? "border-black bg-black"
                            : "border-gray-300 bg-white"
                        }
                      `}
                    >
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Important things to know
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                Security cameras that monitor indoor spaces are not allowed even if they're turned off. All exterior security cameras must be disclosed.
              </p>
              <p>
                Be sure to comply with your{" "}
                <a href="#" className="underline">
                  local laws
                </a>{" "}
                and review Airbnb's{" "}
                <a href="#" className="underline">
                  anti-discrimination policy
                </a>
                . and{" "}
                <a href="#" className="underline">
                  guest and Host fees
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[2000] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Tell guests about your exterior security cameras
              </h3>
              <button
                onClick={() => {
                  setShowCameraModal(false);
                  setCameraDescription("");
                }}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-base text-gray-600 mb-4">
                Describe the area that each camera monitors, such as the backyard or pool.
              </p>
              <a href="#" className="text-sm text-blue-600 underline mb-6 block">
                Learn more
              </a>
              <textarea
                value={cameraDescription}
                onChange={(e) => setCameraDescription(e.target.value)}
                maxLength={300}
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                placeholder="Describe the camera locations..."
              ></textarea>
              <p className="text-sm text-gray-500 mt-2">
                {300 - cameraDescription.length} characters available
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCameraModal(false);
                  setCameraDescription("");
                }}
                className="px-6 py-3 rounded-lg font-medium text-gray-700 hover:text-gray-900 mr-3"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCameraModal(false);
                  // Save camera description logic here
                }}
                disabled={!cameraDescription.trim()}
                className={`
                  px-6 py-3 rounded-lg font-medium text-white transition-colors
                  ${
                    cameraDescription.trim()
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "bg-gray-300 cursor-not-allowed"
                  }
                `}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Progress Bar, Back and Create Listing */}
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
              onClick={handleCreateListing}
              disabled={isLoading || isBackLoading}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors min-w-[120px] flex items-center justify-center
                ${
                  !isLoading && !isBackLoading
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }
              `}
            >
              {isLoading ? <ThreeDotsLoader /> : "Create listing"}
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

export default HostSafetyDetails;

