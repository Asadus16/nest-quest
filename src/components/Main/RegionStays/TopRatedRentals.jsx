import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TopRatedRentals = ({ regionName }) => {
  const navigate = useNavigate();

  const sections = [
    [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1511963211574-e9be5fd01779?w=900&q=80",
        title: "Apartment in Downtown Dubai",
        rating: 4.99,
        reviews: 158,
        description:
          "Amazing Views & Location | Downtown. Enjoy breathtaking panoramic views of the Burj Khalifa and Dubai Fountains from this modern apartment. Perfect for singles or couples seeking a prestigious Dubai escape.",
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80",
        title: "Apartment in Downtown Dubai",
        rating: 4.95,
        reviews: 197,
        description:
          "Luxurious Studio in Business Bay with stunning infinity pool & spa. Accommodates up to 4 persons (king bed + queen sofa bed). Hotel-grade amenities include pool, gym, kids pool, salon, and coffee shop.",
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1470246973918-29a93221c455?w=900&q=80",
        title: "Apartment in Downtown Dubai",
        rating: 5,
        reviews: 35,
        description:
          "Dreamy apartment with rooftop pool & Burj Khalifa views. One-bedroom apartment on a high floor in Downtown with rooftop swimming pool, king-size bed, free WiFi & gym access. Close to the metro.",
      },
      {
        id: 4,
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80",
        title: "Apartment in Marsa Dubai",
        rating: 5,
        reviews: 18,
        description:
          "Marina View Luxury Studio | JW Marriott Residences. Enjoy full marina views, direct access to Dubai Marina Mall, and sleek modern interiors with balcony seating and premium amenities.",
      },
    ],
    [
      {
        id: 5,
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80",
        title: "Apartment in Downtown Dubai",
        rating: 4.9,
        reviews: 110,
        description:
          "Breathtaking Burj Khalifa & Fountain view apartment. Provides the utmost comfort and luxury for an unforgettable stay with premium finishes and floor-to-ceiling windows.",
      },
      {
        id: 6,
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80",
        title: "Apartment in Downtown Dubai",
        rating: 4.95,
        reviews: 248,
        description:
          "Auberge Luxury 2BR Full Burj view apartment. Stay in the heart of Dubai with an unparalleled front-row seat to exclusive landmarks. Includes full concierge and resort amenities.",
      },
      {
        id: 7,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
        title: "Condo in Marsa Dubai",
        rating: 4.81,
        reviews: 143,
        description:
          "Marina Sky Garden with private pool. Chill in the private pool and enjoy sunsets overlooking the sea. Spacious 275 sqm apartment with expansive terrace on the 42nd floor.",
      },
      {
        id: 8,
        image:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80",
        title: "Apartment in Downtown Dubai",
        rating: 4.97,
        reviews: 113,
        description:
          "Fountain Show & Burj Khalifa View - 2 BR / 3 bath. Fully equipped to enjoy a relaxing and comfortable stay in Downtown. Luxurious interiors with curated art and premium bedding.",
      },
    ],
    [
      {
        id: 9,
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80",
        title: "Apartment in Downtown Dubai",
        rating: 4.99,
        reviews: 77,
        description:
          "Lux 2BR with Amazing Burj Khalifa & fountain views. Brand new apartment with floor-to-ceiling windows and private balcony, located in Grand Residences.",
      },
      {
        id: 10,
        image:
          "https://images.unsplash.com/photo-1470246973918-29a93221c455?w=900&q=80",
        title: "Apartment in Downtown Dubai",
        rating: 5,
        reviews: 16,
        description:
          "Burj Khalifa & fountain view apartment. Experience modern luxury in the heart of Downtown with direct mall access, stylish furnishings, and iconic skyline vistas.",
      },
      {
        id: 11,
        image:
          "https://images.unsplash.com/photo-1511963211574-e9be5fd01779?w=900&q=80",
        title: "Apartment in Downtown Dubai",
        rating: 5,
        reviews: 7,
        description:
          "NEW Mellas | Burj View | Infinity pool. Chic getaway in Business Bay with Burj Khalifa vistas, 5-star amenities, and designer interiors just minutes from Dubai's attractions.",
      },
      {
        id: 12,
        image:
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80",
        title: "Apartment in Downtown Dubai",
        rating: 5,
        reviews: 51,
        description:
          "The Iconic View – Exclusive apartment with skyline panorama and private balcony. Elegant furnishings and open-plan living for a lavish Dubai stay.",
      },
    ],
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = sections.length;

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-3">
        Top-rated vacation rentals in {regionName}
      </h2>
      <p className="text-base text-grey text-center mb-8">
        Guests agree: these stays are highly rated for location, cleanliness,
        and more.
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full hover:bg-shadow-gray-light transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="text-lg font-medium">
          {currentPage}/{totalPages}
        </span>
        <button
          onClick={handleNext}
          className="p-2 rounded-full hover:bg-shadow-gray-light transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Rental Cards */}
      <div className="grid grid-cols-1 1md:grid-cols-2 1lg:grid-cols-4 gap-6">
        {sections[currentPage - 1].map((rental) => (
          <div
            key={rental.id}
            onClick={() => navigate(`/house/${rental.id}`)}
            className="cursor-pointer group"
          >
            <div className="relative rounded-2xl overflow-hidden mb-3">
              <img
                src={rental.image}
                alt={rental.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">{rental.title}</h3>
              <div className="flex items-center gap-1 mb-2">
                <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="font-medium">{rental.rating}</span>
                <span className="text-grey">({rental.reviews})</span>
              </div>
              <p className="text-grey text-sm">
                {rental.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedRentals;

