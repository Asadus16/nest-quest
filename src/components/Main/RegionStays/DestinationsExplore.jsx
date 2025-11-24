import React, { useState } from "react";

const DestinationsExplore = ({ regionName }) => {
  const [activeTab, setActiveTab] = useState("Nearby destinations");

  const tabs = [
    "Nearby destinations",
    "Other types of stays",
    "Nearby Top Sights",
    "Things to do",
    "Travel tips & inspiration",
  ];

  const destinations = [
    "Abu Dhabi",
    "Doha",
    "Burj Khalifa Lake",
    "Sharjah",
    "Muscat",
    "Palm Jumeirah",
    "Palm Islands",
    "Bur Dubai",
    "Dubai Creek",
    "JBR Marina Beach",
    "Yas Island",
    "Ajman City",
  ];

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Destinations to explore</h2>

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
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <h3 className="font-normal text-base mb-1">{destination}</h3>
            <p className="text-grey text-xs">Vacation rentals</p>
          </div>
        ))}
      </div>

      {/* Breadcrumbs */}
      <div className="mt-12 flex items-center gap-2 text-xs text-grey font-light">
        <a href="/" className="underline hover:no-underline">
          Nest Quest
        </a>
        <span className="text-grey">/</span>
        <a href="#" className="underline hover:no-underline">
          United Arab Emirates
        </a>
        <span className="text-grey">/</span>
        <a href="#" className="underline hover:no-underline">
          {regionName}
        </a>
        <span className="text-grey">/</span>
        <span>{regionName}</span>
      </div>
    </div>
  );
};

export default DestinationsExplore;

