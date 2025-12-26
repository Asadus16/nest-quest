import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import LongFooter from "../House-detail/LongFooter";
import Header from "../Header/Header";
import google from "../../asset/Icons_svg/Google.svg";
import facebook from "../../asset/Icons_svg/faceBookIcon.svg";
import MobileFooter from "../Footer/MobileFooter";
import { loginWithEmail, signInWithGoogle } from "../../api/apiAuthentication";

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

// Custom hook for authentication logic
const useAuthentication = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+92");
  const userData = useSelector((store) => store.app.userData);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (userData) {
      // Check if user came from host modal
      const fromHost = sessionStorage.getItem("fromHost");
      if (fromHost === "true") {
        sessionStorage.removeItem("fromHost");
        navigate("/become-host");
      } else {
        navigate("/");
      }
    }
  }, [userData, navigate]);

  const handleContinue = () => {
    // Since backend is not integrated, redirect directly to become-host page
    const fromHost = sessionStorage.getItem("fromHost");
    if (fromHost === "true") {
      sessionStorage.removeItem("fromHost");
    }
    navigate("/become-host");
  };

  return {
    phoneNumber,
    setPhoneNumber,
    countryCode,
    setCountryCode,
    handleContinue,
  };
};

// LoginPage component
const LoginPage = () => {
  const auth = useAuthentication();

  return (
    <div className="w-full">
      <div
        id="header"
        className="z-50 bg-white w-full hidden 1xz:flex items-start justify-center"
      >
        <Header />
      </div>

      <div className="my-0 1xz:my-20 w-full flex items-center justify-center">
        <div
          className="bg-white w-full 1xz:w-auto transition-all border-0 1xz:border border-grey-light-50 rounded-xl duration-[0.2s] flex flex-col ease-in-out items-center justify-center z-50 shadow-lg"
          style={{ maxWidth: "568px" }}
        >
          {/* Header */}
          <div className="items-center border-b-[1px] border-grey-light-50 justify-center flex w-full h-[3.9rem] px-6">
            <span className="font-semibold text-base">Log in or sign up</span>
          </div>

          {/* Content */}
          <div className="w-full p-6 1xz:p-8">
            {/* Welcome Message */}
            <div className="mb-8">
              <h2 className="text-[22px] font-semibold">Welcome to Nest Quest</h2>
            </div>

            {/* Country Code */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country code
              </label>
              <CountryCodeDropdown value={auth.countryCode} onChange={auth.setCountryCode} />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone number
              </label>
              <input
                type="tel"
                value={auth.phoneNumber}
                onChange={(e) => auth.setPhoneNumber(e.target.value)}
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

            {/* Continue Button - Pink Gradient */}
            <button
              onClick={auth.handleContinue}
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
              {/* Google */}
              <button
                onClick={signInWithGoogle}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center hover:border-gray-400 transition-colors bg-white"
              >
                <img src={google} className="h-5 w-5" alt="Google" />
                <span className="text-sm font-medium flex-1 text-left ml-4">Continue with Google</span>
              </button>

              {/* Apple */}
              <button
                onClick={() => {
                  // Handle Apple login
                  loginWithEmail("rajat@nestquest.com", "guestuser");
                }}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center hover:border-gray-400 transition-colors bg-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.96-3.24-1.44-2.03-1.02-3.25-1.55-3.17-2.94.03-.5.32-1.01.75-1.4 1.68-1.48 3.35-2.98 5.02-4.47.64-.57 1.25-1.15 1.8-1.78.42-.48.8-1 .99-1.6.2-.62.12-1.2-.05-1.81-.2-.7-.55-1.35-1.05-1.92-.5-.57-1.1-1-1.75-1.33-.65-.33-1.35-.5-2.05-.5-.7 0-1.4.17-2.05.5-.65.33-1.25.76-1.75 1.33-.5.57-.85 1.22-1.05 1.92-.17.61-.25 1.19-.05 1.81.19.6.57 1.12.99 1.6.55.63 1.16 1.21 1.8 1.78 1.67 1.49 3.34 2.99 5.02 4.47.43.39.72.9.75 1.4.08 1.39-1.14 1.92-3.17 2.94-1.16.48-2.15.94-3.24 1.44-1.03.48-2.1.55-3.08-.4-.98-.95-.88-2.05-.4-3.08.5-1.09.96-2.08 1.44-3.24 1.02-2.03 1.55-3.25 2.94-3.17.5-.03 1.01.32 1.4.75 1.48 1.68 2.98 3.35 4.47 5.02.57.64 1.15 1.25 1.78 1.8.48.42 1 .8 1.6.99.62.2 1.2.12 1.81-.05.7-.2 1.35-.55 1.92-1.05.57-.5 1-1.1 1.33-1.75.33-.65.5-1.35.5-2.05 0-.7-.17-1.4-.5-2.05-.33-.65-.76-1.25-1.33-1.75-.57-.5-1.22-.85-1.92-1.05-.61-.17-1.19-.25-1.81-.05-.6.19-1.12.57-1.6.99-.63.55-1.21 1.16-1.78 1.8-1.49 1.67-2.99 3.34-4.47 5.02-.39.43-.9.72-1.4.75-1.39.08-1.92-1.14-2.94-3.17-.48-1.16-.94-2.15-1.44-3.24-.48-1.03-.55-2.1.4-3.08.95-.98 2.05-.88 3.08-.4 1.09.5 2.08.96 3.24 1.44 2.03 1.02 3.25 1.55 3.17 2.94-.03.5-.32 1.01-.75 1.4-1.68 1.48-3.35 2.98-5.02 4.47-.64.57-1.25 1.15-1.8 1.78-.42.48-.8 1-.99 1.6-.2.62-.12 1.2.05 1.81.2.7.55 1.35 1.05 1.92.5.57 1.1 1 1.75 1.33.65.33 1.35.5 2.05.5.7 0 1.4-.17 2.05-.5.65-.33 1.25-.76 1.75-1.33.5-.57.85-1.22 1.05-1.92.17-.61.25-1.19.05-1.81-.19-.6-.57-1.12-.99-1.6-.55-.63-1.16-1.21-1.8-1.78-1.67-1.49-3.34-2.99-5.02-4.47-.43-.39-.72-.9-.75-1.4-.08-1.39 1.14-1.92 3.17-2.94 1.16-.48 2.15-.94 3.24-1.44 1.03-.48 2.1-.55 3.08.4.98.95.88 2.05.4 3.08-.5 1.09-.96 2.08-1.44 3.24-1.02 2.03-1.55 3.25-2.94 3.17-.5.03-1.01-.32-1.4-.75-1.48-1.68-2.98-3.35-4.47-5.02-.57-.64-1.15-1.25-1.78-1.8-.48-.42-1-.8-1.6-.99-.62-.2-1.2-.12-1.81.05-.7.2-1.35.55-1.92 1.05-.57.5-1 1.1-1.33 1.75-.33.65-.5 1.35-.5 2.05 0 .7.17 1.4.5 2.05.33.65.76 1.25 1.33 1.75.57.5 1.22.85 1.92 1.05.61.17 1.19.25 1.81.05.6-.19 1.12-.57 1.6-.99.63-.55 1.21-1.16 1.78-1.8 1.49-1.67 2.99-3.34 4.47-5.02.39-.43.9-.72 1.4-.75 1.39-.08 1.92 1.14 2.94 3.17.48 1.16.94 2.15 1.44 3.24.48 1.03.55 2.1-.4 3.08z"/>
                </svg>
                <span className="text-sm font-medium flex-1 text-left ml-4">Continue with Apple</span>
              </button>

              {/* Email */}
              <button
                onClick={() => {
                  loginWithEmail("rajat@nestquest.com", "guestuser");
                }}
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

              {/* Facebook */}
              <button
                onClick={() => {
                  loginWithEmail("rajat@nestquest.com", "guestuser");
                }}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center hover:border-gray-400 transition-colors bg-white"
              >
                <img src={facebook} className="h-5 w-5" alt="Facebook" />
                <span className="text-sm font-medium flex-1 text-left ml-4">Continue with Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full 1xz:hidden">
        <MobileFooter />
      </div>
      <div className="w-full 1xz:block hidden">
        <LongFooter />
      </div>
    </div>
  );
};

export default LoginPage;