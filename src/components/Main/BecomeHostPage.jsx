import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setHostProgress } from "../../redux/AppSlice";
import nestLogo from "../../asset/nestLogo.svg";
import MobileFooter from "../Footer/MobileFooter";

// Three dots loader component
const ThreeDotsLoader = () => {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <div
        className="w-2 h-2 bg-white rounded-full"
        style={{
          animation: "bounce 1.4s infinite",
          animationDelay: "0s",
        }}
      ></div>
      <div
        className="w-2 h-2 bg-white rounded-full"
        style={{
          animation: "bounce 1.4s infinite",
          animationDelay: "0.2s",
        }}
      ></div>
      <div
        className="w-2 h-2 bg-white rounded-full"
        style={{
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

const BecomeHostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const progress = useSelector((store) => store.app.hostProgress);
  const [isLoading, setIsLoading] = useState(false);

  // Set initial progress for this screen (step 1 = 0%)
  useEffect(() => {
    dispatch(setHostProgress(0));
  }, [dispatch]);

  const handleGetStarted = () => {
    setIsLoading(true);
    // Show loader for 1.5 seconds then redirect
    setTimeout(() => {
      navigate("/host/step-1");
    }, 1500);
  };

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Simple Header - Logo and Exit */}
      <div className="w-full ">
        <div className="w-full mx-auto px-8 1xz:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <img src={nestLogo} alt="Nest Quest" className="h-8 w-auto" />
          </div>
          <button
            onClick={handleExit}
            className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-900 font-semibold hover:border-gray-400 transition-colors"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Main Content - Centered on Screen */}
      <div className="w-full min-h-[calc(100vh-180px)] flex items-center justify-center px-6 1xz:px-8 py-8">
        <div className="max-w-7xl w-full grid grid-cols-1 1lg:grid-cols-2 gap-12 1lg:gap-20 items-center">
          {/* Left Section - Main Text */}
          <div className="order-2 1lg:order-1">
            <h1 className="text-5xl 1xz:text-6xl font-semibold text-gray-900 leading-tight">
              It's easy to get
              <br />
              started on Nest Quest
            </h1>
          </div>

          {/* Right Section - Three Steps */}
          <div className="order-1 1lg:order-2">
            {/* Step 1 */}
            <div className="flex items-start gap-8 pb-10">
              {/* Number Circle */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-900">1</span>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tell us about your place
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Share some basic info, like where it is and how many guests can stay.
                </p>
              </div>
              
              {/* Illustration */}
              <div className="w-24 h-24 flex-shrink-0 relative transition-transform hover:scale-105 duration-300">
                <div className="absolute inset-0 bg-white rounded-lg shadow-md border border-gray-100 p-3">
                  {/* Bed with orange blanket */}
                  <div className="absolute bottom-3 left-2 w-14 h-10 bg-amber-50 rounded-sm shadow-sm transform rotate-[-2deg]">
                    <div className="absolute inset-0 bg-white rounded-sm"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-3 bg-orange-400 rounded-b-sm"></div>
                    {/* Pillows */}
                    <div className="absolute top-1 left-1 w-3 h-2 bg-white rounded-sm"></div>
                    <div className="absolute top-1 left-4 w-3 h-2 bg-white rounded-sm"></div>
                  </div>
                  {/* Nightstand */}
                  <div className="absolute bottom-3 right-3 w-5 h-5 bg-amber-100 rounded-sm shadow-sm transform rotate-[2deg]"></div>
                  {/* Lamp with pink shade */}
                  <div className="absolute top-2 right-4 w-3 h-4">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-amber-200"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2 bg-pink-300 rounded-full"></div>
                  </div>
                  {/* Round mirror */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-7 h-7 border-2 border-amber-200 rounded-full bg-white shadow-sm"></div>
                </div>
              </div>
            </div>

            {/* Separator Line */}
            <div className="w-full h-px bg-gray-200 my-10"></div>

            {/* Step 2 */}
            <div className="flex items-start gap-8 pb-10">
              {/* Number Circle */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-900">2</span>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Make it stand out
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Add 5 or more photos plus a title and description—we'll help you out.
                </p>
              </div>
              
              {/* Illustration */}
              <div className="w-24 h-24 flex-shrink-0 relative transition-transform hover:scale-105 duration-300">
                <div className="absolute inset-0 bg-white rounded-lg shadow-md border border-gray-100 p-3">
                  {/* Bench with orange cushions */}
                  <div className="absolute bottom-3 left-2 right-2 h-4 bg-amber-100 rounded-sm shadow-sm transform rotate-[-1deg]">
                    <div className="absolute inset-x-1 top-0.5 h-2 bg-orange-300 rounded-sm"></div>
                    <div className="absolute inset-x-3 top-0.5 h-2 bg-orange-300 rounded-sm"></div>
                    <div className="absolute inset-x-5 top-0.5 h-2 bg-orange-300 rounded-sm"></div>
                  </div>
                  {/* Plant */}
                  <div className="absolute bottom-3 left-2 w-3 h-3 bg-green-400 rounded-full shadow-sm"></div>
                  {/* Large poster */}
                  <div className="absolute top-2 left-2 right-3 h-5 bg-blue-50 rounded-sm border-2 border-gray-400 shadow-sm">
                    <div className="absolute inset-1 bg-gradient-to-br from-blue-200 to-purple-200 rounded-sm"></div>
                  </div>
                  {/* Round clock */}
                  <div className="absolute top-2 right-2 w-4 h-4 border-2 border-gray-400 rounded-full bg-white shadow-sm">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-gray-600"></div>
                  </div>
                  {/* Small picture */}
                  <div className="absolute top-6 right-2 w-2 h-2 bg-white border border-gray-300 rounded-sm shadow-sm"></div>
                </div>
              </div>
            </div>

            {/* Separator Line */}
            <div className="w-full h-px bg-gray-200 my-10"></div>

            {/* Step 3 */}
            <div className="flex items-start gap-8">
              {/* Number Circle */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-900">3</span>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Finish up and publish
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Choose a starting price, verify a few details, then publish your listing.
                </p>
              </div>
              
              {/* Illustration */}
              <div className="w-24 h-24 flex-shrink-0 relative transition-transform hover:scale-105 duration-300">
                <div className="absolute inset-0 bg-white rounded-lg shadow-md border border-gray-100 p-3">
                  {/* Door with glass panel */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-9 h-14 bg-gray-800 rounded-sm shadow-lg transform rotate-[-1deg]">
                    {/* Glass panel */}
                    <div className="absolute inset-x-1 top-2 bottom-4 bg-gray-100 rounded-sm opacity-60"></div>
                    {/* Door handle */}
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  </div>
                  {/* Doormat with "Hi" */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-7 h-2 bg-amber-200 rounded-sm shadow-sm">
                    <div className="absolute inset-0.5 bg-red-500 rounded-sm flex items-center justify-center">
                      <span className="text-[6px] text-white font-bold">Hi</span>
                    </div>
                  </div>
                  {/* Green bush */}
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                  {/* Wall light */}
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 bg-yellow-300 rounded-full shadow-lg ring-2 ring-yellow-200"></div>
                  {/* House number "19" */}
                  <div className="absolute top-3 right-2 w-3 h-2 bg-white border border-gray-400 rounded shadow-sm flex items-center justify-center">
                    <span className="text-[5px] text-gray-800 font-bold">19</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Progress Bar and Get Started Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-pink to-dark-pink transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Get Started Button */}
        <div className="">
          <div className="w-full mx-auto px-8 1xz:px-8 py-6 flex justify-end">
            <button
              onClick={handleGetStarted}
              disabled={isLoading}
              className="px-8 py-3 rounded-lg font-medium text-white hover:opacity-90 transition-all text-base disabled:opacity-70 disabled:cursor-not-allowed min-w-[120px] flex items-center justify-center"
              style={{
                background: isLoading
                  ? "#ccc"
                  : "linear-gradient(to right, #ff385c, #e63253)",
              }}
            >
              {isLoading ? <ThreeDotsLoader /> : "Get started"}
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

export default BecomeHostPage;
