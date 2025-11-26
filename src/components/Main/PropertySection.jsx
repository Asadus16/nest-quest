import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRowsWithOptions } from "../../api/apiRooms";
import HouseCard from "./RoomsDesktop";
import MobileHouseCard from "./RoomsMobile";
import { useSelector } from "react-redux";
import arrow_right from "../../asset/Icons_svg/arrow-right.svg";
import arrow_left from "../../asset/Icons_svg/arrow-left.svg";
import { applyDubaiBranding } from "../../utils/dubaiBranding";

const PropertySection = ({ title, city, country, limit = 10, offset = 0, isFirst = false }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);
  const { userData, userFavListing: favListings } = useSelector((store) => store.app);
  const [localScrollPositions, setLocalScrollPositions] = useState({});
  const houseImagesRefs = useRef({});

  // Helper function to validate if an image URL is valid
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    
    const trimmed = url.trim();
    if (trimmed === '' || trimmed === 'null' || trimmed === 'undefined' || trimmed === 'null' || trimmed === 'undefined') {
      return false;
    }
    
    // Check for common invalid patterns
    if (trimmed.includes('placeholder') || trimmed.includes('default') || trimmed.includes('no-image')) {
      return false;
    }
    
    // Check if it's a valid URL format
    try {
      new URL(trimmed);
      return true;
    } catch {
      // If it's not a full URL, check if it starts with http/https or is a data URL or relative path
      return trimmed.startsWith('http://') || 
             trimmed.startsWith('https://') || 
             trimmed.startsWith('data:image/') ||
             (trimmed.startsWith('/') && trimmed.length > 1);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["propertySection", city, country, offset, limit],
    queryFn: async () => {
      try {
        // Fetch more properties to account for filtering (fetch 3x to ensure we have enough valid ones)
        const fetchLimit = limit * 3;
        let allResults = [];
        let currentOffset = offset;
        let attempts = 0;
        const maxAttempts = 5; // Prevent infinite loops
        
        // Keep fetching until we have enough valid properties or reach max attempts
        while (allResults.length < limit && attempts < maxAttempts) {
          let result = await fetchRowsWithOptions(
            null,
            null,
            country,
            city,
            currentOffset,
            currentOffset + fetchLimit - 1
          );
          
          // If no results, try with just country
          if (!result || result.length === 0) {
            result = await fetchRowsWithOptions(
              null,
              null,
              country,
              null,
              currentOffset,
              currentOffset + fetchLimit - 1
            );
          }
          
          // If still no results, try with just city
          if (!result || result.length === 0) {
            result = await fetchRowsWithOptions(
              null,
              null,
              null,
              city,
              currentOffset,
              currentOffset + fetchLimit - 1
            );
          }
          
          // If still no results, fetch any properties with offset
          if (!result || result.length === 0) {
            result = await fetchRowsWithOptions(
              null,
              null,
              null,
              null,
              currentOffset,
              currentOffset + fetchLimit - 1
            );
          }
          
          if (!result || result.length === 0) {
            break; // No more results available
          }
          
          // Filter out properties without valid images
          const validResults = (result || []).filter((item) => {
            // Check if images array exists and has at least one image
            if (!item.images || !Array.isArray(item.images) || item.images.length === 0) {
              return false;
            }
            
            // Check the first image
            const firstImage = item.images[0];
            if (!firstImage) {
              return false;
            }
            
            // Validate the image URL
            return isValidImageUrl(firstImage);
          });
          
          // Add valid results to our collection
          allResults = [...allResults, ...validResults];
          
          // Move to next batch
          currentOffset += fetchLimit;
          attempts++;
        }
        
        // Take only the requested limit
        const finalResult = allResults.slice(0, limit);
        const dubaiResults = finalResult.map(applyDubaiBranding);
        
        console.log(`PropertySection ${title}:`, dubaiResults.length, 'properties found (offset:', offset, ')');
        return dubaiResults;
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

