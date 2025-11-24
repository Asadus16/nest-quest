import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { SpeedInsights } from "@vercel/speed-insights/react";

import Header from "../Header/Header";
import Options from "./Options";
import PropertySection from "./PropertySection";
import InspirationForGetaways from "./InspirationForGetaways";
import LongFooter from "../House-detail/LongFooter";
import MobileFooter from "../Footer/MobileFooter";
import { getAllRows } from "../../api/apiRooms";

import "../../input.css";

const Home = () => {
  const { startScroll, minimize, userData } = useSelector((state) => state.app);

  const headerRef = useRef(null);

  useQuery({
    queryKey: ["allRows"],
    queryFn: getAllRows,
  });

  const getHeaderClasses = () => {
    const baseClasses =
      "fixed transition-all duration-300 ease-in-out bg-white w-full flex items-start justify-center top-0";
    const zIndexClass = minimize ? "z-50" : "z-10";
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
      "transition-all duration-300 ease-in-out fixed z-10 w-full bg-white shadow-md 1sm:shadow-none flex-center";
    const visibilityClass = startScroll
      ? "1md:translate-y-0 1sm:translate-y-[3rem]"
      : "1sm:-translate-y-[5.9rem] !shadow-md";
    const positionClass = "1sm:top-[10.8rem] top-[5.7rem]";

    return `${baseClasses} ${visibilityClass} ${positionClass}`;
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
        <PropertySection
          title="Stay in Karachi"
          city="Karachi"
          country="Pakistan"
          limit={10}
          offset={0}
          isFirst={true}
        />
        <PropertySection
          title="Available next month in Dubai"
          city="Dubai"
          country="United Arab Emirates"
          limit={10}
          offset={10}
        />
        <PropertySection
          title="Homes in Kuala Lumpur"
          city="Kuala Lumpur"
          country="Malaysia"
          limit={10}
          offset={20}
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
