import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import cross from "../../asset/Icons_svg/cross.svg";
import google from "../../asset/Icons_svg/Google.svg";
import person from "../../asset/Icons_svg/Person.svg";
import { useDispatch, useSelector } from "react-redux";
import { setShowLogin, setUserData } from "../../redux/AppSlice";
import { signInWithGoogle } from "../../api/apiAuthentication";
import {
  guestSignup,
  guestSigninWithEmail,
  guestSigninWithPhone,
  guestRequestOtp,
  guestVerifyOtp,
} from "../../api/apiGuestAuth";

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
      setTimeout(() => setShouldRender(false), 0);
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
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [ref, handler]);
};

// Input field component
const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  isActive,
  onFocus,
  onBlur,
  error,
  className = "",
  disabled = false,
}) => (
  <div className="relative">
    <label
      htmlFor={id}
      className={`w-full absolute text-grey font-light left-2 transition-all duration-[0.1s] ${
        isActive || value ? "text-xs top-1" : "top-1/2 -translate-y-3"
      } ${disabled ? "opacity-50" : ""}`}
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      className={`w-full p-2 focus:border-2 flex items-center border-grey-light-50 h-14 focus:rounded-lg focus:border-black outline-none ${className} ${
        error ? "border-red-500" : ""
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    />
    {error && (
      <p className="text-red-500 text-xs mt-1 px-2">{error}</p>
    )}
  </div>
);

// Signup Form Component
const SignupForm = ({ onSubmit, onSwitchToLogin, isLoading, error }) => {
  const [showLine, setShowLine] = useState(true);
  const [activeInput, setActiveInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user types
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      await onSubmit(formData);
    } catch (err) {
      if (err.errors) {
        setFieldErrors(err.errors);
      }
    }
  };

  const getFieldError = (field) => {
    if (fieldErrors[field]) {
      return Array.isArray(fieldErrors[field]) 
        ? fieldErrors[field][0] 
        : fieldErrors[field];
    }
    return null;
  };

  return (
    <div className="w-full p-6">
      <div className="mt-2 mb-6 text-2xl font-medium">Welcome to Nest Quest</div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="pt-4 space-y-4">
          <InputField
            id="name"
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            isActive={activeInput === "name"}
            onFocus={() => {
              setActiveInput("name");
            }}
            onBlur={() => {
              setActiveInput("");
            }}
            error={getFieldError("name")}
            className="rounded-lg border"
          />
          
          <div
            className={`rounded-lg ${showLine ? "border" : ""} ${
              activeInput === "email" ? "border-b border-l border-r" : ""
            } ${
              activeInput === "password" ? "border-t border-l border-r" : ""
            } border-grey-light`}
          >
            <InputField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              isActive={activeInput === "email"}
              onFocus={() => {
                setShowLine(false);
                setActiveInput("email");
              }}
              onBlur={() => {
                setShowLine(true);
                setActiveInput("");
              }}
              error={getFieldError("email")}
            />
            <div
              className={`w-full h-[1px] ${
                showLine ? "bg-grey-light" : "bg-white"
              }`}
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              isActive={activeInput === "password"}
              onFocus={() => {
                setShowLine(false);
                setActiveInput("password");
              }}
              onBlur={() => {
                setShowLine(true);
                setActiveInput("");
              }}
              error={getFieldError("password")}
            />
          </div>

          <InputField
            id="password_confirmation"
            label="Confirm Password"
            type="password"
            value={formData.password_confirmation}
            onChange={(e) => handleChange("password_confirmation", e.target.value)}
            isActive={activeInput === "password_confirmation"}
            onFocus={() => {
              setActiveInput("password_confirmation");
            }}
            onBlur={() => {
              setActiveInput("");
            }}
            error={getFieldError("password_confirmation")}
            className="rounded-lg border"
          />

          <InputField
            id="phone"
            label="Phone (Optional)"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            isActive={activeInput === "phone"}
            onFocus={() => {
              setActiveInput("phone");
            }}
            onBlur={() => {
              setActiveInput("");
            }}
            error={getFieldError("phone")}
            className="rounded-lg border"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 mt-4 rounded-lg text-white bg-black hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating account..." : "Sign up"}
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-black font-semibold underline"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = ({ onSubmit, onSwitchToSignup, onRequestOtp, isLoading, error }) => {
  const [showLine, setShowLine] = useState(true);
  const [activeInput, setActiveInput] = useState("");
  const [loginMethod, setLoginMethod] = useState("email"); // "email", "phone", "otp"
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    otp: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(null); // For dev display

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      if (loginMethod === "otp" && !otpSent) {
        // Step 1: Request OTP
        const response = await onRequestOtp(formData.phone);
        setOtpSent(true);
        if (response.data?.code) {
          setOtpCode(response.data.code); // Dev only
        }
      } else if (loginMethod === "otp" && otpSent) {
        // Step 2: Verify OTP
        await onSubmit({ phone: formData.phone, otp: formData.otp }, "otp");
      } else if (loginMethod === "email") {
        await onSubmit({ email: formData.email, password: formData.password }, "email");
      } else if (loginMethod === "phone") {
        await onSubmit({ phone: formData.phone, password: formData.password }, "phone");
      }
    } catch (err) {
      if (err.errors) {
        setFieldErrors(err.errors);
      }
    }
  };

  const getFieldError = (field) => {
    if (fieldErrors[field]) {
      return Array.isArray(fieldErrors[field]) 
        ? fieldErrors[field][0] 
        : fieldErrors[field];
    }
    return null;
  };

  const switchMethod = (method) => {
    setLoginMethod(method);
    setOtpSent(false);
    setOtpCode(null);
    setFormData({ email: "", phone: "", password: "", otp: "" });
    setFieldErrors({});
  };

  return (
    <div className="w-full p-6">
      <div className="mt-2 mb-6 text-2xl font-medium">Welcome back</div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      {otpCode && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
          OTP Code (Dev): {otpCode}
        </div>
      )}
      
      {/* Login Method Tabs */}
      <div className="flex mb-4 border-b">
        <button
          type="button"
          onClick={() => switchMethod("email")}
          className={`flex-1 py-2 text-sm font-medium ${
            loginMethod === "email"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => switchMethod("phone")}
          className={`flex-1 py-2 text-sm font-medium ${
            loginMethod === "phone"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Phone
        </button>
        <button
          type="button"
          onClick={() => switchMethod("otp")}
          className={`flex-1 py-2 text-sm font-medium ${
            loginMethod === "otp"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          OTP
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="pt-4">
          {loginMethod === "email" && (
            <div
              className={`rounded-lg ${showLine ? "border" : ""} ${
                activeInput === "email" ? "border-b border-l border-r" : ""
              } ${
                activeInput === "password" ? "border-t border-l border-r" : ""
              } border-grey-light`}
            >
              <InputField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                isActive={activeInput === "email"}
                onFocus={() => {
                  setShowLine(false);
                  setActiveInput("email");
                }}
                onBlur={() => {
                  setShowLine(true);
                  setActiveInput("");
                }}
                error={getFieldError("email")}
              />
              <div
                className={`w-full h-[1px] ${
                  showLine ? "bg-grey-light" : "bg-white"
                }`}
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                isActive={activeInput === "password"}
                onFocus={() => {
                  setShowLine(false);
                  setActiveInput("password");
                }}
                onBlur={() => {
                  setShowLine(true);
                  setActiveInput("");
                }}
                error={getFieldError("password")}
              />
            </div>
          )}

          {loginMethod === "phone" && (
            <div
              className={`rounded-lg ${showLine ? "border" : ""} ${
                activeInput === "phone" ? "border-b border-l border-r" : ""
              } ${
                activeInput === "password" ? "border-t border-l border-r" : ""
              } border-grey-light`}
            >
              <InputField
                id="phone"
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                isActive={activeInput === "phone"}
                onFocus={() => {
                  setShowLine(false);
                  setActiveInput("phone");
                }}
                onBlur={() => {
                  setShowLine(true);
                  setActiveInput("");
                }}
                error={getFieldError("phone")}
              />
              <div
                className={`w-full h-[1px] ${
                  showLine ? "bg-grey-light" : "bg-white"
                }`}
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                isActive={activeInput === "password"}
                onFocus={() => {
                  setShowLine(false);
                  setActiveInput("password");
                }}
                onBlur={() => {
                  setShowLine(true);
                  setActiveInput("");
                }}
                error={getFieldError("password")}
              />
            </div>
          )}

          {loginMethod === "otp" && (
            <div className="space-y-4">
              <InputField
                id="phone"
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                isActive={activeInput === "phone"}
                onFocus={() => setActiveInput("phone")}
                onBlur={() => setActiveInput("")}
                error={getFieldError("phone")}
                className="rounded-lg border"
                disabled={otpSent}
              />
              {otpSent && (
                <InputField
                  id="otp"
                  label="OTP Code"
                  type="text"
                  value={formData.otp}
                  onChange={(e) => handleChange("otp", e.target.value.replace(/\D/g, "").slice(0, 4))}
                  isActive={activeInput === "otp"}
                  onFocus={() => setActiveInput("otp")}
                  onBlur={() => setActiveInput("")}
                  error={getFieldError("otp")}
                  className="rounded-lg border"
                />
              )}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 mt-4 rounded-lg text-white bg-black hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Loading..."
            : loginMethod === "otp" && !otpSent
            ? "Send OTP"
            : loginMethod === "otp" && otpSent
            ? "Verify OTP"
            : "Log in"}
        </button>
      </form>
      <div className="py-5 flex items-center">
        <div className="h-[1px] w-full bg-grey-light" />
        <span className="w-20 text-center text-xs">or</span>
        <div className="h-[1px] w-full bg-grey-light" />
      </div>
      <button
        onClick={signInWithGoogle}
        className="w-full cursor-pointer h-14 border px-5 py-5 border-black rounded-lg flex items-center justify-between"
      >
        <img src={google} className="h-5 w-5" alt="" />
        <span className="text-sm font-medium">Continue with Google</span>
        <div className="px-2" />
      </button>
      <div className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-black font-semibold underline"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

const AuthenticationModal = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const isOpen = useSelector((store) => store.app.showLogin);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { visible, shouldRender } = useModalTransition(isOpen);
  useScrollLock(isOpen);
  useClickOutside(ref, () => {
    dispatch(setShowLogin(false));
    setIsSignup(false);
    setError(null);
  });

  const handleSignup = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await guestSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        phone: formData.phone || null,
      });

      if (response.data && response.data.user) {
        dispatch(setUserData(response.data.user));
        dispatch(setShowLogin(false));
        setIsSignup(false);
        setError(null);
        // Reload to update UI
        window.location.reload();
      }
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (credentials, method) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (method === "email") {
        response = await guestSigninWithEmail(credentials.email, credentials.password);
      } else if (method === "phone") {
        response = await guestSigninWithPhone(credentials.phone, credentials.password);
      } else if (method === "otp") {
        response = await guestVerifyOtp(credentials.phone, credentials.otp);
      }

      if (response.data && response.data.user) {
        dispatch(setUserData(response.data.user));
        dispatch(setShowLogin(false));
        setError(null);
        // Reload to update UI
        window.location.reload();
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOtp = async (phone) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await guestRequestOtp(phone);
      return response;
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  if (!shouldRender) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={ref}
        className={`bg-white ${
          visible
            ? "1xz:translate-y-0 bottom-0 1xz:bottom-auto opacity-100"
            : "1xz:translate-y-16 translate-y-full opacity-0"
        } transition-all fixed 1xz:w-[35.5rem] w-full rounded-xl 1xz:duration-[0.2s] duration-300 flex flex-col ease-out items-center justify-center shadow-md z-50`}
      >
        <div className="items-center border-b-[1px] border-grey-light-50 justify-between flex 1xz:w-[35.5rem] w-full px-6 h-[3.9rem]">
          <button
            onClick={() => {
              dispatch(setShowLogin(false));
              setIsSignup(false);
              setError(null);
            }}
            className="w-6 h-6 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-grey-dim transition-none"
          >
            <img src={cross} className="h-4 w-4" alt="" />
          </button>
          <span className="font-semibold text-base leading-none select-none">
            {isSignup ? "Sign up" : "Log in"}
          </span>
          <div className="w-6 h-6" />
        </div>
        {isSignup ? (
          <SignupForm
            onSubmit={handleSignup}
            onSwitchToLogin={() => {
              setIsSignup(false);
              setError(null);
            }}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <LoginForm
            onSubmit={handleLogin}
            onSwitchToSignup={() => {
              setIsSignup(true);
              setError(null);
            }}
            onRequestOtp={handleRequestOtp}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </div>,
    document.body
  );
};

export default AuthenticationModal;
