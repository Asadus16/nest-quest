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

const HostAmenities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedSafetyItems, setSelectedSafetyItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);

  // Set progress
  // Step 2 - Second segment: ~42% (33 + 9%)
  useEffect(() => {
    dispatch(setHostProgress(42));
  }, [dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/step-2");
    }, 500);
  };

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/host/photos");
    }, 500);
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

  const toggleAmenity = (id) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const toggleSafetyItem = (id) => {
    setSelectedSafetyItems((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Guest Favorites Amenities
  const guestFavorites = [
    { id: "wifi", name: "Wifi", icon: "📶" },
    { id: "tv", name: "TV", icon: "📺" },
    { id: "kitchen", name: "Kitchen", icon: "🍳" },
    { id: "washer", name: "Washer", icon: "🧺" },
    { id: "free-parking", name: "Free parking on premises", icon: "🚗" },
    { id: "paid-parking", name: "Paid parking on premises", icon: "🅿️" },
    { id: "ac", name: "Air conditioning", icon: "❄️" },
    { id: "workspace", name: "Dedicated workspace", icon: "💻" },
  ];

  // Standout Amenities
  const standoutAmenities = [
    { id: "pool", name: "Pool", icon: "🏊" },
    { id: "hot-tub", name: "Hot tub", icon: "🛁" },
    { id: "patio", name: "Patio", icon: "🌳" },
    { id: "bbq", name: "BBQ grill", icon: "🔥" },
    { id: "outdoor-dining", name: "Outdoor dining area", icon: "🍽️" },
    { id: "fire-pit", name: "Fire pit", icon: "🔥" },
    { id: "pool-table", name: "Pool table", icon: "🎱" },
    { id: "fireplace", name: "Indoor fireplace", icon: "🔥" },
    { id: "piano", name: "Piano", icon: "🎹" },
    { id: "exercise", name: "Exercise equipment", icon: "💪" },
    { id: "lake", name: "Lake access", icon: "🏞️" },
    { id: "beach", name: "Beach access", icon: "🏖️" },
    { id: "ski", name: "Ski-in/Ski-out", icon: "⛷️" },
    { id: "outdoor-shower", name: "Outdoor shower", icon: "🚿" },
  ];

  // Safety Items
  const safetyItems = [
    { id: "smoke-alarm", name: "Smoke alarm", icon: "🚨" },
    { id: "first-aid", name: "First aid kit", icon: "🩹" },
    { id: "fire-extinguisher", name: "Fire extinguisher", icon: "🧯" },
    { id: "co-alarm", name: "Carbon monoxide alarm", icon: "⚠️" },
  ];

  const AmenityCard = ({ amenity, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center p-6 border-2 rounded-lg transition-all duration-200
        ${
          isSelected
            ? "border-black bg-gray-50"
            : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
    >
      <span className="text-3xl mb-2">{amenity.icon}</span>
      <span className={`text-sm font-medium text-center ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
        {amenity.name}
      </span>
    </button>
  );

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
      <div className="w-full max-w-5xl mx-auto px-6 1xz:px-8 py-12">
        <h1 className="text-3xl 1xz:text-4xl font-semibold text-gray-900 mb-3 text-center">
          Tell guests what your place has to offer
        </h1>
        <p className="text-base text-gray-600 mb-12 text-center">
          You can add more amenities after you publish your listing.
        </p>

        {/* Guest Favorites */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            What about these guest favorites?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {guestFavorites.map((amenity) => (
              <AmenityCard
                key={amenity.id}
                amenity={amenity}
                isSelected={selectedAmenities.includes(amenity.id)}
                onClick={() => toggleAmenity(amenity.id)}
              />
            ))}
          </div>
        </div>

        {/* Standout Amenities */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Do you have any standout amenities?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {standoutAmenities.map((amenity) => (
              <AmenityCard
                key={amenity.id}
                amenity={amenity}
                isSelected={selectedAmenities.includes(amenity.id)}
                onClick={() => toggleAmenity(amenity.id)}
              />
            ))}
          </div>
        </div>

        {/* Safety Items */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Do you have any of these safety items?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {safetyItems.map((item) => (
              <AmenityCard
                key={item.id}
                amenity={item}
                isSelected={selectedSafetyItems.includes(item.id)}
                onClick={() => toggleSafetyItem(item.id)}
              />
            ))}
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

export default HostAmenities;

