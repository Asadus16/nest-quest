import React from "react";

const PopularAmenities = ({ regionName }) => {
  const amenities = [
    {
      name: "Self check-in",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
    },
    {
      name: "Gym",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l1.43-1.43-2.14-2.14 1.43-1.43L20.57 22 22 20.57l-1.43-1.43z" />
        </svg>
      ),
    },
    {
      name: "BBQ grill",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
        </svg>
      ),
    },
    {
      name: "Laptop-friendly workspace",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
        </svg>
      ),
    },
    {
      name: "Wifi",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-8">
        Popular amenities for {regionName} vacation rentals
      </h2>
      <div className="grid grid-cols-2 1md:grid-cols-3 1lg:grid-cols-5 gap-4">
        {amenities.map((amenity, index) => (
          <div
            key={index}
            className="bg-white border border-grey-dim rounded-xl p-6 flex flex-col items-center gap-4 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="text-grey group-hover:text-black transition-colors">{amenity.icon}</div>
            <span className="text-center font-medium text-sm">{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularAmenities;

