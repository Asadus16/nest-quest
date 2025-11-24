import React from "react";

const AllAboutRegion = ({ regionName }) => {
  return (
    <div>
      {/* All about Dubai section */}
      <div className="mb-16">
        <div className="flex items-start gap-8">
          <div className="flex-[0_0_20%] flex items-start gap-3">
            <svg
              className="w-6 h-6 text-black mt-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <h2 className="text-3xl font-semibold">All about {regionName}</h2>
          </div>
          <div className="flex-1 space-y-4 text-grey leading-relaxed">
            <p>
              {regionName} has evolved from a fishing village into a dynamic
              metropolis. The modern skyline is filled with tall towers, large
              shopping malls, championship golf courses, beaches, man-made
              islands, and indoor ski slopes.
            </p>
            <p>
              The historic Old Quarter features 19th-century architecture,
              the gold souk for jewelry, traditional restaurants and tea
              houses, and the {regionName} Museum housed in a 1787 fort. The
              blend of ancient heritage and futurism is fascinating, and
              desert excursions give you a feel of the natural surroundings.
            </p>
          </div>
        </div>
      </div>

      {/* What are the top things to do section */}
      <div>
        <div className="flex items-start gap-8 mb-6">
          <div className="flex-[0_0_20%] flex items-start gap-3">
            <svg
              className="w-6 h-6 text-amber-700 mt-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <h2 className="text-3xl font-semibold">
              What are the top things to do in {regionName}?
            </h2>
          </div>
          <div className="flex-1 space-y-8">
            {/* Burj Khalifa */}
            <div>
              <h3 className="text-2xl font-semibold mb-3">Burj Khalifa</h3>
              <p className="text-grey leading-relaxed">
                The Burj Khalifa is 2,722 feet tall and 160 stories high. It's
                one of the world's tallest buildings and free-standing
                structures. There are three observation decks, with the
                lounge offering tea, baked goods, and champagne, and the top
                two featuring fast elevator rides, telescopes, virtual reality
                experiences, and 360-degree observation decks.
              </p>
            </div>

            {/* Gold and Spice Souks */}
            <div>
              <h3 className="text-2xl font-semibold mb-3">
                Gold and Spice Souks
              </h3>
              <p className="text-grey leading-relaxed">
                These souks (bazaars) are marketplaces that have fueled trade
                for centuries, representing the essence of trade. {regionName}
                's Gold Souk is a legendary gold jewelry trading center, and
                you should visit the Spice Souk to go and smell for yourself.
              </p>
            </div>

            {/* Dubai Mall */}
            <div>
              <h3 className="text-2xl font-semibold mb-3">Dubai Mall</h3>
              <p className="text-grey leading-relaxed">
                A shoppers' paradise and the epicenter of shopping, the Dubai Mall
                ranks as one of the world's largest indoor shopping centers. It
                contains over 1,300 stores, boutiques, and shops, along with
                numerous entertainment and kid-friendly options, including an ice
                rink and a 22-screen cinema.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAboutRegion;

