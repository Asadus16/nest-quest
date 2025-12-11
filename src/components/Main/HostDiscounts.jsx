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

const HostDiscounts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);

  // Set progress - second segment partially filled
  useEffect(() => {
    dispatch(setHostProgress(66));
  }, [dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/weekend-price");
    }, 500);
  };

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/host/safety-details");
    }, 500);
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

  const toggleDiscount = (id) => {
    setSelectedDiscounts((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const discounts = [
    {
      id: "new-listing",
      percentage: "20%",
      title: "New listing promotion",
      description: "Offer 20% off your first 3 bookings",
    },
    {
      id: "last-minute",
      percentage: "3%",
      title: "Last-minute discount",
      description: "For stays booked 14 days or less before arrival",
    },
    {
      id: "weekly",
      percentage: "10%",
      title: "Weekly discount",
      description: "For stays of 7 nights or more",
    },
    {
      id: "monthly",
      percentage: "20%",
      title: "Monthly discount",
      description: "For stays of 28 nights or more",
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
      <div className="w-full max-w-7xl mx-auto px-6 1xz:px-8 py-12 min-h-[calc(100vh-180px)]">
        <div className="w-full items-center">
          {/* Left Section - Text and Discount Cards */}
          <div className="order-2 1lg:order-1">
            <h1 className="text-3xl 1xz:text-4xl font-semibold text-gray-900 mb-3 text-start">
              Add discounts
            </h1>
            <p className="text-base text-gray-600 mb-10 text-start">
              Help your place stand out to get booked faster and earn your first reviews.
            </p>

            {/* Discount Cards */}
            <div className="space-y-4 mb-8">
              {discounts.map((discount) => {
                const isSelected = selectedDiscounts.includes(discount.id);
                return (
                  <button
                    key={discount.id}
                    onClick={() => toggleDiscount(discount.id)}
                    disabled={isLoading || isBackLoading}
                    className={`
                      w-full p-6 rounded-lg border-2 transition-all duration-200 text-left
                      flex items-center justify-between gap-6
                      ${
                        isSelected
                          ? "border-black bg-gray-50"
                          : "border-gray-200 bg-gray-50 hover:border-gray-300"
                      }
                      disabled:opacity-70 disabled:cursor-not-allowed
                    `}
                  >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Percentage Badge */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-gray-400">
                        {discount.percentage}
                      </span>
                    </div>
                    {/* Text Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {discount.title}
                      </h3>
                      <p className="text-sm text-gray-600">{discount.description}</p>
                    </div>
                  </div>
                  {/* Checkbox */}
                  <div className="flex-shrink-0">
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
                  </div>
                </button>
              );
            })}
          </div>

            {/* Info Text */}
            <p className="text-sm text-gray-600 text-center">
              Only one discount will be applied per stay.{" "}
              <a href="#" className="underline">
                Learn more
              </a>
            </p>
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

export default HostDiscounts;

