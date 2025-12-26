import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import arrowUp from "../../asset/Icons_svg/arrowUpword.svg";
import { setShowLogin } from "../../redux/AppSlice";
import { setIsVisible } from "../../redux/HouseDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { differenceInDays, format } from "date-fns";

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

// Custom components
const LoadingPlaceholder = () => (
  <div>
    <div className="w-40 mt-8 ml-20 h-10 bg-gray-200 animate-pulse"></div>
    <div className="w-80 mt-4 ml-20 h-10 bg-gray-200 animate-pulse"></div>
  </div>
);

// Booking form for properties for SALE
const SaleBookingForm = ({ houseInfo, userData, dispatch }) => {
  const displayPrice = getDisplayPrice(houseInfo);

  const handleContactClick = () => {
    if (!userData) {
      dispatch(setShowLogin(true));
    }
    // If logged in, could open a contact modal or redirect to contact form
  };

  return (
    <div className="rounded-xl border-[1px] w-full border-grey-dim p-6 max-w-[23.14rem]">
      <div className="flex flex-col gap-2 mb-6">
        <span className="text-2xl font-medium">
          AED {displayPrice?.toLocaleString()}
        </span>
        <span className="text-sm text-grey font-light">Property for sale</span>
      </div>

      <div className="border border-border-color rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <svg className="w-5 h-5 text-grey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{houseInfo?.type || 'Property'}</span>
            <span className="text-xs text-grey">{houseInfo?.bedrooms} bed · {houseInfo?.bathrooms} bath</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-grey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-grey">{houseInfo?.city}, {houseInfo?.country}</span>
        </div>
      </div>

      <button
        onClick={handleContactClick}
        className="w-full rounded-lg flex-center bg-black h-12 mb-3"
      >
        <span className="text-white">Contact Agent</span>
      </button>

      <button
        onClick={handleContactClick}
        className="w-full rounded-lg flex-center border border-black h-12"
      >
        <span className="text-black">Schedule Viewing</span>
      </button>

      <p className="text-xs text-grey text-center mt-4">
        Interested in this property? Get in touch for more details.
      </p>
    </div>
  );
};

// Helper to calculate months between two dates
const getMonthsDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
};

