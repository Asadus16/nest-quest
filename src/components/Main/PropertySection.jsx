import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRowsWithOptions } from "../../api/apiRooms";
import HouseCard from "./RoomsDesktop";
import MobileHouseCard from "./RoomsMobile";
import { useSelector } from "react-redux";
import arrow_right from "../../asset/Icons_svg/arrow-right.svg";
import arrow_left from "../../asset/Icons_svg/arrow-left.svg";

const PropertySection = ({ title, city, country, limit = 10, offset = 0, isFirst = false }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);
  const { userData, userFavListing: favListings } = useSelector((store) => store.app);
  const [localScrollPositions, setLocalScrollPositions] = useState({});
  const houseImagesRefs = useRef({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["propertySection", city, country, offset, limit],
    queryFn: async () => {
      try {
        // Fetch more properties to account for filtering (fetch 20, filter, then take first 10)
        const fetchLimit = limit * 2;
        let result = await fetchRowsWithOptions(
          null,
          null,
          country,
          city,
          offset,
          offset + fetchLimit - 1
        );
        
        // If no results, try with just country
        if (!result || result.length === 0) {
          result = await fetchRowsWithOptions(
            null,
            null,
            country,
            null,
            offset,
            offset + fetchLimit - 1
          );
        }
        
        // If still no results, try with just city
        if (!result || result.length === 0) {
          result = await fetchRowsWithOptions(
            null,
            null,
            null,
            city,
            offset,
            offset + fetchLimit - 1
          );
        }
        
        // If still no results, fetch any properties with offset
        if (!result || result.length === 0) {
          result = await fetchRowsWithOptions(
            null,
            null,
            null,
            null,
            offset,
            offset + fetchLimit - 1
          );
        }
        
        // Filter out properties without images or with invalid image URLs
        const filteredResult = (result || []).filter((item) => {
          if (!item.images || !Array.isArray(item.images) || item.images.length === 0) {
            return false;
          }
          
          const firstImage = item.images[0];
          if (!firstImage) {
            return false;
          }
          
          // Check if image URL is valid (not empty, not null, and is a string)
          if (typeof firstImage !== 'string' || firstImage.trim() === '' || firstImage === 'null' || firstImage === 'undefined') {
            return false;
          }
          
          // Check if it's a valid URL format
          try {
            new URL(firstImage);
            return true;
          } catch {
            // If it's not a full URL, check if it starts with http/https or is a data URL
            return firstImage.startsWith('http://') || 
                   firstImage.startsWith('https://') || 
                   firstImage.startsWith('data:') ||
                   firstImage.startsWith('/');
          }
        });
        
        // Take only the requested limit
        const finalResult = filteredResult.slice(0, limit);
        
        console.log(`PropertySection ${title}:`, finalResult.length, 'properties found (offset:', offset, ')');
        return finalResult;
      } catch (err) {
        console.error(`Error fetching properties for ${title}:`, err);
        return [];
      }
    },
    enabled: true, // Always enabled
  });

  const handleSectionScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const newPosition =
      direction === "left"
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPosition(newPosition);
  };

  const handleScrollBtn = (e, direction, itemId) => {
    e.stopPropagation();
    const container = houseImagesRefs.current[itemId];
    if (!container) return;

    const scrollAmount = container.clientWidth;
    const newPosition =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };

  const handleImageScroll = (itemId) => {
    const container = houseImagesRefs.current[itemId];
    if (!container) return;

    const isAtStart = container.scrollLeft <= 0;
    const isAtEnd =
      container.scrollLeft >= container.scrollWidth - container.clientWidth - 1;

    setLocalScrollPositions((prev) => ({
      ...prev,
      [itemId]: { isAtStart, isAtEnd },
    }));
  };

  // useEffect must be called before any conditional returns (Rules of Hooks)
  useEffect(() => {
    const updateScrollPosition = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollPosition);
      updateScrollPosition(); // Initial check
      return () => container.removeEventListener("scroll", updateScrollPosition);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className={`w-full max-w-7xl mx-auto px-6 py-8 ${isFirst ? '1sm:mt-0 1xz:mt-0 mt-0' : ''}`}>
        <h2 className={`text-xl font-semibold mb-4 ${isFirst ? '1sm:mt-0 1xz:mt-0 pt-12' : ''}`}>{title}</h2>
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 h-80 bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error(`Error in PropertySection ${title}:`, error);
    return null;
  }

  if (!data || data.length === 0) {
    console.log(`No data for ${title} - city: ${city}, country: ${country}`);
    return null;
  }

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight =
    scrollContainerRef.current &&
    scrollPosition <
      scrollContainerRef.current.scrollWidth -
        scrollContainerRef.current.clientWidth - 10;

  return (
    <div className={`w-full max-w-7xl mx-auto px-6 py-8 relative ${isFirst ? '1sm:mt-0 1xz:mt-0 mt-0' : ''}`}>
      <div className={`flex items-center justify-between mb-4 ${isFirst ? '1sm:mt-0 1xz:mt-0 pt-12' : ''}`}>
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-base text-grey">›</span>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => handleSectionScroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:scale-105 w-8 h-8 flex-center hover:bg-opacity-100 bg-opacity-80 hover:drop-shadow-md rounded-full border border-grey-dim"
          >
            <img className="h-4 w-6" src={arrow_left} alt="Scroll left" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth hide-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          {data && Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
            <div key={item.id} className="flex-shrink-0 w-52 1md:w-56 h-full">
              <div className="hidden 1md:block h-full">
                <HouseCard
                  item={item}
                  localScrollPositions={localScrollPositions}
                  userData={userData}
                  favListings={favListings}
                  handleScroll={handleImageScroll}
                  handleScrollBtn={handleScrollBtn}
                  houseImagesRefs={houseImagesRefs}
                  index={index}
                />
              </div>
              <div className="block 1md:hidden h-full">
                <MobileHouseCard
                  item={item}
                  localScrollPositions={localScrollPositions}
                  userData={userData}
                  favListings={favListings}
                  handleScroll={handleImageScroll}
                  handleScrollBtn={handleScrollBtn}
                  houseImagesRefs={houseImagesRefs}
                  index={index}
                />
              </div>
            </div>
          ))
          ) : (
            <div className="text-grey text-sm">No properties available</div>
          )}
        </div>

        {canScrollRight && (
          <button
            onClick={() => handleSectionScroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:scale-105 w-8 h-8 flex-center hover:bg-opacity-100 bg-opacity-80 hover:drop-shadow-md rounded-full border border-grey-dim"
          >
            <img className="h-4 w-6" src={arrow_right} alt="Scroll right" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertySection;

