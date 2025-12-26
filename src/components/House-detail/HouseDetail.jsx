import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import star from "../../asset/Icons_svg/star.svg";
import Header from "../Header/Header";
import { setMinimize, setShowLogin } from "../../redux/AppSlice";
import { useLocation, useParams } from "react-router";
import TopMainCont from "./TopMainCont";
import MidMainCont from "./MidMainCont";
import BottomMainCont from "./BottomMainCont";

import NavBar from "./NavBar";
import { getRoomInfo } from "../../api/apiRooms";
import { getBackendPropertyById } from "../../api/apiBackend";
import { mapBackendPropertyToFrontend } from "../../utils/propertyMapper";
import { useQuery } from "@tanstack/react-query";
import { setHouseInfo, setIsLoading } from "../../redux/HouseDetailSlice";
import LongFooter from "./LongFooter";
import { Link } from "react-router-dom";
import { differenceInDays, format, isSameMonth } from "date-fns";
import { updateBookingDates } from "../../payment/CheckoutForm";
import { applyDubaiBranding } from "../../utils/dubaiBranding";

// custom hook
const useFormattedDateRange = (startDate, endDate) => {
  const [tripDurationDate, setTripDurationDate] = useState(null);

  useEffect(() => {
    const formatDateRange = (start, end) => {
      const startD = new Date(start);
      const endD = new Date(end);

      if (start && end) {
        if (isSameMonth(startD, endD)) {
          return `${format(startD, "dd")} - ${format(endD, "dd MMM")}`;
        } else {
          return `${format(startD, "dd MMM")} - ${format(endD, "dd MMM")}`;
        }
      }
      return null;
    };

    setTripDurationDate(formatDateRange(startDate, endDate));
  }, [startDate, endDate]);

  return tripDurationDate;
};

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

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

const PriceDetails = ({
  dateSelected,
  allHouseInfo,
  numOfDays,
  tripDurationDate,
  houseInfo,
}) => {
  const priceType = houseInfo?.priceType || 'night';
  const priceLabel = getPriceLabel(priceType);
  const displayPrice = getDisplayPrice(houseInfo);

  // For sale properties, show the asking price
  if (priceType === 'total') {
    return (
      <div className="flex flex-col">
        <span className="text-normal font-medium">
          AED {displayPrice?.toLocaleString()}
        </span>
        <span className="text-sm font-light text-grey">For sale</span>
      </div>
    );
  }

  // For monthly rentals, show monthly price
  if (priceType === 'month') {
    return (
      <div className="flex flex-col">
        <span className="text-normal font-medium">
          AED {displayPrice?.toLocaleString()} <span className="font-light text-sm">/ month</span>
        </span>
        <span className="text-sm font-light text-grey">Monthly rental</span>
      </div>
    );
  }

  // For short-term rentals
  const calculatePrice = () => {
    if (!dateSelected) return null;
    const basePrice = Math.ceil(displayPrice * Math.abs(numOfDays));
    const totalPrice = basePrice + Math.floor(0.1 * basePrice);
    return totalPrice;
  };

  if (!dateSelected) return null;

  return (
    <div className="flex flex-col">
      {dateSelected && (
        <span className="text-normal font-medium">
          AED {calculatePrice()} <span className="font-light text-sm">{priceLabel}</span>
        </span>
      )}
      {dateSelected ? (
        <span className="text-sm font-medium underline">
          {tripDurationDate}
        </span>
      ) : null}
    </div>
  );
};

const RatingDisplay = ({ houseInfo }) => (
  <div className="flex items-center gap-1">
    <img src={star} className="h-3 w-3" alt="star rating" />
    <span className="font-medium text-xs">{houseInfo?.house_rating}</span>
  </div>
);

const ActionButton = ({
  userData,
  dateSelected,
  houseInfo,
  scrollToSection,
  dispatch,
}) => {
  const priceType = houseInfo?.priceType || 'night';

  const handleClick = (e) => {
    // For sale and monthly rentals, just trigger login if not logged in
    if (priceType === 'total' || priceType === 'month') {
      if (!userData) {
        e.preventDefault();
        dispatch(setShowLogin(true));
      }
      return;
    }

    // For short-term rentals
    if (!dateSelected) {
      scrollToSection("calendar");
    } else {
      if (!userData) {
        dispatch(setShowLogin(true));
      }
    }
  };

  // Button label based on property type
  const getButtonLabel = () => {
    if (priceType === 'total') return 'Contact Agent';
    if (priceType === 'month') return 'Inquire Now';
    return dateSelected ? 'Reserve' : 'Check availability';
  };

  // Determine if button should link to booking page
  const shouldLinkToBooking = priceType === 'night' && userData && dateSelected;

  return (
    <Link
      to={shouldLinkToBooking ? `/${houseInfo?.id}/book` : "#"}
      onClick={handleClick}
    >
      <button
        className={`${
          dateSelected || priceType !== 'night' ? "px-10" : "px-6"
        } rounded-lg flex-center bg-black h-12`}
      >
        <span className="text-white text-nowrap">
          {getButtonLabel()}
        </span>
      </button>
    </Link>
  );
};

const FooterComponent = ({
  dateSelected,
  allHouseInfo,
  numOfDays,
  tripDurationDate,
  houseInfo,
  userData,
}) => {
  const dispatch = useDispatch();
  const priceType = houseInfo?.priceType || 'night';
  const showRating = !dateSelected && priceType === 'night';

  return (
    <div className="w-full z-50 border-t border-grey-dim py-4 bg-white fixed bottom-0 justify-between px-5 flex 1xz:hidden">
      <PriceDetails
        dateSelected={dateSelected}
        allHouseInfo={allHouseInfo}
        numOfDays={numOfDays}
        tripDurationDate={tripDurationDate}
        houseInfo={houseInfo}
      />
      {showRating && <RatingDisplay houseInfo={houseInfo} />}
      <ActionButton
        userData={userData}
        dateSelected={dateSelected}
        houseInfo={houseInfo}
        scrollToSection={scrollToSection}
        dispatch={dispatch}
      />
    </div>
  );
};