// Booking form for MONTHLY rental properties
const MonthlyRentBookingForm = ({ houseInfo, userData, dispatch, scrollToSection }) => {
  const displayPrice = getDisplayPrice(houseInfo);
  const { selectedStartDate: startDate, selectedEndDate: endDate } = useSelector((store) => store.form);
  const minimumStay = houseInfo?.minimum_stay || 1;

  const handleContactClick = () => {
    if (!userData) {
      dispatch(setShowLogin(true));
    }
  };

  const formatMoveInMonth = startDate
    ? format(new Date(startDate), "MMMM yyyy")
    : null;

  const formatMoveOutMonth = endDate
    ? format(new Date(endDate), "MMMM yyyy")
    : null;

  const numMonths = getMonthsDifference(startDate, endDate);
  const hasCompleteSelection = startDate && endDate && numMonths > 0;

  // Calculate total rent
  const totalRent = hasCompleteSelection ? displayPrice * numMonths : 0;

  return (
    <div className="rounded-xl border-[1px] w-full border-grey-dim p-6 max-w-[23.14rem]">
      <div className="flex flex-col gap-2 mb-6">
        <span className="text-2xl font-light">
          AED {displayPrice?.toLocaleString()} <span className="text-base">/ month</span>
        </span>
        <span className="text-sm text-grey font-light">Monthly rental</span>
      </div>

      <div className="cursor-pointer border my-4 border-border-color rounded-lg">
        <div className="flex border-b border-border-color">
          <div
            onClick={scrollToSection("calendar")}
            className="w-1/2 h-14 flex justify-center flex-col px-3 border-r border-border-color"
          >
            <span className="text-[10px] whitespace-nowrap font-semibold">
              MOVE-IN
            </span>
            <span className={`text-sm whitespace-nowrap font-normal ${startDate ? 'text-black' : 'text-grey'}`}>
              {formatMoveInMonth || 'Select'}
            </span>
          </div>
          <div
            onClick={scrollToSection("calendar")}
            className="w-1/2 h-14 flex justify-center flex-col px-3"
          >
            <span className="text-[10px] whitespace-nowrap font-semibold">
              MOVE-OUT
            </span>
            <span className={`text-sm whitespace-nowrap font-normal ${endDate ? 'text-black' : 'text-grey'}`}>
              {formatMoveOutMonth || 'Select'}
            </span>
          </div>
        </div>
        <div className="w-full h-14 flex justify-center flex-col px-3">
          <span className="text-[10px] font-semibold">DURATION</span>
          <span className="text-sm text-grey font-normal">
            {hasCompleteSelection
              ? `${numMonths} month${numMonths > 1 ? 's' : ''}`
              : `Min. ${minimumStay} month${minimumStay > 1 ? 's' : ''}`}
          </span>
        </div>
      </div>

      <button
        onClick={handleContactClick}
        className="w-full rounded-lg flex-center bg-black h-12 mb-3"
      >
        <span className="text-white">Inquire Now</span>
      </button>

      <div className="w-full flex-center">
        <span className="text-sm pt-2 font-light text-grey">
          Contact us for availability and terms
        </span>
      </div>

      <div className="w-full mt-6 pt-4 border-t border-grey-dim">
        {hasCompleteSelection ? (
          <>
            <div className="flex justify-between mb-2">
              <span className="font-light">AED {displayPrice?.toLocaleString()} x {numMonths} month{numMonths > 1 ? 's' : ''}</span>
              <span className="font-light">AED {totalRent?.toLocaleString()}</span>
            </div>
            {houseInfo?.service_charges_rent > 0 && (
              <div className="flex justify-between mb-2 text-sm text-grey">
                <span className="font-light">Service charges</span>
                <span className="font-light">AED {houseInfo.service_charges_rent?.toLocaleString()}</span>
              </div>
            )}
            <div className="flex py-3 border-t border-grey-dim justify-between">
              <span className="font-medium">Total rent</span>
              <span className="font-medium">AED {totalRent?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-grey mt-2">
              <span className="font-light">Security deposit (refundable)</span>
              <span className="font-light">
                {houseInfo?.deposit_required > 0
                  ? `AED ${houseInfo.deposit_required?.toLocaleString()}`
                  : 'Contact for details'}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between mb-2">
              <span className="font-light">Monthly rent</span>
              <span className="font-light">AED {displayPrice?.toLocaleString()}</span>
            </div>
            {houseInfo?.service_charges_rent > 0 && (
              <div className="flex justify-between mb-2 text-sm text-grey">
                <span className="font-light">Service charges</span>
                <span className="font-light">AED {houseInfo.service_charges_rent?.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-grey">
              <span className="font-light">Security deposit</span>
              <span className="font-light">
                {houseInfo?.deposit_required > 0
                  ? `AED ${houseInfo.deposit_required?.toLocaleString()}`
                  : 'Contact for details'}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const DateSelection = ({
  scrollToSection,

  formatStartDate,
  formatEndDate,
}) => {
  const {
    guestPlural,
    petPlural,
    adultCount,
    childCount,
    infantCount,
    petsCount: petCount,
    selectedStartDate: startDate,
    selectedEndDate: endDate,
  } = useSelector((store) => store.form);
  return (
    <div className="cursor-pointer border my-4 border-border-color rounded-lg h-28">
      <div className="w-full h-1/2  flex border-b border-border-color">
        <div
          onClick={scrollToSection("calendar")}
          className="w-1/2 h-full border-r-[1px] border-border-color flex justify-center flex-col px-3"
        >
          <span className="text-[10px] whitespace-nowrap font-semibold">
            CHECK-IN
          </span>
          <span className="text-sm whitespace-nowrap text-grey font-normal">
            {startDate ? formatStartDate : "Add date"}
          </span>
        </div>
        <div
          onClick={scrollToSection("calendar")}
          className="w-1/2 h-full flex justify-center flex-col px-3"
        >
          <span className="text-[10px] font-semibold">CHECKOUT</span>
          <span className="text-sm text-grey whitespace-nowrap font-normal">
            {endDate ? formatEndDate : "Add date"}
          </span>
        </div>
      </div>
      <GuestInfo
        scrollToSection={scrollToSection}
        guestDetails={
          adultCount + childCount > 0
            ? `${adultCount + childCount} guest${guestPlural} ${
                infantCount
                  ? `${infantCount} infant${infantCount > 1 ? "s" : ""}${
                      petCount ? "," : ""
                    }`
                  : ""
              } ${petCount ? `${petCount} pet${petPlural}` : ""}`
            : "Add guest"
        }
      />
    </div>
  );
};

const GuestInfo = ({ scrollToSection, guestDetails }) => (
  <div className="flex h-1/2 items-center px-3 w-full justify-between cursor-pointer">
    <div onClick={scrollToSection("header")} className="flex flex-col">
      <span className="text-[10px] font-semibold">GUESTS</span>
      <span className="text-sm font-light">{guestDetails}</span>
    </div>
    <img className="h-4 w-4" src={arrowUp} alt="arrow up" />
  </div>
);

const PricingDetails = ({ price, numOfDays, houseInfo }) => {
  // Use rawPrice for backend properties, otherwise use price
  const displayPrice = getDisplayPrice(houseInfo) || price;
  const nights = Math.abs(numOfDays);
  const nightlyTotal = Math.ceil(displayPrice * nights);

  // Get pricing from backend or use defaults
  const isBackendProperty = houseInfo?.isBackendProperty;
  const cleaningFee = isBackendProperty ? (houseInfo?.cleaning_fee || 0) : 0;
  const securityDeposit = isBackendProperty ? (houseInfo?.security_deposit || 0) : 0;
  const taxPercentage = isBackendProperty ? (houseInfo?.tax_percentage || 0) : 0;

  // Calculate tax on nightly total
  const taxAmount = taxPercentage > 0 ? Math.ceil(nightlyTotal * (taxPercentage / 100)) : 0;

  // Total before security deposit (security deposit is refundable)
  const totalBeforeDeposit = nightlyTotal + cleaningFee + taxAmount;
  const grandTotal = totalBeforeDeposit + securityDeposit;

  return (
    <div className="w-full mt-6">
      {/* Nightly rate breakdown */}
      <div className="flex justify-between">
        <span className="font-light">{`AED ${displayPrice} x ${nights} night${nights !== 1 ? 's' : ''}`}</span>
        <span className="font-light">AED {nightlyTotal.toLocaleString()}</span>
      </div>

      {/* Cleaning fee */}
      {cleaningFee > 0 && (
        <div className="flex py-2 justify-between">
          <span className="font-light">Cleaning fee</span>
          <span className="font-light">AED {cleaningFee.toLocaleString()}</span>
        </div>
      )}

      {/* Tax if applicable */}
      {taxAmount > 0 && (
        <div className="flex py-2 justify-between">
          <span className="font-light">Taxes ({taxPercentage}%)</span>
          <span className="font-light">AED {taxAmount.toLocaleString()}</span>
        </div>
      )}

      {/* Total before security deposit */}
      <div className="flex py-4 border-b border-grey-dim justify-between">
        <span className="font-medium">Total</span>
        <span className="font-medium">AED {totalBeforeDeposit.toLocaleString()}</span>
      </div>

      {/* Security deposit (refundable) */}
      {securityDeposit > 0 && (
        <div className="flex py-4 border-b border-grey-dim justify-between">
          <div className="flex flex-col">
            <span className="font-light">Security deposit</span>
            <span className="text-xs text-grey">Refundable</span>
          </div>
          <span className="font-light">AED {securityDeposit.toLocaleString()}</span>
        </div>
      )}

      {/* Grand total including deposit */}
      {securityDeposit > 0 && (
        <div className="flex justify-between pt-4">
          <span className="font-medium">Total due at booking</span>
          <span className="font-medium">AED {grandTotal.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
};

const scrollToSection = (sectionId) => (event) => {
  event.preventDefault();
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const BookingForm = () => {
  const [formatStartDate, setFormatStartDate] = useState(null);
  const [formatEndDate, setFormatEndDate] = useState(null);
  const { id } = useParams();
  const { isLoading, houseInfo: allHouseInfo } = useSelector((store) => store.houseDetail);
  const houseInfo = allHouseInfo?.[id] || allHouseInfo;
  const location = useLocation();
  const { userData } = useSelector((store) => store.app);
  const onHouseDetailPage = location.pathname.includes("/property");
  const dispatch = useDispatch();
  const priceLabel = getPriceLabel(houseInfo?.priceType);
  const priceType = houseInfo?.priceType || 'night';

  const elementRef = useRef(null);
  const { selectedStartDate: startDate, selectedEndDate: endDate } =
    useSelector((store) => store.form);
  let numOfDays = differenceInDays(startDate, endDate);

  useEffect(() => {
    if (startDate) {
      setFormatStartDate(format(startDate, "MM/dd/yyyy"));
    }
    if (endDate) {
      setFormatEndDate(format(endDate, "MM/dd/yyyy"));
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        dispatch(setIsVisible(entry.isIntersecting));
      },
      {
        root: null,
        rootMargin: "-90px",
        threshold: 0,
      }
    );

    const handleScroll = () => {
      if (elementRef?.current) {
        observer.observe(elementRef?.current);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial call to handleScroll to start observing
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (elementRef?.current) {
        observer.unobserve(elementRef?.current);
      }
    };
  }, [dispatch]);

  // Render different booking forms based on property type
  const renderBookingForm = () => {
    // For sale properties
    if (priceType === 'total') {
      return (
        <SaleBookingForm
          houseInfo={houseInfo}
          userData={userData}
          dispatch={dispatch}
        />
      );
    }

    // For monthly rental properties
    if (priceType === 'month') {
      return (
        <MonthlyRentBookingForm
          houseInfo={houseInfo}
          userData={userData}
          dispatch={dispatch}
          scrollToSection={scrollToSection}
        />
      );
    }

    // Default: Short-term rental (nightly)
    if (!startDate || !endDate) {
      return (
        <div className="rounded-xl border-[1px] w-full border-grey-dim p-6 max-w-[23.14rem]">
          <h1 className="text-2xl font-light mb-6">Add dates for prices</h1>
          <DateSelection
            scrollToSection={scrollToSection}
            startDate={startDate}
            endDate={endDate}
            formatStartDate={formatStartDate}
            formatEndDate={formatEndDate}
          />

          <button
            disabled
            className="w-full rounded-lg flex-center bg-black h-12"
          >
            <span className="text-white text-nowrap">
              Check availability
            </span>
          </button>
        </div>
      );
    }

    const displayPrice = getDisplayPrice(houseInfo);

    return (
      <div className="max-w-[23.14rem] min-w-64 w-full shadow-priceCardShadow border-[1px] p-6 rounded-xl border-grey-dim ">
        <span className="text-2xl font-light">
          AED {displayPrice}{priceLabel && <span className="text-base"> {priceLabel}</span>}
        </span>
        <DateSelection
          scrollToSection={scrollToSection}
          startDate={startDate}
          endDate={endDate}
          formatStartDate={formatStartDate}
          formatEndDate={formatEndDate}
        />

        <Link
          to={userData ? `/${houseInfo.id}/book` : "#"}
          onClick={(e) => !userData && dispatch(setShowLogin(true))}
        >
          <button
            ref={elementRef}
            className="w-full rounded-lg flex-center bg-black h-12"
          >
            <span className="text-white">Reserve</span>
          </button>
        </Link>
        <div className="w-full flex-center mt-2">
          <span className="text-sm pt-2 font-light">
            You won't be charged yet
          </span>
        </div>
        <PricingDetails price={displayPrice} numOfDays={numOfDays} houseInfo={houseInfo} />
      </div>
    );
  };

  return (
    <div className="max-w-[26.32rem] 1smd:ml-20 ml-10 w-full">
      {isLoading ? (
        <LoadingPlaceholder />
      ) : (
        <div
          className={`pt-8 mb-20 ${
            onHouseDetailPage ? "hidden 1xz:flex" : "flex"
          } justify-end sticky top-20`}
        >
          {renderBookingForm()}
        </div>
      )}
    </div>
  );
};

export default BookingForm;
