import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHostProgress } from "../../redux/AppSlice";
import nestLogo from "../../asset/nestLogo.svg";
import MobileFooter from "../Footer/MobileFooter";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SegmentedProgressBar from "../Common/SegmentedProgressBar";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom pink house marker icon
const createPinkHouseIcon = () => {
  return L.divIcon({
    className: "custom-pink-house-marker",
    html: `
      <div style="position: relative; width: 48px; height: 48px;">
        <svg width="48" height="48" viewBox="0 0 48 48" style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.2));">
          <!-- House body (pink) -->
          <path d="M24 8L10 18v22h8V30h12v10h8V18z" fill="#FF385C"/>
          <!-- White roof overlay -->
          <path d="M24 8L10 18h28z" fill="white" opacity="0.9"/>
          <!-- Door/window (white) -->
          <rect x="18" y="28" width="12" height="14" fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
  });
};

// Map updater component
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
};

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

const HostConfirmAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    country: "Pakistan - PK",
    streetAddress: "Plaza no. 36",
    apt: "",
    city: "Lahore",
    province: "Punjab",
    postalCode: "",
  });
  const [showPreciseLocation, setShowPreciseLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);
  const [mapCenter] = useState([31.5204, 74.3587]); // Lahore coordinates

  // Set progress (step 3 of 3 segments = ~33% - first segment fully filled)
  useEffect(() => {
    dispatch(setHostProgress(22));
  }, [dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/location-search");
    }, 500);
  };

  const handleNext = () => {
    if (
      formData.country &&
      formData.streetAddress &&
      formData.apt &&
      formData.city &&
      formData.province &&
      formData.postalCode
    ) {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/host/pin-location");
      }, 500);
    }
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
      <div className="w-full max-w-4xl mx-auto px-6 1xz:px-8 py-8">
        <h1 className="text-3xl 1xz:text-4xl font-semibold text-gray-900 mb-3">
          Confirm your address
        </h1>
        <p className="text-base text-gray-600 mb-8">
          Your address is only shared with guests after they've made a reservation.
        </p>

        {/* Address Form */}
        <div className="space-y-6 mb-8">
          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country / region
            </label>
            <select
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option>Pakistan - PK</option>
              <option>United States - US</option>
              <option>United Kingdom - UK</option>
            </select>
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street address
            </label>
            <input
              type="text"
              value={formData.streetAddress}
              onChange={(e) => handleInputChange("streetAddress", e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Apt, floor, bldg */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apt, floor, bldg (if applicable)
            </label>
            <input
              type="text"
              value={formData.apt}
              onChange={(e) => handleInputChange("apt", e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City / town / village
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Province */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Province / state / territory (if applicable)
            </label>
            <input
              type="text"
              value={formData.province}
              onChange={(e) => handleInputChange("province", e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postal code (if applicable)
            </label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        {/* Precise Location Toggle */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Show your home's precise location
              </h3>
              <p className="text-sm text-gray-600">
                Make it clear to guests where your place is located. We'll only share your address after they've made a reservation.{" "}
                <a href="#" className="underline">Learn more</a>
              </p>
            </div>
            <button
              onClick={() => setShowPreciseLocation(!showPreciseLocation)}
              className={`
                ml-4 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                ${showPreciseLocation ? "bg-gray-900" : "bg-gray-200"}
              `}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                  ${showPreciseLocation ? "translate-x-5" : "translate-x-0"}
                `}
              />
            </button>
          </div>
        </div>

        {/* Map with Pink House Marker */}
        <div className="w-full h-[500px] rounded-lg border border-gray-200 overflow-hidden relative">
          <MapContainer
            center={mapCenter}
            zoom={15}
            style={{ height: "100%", width: "100%", zIndex: 1 }}
            scrollWheelZoom={true}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapUpdater center={mapCenter} />
            <Marker position={mapCenter} icon={createPinkHouseIcon()} />
          </MapContainer>

          {/* Speech Bubble Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[140px] z-[1000] pointer-events-none">
            <div className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 shadow-lg relative">
              <p className="text-sm text-gray-900 whitespace-nowrap">
                We'll share your approximate location.
              </p>
              {/* Arrow pointing down */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-gray-300"></div>
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[7px] border-transparent border-t-white absolute -top-[1px] left-1/2 -translate-x-1/2"></div>
              </div>
            </div>
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
              disabled={
                !formData.country ||
                !formData.streetAddress ||
                !formData.apt ||
                !formData.city ||
                !formData.province ||
                !formData.postalCode ||
                isLoading ||
                isBackLoading
              }
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors min-w-[80px] flex items-center justify-center
                ${
                  formData.country &&
                  formData.streetAddress &&
                  formData.apt &&
                  formData.city &&
                  formData.province &&
                  formData.postalCode &&
                  !isLoading &&
                  !isBackLoading
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

export default HostConfirmAddress;

