import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import cross from "../../asset/Icons_svg/cross.svg";
import google from "../../asset/Icons_svg/Google.svg";
import facebook from "../../asset/Icons_svg/faceBookIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setShowHostModal, setHostModalStep, setShowLogin } from "../../redux/AppSlice";
import { signInWithGoogle } from "../../api/apiAuthentication";

// Custom hook to handle modal visibility transitions
const useModalTransition = (isOpen) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setVisible(true), 50);
    } else {
      setVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  return { visible, shouldRender };
};

// Custom hook to handle body scroll lock
const useScrollLock = (isOpen) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
};

// Custom hook to handle click outside modal
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const handleClick = (e) => {
      // Don't close if clicking on dropdown
      if (e.target.closest('.country-dropdown')) {
        return;
      }
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [ref, handler]);
};

// Custom hook for device detection
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 751);
      setIsTablet(width >= 751 && width < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return { isMobile, isTablet, isDesktop: !isMobile && !isTablet };
};

// Host option card component
const HostOptionCard = ({ icon, label, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-10 md:p-12 cursor-pointer rounded-xl border transition-all ${
        isSelected
          ? "border-black border-2 bg-gray-50"
          : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
    >
      <div className="text-6xl md:text-7xl mb-4 md:mb-5">{icon}</div>
      <span className="text-base md:text-lg font-medium text-black">{label}</span>
    </div>
  );
};

// Step 1: Selection Screen
const SelectionStep = ({ selectedOption, onOptionClick, onNext, onClose, visible }) => {
  return (
    <div className={`transition-all duration-300 ${visible ? "opacity-100" : "opacity-0 hidden"}`}>
      {/* Header */}
      <div className="relative flex items-center justify-center px-6 py-5 md:py-6 border-b border-gray-200">
        <button
          onClick={onClose}
          className="absolute left-4 md:left-6 w-8 h-8 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-gray-100 transition-colors"
        >
          <img src={cross} className="h-5 w-5" alt="Close" />
        </button>
        <h2 className="text-xl md:text-2xl font-semibold text-center">What would you like to host?</h2>
      </div>

      {/* Content */}
      <div className="px-6 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <HostOptionCard
            icon="🏠"
            label="Home"
            isSelected={selectedOption === "home"}
            onClick={() => onOptionClick("home")}
          />
          <HostOptionCard
            icon="🎈"
            label="Experience"
            isSelected={selectedOption === "experience"}
            onClick={() => onOptionClick("experience")}
          />
          <HostOptionCard
            icon="🔔"
            label="Service"
            isSelected={selectedOption === "service"}
            onClick={() => onOptionClick("service")}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 md:pt-4">
          <button
            onClick={onNext}
            disabled={!selectedOption}
            className={`px-6 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-medium transition-colors ${
              selectedOption
                ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Country code dropdown component
const CountryCodeDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const countries = [
    { code: "+92", name: "Pakistan", flag: "🇵🇰" },
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
    { code: "+91", name: "India", flag: "🇮🇳" },
  ];

  const selectedCountry = countries.find((c) => c.code === value) || countries[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative country-dropdown" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 transition-colors bg-white"
      >
        <div className="flex items-center gap-2">
          <span>{selectedCountry.flag}</span>
          <span className="text-sm">{selectedCountry.name} ({selectedCountry.code})</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => {
                onChange(country.code);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
            >
              <span>{country.flag}</span>
              <span className="text-sm">{country.name} ({country.code})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Step 2: Desktop View - Login/Signup Form (Airbnb Style)
const DesktopNextStep = ({ selectedOption, onBack, onClose, visible }) => {
  const dispatch = useDispatch();
  const [countryCode, setCountryCode] = useState("+92");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    const hostPortalUrl =
      import.meta?.env?.VITE_HOST_PORTAL_URL || "https://pms-fe-two.vercel.app/";
    window.open(hostPortalUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  const handleGoogleLogin = () => {
    signInWithGoogle();
    onClose();
  };

  return (
    <div className={`transition-all duration-300 ${visible ? "opacity-100" : "opacity-0 hidden"}`}>
      {/* Header - Same as previous */}
      <div className="relative flex items-center justify-center px-6 py-5 border-b border-gray-200">
        <button
          onClick={onBack}
          className="absolute left-6 w-8 h-8 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-base font-medium">Log in or sign up</h2>
        <button
          onClick={onClose}
          className="absolute right-6 w-8 h-8 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-gray-100 transition-colors"
        >
          <img src={cross} className="h-5 w-5" alt="Close" />
        </button>
      </div>

      {/* Content - Airbnb Style */}
      <div className="px-8 py-8">
        <div className="max-w-md mx-auto">
          {/* Welcome Message */}
          <h3 className="text-[22px] font-semibold mb-8">Welcome to Nest Quest</h3>

          {/* Country Code */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country code
            </label>
            <CountryCodeDropdown value={countryCode} onChange={setCountryCode} />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-base"
            />
          </div>

          {/* Privacy Policy Text */}
          <p className="text-xs text-gray-600 mb-8 leading-relaxed">
            We'll call or text you to confirm your number. Standard message and data rates apply.{" "}
            <a href="#" className="text-black underline font-medium">
              Privacy Policy
            </a>
          </p>

          {/* Continue Button - Airbnb Pink Gradient */}
          <button
            onClick={handleContinue}
            className="w-full py-3 rounded-lg font-medium text-white hover:opacity-90 transition-all mb-6 text-base"
            style={{ background: 'linear-gradient(to right, #ff385c, #e63253)' }}
          >
            Continue
          </button>

          {/* Separator */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Alternative Login Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center hover:border-gray-400 transition-colors bg-white"
            >
              <img src={google} className="h-5 w-5" alt="Google" />
              <span className="text-sm font-medium flex-1 text-left ml-4">Continue with Google</span>
            </button>

            <button
              onClick={() => dispatch(setShowLogin(true))}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center hover:border-gray-400 transition-colors bg-white"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.96-3.24-1.44-2.03-1.02-3.25-1.55-3.17-2.94.03-.5.32-1.01.75-1.4 1.68-1.48 3.35-2.98 5.02-4.47.64-.57 1.25-1.15 1.8-1.78.42-.48.8-1 .99-1.6.2-.62.12-1.2-.05-1.81-.2-.7-.55-1.35-1.05-1.92-.5-.57-1.1-1-1.75-1.33-.65-.33-1.35-.5-2.05-.5-.7 0-1.4.17-2.05.5-.65.33-1.25.76-1.75 1.33-.5.57-.85 1.22-1.05 1.92-.17.61-.25 1.19-.05 1.81.19.6.57 1.12.99 1.6.55.63 1.16 1.21 1.8 1.78 1.67 1.49 3.34 2.99 5.02 4.47.43.39.72.9.75 1.4.08 1.39-1.14 1.92-3.17 2.94-1.16.48-2.15.94-3.24 1.44-1.03.48-2.1.55-3.08-.4-.98-.95-.88-2.05-.4-3.08.5-1.09.96-2.08 1.44-3.24 1.02-2.03 1.55-3.25 2.94-3.17.5-.03 1.01.32 1.4.75 1.48 1.68 2.98 3.35 4.47 5.02.57.64 1.15 1.25 1.78 1.8.48.42 1 .8 1.6.99.62.2 1.2.12 1.81-.05.7-.2 1.35-.55 1.92-1.05.57-.5 1-1.1 1.33-1.75.33-.65.5-1.35.5-2.05 0-.7-.17-1.4-.5-2.05-.33-.65-.76-1.25-1.33-1.75-.57-.5-1.22-.85-1.92-1.05-.61-.17-1.19-.25-1.81-.05-.6.19-1.12.57-1.6.99-.63.55-1.21 1.16-1.78 1.8-1.49 1.67-2.99 3.34-4.47 5.02-.39.43-.9.72-1.4.75-1.39.08-1.92-1.14-2.94-3.17-.48-1.16-.94-2.15-1.44-3.24-.48-1.03-.55-2.1.4-3.08.95-.98 2.05-.88 3.08-.4 1.09.5 2.08.96 3.24 1.44 2.03 1.02 3.25 1.55 3.17 2.94-.03.5-.32 1.01-.75 1.4-1.68 1.48-3.35 2.98-5.02 4.47-.64.57-1.25 1.15-1.8 1.78-.42.48-.8 1-.99 1.6-.2.62-.12 1.2.05 1.81.2.7.55 1.35 1.05 1.92.5.57 1.1 1 1.75 1.33.65.33 1.35.5 2.05.5.7 0 1.4-.17 2.05-.5.65-.33 1.25-.76 1.75-1.33.5-.57.85-1.22 1.05-1.92.17-.61.25-1.19.05-1.81-.19-.6-.57-1.12-.99-1.6-.55-.63-1.16-1.21-1.8-1.78-1.67-1.49-3.34-2.99-5.02-4.47-.43-.39-.72-.9-.75-1.4-.08-1.39 1.14-1.92 3.17-2.94 1.16-.48 2.15-.94 3.24-1.44 1.03-.48 2.1-.55 3.08.4.98.95.88 2.05.4 3.08-.5 1.09-.96 2.08-1.44 3.24-1.02 2.03-1.55 3.25-2.94 3.17-.5.03-1.01-.32-1.4-.75-1.48-1.68-2.98-3.35-4.47-5.02-.57-.64-1.15-1.25-1.78-1.8-.48-.42-1-.8-1.6-.99-.62-.2-1.2-.12-1.81.05-.7.2-1.35.55-1.92 1.05-.57.5-1 1.1-1.33 1.75-.33.65-.5 1.35-.5 2.05 0 .7.17 1.4.5 2.05.33.65.76 1.25 1.33 1.75.57.5 1.22.85 1.92 1.05.61.17 1.19.25 1.81.05.6-.19 1.12-.57 1.6-.99.63-.55 1.21-1.16 1.78-1.8 1.49-1.67 2.99-3.34 4.47-5.02.39-.43.9-.72 1.4-.75 1.39-.08 1.92 1.14 2.94 3.17.48 1.16.94 2.15 1.44 3.24.48 1.03.55 2.1-.4 3.08z"/>
              </svg>
              <span className="text-sm font-medium flex-1 text-left ml-4">Continue with Apple</span>
            </button>

            <button
              onClick={() => dispatch(setShowLogin(true))}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center hover:border-gray-400 transition-colors bg-white"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium flex-1 text-left ml-4">Continue with email</span>
            </button>

            <button
              onClick={() => dispatch(setShowLogin(true))}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center hover:border-gray-400 transition-colors bg-white"
            >
              <img src={facebook} className="h-5 w-5" alt="Facebook" />
              <span className="text-sm font-medium flex-1 text-left ml-4">Continue with Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 2: Mobile/Tablet View - Login/Signup Form (Airbnb Style)
const MobileNextStep = ({ selectedOption, onBack, onClose, visible }) => {
  const dispatch = useDispatch();
  const [countryCode, setCountryCode] = useState("+92");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    const hostPortalUrl =
      import.meta?.env?.VITE_HOST_PORTAL_URL || "https://pms-fe-two.vercel.app/";
    window.open(hostPortalUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  const handleGoogleLogin = () => {
    signInWithGoogle();
    onClose();
  };

  return (
    <div className={`transition-all duration-300 ${visible ? "opacity-100" : "opacity-0 hidden"}`}>
      {/* Header - Same as previous */}
      <div className="relative flex items-center justify-center px-6 py-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="absolute left-6 w-8 h-8 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-base font-medium">Log in or sign up</h2>
        <button
          onClick={onClose}
          className="absolute right-6 w-8 h-8 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-gray-100 transition-colors"
        >
          <img src={cross} className="h-5 w-5" alt="Close" />
        </button>
      </div>

      {/* Content - Airbnb Style */}
      <div className="px-6 py-6 flex-1 overflow-y-auto">
        <h3 className="text-[22px] font-semibold mb-8">Welcome to Nest Quest</h3>

        {/* Country Code */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country code
          </label>
          <CountryCodeDropdown value={countryCode} onChange={setCountryCode} />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-base"
          />
        </div>

        {/* Privacy Policy Text */}
        <p className="text-xs text-gray-600 mb-8 leading-relaxed">
          We'll call or text you to confirm your number. Standard message and data rates apply.{" "}
          <a href="#" className="text-black underline font-medium">
            Privacy Policy
          </a>
        </p>

        {/* Continue Button - Airbnb Pink Gradient */}
        <button
          onClick={handleContinue}
          className="w-full py-3 rounded-lg font-medium text-white hover:opacity-90 transition-all mb-6 text-base"
          style={{ background: 'linear-gradient(to right, #ff385c, #e63253)' }}
        >
          Continue
        </button>

        {/* Separator */}
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Alternative Login Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center hover:border-gray-400 transition-colors bg-white"
          >
            <img src={google} className="h-5 w-5" alt="Google" />
            <span className="text-sm font-medium flex-1 text-left ml-4">Continue with Google</span>
          </button>

          <button
            onClick={() => dispatch(setShowLogin(true))}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center hover:border-gray-400 transition-colors bg-white"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.96-3.24-1.44-2.03-1.02-3.25-1.55-3.17-2.94.03-.5.32-1.01.75-1.4 1.68-1.48 3.35-2.98 5.02-4.47.64-.57 1.25-1.15 1.8-1.78.42-.48.8-1 .99-1.6.2-.62.12-1.2-.05-1.81-.2-.7-.55-1.35-1.05-1.92-.5-.57-1.1-1-1.75-1.33-.65-.33-1.35-.5-2.05-.5-.7 0-1.4.17-2.05.5-.65.33-1.25.76-1.75 1.33-.5.57-.85 1.22-1.05 1.92-.17.61-.25 1.19-.05 1.81.19.6.57 1.12.99 1.6.55.63 1.16 1.21 1.8 1.78 1.67 1.49 3.34 2.99 5.02 4.47.43.39.72.9.75 1.4.08 1.39-1.14 1.92-3.17 2.94-1.16.48-2.15.94-3.24 1.44-1.03.48-2.1.55-3.08-.4-.98-.95-.88-2.05-.4-3.08.5-1.09.96-2.08 1.44-3.24 1.02-2.03 1.55-3.25 2.94-3.17.5-.03 1.01.32 1.4.75 1.48 1.68 2.98 3.35 4.47 5.02.57.64 1.15 1.25 1.78 1.8.48.42 1 .8 1.6.99.62.2 1.2.12 1.81-.05.7-.2 1.35-.55 1.92-1.05.57-.5 1-1.1 1.33-1.75.33-.65.5-1.35.5-2.05 0-.7-.17-1.4-.5-2.05-.33-.65-.76-1.25-1.33-1.75-.57-.5-1.22-.85-1.92-1.05-.61-.17-1.19-.25-1.81-.05-.6.19-1.12.57-1.6.99-.63.55-1.21 1.16-1.78 1.8-1.49 1.67-2.99 3.34-4.47 5.02-.39.43-.9.72-1.4.75-1.39.08-1.92-1.14-2.94-3.17-.48-1.16-.94-2.15-1.44-3.24-.48-1.03-.55-2.1.4-3.08.95-.98 2.05-.88 3.08-.4 1.09.5 2.08.96 3.24 1.44 2.03 1.02 3.25 1.55 3.17 2.94-.03.5-.32 1.01-.75 1.4-1.68 1.48-3.35 2.98-5.02 4.47-.64.57-1.25 1.15-1.8 1.78-.42.48-.8 1-.99 1.6-.2.62-.12 1.2.05 1.81.2.7.55 1.35 1.05 1.92.5.57 1.1 1 1.75 1.33.65.33 1.35.5 2.05.5.7 0 1.4-.17 2.05-.5.65-.33 1.25-.76 1.75-1.33.5-.57.85-1.22 1.05-1.92.17-.61.25-1.19.05-1.81-.19-.6-.57-1.12-.99-1.6-.55-.63-1.16-1.21-1.8-1.78-1.67-1.49-3.34-2.99-5.02-4.47-.43-.39-.72-.9-.75-1.4-.08-1.39 1.14-1.92 3.17-2.94 1.16-.48 2.15-.94 3.24-1.44 1.03-.48 2.1-.55 3.08.4.98.95.88 2.05.4 3.08-.5 1.09-.96 2.08-1.44 3.24-1.02 2.03-1.55 3.25-2.94 3.17-.5.03-1.01-.32-1.4-.75-1.48-1.68-2.98-3.35-4.47-5.02-.57-.64-1.15-1.25-1.78-1.8-.48-.42-1-.8-1.6-.99-.62-.2-1.2-.12-1.81.05-.7.2-1.35.55-1.92 1.05-.57.5-1 1.1-1.33 1.75-.33.65-.5 1.35-.5 2.05 0 .7.17 1.4.5 2.05.33.65.76 1.25 1.33 1.75.57.5 1.22.85 1.92 1.05.61.17 1.19.25 1.81.05.6-.19 1.12-.57 1.6-.99.63-.55 1.21-1.16 1.78-1.8 1.49-1.67 2.99-3.34 4.47-5.02.39-.43.9-.72 1.4-.75 1.39-.08 1.92 1.14 2.94 3.17.48 1.16.94 2.15 1.44 3.24.48 1.03.55 2.1-.4 3.08z"/>
            </svg>
            <span className="text-sm font-medium flex-1 text-left ml-4">Continue with Apple</span>
          </button>

          <button
            onClick={() => dispatch(setShowLogin(true))}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center hover:border-gray-400 transition-colors bg-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium flex-1 text-left ml-4">Continue with email</span>
          </button>

          <button
            onClick={() => dispatch(setShowLogin(true))}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center hover:border-gray-400 transition-colors bg-white"
          >
            <img src={facebook} className="h-5 w-5" alt="Facebook" />
            <span className="text-sm font-medium flex-1 text-left ml-4">Continue with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const HostModal = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((store) => store.app.showHostModal);
  const modalStep = useSelector((store) => store.app.hostModalStep);
  const [selectedOption, setSelectedOption] = useState(null);
  const { isMobile, isTablet, isDesktop } = useDeviceDetection();

  const { visible, shouldRender } = useModalTransition(isOpen);
  useScrollLock(isOpen);
  useClickOutside(ref, () => {
    dispatch(setShowHostModal(false));
    dispatch(setHostModalStep(1));
    setSelectedOption(null);
  });

  const handleClose = () => {
    dispatch(setShowHostModal(false));
    dispatch(setHostModalStep(1));
    setSelectedOption(null);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      // Close modal and redirect to login page
      sessionStorage.setItem("fromHost", "true");
      dispatch(setShowHostModal(false));
      dispatch(setHostModalStep(1));
      setSelectedOption(null);
      navigate("/login");
    }
  };

  const handleBack = () => {
    dispatch(setHostModalStep(1));
  };

  if (!shouldRender) return null;

  const isStep1 = modalStep === 1;
  const isStep2 = modalStep === 2;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={ref}
        className={`bg-white rounded-2xl shadow-2xl w-full ${
          isMobile ? "max-w-full mx-0 rounded-none h-full flex flex-col" : "max-w-4xl mx-4"
        } transition-all duration-300 ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        {/* Step 1: Selection */}
        <SelectionStep
          selectedOption={selectedOption}
          onOptionClick={handleOptionClick}
          onNext={handleNext}
          onClose={handleClose}
          visible={isStep1}
        />

        {/* Step 2: Desktop */}
        {isDesktop && (
          <DesktopNextStep
            selectedOption={selectedOption}
            onBack={handleBack}
            onClose={handleClose}
            visible={isStep2}
          />
        )}

        {/* Step 2: Mobile/Tablet */}
        {(isMobile || isTablet) && (
          <MobileNextStep
            selectedOption={selectedOption}
            onBack={handleBack}
            onClose={handleClose}
            visible={isStep2}
          />
        )}
      </div>
    </div>,
    document.body
  );
};

export default HostModal;
