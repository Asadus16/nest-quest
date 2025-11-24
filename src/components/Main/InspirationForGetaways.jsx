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
    { name: "Dallas", type: "Apartment rentals" },
    { name: "Broken Bow", type: "Cabin rentals" },
    { name: "Richmond City", type: "House rentals" },
    { name: "San Antonio", type: "House rentals" },
    { name: "Kaua'i County", type: "House rentals" },
    { name: "Whistler", type: "Condo rentals" },
    { name: "Athens", type: "Condo rentals" },
    { name: "Santo Domingo De Guzmán", type: "House rentals" },
    { name: "Raleigh", type: "Villa rentals" },
    { name: "San Diego", type: "Monthly Rentals" },
    { name: "West Palm Beach", type: "House rentals" },
    { name: "San Juan", type: "Condo rentals" },
    { name: "Washington", type: "Monthly Rentals" },
    { name: "Maui", type: "Cottage rentals" },
    { name: "Brooklyn", type: "House rentals" },
    { name: "Tokyo", type: "Condo rentals" },
    { name: "Kyoto", type: "Condo rentals" },
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

