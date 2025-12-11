import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import nestLogo from "../../asset/nestLogo.svg";
import MobileFooter from "../Footer/MobileFooter";

const FinishSigningUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    email: "jonvick123@yopmail.com",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    birthdate: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [marketingOptOut, setMarketingOptOut] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleBack = () => {
    navigate("/host/step-1/property-type");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      birthdate: !formData.birthdate,
      password: !formData.password,
    };
    setErrors(newErrors);

    // If no errors, proceed to login page
    if (!Object.values(newErrors).some((err) => err)) {
      navigate("/login");
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.birthdate && formData.password;

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="w-full border-b border-gray-200">
        <div className="w-full mx-auto px-6 py-4 flex items-center">
          <button
            onClick={handleBack}
            className="mr-4 w-8 h-8 flex items-center justify-center hover:rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-medium text-gray-900">Finish signing up</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-2xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Legal name */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal name</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First name on ID
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last name on ID
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Last name"
                />
              </div>
            </div>
            {errors.firstName || errors.lastName ? (
              <p className="text-sm text-red-500 mb-2">
                We don't support special characters like !$%. If your name includes some, we can help you sign up.{" "}
                <a href="#" className="underline">Learn more</a>
              </p>
            ) : null}
            <p className="text-sm text-gray-600">
              Make sure this matches the name on your government ID. If you go by another name, you can{" "}
              <a href="#" className="underline">add a preferred first name</a>.
            </p>
          </div>

          {/* Date of birth */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Date of birth</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Birthdate
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => handleInputChange("birthdate", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                    errors.birthdate ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="dd/mm/yyyy"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              {errors.birthdate && (
                <p className="text-sm text-red-500 mt-2">Select your birth date to continue.</p>
              )}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact info</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                readOnly
              />
              <p className="text-sm text-gray-600 mt-2">
                We'll email you trip confirmations and receipts.
              </p>
            </div>
          </div>

          {/* Password */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 pr-20 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-2">Password is required.</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="pt-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              By selecting Agree and continue, I agree to Nest Quest's{" "}
              <a href="#" className="underline">Terms of Service</a>,{" "}
              <a href="#" className="underline">Payments Terms of Service</a>, and{" "}
              <a href="#" className="underline">Nondiscrimination Policy</a> and acknowledge the{" "}
              <a href="#" className="underline">Privacy Policy</a>.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`
              w-full py-4 rounded-lg font-medium text-white transition-all
              ${
                isFormValid
                  ? "bg-gray-900 hover:bg-gray-800"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
          >
            Agree and continue
          </button>

          {/* Marketing Preferences */}
          <div className="pt-4 border-t border-gray-200">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingOptOut}
                onChange={(e) => setMarketingOptOut(e.target.checked)}
                className="mt-1 w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <span className="text-sm text-gray-700">
                I don't want to receive marketing messages from Nest Quest.
              </span>
            </label>
            <p className="text-sm text-gray-600 mt-2 ml-7">
              Nest Quest will send you members-only deals, inspiration, marketing emails, and push notifications. You can opt out of receiving these at any time in your account settings or directly from the marketing notification.
            </p>
          </div>
        </form>
      </div>

      {/* Mobile Footer */}
      <div className="w-full 1xz:hidden mt-12">
        <MobileFooter />
      </div>
    </div>
  );
};

export default FinishSigningUp;

