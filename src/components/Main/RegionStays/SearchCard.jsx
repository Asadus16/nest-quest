import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import SimpleCalendarModal from "./SimpleCalendarModal";

const SearchCard = ({ regionName }) => {
  const navigate = useNavigate();
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  
  const selectedStartDate = useSelector((store) => store.form.selectedStartDate);
  const selectedEndDate = useSelector((store) => store.form.selectedEndDate);
  
  // Get region name from URL or props
  const { regionName: urlRegionName } = useParams();
  const regionSlug = urlRegionName || regionName.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full bg-white">
      {/* Mobile Layout: Image on top, form below */}
      <div className="1xz:hidden flex flex-col">
        {/* Image - Full width at top with padding and rounded corners - MOBILE ONLY */}
        <div className="w-full px-4 pt-20 1xz:pt-0">
          <div className="w-full h-[300px] rounded-2xl overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80')`,
              }}
            ></div>
          </div>
        </div>

        {/* Search Card - Below image */}
        <div className="w-full px-4 pt-6 pb-8">
          <h1 className="text-2xl font-medium mb-2">
            Vacation rentals in {regionName}
          </h1>
          <p className="text-sm text-grey mb-5">
            Find and book unique accommodations on Nest Quest
          </p>

          <div className="space-y-3">
            {/* Location Input */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
              <input
                type="text"
                value={`${regionName}, United Arab Emirates`}
                readOnly
                className="w-full px-4 py-2.5 border border-grey-dim rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
            </div>

            {/* Check-in/Check-out - Combined field with divider */}
            <div className="relative border border-grey-dim rounded-lg overflow-hidden">
              <div className="flex">
                {/* Check in section */}
                <div
                  onClick={() => setIsCalendarModalOpen(true)}
                  className="flex-1 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors relative"
                >
                  <div className="text-xs font-medium text-gray-600 mb-1">Check in</div>
                  {selectedStartDate ? (
                    <div className="text-sm text-black font-medium">
                      {format(new Date(selectedStartDate), "MMM dd, yyyy")}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400 font-extralight">Add dates</div>
                  )}
                </div>
                
                {/* Vertical divider */}
                <div className="w-[1px] bg-grey-dim"></div>
                
                {/* Check out section */}
                <div
                  onClick={() => setIsCalendarModalOpen(true)}
                  className="flex-1 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors relative"
                >
                  <div className="text-xs font-medium text-gray-600 mb-1">Check out</div>
                  {selectedEndDate ? (
                    <div className="text-sm text-black font-medium">
                      {format(new Date(selectedEndDate), "MMM dd, yyyy")}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400 font-extralight">Add dates</div>
                  )}
                </div>
              </div>
            </div>

            {/* Calendar Modal - Single modal for both check-in and check-out */}
            <SimpleCalendarModal
              isOpen={isCalendarModalOpen}
              onClose={() => setIsCalendarModalOpen(false)}
            />

            {/* Search Button */}
            <button
              onClick={() => {
                if (selectedStartDate && selectedEndDate) {
                  navigate(`/${regionSlug}/homes`);
                } else {
                  navigate(`/${regionSlug}/homes`);
                }
              }}
              className="w-full bg-black text-white py-2.5 rounded-lg font-semibold text-base hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout: Image on right, form on left (existing layout) - DESKTOP ONLY */}
      <div className="hidden 1xz:block relative w-full h-[600px] 1md:h-[700px] pt-8 pb-8">
        <div className="max-w-7xl mx-auto h-full px-6 1lg:px-12 py-6 relative">
          {/* Image - Right side */}
          <div className="absolute -right-8 1xl:right-0 top-[45%] -translate-y-1/2 w-[75%] h-[75%] rounded-2xl overflow-hidden shadow-2xl">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80')`,
              }}
            ></div>
          </div>

          {/* Search Card - Vertically centered on left */}
          <div className="absolute left-0 1lg:left-6 top-[45%] -translate-y-1/2 w-full max-w-[400px] bg-white rounded-2xl shadow-2xl p-5 1md:p-6 z-10">
            <h1 className="text-2xl 1md:text-3xl font-medium mb-2">
              Vacation rentals in {regionName}
            </h1>
            <p className="text-sm 1md:text-base text-grey mb-5">
              Find and book unique accommodations on Nest Quest
            </p>

            <div className="space-y-3">
              {/* Location Input */}
              <div>
                <input
                  type="text"
                  value={`${regionName}, United Arab Emirates`}
                  readOnly
                  className="w-full px-4 py-2.5 border border-grey-dim rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                />
              </div>

              {/* Check-in/Check-out - Combined field with divider */}
              <div className="relative border border-grey-dim rounded-lg overflow-hidden">
                <div className="flex">
                  {/* Check in section */}
                  <div
                    onClick={() => setIsCalendarModalOpen(true)}
                    className="flex-1 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors relative"
                  >
                    <div className="text-xs font-medium text-black mb-1">Check in</div>
                    {selectedStartDate ? (
                      <div className="text-sm text-black font-medium">
                        {format(new Date(selectedStartDate), "MMM dd, yyyy")}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 font-extralight">Add dates</div>
                    )}
                  </div>
                  
                  {/* Vertical divider */}
                  <div className="w-[1px] bg-grey-dim"></div>
                  
                  {/* Check out section */}
                  <div
                    onClick={() => setIsCalendarModalOpen(true)}
                    className="flex-1 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors relative"
                  >
                    <div className="text-xs font-medium text-black mb-1">Check out</div>
                    {selectedEndDate ? (
                      <div className="text-sm text-black font-medium">
                        {format(new Date(selectedEndDate), "MMM dd, yyyy")}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 font-extralight">Add dates</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Calendar Modal - Single modal for both check-in and check-out */}
              <SimpleCalendarModal
                isOpen={isCalendarModalOpen}
                onClose={() => setIsCalendarModalOpen(false)}
              />

              {/* Search Button */}
              <button
                onClick={() => {
                  if (selectedStartDate && selectedEndDate) {
                    navigate(`/${regionSlug}/homes`);
                  } else {
                    navigate(`/${regionSlug}/homes`);
                  }
                }}
                className="w-full bg-black text-white py-2.5 rounded-lg font-semibold text-base hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;

