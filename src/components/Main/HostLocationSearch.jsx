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

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Map component that updates center when address changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 10);
  }, [center, map]);
  return null;
};

const HostLocationSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([30.3753, 69.3451]); // Default: Pakistan center
  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Search address using Nominatim (OpenStreetMap geocoding)
  const searchAddress = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=pk`
      );
      const data = await response.json();
      setSearchResults(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error searching address:", error);
    }
  };

  // Handle address input change
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (value.length > 2) {
      searchAddress(value);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  };

  // Handle address selection from suggestions
  const handleSelectAddress = (result) => {
    setAddress(result.display_name);
    const newCenter = [parseFloat(result.lat), parseFloat(result.lon)];
    setMapCenter(newCenter);
    setMarkerPosition(newCenter);
    setShowSuggestions(false);
  };

  // Handle Enter key on address input
  const handleAddressKeyDown = (e) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      handleSelectAddress(searchResults[0]);
    }
  };

  // Set progress (step 2 of 3 segments = ~33%)
  useEffect(() => {
    dispatch(setHostProgress(17));
  }, [dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/place-type");
    }, 500);
  };

  const handleNext = () => {
    if (address.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/host/confirm-address");
      }, 500);
    }
  };

  const handleSaveAndExit = () => {
    navigate("/");
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
      <div className="w-full px-6 1xz:px-8 py-8">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-3xl 1xz:text-4xl font-semibold text-gray-900 mb-3 text-center">
            Where's your place located?
          </h1>
          <p className="text-base text-gray-600 mb-8 text-center">
            Your address is only shared with guests after they've made a reservation.
          </p>

          {/* Map Container with Overlay Input */}
          <div className=" h-[600px] relative rounded-lg overflow-hidden border border-gray-200" style={{ borderRadius: '20px' , width: '50%', margin: '0 auto' }}>
            {/* Address Input Overlay */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md px-4">
              <div className="relative">
                <div className="bg-white rounded-lg shadow-lg">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={address}
                      onChange={handleAddressChange}
                      onKeyDown={handleAddressKeyDown}
                      onFocus={() => {
                        if (searchResults.length > 0) setShowSuggestions(true);
                      }}
                      placeholder="Enter your address"
                      className="w-full pl-12 pr-4 py-4 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-base"
                    />
                  </div>
                </div>

                {/* Address Suggestions Dropdown */}
                {showSuggestions && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-[1001]">
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectAddress(result)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {result.display_name.split(",")[0]}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {result.display_name}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Map */}
            <MapContainer
              center={mapCenter}
              zoom={6}
              style={{ height: "100%", width: "100%", zIndex: 1 }}
              scrollWheelZoom={true}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapUpdater center={mapCenter} />
              {markerPosition && (
                <Marker position={markerPosition} />
              )}
            </MapContainer>
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
              disabled={!markerPosition || isLoading || isBackLoading}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors min-w-[80px] flex items-center justify-center
                ${
                  markerPosition && !isLoading && !isBackLoading
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

export default HostLocationSearch;

