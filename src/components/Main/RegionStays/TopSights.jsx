import React from "react";

const TopSights = ({ regionName }) => {
  const sights = [
    { name: "Downtown Dubai", recommendations: 84 },
    { name: "Palm Jumeirah", recommendations: 239 },
    { name: "Burj Khalifa", recommendations: 987 },
    { name: "Dubai Marina", recommendations: 214 },
    { name: "The Dubai Mall", recommendations: 1467 },
    { name: "Dubai International Airport", recommendations: 64 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-8">
        Stay near {regionName}'s top sights
      </h2>
      <div className="grid grid-cols-1 1md:grid-cols-2 1lg:grid-cols-3 gap-6">
        {sights.map((sight, index) => (
          <div
            key={index}
            className="bg-white border border-grey-dim rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="font-semibold text-lg mb-2">{sight.name}</h3>
            <p className="text-grey text-sm">
              {sight.recommendations.toLocaleString()} locals recommend
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSights;

