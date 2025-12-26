import React, { useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { SpeedInsights } from "@vercel/speed-insights/react";

import Header from "../Header/Header";
import Options from "./Options";
import PropertySection from "./PropertySection";
import InspirationForGetaways from "./InspirationForGetaways";
import LongFooter from "../House-detail/LongFooter";
import MobileFooter from "../Footer/MobileFooter";
import { getAllRows } from "../../api/apiRooms";
import { setStartScroll, setMinimize } from "../../redux/AppSlice";
import { setActiveInput } from "../../redux/mainFormSlice";

import "../../input.css";

const Home = () => {
  const { startScroll, minimize, userData } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const headerRef = useRef(null);

  useQuery({
    queryKey: ["allRows"],
    queryFn: getAllRows,
  });

  // Handle scroll to update startScroll state
  const handleWindowScroll = useCallback(() => {
    const currentScrollPosition = window.scrollY;

    // Handle UI state updates
    dispatch(setMinimize(false));
    dispatch(setActiveInput(""));

    if (currentScrollPosition > 0) {
      dispatch(setStartScroll(false));
    } else if (currentScrollPosition < 22) {
      dispatch(setStartScroll(true));
    }
  }, [dispatch]);

  // Set up scroll listener and check initial scroll position
  useEffect(() => {
    // Check initial scroll position on mount
    const initialScrollPosition = window.scrollY;
    if (initialScrollPosition > 0) {
      dispatch(setStartScroll(false));
    } else {
      dispatch(setStartScroll(true));
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleWindowScroll);
    
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [dispatch, handleWindowScroll]);

  const getHeaderClasses = () => {
    const baseClasses =
      "fixed transition-all duration-300 ease-in-out bg-gray-50 w-full flex items-start justify-center top-0";
    const zIndexClass = minimize ? "z-50" : "z-40";
    const heightClass = startScroll
      ? minimize
        ? "animate-collapse"
        : "1sm:h-[11rem]"
      : minimize
      ? "animate-expand"
      : "h-[5rem]";

    return `${baseClasses} ${zIndexClass} ${heightClass}`;
  };

  const getOptionsClasses = () => {
    const baseClasses =
      "transition-all duration-300 ease-in-out fixed z-40 w-full bg-gray-50 shadow-md 1sm:shadow-none flex-center";
    
    // Hide the filters bar when scrolled (form is compact)
    if (!startScroll) {
      return `${baseClasses} opacity-0 pointer-events-none translate-y-[-100%]`;
    }
    
    // Show the filters bar when at top
    const visibilityClass = "1md:translate-y-0 1sm:translate-y-[3rem]";
    const positionClass = "1sm:top-[10.8rem] top-[5.7rem]";

    return `${baseClasses} ${visibilityClass} ${positionClass} opacity-100`;
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div ref={headerRef} id="header" className={getHeaderClasses()}>
        <Header headerRef={headerRef} />
      </div>

      <div className={getOptionsClasses()} >
        <Options />
      </div>

      <div className="w-full mt-[6rem] 2xl:mt-[6rem] 1sm:mt-[13rem] 1xz:mt-[9rem]">
        {/* Property Sections */}
        {/* Stay in Dubai - Uses Supabase data */}
        <PropertySection
          title="Stay in Dubai"
          city="Al Awir"
          country="Dubai"
          limit={10}
          offset={0}
          isFirst={true}
          useBackend={false}
        />
        {/* Available Properties - Uses Backend data (page 1) */}
        <PropertySection
          title="Available Properties"
          limit={10}
          useBackend={true}
          backendPage={1}
        />
        {/* More Backend Properties (page 2 - will show empty state if not enough properties) */}
        <PropertySection
          title="Featured Listings"
          limit={10}
          useBackend={true}
          backendPage={2}
        />

        {/* Inspiration for future getaways */}
        <InspirationForGetaways />
      </div>

      {/* Footer at page end */}
      <div className="w-full mt-20">
        <LongFooter />
      </div>

      <MobileFooter />
      <SpeedInsights />
    </div>
  );
};

export default Home;