// Custom hook for handling scroll behavior
const useScrollBehavior = (dispatch) => {
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > 18) {
        setTimeout(() => {
          dispatch(setMinimize(false));
        }, 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);
};

// Custom hook for handling house data
const useHouseData = (id, existingHouseInfo) => {
  const dispatch = useDispatch();

  // Check if we already know the property type from Redux
  const isKnownBackendProperty = existingHouseInfo?.isBackendProperty === true;

  const { isLoading, data } = useQuery({
    queryKey: ["roomInfo", id],
    queryFn: async () => {
      // If we already have this property in Redux and know its type
      if (isKnownBackendProperty) {
        const backendData = await getBackendPropertyById(id);
        if (backendData) {
          return mapBackendPropertyToFrontend(backendData);
        }
        return null;
      }

      // Try backend first (our primary data source)
      try {
        const backendData = await getBackendPropertyById(id);
        if (backendData) {
          return mapBackendPropertyToFrontend(backendData);
        }
      } catch (error) {
        // Backend doesn't have this property, try Supabase
        console.log('Property not found in backend, trying Supabase:', id);
      }

      // Fall back to Supabase
      return getRoomInfo(id);
    },
  });

  useEffect(() => {
    if (data) {
      // Only apply Dubai branding to Supabase properties
      const processedData = data.isBackendProperty ? data : applyDubaiBranding(data);
      dispatch(setHouseInfo({ id, data: processedData }));
      dispatch(setIsLoading(false));
    }
  }, [data, dispatch, id]);

  return { isLoading, data };
};

// Layout component for the main content
const MainContent = ({ minimize }) => (
  <div className={`${minimize ? "absolute top-20 -z-10" : ""} w-full`}>
    <TopMainCont />
    <div className="w-full flex justify-center">
      <MidMainCont />
    </div>
    <div className="w-full flex justify-center">
      <BottomMainCont />
    </div>
    <LongFooter />
  </div>
);

// Header wrapper component
const HeaderWrapper = ({
  headerRef,
  minimize,
  startScroll,
  animateHeaderClass1,
  animateHeaderClass2,
  showNav,
}) => (
  <div
    ref={headerRef}
    id="header"
    className={`bg-white ${showNav ? "hidden" : "hidden 1xz:flex"} ${
      minimize ? "z-50" : "z-10"
    } transition-all duration-[0.3s] ease-in-out ${
      !startScroll ? animateHeaderClass1 : animateHeaderClass2
    } w-full items-start justify-center`}
  >
    <Header headerRef={headerRef} />
  </div>
);

// Main HouseDetail component
const HouseDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const headerRef = useRef();
  const [showNav, setShowNav] = useState(false);

  const onHouseDetailPage = location.pathname.includes("/property/");
  const sliceName = onHouseDetailPage ? "houseSlice" : "app";

  // Redux selectors
  const { minimize, userData } = useSelector((store) => store.app);
  const { houseInfo: allHouseInfo } = useSelector((store) => store.houseDetail);
  const { selectedStartDate: startDate, selectedEndDate: endDate } =
    useSelector((store) => store.form);
  const startScroll = useSelector((store) => store[sliceName]?.startScroll);

  const houseInfo = allHouseInfo[id];
  const tripDurationDate = useFormattedDateRange(startDate, endDate);
  const numOfDays = differenceInDays(startDate, endDate);
  const dateSelected = startDate && endDate;

  // Custom hooks
  useScrollBehavior(dispatch);
  useHouseData(id, houseInfo);

  // Track scroll position to control navbar and header visibility
  // Use hysteresis to prevent vibration - different thresholds for show/hide
  useEffect(() => {
    const SHOW_THRESHOLD = 580;
    const HIDE_THRESHOLD = 520;

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

  useEffect(() => {
    updateBookingDates(id);
  }, [id]);

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem(id));

    if (startDate && endDate) {
      const formattedStartDate = format(startDate, "eee MMM dd, yyyy");

      const formattedEndDate = format(endDate, "eee MMM dd, yyyy");

      let newData = {
        ...localData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };

      if (localData) {
        localStorage.setItem(id, JSON.stringify(newData));
      }
    }
  }, [id, endDate, startDate]);

  // Animation classes
  const animateHeaderClass1 = minimize
    ? "animate-expand"
    : "max-h-[5rem] h-full";
  const animateHeaderClass2 = minimize
    ? "animate-collapse"
    : "max-h-[11rem] h-full";

  // Prevent scroll restoration
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative pb-20 1xz:pb-0 overflow-x-clip">
      <HeaderWrapper
        headerRef={headerRef}
        minimize={minimize}
        startScroll={startScroll}
        animateHeaderClass1={animateHeaderClass1}
        animateHeaderClass2={animateHeaderClass2}
        showNav={showNav}
      />

      <div className="w-full hidden 1xz:block">
        <NavBar />
      </div>

      <MainContent minimize={minimize} />

      <FooterComponent
        dateSelected={dateSelected}
        allHouseInfo={allHouseInfo}
        numOfDays={numOfDays}
        tripDurationDate={tripDurationDate}
        houseInfo={houseInfo}
        userData={userData}
      />
    </div>
  );
};

export default HouseDetail;
