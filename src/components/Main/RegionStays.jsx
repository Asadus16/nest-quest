import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MobileFooter from "../Footer/MobileFooter";
import SearchCard from "./RegionStays/SearchCard";
import TopRatedRentals from "./RegionStays/TopRatedRentals";
import PopularAmenities from "./RegionStays/PopularAmenities";
import TopSights from "./RegionStays/TopSights";
import QuickStats from "./RegionStays/QuickStats";
import FAQSection from "./RegionStays/FAQSection";
import BestTimeToVisit from "./RegionStays/BestTimeToVisit";
import AllAboutRegion from "./RegionStays/AllAboutRegion";
import ListingsShowcase from "./RegionStays/ListingsShowcase";
import MoreFromNestQuest from "./RegionStays/MoreFromNestQuest";
import DestinationsExplore from "./RegionStays/DestinationsExplore";

const RegionStays = () => {
  const { regionName } = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const formattedRegionName = regionName
    ? regionName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  // Handle scroll to hide/show header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white transition-transform duration-300 ${
        isScrolled ? "-translate-y-full" : "translate-y-0"
      }`}>
        <Header />
      </div>

      <div className="mt-8">
        {/* Search Card with Background */}
        <SearchCard regionName={formattedRegionName} />

        {/* Top-rated vacation rentals */}
        <div className="max-w-7xl mx-auto px-6 pt-4 pb-12">
          <TopRatedRentals regionName={formattedRegionName} />
        </div>

        {/* Popular amenities */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <PopularAmenities regionName={formattedRegionName} />
        </div>

        {/* Stay near top sights */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <TopSights regionName={formattedRegionName} />
        </div>

        {/* Listings showcases */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <ListingsShowcase />
        </div>

        {/* When is the best time to visit */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <BestTimeToVisit regionName={formattedRegionName} />
        </div>

        {/* All about region */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <AllAboutRegion regionName={formattedRegionName} />
        </div>

        {/* FAQ Section - Full Width */}
        <div className="w-full px-6 py-12">
          <FAQSection regionName={formattedRegionName} />
        </div>

        {/* Quick stats */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <QuickStats regionName={formattedRegionName} />
        </div>

        {/* More from Nest Quest */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <MoreFromNestQuest />
        </div>

        {/* Destinations to explore */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <DestinationsExplore regionName={formattedRegionName} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-grey-dim">
        <Footer />
      </div>
      <MobileFooter />
    </div>
  );
};

export default RegionStays;

