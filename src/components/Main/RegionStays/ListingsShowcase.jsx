import React from "react";

const sections = [
  {
    title: "Dubai apartment rentals",
    listings: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
        name: "Apartment in Downtown Dubai",
        subtitle: "FIRST CLASS | 1BR | Breathtaking Downtown Views",
        rating: 4.98,
        reviews: 46,
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
        name: "Apartment in Marsa Dubai",
        subtitle: "Full Marina Views in Cozy EMAAR Apartment",
        rating: 4.93,
        reviews: 68,
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
        name: "Apartment in Downtown Dubai",
        subtitle: "Burj Khalifa View 5-star Hotel Apartment",
        rating: 4.92,
        reviews: 66,
      },
      {
        id: 4,
        image:
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
        name: "Apartment in Downtown Dubai",
        subtitle: "Hermes-Style | Burj Khalifa View & Infinity Balcony",
        rating: 4.97,
        reviews: 38,
      },
    ],
  },
  {
    title: "Dubai home rentals",
    listings: [
      {
        id: 5,
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
        name: "Home in Nakhlat Jumeira",
        subtitle: "BnBeyond’s Seaside Elegance w/ Private Pool",
        rating: 5,
        reviews: 3,
      },
      {
        id: 6,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
        name: "Home in Al Barsha South Fourth",
        subtitle: "NEW! Designer Studio | Urban Retreat in JVC",
        rating: 4.67,
        reviews: 6,
      },
      {
        id: 7,
        image:
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
        name: "Home in Wadi Al Safa 5",
        subtitle: "Stylish 4BD Villa | Opposite Pool & Park",
        rating: 5,
        reviews: 6,
      },
      {
        id: 8,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
        name: "Home in Downtown Dubai",
        subtitle: "Prestigious 3.5BR in Boulevard Point",
        rating: 4.95,
        reviews: 20,
      },
    ],
  },
  {
    title: "Serviced apartment rentals in Dubai",
    listings: [
      {
        id: 9,
        image:
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
        name: "Apartment in Dubai",
        subtitle: "Elegant 1 BR | District One",
        rating: 5,
        reviews: 3,
      },
      {
        id: 10,
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
        name: "Apartment in Downtown Dubai",
        subtitle: "Luxury Hotel-Apartment in Downtown",
        rating: 4.99,
        reviews: 122,
      },
      {
        id: 11,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
        name: "Apartment in Marsa Dubai",
        subtitle: "Full Marina View | Marina Gate 1",
        rating: 4.92,
        reviews: 65,
      },
      {
        id: 12,
        image:
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
        name: "Apartment in Nakhlat Jumeira",
        subtitle: "Palm Tower Luxury 1BR",
        rating: 4.89,
        reviews: 63,
      },
    ],
  },
];

const ListingsShowcase = () => {
  return (
    <div className="space-y-16">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-3xl font-semibold text-center mb-8">
            {section.title}
          </h2>
          <div className="grid grid-cols-1 1md:grid-cols-2 1lg:grid-cols-4 gap-6">
            {section.listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
              >
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 space-y-1">
                  <h3 className="font-semibold text-lg">{listing.name}</h3>
                  <p className="text-sm text-grey line-clamp-2">
                    {listing.subtitle}
                  </p>
                  <div className="flex items-center gap-1 pt-2 text-sm">
                    <svg
                      className="w-4 h-4 fill-current text-black"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="font-semibold">{listing.rating}</span>
                    <span className="text-grey">({listing.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingsShowcase;

