import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InspirationForGetaways = () => {
  const [activeTab, setActiveTab] = useState("Popular");
  const navigate = useNavigate();

  const tabs = [
    "Popular",
    "Arts & culture",
    "Beach",
    "Mountains",
    "Outdoors",
    "Things to do",
    "Travel tips & inspiration",
    "Nest Quest-friendly apartments",
  ];

  const destinations = [
    { name: "Downtown Dubai", type: "Skyline lofts" },
    { name: "Dubai Marina", type: "High-rise condos" },
    { name: "Palm Jumeirah", type: "Beach villas" },
    { name: "Business Bay", type: "Canal-view suites" },
    { name: "Jumeirah Beach Residence", type: "Sea-facing homes" },
    { name: "Al Barsha", type: "Family villas" },
    { name: "Jumeirah Village Circle", type: "Townhouse rentals" },
    { name: "Al Quoz", type: "Creative lofts" },
    { name: "Al Fahidi", type: "Heritage stays" },
    { name: "Dubai Creek Harbour", type: "Marina apartments" },
    { name: "Meydan", type: "Luxury estates" },
    { name: "Al Sufouh", type: "Serene villas" },
    { name: "City Walk", type: "Designer flats" },
    { name: "Dubai Hills Estate", type: "Golf-view homes" },
    { name: "Tilal Al Ghaf", type: "Waterfront villas" },
    { name: "Deira", type: "Historic residences" },
    { name: "La Mer", type: "Beach hideaways" },
  ];

  const handleDestinationClick = (destination) => {
    const formattedName = destination.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/'/g, "");
    navigate(`/${formattedName}/stays`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-6">
        Inspiration for future getaways
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-grey-dim">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 font-normal text-sm transition-colors ${
              activeTab === tab
                ? "border-b-2 border-black text-black"
                : "text-grey hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-2 1md:grid-cols-3 1lg:grid-cols-6 gap-6">
        {destinations.map((destination, index) => (
          <div
            key={index}
            onClick={() => handleDestinationClick(destination)}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <h3 className="font-normal text-base mb-1">{destination.name}</h3>
            <p className="text-grey text-xs">{destination.type}</p>
          </div>
        ))}
      </div>

      {/* Show more button */}
      <div className="mt-8 flex justify-center">
        <button className="flex items-center gap-2 text-base font-medium text-black hover:underline">
          Show more
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InspirationForGetaways;

