import React, { useEffect, useState } from "react";
import star from "../../asset/Icons_svg/star.svg";
import { useDispatch, useSelector } from "react-redux";
import { setShowLogin } from "../../redux/AppSlice";
import { Link, useParams } from "react-router-dom";

// A reusable component for navigation links
const NavLink = ({ onClick, href, label }) => (
  <a
    onClick={onClick}
    href={href}
    className="text-black text-sm font-medium h-full flex-center border-b-4 border-white hover:border-black"
  >
    {label}
  </a>
);

// Helper to get price label based on priceType
const getPriceLabel = (priceType) => {
  if (priceType === 'month') return 'month';
  if (priceType === 'total') return ''; // For sale properties, no suffix
  return 'night'; // Default
};

// Helper to get the correct display price (rawPrice for backend, price for Supabase)
const getDisplayPrice = (houseInfo) => {
  if (houseInfo?.isBackendProperty && houseInfo?.rawPrice !== undefined) {
    return houseInfo.rawPrice;
  }
  return houseInfo?.price;
};

// Component for showing the price and reviews section
const PriceAndReviews = ({ houseInfo, houseRating, reviewsCount }) => {
  const priceLabel = getPriceLabel(houseInfo?.priceType);
  const displayPrice = getDisplayPrice(houseInfo);

  return (
    <div className="h-full gap-5 flex items-center">
      <div className="flex flex-col justify-center gap-y-1">
        <div className="flex items-end gap-x-1">
          <span className="font-medium text-base">AED {displayPrice?.toLocaleString()}</span>
          {priceLabel && <span className="text-sm font-light">{priceLabel}</span>}
        </div>
        <div className="flex gap-x-1 items-center">
          <img src={star} className="h-3 w-3" alt="Rating" />
          <span className="text-xs font-medium">
            {houseRating && formatSingleDigit(houseInfo?.house_rating)}
          </span>
          <span className="flex items-center justify-center">
            <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
          </span>
          <span className="text-xs font-extralight">
            {reviewsCount && houseInfo?.rating_count}
          </span>
        </div>
      </div>
      <ReserveButton houseInfo={houseInfo} />
    </div>
  );
};

// Component for the Reserve button
const ReserveButton = ({ houseInfo }) => {
  const dispatch = useDispatch();
  let userData = useSelector((store) => store.app.userData);
  const priceType = houseInfo?.priceType || 'night';

  if (!houseInfo || !houseInfo.id) return null;

  const handleClick = (e) => {
    if (!userData) {
      e.preventDefault();
      dispatch(setShowLogin(true));
    }
  };

  // Button label based on property type
  const getButtonLabel = () => {
    if (priceType === 'total') return 'Contact Agent';
    if (priceType === 'month') return 'Inquire Now';
    return 'Reserve';
  };

  // Only link to booking page for short-term rentals
  const shouldLinkToBooking = priceType === 'night' && userData;

  return (
    <Link to={shouldLinkToBooking ? `/${houseInfo.id}/book` : "#"} onClick={handleClick}>
      <button className="rounded-full flex-center bg-black w-[9.5rem] h-12">
        <span className="text-white">{getButtonLabel()}</span>
      </button>
    </Link>
  );
};

const NavbarChild = ({ isVisible, houseInfo }) => {
  let houseRating = Boolean(houseInfo?.house_rating > 2);
  let reviewsCount = Boolean(houseInfo?.rating_count);
  return (
    <nav className="h-full max-w-7xl 1lg:px-20 px-10 w-full flex items-center justify-between">
      <div className="h-full gap-x-6 w-[20rem] flex items-center">
        {/* Reusable navigation links */}
        <NavLink
          onClick={scrollToSection("header")}
          href="#home"
          label="Photos"
        />
        <NavLink
          onClick={scrollToSection("Amenities")}
          href="#about"
          label="Amenities"
        />
        <NavLink
          onClick={scrollToSection("Reviews")}
          href="#services"
          label="Reviews"
        />
        <NavLink
          onClick={scrollToSection("Location")}
          href="#contact"
          label="Location"
        />
      </div>

      <div className="h-full flex items-center gap-5">
        {/* Show price and reviews only when isVisible is false */}
        {!isVisible && (
          <div className="flex flex-col justify-center gap-y-1">
            <div className="flex items-end gap-x-1">
              <span className="font-medium text-base">AED {getDisplayPrice(houseInfo)?.toLocaleString()}</span>
              {getPriceLabel(houseInfo?.priceType) && (
                <span className="text-sm font-light">{getPriceLabel(houseInfo?.priceType)}</span>
              )}
            </div>
            <div className="flex gap-x-1 items-center">
              <img src={star} className="h-3 w-3" alt="Rating" />
              <span className="text-xs font-medium">
                {houseRating && formatSingleDigit(houseInfo?.house_rating)}
              </span>
              <span className="flex items-center justify-center">
                <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
              </span>
              <span className="text-xs font-extralight">
                {reviewsCount && houseInfo?.rating_count}
              </span>
            </div>
          </div>
        )}
        {/* Always show Reserve button on the right */}
        <ReserveButton houseInfo={houseInfo} />
      </div>
    </nav>
  );
};

const scrollToSection = (sectionId) => (event) => {
  event.preventDefault();
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
};

function formatSingleDigit(number) {
  // Convert the number to a string
  let numStr = number.toString();

  // Split the number into the integer and decimal parts
  let [integerPart, decimalPart] = numStr.split(".");

  // Check if the integer part is a single digit and decimal part is undefined
  if (integerPart.length === 1 && !decimalPart) {
    // Append ".0" to the single-digit number
    numStr = integerPart + ".0";
  }

  return numStr;
}

// Main Component

const NavBar = () => {
  const [showNav, setShowNav] = useState(false);
  const { id } = useParams();

  const { isVisible, houseInfo: allHouseInfo } = useSelector((store) => store.houseDetail);
  const houseInfo = allHouseInfo[id];

  useEffect(() => {
    // Use hysteresis to prevent vibration - different thresholds for show/hide
    const SHOW_THRESHOLD = 580; // Show navbar when scrolled past this point
    const HIDE_THRESHOLD = 520; // Hide navbar when scrolled above this point

    function handleScroll() {
      const scrollY = window.scrollY;

      if (scrollY > SHOW_THRESHOLD && !showNav) {
        setShowNav(true);
      } else if (scrollY < HIDE_THRESHOLD && showNav) {
        setShowNav(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showNav]);

  return (
    <div
      className={`w-full h-20 bg-white fixed top-0 z-50 flex-center border-b-[1px] border-b-grey-dim transition-transform duration-300 ease-out ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <NavbarChild isVisible={isVisible} houseInfo={houseInfo}></NavbarChild>
    </div>
  );
};

export default NavBar;
