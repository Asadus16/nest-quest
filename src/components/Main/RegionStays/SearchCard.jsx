import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { setSelectedStartDate, setSelectedEndDate } from "../../../redux/mainFormSlice";

const SearchCard = ({ regionName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const handleCheckInChange = (e) => {
    const date = e.target.value;
    setCheckInDate(date);
    if (date) {
      const dateObj = new Date(date);
      dispatch(setSelectedStartDate(dateObj));
    }
  };

  const handleCheckOutChange = (e) => {
    const date = e.target.value;
    setCheckOutDate(date);
    if (date) {
      const dateObj = new Date(date);
      dispatch(setSelectedEndDate(dateObj));
    }
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    try {
      if (typeof date === "string") {
        // If it's already in YYYY-MM-DD format, return as is
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
        // Otherwise parse it
        return format(new Date(date), "yyyy-MM-dd");
      }
      return format(new Date(date), "yyyy-MM-dd");
    } catch {
      return "";
    }
  };

  return (
    <div className="relative w-full h-[600px] 1md:h-[700px] bg-white">
      <div className="max-w-7xl mx-auto h-full px-6 1lg:px-12 relative">
        {/* Image - Right side, 80% width with gaps */}
        <div className="absolute right-6 1lg:right-12 top-1/2 -translate-y-1/2 w-[80%] h-[85%] rounded-2xl overflow-hidden shadow-2xl">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80')`,
            }}
          ></div>
        </div>

        {/* Search Card - Overlapping from left, 20% overlap */}
        <div className="absolute left-6 1lg:left-12 top-1/2 -translate-y-1/2 w-full max-w-[400px] bg-white rounded-2xl shadow-2xl p-5 1md:p-6 z-10">
          <h1 className="text-2xl 1md:text-3xl font-medium mb-2">
            Vacation rentals in {regionName}
          </h1>
          <p className="text-sm 1md:text-base text-grey mb-5">
            Find and book unique accommodations on Nest Quest
          </p>

          <div className="space-y-3">
            {/* Location Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={`${regionName}, United Arab Emirates`}
                readOnly
                className="w-full px-4 py-2.5 border border-grey-dim rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
            </div>

            {/* Check-in/Check-out */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Check in
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={handleCheckInChange}
                  min={formatDateForInput(new Date())}
                  className="w-full px-4 py-2.5 border border-grey-dim rounded-lg focus:outline-none focus:ring-2 focus:ring-black cursor-pointer text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Check out
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={handleCheckOutChange}
                  min={checkInDate || formatDateForInput(new Date())}
                  className="w-full px-4 py-2.5 border border-grey-dim rounded-lg focus:outline-none focus:ring-2 focus:ring-black cursor-pointer text-sm"
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={() => navigate("/")}
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
  );
};

export default SearchCard;

