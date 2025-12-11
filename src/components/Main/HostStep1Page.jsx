import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHostProgress } from "../../redux/AppSlice";
import nestLogo from "../../asset/nestLogo.svg";
import MobileFooter from "../Footer/MobileFooter";

const HostStep1Page = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Keep progress at 0% for step 1 (not filled yet)
  useEffect(() => {
    dispatch(setHostProgress(0));
  }, [dispatch]);

  const handleBack = () => {
    navigate("/become-host");
  };

  const handleNext = () => {
    // Navigate to property type selection screen
    navigate("/host/step-1/property-type");
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Simple Header - Logo and Save & Exit */}
      <div className="w-full ">
        <div className="w-full mx-auto px-8 1xz:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <img src={nestLogo} alt="Nest Quest" className="h-8 w-auto" />
          </div>
          <button
            onClick={handleSaveAndExit}
            className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-900 font-semibold hover:border-gray-400 transition-colors text-sm 1xz:text-base"
          >
            Save & exit
          </button>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="w-full mx-auto px-6 1xz:px-8 py-8 min-h-[calc(100vh-180px)] flex items-center justify-center">
        <div className="w-full max-w-7xl grid grid-cols-1 1lg:grid-cols-2 gap-12 1lg:gap-20 items-center">
          {/* Left Section - Text Content */}
          <div className="order-2 1lg:order-1">
            <div className="mb-4">
              <span className="text-sm 1xz:text-base text-gray-500 font-medium">
                Step 1
              </span>
            </div>
            <h1 className="text-3xl 1xz:text-4xl 1lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
              Tell us about your place
            </h1>
            <p className="text-base 1xz:text-lg text-gray-600 leading-relaxed">
              In this step, we'll ask you which type of property you have and if
              guests will book the entire place or just a room. Then let us know
              the location and how many guests can stay.
            </p>
          </div>

          {/* Right Section - Video */}
          <div className="order-1 1lg:order-2">
            <div className="w-full max-w-lg mx-auto">
              <div className="w-full aspect-square overflow-hidden relative">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src="https://stream.media.muscache.com/KeNKUpa01dRaT5g00SSBV95FqXYkqf01DJdzn01F1aT00vCI.mp4?v_q=high"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Progress Bar, Back and Next */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        {/* Progress Bar - Not filled (0%) */}
        <div className="w-full h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-pink to-dark-pink transition-all duration-300"
            style={{ width: "0%" }}
          ></div>
        </div>

        {/* Navigation */}
        <div className="">
          <div className="w-full mx-auto px-8 1xz:px-8 py-6 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="text-gray-700 hover:text-black font-medium transition-colors underline"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-lg font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              Next
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

export default HostStep1Page;
