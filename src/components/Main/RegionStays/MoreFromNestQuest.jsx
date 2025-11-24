import React from "react";

const MoreFromNestQuest = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 text-center">More from Nest Quest</h2>

      <div className="grid grid-cols-1 1md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Nest Quest Experiences */}
        <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
          <div className="relative h-96">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
              alt="Nest Quest experiences"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">Nest Quest experiences</h3>
              <p className="text-lg">Experience something new</p>
            </div>
          </div>
        </div>

        {/* Nest Quest Services */}
        <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
          <div className="relative h-96">
            <img
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
              alt="Nest Quest services"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">Nest Quest services</h3>
              <p className="text-lg">Make your stay more special</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreFromNestQuest;

