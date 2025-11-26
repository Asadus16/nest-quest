import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilterData } from "../../redux/AppSlice";

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
      setTimeout(() => setShouldRender(false), 200);
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

// Filter Button Component with Icon
const FilterButton = ({ icon, label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-full border transition-all min-w-[90px] ${
      isSelected
        ? "border-black bg-gray-50"
        : "border-gray-300 hover:border-black bg-white"
    }`}
  >
    {typeof icon === 'string' ? (
      <span className="text-2xl">{icon}</span>
    ) : (
      <div className="w-6 h-6">{icon}</div>
    )}
    <span className="text-xs font-medium text-center whitespace-nowrap">
      {label}
    </span>
  </button>
);

// Pill Button Component for Amenities
const PillButton = ({ icon, label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 rounded-full border transition-all ${
      isSelected
        ? "border-black bg-gray-50"
        : "border-gray-300 hover:border-black bg-white"
    }`}
  >
    {typeof icon === 'string' ? (
      <span className="text-lg">{icon}</span>
    ) : (
      <div className="w-5 h-5 flex-shrink-0">{icon}</div>
    )}
    <span className="text-sm font-medium whitespace-nowrap">{label}</span>
  </button>
);

// Checkbox Filter Component
const CheckboxFilter = ({ label, isChecked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer py-2 hover:bg-gray-50 rounded-lg px-2 -mx-2">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
    />
    <span className="text-sm">{label}</span>
  </label>
);

// Counter Component for Rooms and Beds
const Counter = ({ label, value, onDecrease, onIncrease }) => (
  <div className="flex items-center justify-between py-4">
    <span className="text-base">{label}</span>
    <div className="flex items-center gap-4">
      <button
        onClick={onDecrease}
        disabled={value === 0}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-300 transition-all"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M0 6h12" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </button>
      <span className="text-base font-normal w-8 text-center">
        {value === 0 ? "Any" : value}
      </span>
      <button
        onClick={onIncrease}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-all"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </button>
    </div>
  </div>
);

// Collapsible Section Component
const CollapsibleSection = ({ title, children, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between pb-4"
      >
        <h3 className="text-[22px] font-medium">{title}</h3>
        <svg
          className={`w-4 h-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isExpanded && <div className="pt-2">{children}</div>}
    </div>
  );
};

// Price Range Slider with Black Sliders
const PriceRangeSlider = ({ minPrice, maxPrice, onMinChange, onMaxChange }) => {
  return (
    <div className="pt-2">
      <p className="text-sm text-gray-600 mb-6">Trip price, includes all fees</p>
      
      {/* Dual Range Slider */}
      <div className="mb-6 px-1">
        <div className="relative h-1 bg-gray-300 rounded-full">
          {/* Active range bar */}
          <div
            className="absolute h-1 bg-black rounded-full"
            style={{
              left: `${(minPrice / 1000) * 100}%`,
              right: `${100 - (maxPrice / 1000) * 100}%`,
            }}
          />
          
          {/* Minimum slider */}
          <input
            type="range"
            min="0"
            max="1000"
            value={minPrice}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value < maxPrice) {
                onMinChange(value);
              }
            }}
            className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-black [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
            style={{ zIndex: minPrice > maxPrice - 100 ? 5 : 3 }}
          />
          
          {/* Maximum slider */}
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value > minPrice) {
                onMaxChange(value);
              }
            }}
            className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-black [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
            style={{ zIndex: 4 }}
          />
        </div>
      </div>

      {/* Price Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-600 mb-2 block">Minimum</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900 text-sm">AED</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value < maxPrice) {
                  onMinChange(value);
                }
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-sm"
              placeholder="0"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-600 mb-2 block">Maximum</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900 text-sm">AED</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value > minPrice) {
                  onMaxChange(value);
                }
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-sm"
              placeholder="1000+"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Large Feature Card Component
const FeatureCard = ({ icon, title, description, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-full border text-left transition-all ${
      isSelected
        ? "border-black bg-gray-50"
        : "border-gray-300 hover:border-black bg-white"
    }`}
  >
    <div className="flex items-start gap-3">
      {typeof icon === 'string' ? (
        <span className="text-2xl flex-shrink-0">{icon}</span>
      ) : (
        <div className="w-6 h-6 flex-shrink-0">{icon}</div>
      )}
      <div>
        <p className="font-semibold mb-1 text-base">{title}</p>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
    </div>
  </button>
);

const FiltersModal = ({ isOpen, onClose }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const filterData = useSelector((store) => store.app.filterData || {});

  const { visible, shouldRender } = useModalTransition(isOpen);
  useScrollLock(isOpen);
  useClickOutside(ref, onClose);

  // State for all filters
  const [filters, setFilters] = useState({
    essentials: [],
    features: [],
    location: [],
    safety: [],
    bookingOptions: [],
    standoutStays: [],
    propertyType: [],
    amenities: [],
    accessibility: [],
    hostLanguage: [],
    priceRange: { min: 51, max: 560 },
    rooms: { bedrooms: 0, beds: 0, bathrooms: 0 },
  });

  const [showAllAmenities, setShowAllAmenities] = useState(false);

  useEffect(() => {
    if (filterData) {
      setFilters({ ...filters, ...filterData });
    }
  }, []);

  const toggleFilter = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const handleCounterChange = (category, field, delta) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: Math.max(0, (prev[category][field] || 0) + delta),
      },
    }));
  };

  const handleClearAll = () => {
    setFilters({
      essentials: [],
      features: [],
      location: [],
      safety: [],
      bookingOptions: [],
      standoutStays: [],
      propertyType: [],
      amenities: [],
      accessibility: [],
      hostLanguage: [],
      priceRange: { min: 0, max: 1000 },
      rooms: { bedrooms: 0, beds: 0, bathrooms: 0 },
    });
  };

  const handleApplyFilters = () => {
    dispatch(setFilterData(filters));
    onClose();
  };

  const countSelectedFilters = () => {
    let count = 0;
    Object.values(filters).forEach((value) => {
      if (Array.isArray(value)) {
        count += value.length;
      } else if (typeof value === "object" && value !== null) {
        if (value.min > 0 || value.max < 1000) count++;
        Object.values(value).forEach((v) => {
          if (typeof v === "number" && v > 0) count++;
        });
      }
    });
    return count;
  };

  const basicAmenities = [
    { 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v10M8.5 14c-.66 0-1.2.54-1.2 1.2v5.6c0 .66.54 1.2 1.2 1.2h7c.66 0 1.2-.54 1.2-1.2v-5.6c0-.66-.54-1.2-1.2-1.2M6 14h12"/>
      </svg>, 
      label: "Air conditioning", 
      key: "airconditioning" 
    },
    { 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="10" width="18" height="10" rx="2"/>
        <path d="M7 14h10M9 17h6"/>
      </svg>, 
      label: "Hot tub", 
      key: "hottub" 
    },
    { 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>
      </svg>, 
      label: "Wifi", 
      key: "wifi" 
    },
    { 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 5h18M3 10h18M3 15h18M3 20h18"/>
      </svg>, 
      label: "Kitchen", 
      key: "kitchen" 
    },
    { 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>, 
      label: "Dryer", 
      key: "dryer" 
    },
    { 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12h4l3 9 4-18 3 9h4"/>
      </svg>, 
      label: "Pool", 
      key: "pool" 
    },
  ];

  const allAmenities = [
    ...basicAmenities,
    { 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 7l-5 5-5-5"/>
      </svg>, 
      label: "Heating", 
      key: "heating" 
    },
    { 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 3v18"/>
      </svg>, 
      label: "Dedicated workspace", 
      key: "dedicatedworkspace" 
    },
    { 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="15" rx="2"/>
        <path d="M17 2l-5 5-5-5"/>
      </svg>, 
      label: "TV", 
      key: "tv" 
    },
    { 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v8M8 6l4-4 4 4M12 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
      </svg>, 
      label: "Hair dryer", 
      key: "hairdryer" 
    },
    { 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>, 
      label: "Iron", 
      key: "iron" 
    },
  ];

  if (!shouldRender) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-[60] transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={ref}
        className={`bg-white w-full md:w-[650px] md:max-w-[90vw] max-h-[90vh] rounded-t-3xl md:rounded-3xl flex flex-col transition-transform duration-300 ${
          visible
            ? "translate-y-0"
            : "translate-y-full md:translate-y-0 md:scale-95"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <h2 className="text-base font-semibold absolute left-1/2 -translate-x-1/2">Filters</h2>
          <div className="w-8" /> {/* Spacer for centering */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6">
          {/* Recommended for you */}
          <div className="py-6 border-b border-gray-200">
            <h3 className="text-[22px] font-semibold mb-4">Recommended for you</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <FilterButton
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
                  </svg>
                }
                label="Instant Book"
                isSelected={filters.bookingOptions.includes("instantBook")}
                onClick={() => toggleFilter("bookingOptions", "instantBook")}
              />
              <FilterButton
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                }
                label="Self check-in"
                isSelected={filters.bookingOptions.includes("selfCheckIn")}
                onClick={() => toggleFilter("bookingOptions", "selfCheckIn")}
              />
              <FilterButton
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M3 9h18M9 21V9"/>
                  </svg>
                }
                label="Washer"
                isSelected={filters.essentials.includes("washer")}
                onClick={() => toggleFilter("essentials", "washer")}
              />
              <FilterButton
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9 12h6M12 9v6"/>
                  </svg>
                }
                label="Free parking"
                isSelected={filters.features.includes("freeParking")}
                onClick={() => toggleFilter("features", "freeParking")}
              />
            </div>
          </div>

          {/* Type of place */}
          <div className="py-6 border-b border-gray-200">
            <h3 className="text-[22px] font-semibold mb-4">Type of place</h3>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    propertyType: [],
                  }));
                }}
                className={`px-6 py-3 rounded-full border text-sm font-semibold transition-all ${
                  filters.propertyType.length === 0
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black bg-white"
                }`}
              >
                Any type
              </button>
              <button
                onClick={() => toggleFilter("propertyType", "room")}
                className={`px-6 py-3 rounded-full border text-sm font-semibold transition-all ${
                  filters.propertyType.includes("room")
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black bg-white"
                }`}
              >
                Room
              </button>
              <button
                onClick={() => toggleFilter("propertyType", "entireHome")}
                className={`px-6 py-3 rounded-full border text-sm font-semibold transition-all ${
                  filters.propertyType.includes("entireHome")
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black bg-white"
                }`}
              >
                Entire home
              </button>
            </div>
          </div>

          {/* Price range */}
          <CollapsibleSection title="Price range" defaultExpanded={true}>
            <PriceRangeSlider
              minPrice={filters.priceRange.min}
              maxPrice={filters.priceRange.max}
              onMinChange={(min) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: { ...prev.priceRange, min },
                }))
              }
              onMaxChange={(max) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: { ...prev.priceRange, max },
                }))
              }
            />
          </CollapsibleSection>

          {/* Rooms and beds */}
          <CollapsibleSection title="Rooms and beds">
            <div className="divide-y divide-gray-200">
              <Counter
                label="Bedrooms"
                value={filters.rooms.bedrooms}
                onDecrease={() => handleCounterChange("rooms", "bedrooms", -1)}
                onIncrease={() => handleCounterChange("rooms", "bedrooms", 1)}
              />
              <Counter
                label="Beds"
                value={filters.rooms.beds}
                onDecrease={() => handleCounterChange("rooms", "beds", -1)}
                onIncrease={() => handleCounterChange("rooms", "beds", 1)}
              />
              <Counter
                label="Bathrooms"
                value={filters.rooms.bathrooms}
                onDecrease={() => handleCounterChange("rooms", "bathrooms", -1)}
                onIncrease={() => handleCounterChange("rooms", "bathrooms", 1)}
              />
            </div>
          </CollapsibleSection>

          {/* Amenities */}
          <CollapsibleSection title="Amenities">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(showAllAmenities ? allAmenities : basicAmenities).map((amenity) => (
                <PillButton
                  key={amenity.key}
                  icon={amenity.icon}
                  label={amenity.label}
                  isSelected={
                    filters.amenities.includes(amenity.key) ||
                    filters.essentials.includes(amenity.key)
                  }
                  onClick={() => {
                    if (["heating", "dedicatedworkspace", "tv", "hairdryer", "iron"].includes(amenity.key)) {
                      toggleFilter("essentials", amenity.key);
                    } else {
                      toggleFilter("amenities", amenity.key);
                    }
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => setShowAllAmenities(!showAllAmenities)}
              className="flex items-center gap-2 mt-4 text-sm font-semibold underline hover:no-underline"
            >
              Show {showAllAmenities ? "less" : "more"}
              <svg
                className={`w-3 h-3 transition-transform ${
                  showAllAmenities ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </CollapsibleSection>

          {/* Essentials */}
          <CollapsibleSection title="Essentials">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>}
                label="Washer"
                isSelected={filters.essentials.includes("washer")}
                onClick={() => toggleFilter("essentials", "washer")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 7l-5 5-5-5"/>
                </svg>}
                label="Heating"
                isSelected={filters.essentials.includes("heating")}
                onClick={() => toggleFilter("essentials", "heating")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 3v18"/>
                </svg>}
                label="Dedicated workspace"
                isSelected={filters.essentials.includes("dedicatedworkspace")}
                onClick={() => toggleFilter("essentials", "dedicatedworkspace")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="15" rx="2"/>
                  <path d="M17 2l-5 5-5-5"/>
                </svg>}
                label="TV"
                isSelected={filters.essentials.includes("tv")}
                onClick={() => toggleFilter("essentials", "tv")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v8M8 6l4-4 4 4M12 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg>}
                label="Hair dryer"
                isSelected={filters.essentials.includes("hairdryer")}
                onClick={() => toggleFilter("essentials", "hairdryer")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>}
                label="Iron"
                isSelected={filters.essentials.includes("iron")}
                onClick={() => toggleFilter("essentials", "iron")}
              />
            </div>
          </CollapsibleSection>

          {/* Features */}
          <CollapsibleSection title="Features">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9 12h6M12 9v6"/>
                </svg>}
                label="Free parking"
                isSelected={filters.features.includes("freeParking")}
                onClick={() => toggleFilter("features", "freeParking")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/>
                  <line x1="10" y1="1" x2="10" y2="4"/>
                  <line x1="14" y1="1" x2="14" y2="4"/>
                </svg>}
                label="EV charger"
                isSelected={filters.features.includes("evCharger")}
                onClick={() => toggleFilter("features", "evCharger")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="8" width="18" height="13" rx="2"/>
                  <path d="M21 12H3"/>
                </svg>}
                label="Crib"
                isSelected={filters.features.includes("crib")}
                onClick={() => toggleFilter("features", "crib")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 21V7M8 21V7"/>
                </svg>}
                label="King bed"
                isSelected={filters.features.includes("kingBed")}
                onClick={() => toggleFilter("features", "kingBed")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6.5 6.5h11v11h-11z"/>
                  <path d="M3 14h18M10 3v18"/>
                </svg>}
                label="Gym"
                isSelected={filters.features.includes("gym")}
                onClick={() => toggleFilter("features", "gym")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="11" width="14" height="10" rx="2"/>
                  <path d="M12 11V8M9 8h6"/>
                </svg>}
                label="BBQ grill"
                isSelected={filters.features.includes("bbqGrill")}
                onClick={() => toggleFilter("features", "bbqGrill")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <circle cx="7" cy="13" r="1.5"/>
                  <circle cx="13" cy="13" r="1.5"/>
                </svg>}
                label="Breakfast"
                isSelected={filters.features.includes("breakfast")}
                onClick={() => toggleFilter("features", "breakfast")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 22h20M5 22V8M19 22V8M12 2L5 8h14l-7-6z"/>
                  <path d="M10 12h4v6h-4z"/>
                </svg>}
                label="Indoor fireplace"
                isSelected={filters.features.includes("indoorFireplace")}
                onClick={() => toggleFilter("features", "indoorFireplace")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 16V8a6 6 0 0 0-12 0v8"/>
                  <path d="M2 16h20v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4z"/>
                  <line x1="12" y1="2" x2="12" y2="6"/>
                </svg>}
                label="Smoking allowed"
                isSelected={filters.features.includes("smokingAllowed")}
                onClick={() => toggleFilter("features", "smokingAllowed")}
              />
            </div>
          </CollapsibleSection>

          {/* Location */}
          <CollapsibleSection title="Location">
            <div className="grid grid-cols-2 gap-3">
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12h4l3 9 4-18 3 9h4"/>
                </svg>}
                label="Waterfront"
                isSelected={filters.location.includes("waterfront")}
                onClick={() => toggleFilter("location", "waterfront")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 22L14 10M22 22L10 10"/>
                  <path d="M6 18l6-6 6 6"/>
                </svg>}
                label="Ski-in/ski-out"
                isSelected={filters.location.includes("skiInOut")}
                onClick={() => toggleFilter("location", "skiInOut")}
              />
            </div>
          </CollapsibleSection>

          {/* Safety */}
          <CollapsibleSection title="Safety">
            <div className="grid grid-cols-2 gap-3">
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>}
                label="Smoke alarm"
                isSelected={filters.safety.includes("smokeAlarm")}
                onClick={() => toggleFilter("safety", "smokeAlarm")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M12 8v4M12 16h.01"/>
                </svg>}
                label="Carbon monoxide alarm"
                isSelected={filters.safety.includes("carbonMonoxideAlarm")}
                onClick={() => toggleFilter("safety", "carbonMonoxideAlarm")}
              />
            </div>
          </CollapsibleSection>

          {/* Booking options */}
          <CollapsibleSection title="Booking options">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
                </svg>}
                label="Instant Book"
                isSelected={filters.bookingOptions.includes("instantBook")}
                onClick={() => toggleFilter("bookingOptions", "instantBook")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>}
                label="Self check-in"
                isSelected={filters.bookingOptions.includes("selfCheckIn")}
                onClick={() => toggleFilter("bookingOptions", "selfCheckIn")}
              />
              <PillButton
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 6v6l4 2"/>
                  <circle cx="8" cy="18" r="2"/>
                  <circle cx="18" cy="18" r="2"/>
                  <path d="M10 18H3M20 18h-2M7 18a6 6 0 1 0 12 0"/>
                </svg>}
                label="Allows pets"
                isSelected={filters.bookingOptions.includes("allowsPets")}
                onClick={() => toggleFilter("bookingOptions", "allowsPets")}
              />
            </div>
          </CollapsibleSection>

          {/* Standout stays */}
          <CollapsibleSection title="Standout stays">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureCard
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>}
                title="Guest favorite"
                description="The most loved homes on Airbnb"
                isSelected={filters.standoutStays.includes("guestFavorite")}
                onClick={() => toggleFilter("standoutStays", "guestFavorite")}
              />
              <FeatureCard
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                  <path d="M16 16l-4-4-4 4"/>
                </svg>}
                title="Luxe"
                description="Luxury homes with elevated design"
                isSelected={filters.standoutStays.includes("luxe")}
                onClick={() => toggleFilter("standoutStays", "luxe")}
              />
            </div>
          </CollapsibleSection>

          {/* Property type */}
          <CollapsibleSection title="Property type">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { 
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>, 
                  label: "House" 
                },
                { 
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <line x1="9" y1="3" x2="9" y2="21"/>
                    <line x1="15" y1="3" x2="15" y2="21"/>
                  </svg>, 
                  label: "Apartment" 
                },
                { 
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <path d="M9 22V12h6v10"/>
                  </svg>, 
                  label: "Guesthouse" 
                },
                { 
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 21V7M8 21V7M2 10h20"/>
                  </svg>, 
                  label: "Hotel" 
                },
              ].map((type) => (
                <PillButton
                  key={type.label}
                  icon={type.icon}
                  label={type.label}
                  isSelected={filters.propertyType.includes(type.label.toLowerCase())}
                  onClick={() => toggleFilter("propertyType", type.label.toLowerCase())}
                />
              ))}
            </div>
          </CollapsibleSection>

          {/* Accessibility features */}
          <CollapsibleSection title="Accessibility features">
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-semibold mb-3">Guest entrance and parking</h4>
                <div className="space-y-1">
                  <CheckboxFilter
                    label="Step-free access"
                    isChecked={filters.accessibility.includes("stepFreeAccess")}
                    onChange={() => toggleFilter("accessibility", "stepFreeAccess")}
                  />
                  <CheckboxFilter
                    label="Disabled parking spot"
                    isChecked={filters.accessibility.includes("disabledParking")}
                    onChange={() => toggleFilter("accessibility", "disabledParking")}
                  />
                  <CheckboxFilter
                    label="Guest entrance wider than 32 inches"
                    isChecked={filters.accessibility.includes("wideEntrance")}
                    onChange={() => toggleFilter("accessibility", "wideEntrance")}
                  />
                </div>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-3">Bedroom</h4>
                <div className="space-y-1">
                  <CheckboxFilter
                    label="Step-free bedroom access"
                    isChecked={filters.accessibility.includes("stepFreeBedroom")}
                    onChange={() => toggleFilter("accessibility", "stepFreeBedroom")}
                  />
                  <CheckboxFilter
                    label="Bedroom entrance wider than 32 inches"
                    isChecked={filters.accessibility.includes("wideBedroomEntrance")}
                    onChange={() => toggleFilter("accessibility", "wideBedroomEntrance")}
                  />
                </div>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-3">Bathroom</h4>
                <div className="space-y-1">
                  <CheckboxFilter
                    label="Step-free bathroom access"
                    isChecked={filters.accessibility.includes("stepFreeBathroom")}
                    onChange={() => toggleFilter("accessibility", "stepFreeBathroom")}
                  />
                  <CheckboxFilter
                    label="Bathroom entrance wider than 32 inches"
                    isChecked={filters.accessibility.includes("wideBathroomEntrance")}
                    onChange={() => toggleFilter("accessibility", "wideBathroomEntrance")}
                  />
                  <CheckboxFilter
                    label="Toilet grab bar"
                    isChecked={filters.accessibility.includes("toiletGrabBar")}
                    onChange={() => toggleFilter("accessibility", "toiletGrabBar")}
                  />
                  <CheckboxFilter
                    label="Shower grab bar"
                    isChecked={filters.accessibility.includes("showerGrabBar")}
                    onChange={() => toggleFilter("accessibility", "showerGrabBar")}
                  />
                  <CheckboxFilter
                    label="Step-free shower"
                    isChecked={filters.accessibility.includes("stepFreeShower")}
                    onChange={() => toggleFilter("accessibility", "stepFreeShower")}
                  />
                  <CheckboxFilter
                    label="Shower or bath chair"
                    isChecked={filters.accessibility.includes("showerChair")}
                    onChange={() => toggleFilter("accessibility", "showerChair")}
                  />
                </div>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-3">Adaptive equipment</h4>
                <div className="space-y-1">
                  <CheckboxFilter
                    label="Ceiling or mobile hoist"
                    isChecked={filters.accessibility.includes("hoist")}
                    onChange={() => toggleFilter("accessibility", "hoist")}
                  />
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Host language */}
          <CollapsibleSection title="Host language">
            <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
              {[
                "Chinese (Simplified)", "English", "French", "German",
                "Italian", "Japanese", "Korean", "Portuguese",
                "Russian", "Spanish", "Arabic", "Catalan",
                "Croatian", "Czech", "Danish", "Dutch",
                "Finnish", "Greek", "Hebrew", "Hindi",
                "Hungarian", "Icelandic", "Indonesian", "Malay",
                "Norwegian", "Polish", "Swedish", "Thai",
                "Turkish", "Afrikaans", "Albanian", "Armenian",
                "Azerbaijani", "Basque", "Georgian", "Gujarati",
                "Haitian Creole", "Irish", "Kannada", "Khmer",
                "Kyrgyz", "Lao", "Latvian", "Lithuanian",
                "Macedonian", "Maltese", "Persian", "Punjabi",
                "Romanian", "Serbian", "Slovakian", "Slovenian",
                "Swahili", "Tagalog", "Tamil", "Telugu",
                "Ukrainian", "Urdu", "Vietnamese", "Xhosa",
              ].map((language) => (
                <CheckboxFilter
                  key={language}
                  label={language}
                  isChecked={filters.hostLanguage.includes(language)}
                  onChange={() => toggleFilter("hostLanguage", language)}
                />
              ))}
            </div>
          </CollapsibleSection>

          {/* Bottom padding */}
          <div className="h-6" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white flex-shrink-0">
          <button
            onClick={handleClearAll}
            className="text-base font-semibold underline hover:no-underline"
          >
            Clear all
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-6 py-3.5 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition-colors"
          >
            Show {countSelectedFilters() > 0 ? `${countSelectedFilters()}+` : "1,000+"} places
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FiltersModal;