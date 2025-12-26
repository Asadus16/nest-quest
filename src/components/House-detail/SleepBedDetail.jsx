import React from "react";
import kitchen from "../../asset/Icons_svg/kitchen.svg";
import car from "../../asset/Icons_svg/car.svg";
import wifi from "../../asset/Icons_svg/wifi.svg";
import tub from "../../asset/Icons_svg/tub.svg";
import pets from "../../asset/Icons_svg/pets.svg";
import tv from "../../asset/Icons_svg/tv.svg";
import lift from "../../asset/Icons_svg/Lift.svg";
import airConditioner from "../../asset/Icons_svg/AC.svg";
import carbon from "../../asset/Icons_svg/Carbon.svg";
import alarm from "../../asset/Icons_svg/Alarm.svg";
import bed from "../../asset/Icons_svg/bed.svg";
import Calendar from "../Header/Form/FormFields/Calendar";
import {
  setSelectedEndDate,
  setSelectedStartDate,
} from "../../redux/mainFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { differenceInCalendarDays, format } from "date-fns";
import { useParams } from "react-router";

// Bedroom Card Component (For individual bedroom display)
const BedroomCard = ({ imageUrl, bedType, bedroomName }) => (
  <div className="w-80 shrink-0 flex justify-center flex-col">
    <div className="h-52 flex items-center justify-center w-full">
      <img
        className="rounded-xl object-cover w-full h-full"
        src={imageUrl}
        alt={bedroomName}
        style={{
          scrollSnapAlign: "start",
          flexShrink: 0,
          scrollSnapStop: "always",
        }}
      />
    </div>
    <div className="flex flex-col">
      <span className="mt-4 font-medium">{bedroomName}</span>
      <span className="text-sm font-light">{bedType}</span>
    </div>
  </div>
);

// Empty Bedroom Placeholder (Fallback if no images are available)
const EmptyBedroomPlaceholder = ({ bedType }) => (
  <div className="border-[1px] max-w-56 w-full flex-center rounded-xl h-36">
    <div className="w-44 flex justify-between flex-col h-24">
      <img src={bed} className="w-7 h-7" alt="bed icon" />
      <div className="flex flex-col">
        <span className="text-lg font-medium">Bedroom 1</span>
        <span className="text-sm font-light">{bedType}</span>
      </div>
    </div>
  </div>
);

// Main Bedroom Section Component
const BedroomSection = ({ houseInfo }) => {
  const { sleep_bed_1_link, sleep_bed_2_link } = houseInfo || {};

  return (
    <div className="py-12 w-full flex justify-between flex-col">
      <h3 className="text-2xl leading-6 font-medium pb-6">
        Where you'll sleep
      </h3>

      {/* Render empty placeholder if no bed images are available */}
      {!sleep_bed_1_link ? (
        <EmptyBedroomPlaceholder bedType="1 double bed" />
      ) : (
        <div
          className="flex gap-4 w-full overflow-x-auto min-w-5rem"
          style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
        >
          <BedroomCard
            imageUrl={sleep_bed_1_link}
            bedroomName="Bedroom 1"
            bedType="1 double bed"
          />

          {/* Render second bedroom only if the second bed image is available */}
          {sleep_bed_2_link && (
            <BedroomCard
              imageUrl={sleep_bed_2_link}
              bedroomName="Bedroom 2"
              bedType="1 queen bed"
            />
          )}
        </div>
      )}
    </div>
  );
};

const AmenityItem = ({ iconSrc, label, isAvailable = true }) => (
  <div className="w-1/2 pb-4 gap-4 flex">
    <img className="h-6 w-6" src={iconSrc} alt={`${label} icon`} />
    <span className={`font-light ${!isAvailable ? "line-through" : ""}`}>
      {label}
    </span>
  </div>
);

// Icon mapping for amenity names
const AMENITY_ICONS = {
  'kitchen': kitchen,
  'wifi': wifi,
  'wi-fi': wifi,
  'internet': wifi,
  'parking': car,
  'car': car,
  'garage': car,
  'hot tub': tub,
  'jacuzzi': tub,
  'pool': tub,
  'swimming pool': tub,
  'pets': pets,
  'pet friendly': pets,
  'pets allowed': pets,
  'tv': tv,
  'television': tv,
  'cable': tv,
  'lift': lift,
  'elevator': lift,
  'air conditioning': airConditioner,
  'ac': airConditioner,
  'a/c': airConditioner,
  'air conditioner': airConditioner,
  'carbon monoxide alarm': carbon,
  'carbon monoxide detector': carbon,
  'smoke alarm': alarm,
  'smoke detector': alarm,
  'fire alarm': alarm,
};

// Default amenities to show if no amenities from backend
const DEFAULT_AMENITIES = [
  { iconSrc: kitchen, label: "Kitchen" },
  { iconSrc: wifi, label: "WiFi" },
  { iconSrc: car, label: "Free parking" },
  { iconSrc: airConditioner, label: "Air conditioning" },
];

// Get icon for amenity name (case-insensitive matching)
const getAmenityIcon = (amenityName) => {
  const lowerName = amenityName.toLowerCase();

  // Try exact match first
  if (AMENITY_ICONS[lowerName]) {
    return AMENITY_ICONS[lowerName];
  }

  // Try partial match
  for (const [key, icon] of Object.entries(AMENITY_ICONS)) {
    if (lowerName.includes(key) || key.includes(lowerName)) {
      return icon;
    }
  }

  // Default icon
  return kitchen;
};

const AmenitiesSection = ({ houseInfo }) => {
  // Get amenities from houseInfo or use defaults
  const amenitiesList = houseInfo?.amenitiesList || [];

  // If we have backend amenities, use them; otherwise use defaults
  const displayAmenities = amenitiesList.length > 0
    ? amenitiesList.map(amenity => ({
        iconSrc: getAmenityIcon(amenity.name || amenity),
        label: amenity.name || amenity,
        isAvailable: true,
      }))
    : DEFAULT_AMENITIES;

  return (
  <div
    id="Amenities"
    className="py-12 scroll-mt-20 border-t border-grey-dim relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-grey-dim"
  >
    <div className="h-full">
      <h3 className="text-2xl leading-6 font-medium pb-6">
        What this place offers
      </h3>
      <div className="flex flex-col 1smm:flex-row 1xz:flex-wrap">
        {/* Map through amenities array to render each item */}
        {displayAmenities.map(({ iconSrc, label, isAvailable }, index) => (
          <AmenityItem
            key={`${label}-${index}`}
            iconSrc={iconSrc}
            label={label}
            isAvailable={isAvailable}
          />
        ))}
      </div>
    </div>
  </div>
  );
};

// Component for clearing the date selection
const ClearDatesButton = ({ onClear }) => (
  <div
    onClick={onClear}
    className="w-full cursor-pointer flex items-center justify-end pr-4"
  >
    <span className="underline text-sm font-medium">Clear dates</span>
  </div>
);

// Function to format the date range or show default text
const DateRangeDisplay = ({
  startDate,
  endDate,
  formattedStartDate,
  formattedEndDate,
}) => {
  return startDate && endDate ? (
    <DateRange startDate={formattedStartDate} endDate={formattedEndDate} />
  ) : (
    <span className="text-sm font-light text-grey">
      Add your travel dates for exact pricing
    </span>
  );
};

// Helper to get the correct display price (rawPrice for backend, price for Supabase)
const getDisplayPrice = (houseInfo) => {
  if (houseInfo?.isBackendProperty && houseInfo?.rawPrice !== undefined) {
    return houseInfo.rawPrice;
  }
  return houseInfo?.price;
};

// Calendar section for properties FOR SALE - shows inquiry info instead of calendar
const SaleCalendarSection = ({ houseInfo }) => {
  const displayPrice = getDisplayPrice(houseInfo);

  return (
    <div className="1xz:py-12 pt-12">
      <div className="flex flex-col">
        <h3 id="calendar" className="text-2xl leading-6 font-medium">
          Interested in this property?
        </h3>
        <div className="h-9 flex pt-2 items-start">
          <span className="text-sm font-light text-grey">
            Contact us for viewing appointments and more details
          </span>
        </div>

        {/* Property highlights for sale */}
        <div className="w-full border border-border-color rounded-xl p-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-grey">Property Type</span>
              <span className="font-medium">{houseInfo?.type || 'Property'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-grey">Location</span>
              <span className="font-medium">{houseInfo?.city}, {houseInfo?.country}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-grey">Bedrooms</span>
              <span className="font-medium">{houseInfo?.bedrooms || 0}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-grey">Bathrooms</span>
              <span className="font-medium">{houseInfo?.bathrooms || 0}</span>
            </div>
            {houseInfo?.property_size && (
              <div className="flex flex-col col-span-2">
                <span className="text-sm text-grey">Property Size</span>
                <span className="font-medium">{houseInfo.property_size} sq ft</span>
              </div>
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-grey-dim">
            <div className="flex justify-between items-center">
              <span className="text-grey">Asking Price</span>
              <span className="text-2xl font-medium">AED {displayPrice?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Month Selector Component for monthly rentals with range selection
const MonthSelector = ({ startMonth, endMonth, onMonthSelect, minimumStay = 1, selectionMode }) => {
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
  const currentMonthIndex = new Date().getMonth();
  const currentYearActual = new Date().getFullYear();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevYear = () => {
    if (currentYear > currentYearActual) {
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  // Convert date to comparable number (year * 12 + month)
  const dateToMonthNumber = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return d.getFullYear() * 12 + d.getMonth();
  };

  const monthToNumber = (year, monthIndex) => year * 12 + monthIndex;

  const isMonthDisabled = (monthIndex) => {
    const thisMonthNum = monthToNumber(currentYear, monthIndex);
    const currentMonthNum = monthToNumber(currentYearActual, currentMonthIndex);

    // Disable past months
    if (thisMonthNum < currentMonthNum) {
      return true;
    }

    // When selecting end month, disable months that are too close to start
    if (selectionMode === 'end' && startMonth) {
      const startMonthNum = dateToMonthNumber(startMonth);
      // Disable the start month itself and months before minimum stay period
      if (thisMonthNum <= startMonthNum || thisMonthNum < startMonthNum + minimumStay) {
        return true;
      }
    }

    return false;
  };

  const isStartMonth = (monthIndex) => {
    if (!startMonth) return false;
    const d = new Date(startMonth);
    return d.getMonth() === monthIndex && d.getFullYear() === currentYear;
  };

  const isEndMonth = (monthIndex) => {
    if (!endMonth) return false;
    const d = new Date(endMonth);
    return d.getMonth() === monthIndex && d.getFullYear() === currentYear;
  };

  const isInRange = (monthIndex) => {
    if (!startMonth || !endMonth) return false;
    const thisMonthNum = monthToNumber(currentYear, monthIndex);
    const startMonthNum = dateToMonthNumber(startMonth);
    const endMonthNum = dateToMonthNumber(endMonth);
    return thisMonthNum > startMonthNum && thisMonthNum < endMonthNum;
  };

  const handleMonthClick = (monthIndex) => {
    if (isMonthDisabled(monthIndex)) return;
    const selectedDate = new Date(currentYear, monthIndex, 1);
    onMonthSelect(selectedDate);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Year Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevYear}
          disabled={currentYear <= currentYearActual}
          className={`p-2 rounded-full ${currentYear <= currentYearActual ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-lg font-medium">{currentYear}</span>
        <button
          onClick={handleNextYear}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Month Grid */}
      <div className="grid grid-cols-3 gap-2">
        {months.map((month, index) => {
          const disabled = isMonthDisabled(index);
          const isStart = isStartMonth(index);
          const isEnd = isEndMonth(index);
          const inRange = isInRange(index);

          return (
            <button
              key={month}
              onClick={() => handleMonthClick(index)}
              disabled={disabled && !isStart}
              className={`
                py-3 px-2 rounded-lg text-sm font-medium transition-colors
                ${isStart || isEnd
                  ? 'bg-black text-white'
                  : disabled
                    ? 'text-gray-300 cursor-not-allowed bg-transparent'
                    : inRange
                      ? 'bg-gray-100 text-black'
                      : 'hover:bg-gray-100 text-black border border-gray-200'
                }
              `}
            >
              {month.slice(0, 3)}
            </button>
          );
        })}
      </div>

      {/* Selection hint */}
      <p className="text-xs text-grey text-center mt-4">
        {selectionMode === 'start'
          ? 'Select move-in month'
          : `Select move-out month (min. ${minimumStay} month${minimumStay > 1 ? 's' : ''} stay)`
        }
      </p>
    </div>
  );
};

// Calculate months between two dates
const getMonthsDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
};

// Calendar section for MONTHLY rental properties
const MonthlyCalendarSection = ({ houseInfo }) => {
  const dispatch = useDispatch();
  const startDate = useSelector((store) => store.form.selectedStartDate);
  const endDate = useSelector((store) => store.form.selectedEndDate);
  const displayPrice = getDisplayPrice(houseInfo);
  const minimumStay = houseInfo?.minimum_stay || 1;

  // Determine selection mode
  const selectionMode = !startDate ? 'start' : !endDate ? 'end' : 'complete';

  const handleMonthSelect = (date) => {
    if (selectionMode === 'start' || selectionMode === 'complete') {
      // Start new selection
      dispatch(setSelectedStartDate(date));
      dispatch(setSelectedEndDate(null));
    } else if (selectionMode === 'end') {
      // Complete selection with end date
      dispatch(setSelectedEndDate(date));
    }
  };

  const clearSelectedDates = () => {
    dispatch(setSelectedStartDate(null));
    dispatch(setSelectedEndDate(null));
  };

  const formatSelectedMonth = (date) => {
    if (!date) return null;
    return format(new Date(date), "MMM yyyy");
  };

  const numMonths = getMonthsDifference(startDate, endDate);

  function calendarTitle() {
    if (!startDate) {
      return "Select move-in month";
    } else if (!endDate) {
      return "Select move-out month";
    } else {
      return `${numMonths} month${numMonths !== 1 ? 's' : ''} rental`;
    }
  }

  return (
    <div className="1xz:py-12 pt-12">
      <div className="flex flex-col">
        <h3 id="calendar" className="text-2xl leading-6 font-medium">
          {calendarTitle()}
        </h3>

        <div className="h-9 flex pt-2 items-start">
          <div className="flex-center gap-2">
            {startDate ? (
              <>
                <span className="text-sm text-gray-500 font-light">{formatSelectedMonth(startDate)}</span>
                <span className="text-sm text-gray-400">→</span>
                <span className={`text-sm font-light ${endDate ? 'text-gray-500' : 'text-grey'}`}>
                  {endDate ? formatSelectedMonth(endDate) : 'Select move-out'}
                </span>
              </>
            ) : (
              <span className="text-sm font-light text-grey">
                Choose your move-in and move-out months
              </span>
            )}
          </div>
        </div>

        {/* Rental terms info */}
        <div className="w-full border border-border-color rounded-lg p-4 mt-2 mb-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex flex-col">
              <span className="text-sm text-grey">Monthly Rent</span>
              <span className="font-medium">AED {displayPrice?.toLocaleString()}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-sm text-grey">
                {numMonths > 0 ? 'Duration' : 'Minimum Stay'}
              </span>
              <span className="font-medium">
                {numMonths > 0
                  ? `${numMonths} month${numMonths !== 1 ? 's' : ''}`
                  : `${minimumStay} month${minimumStay > 1 ? 's' : ''}`
                }
              </span>
            </div>
          </div>
          {numMonths > 0 && (
            <div className="flex justify-between items-center pt-3 border-t border-grey-dim mb-3">
              <span className="text-sm text-grey">Total Rent</span>
              <span className="font-medium">AED {(displayPrice * numMonths)?.toLocaleString()}</span>
            </div>
          )}
          {houseInfo?.deposit_required > 0 && (
            <div className={`flex justify-between items-center ${numMonths > 0 ? '' : 'pt-3 border-t border-grey-dim'}`}>
              <div className="flex flex-col">
                <span className="text-sm text-grey">Security Deposit</span>
                <span className="text-xs text-grey">Refundable</span>
              </div>
              <span className="font-medium">AED {houseInfo.deposit_required?.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Month Selector */}
        <div className="w-full flex pt-4 justify-center items-center">
          <MonthSelector
            startMonth={startDate}
            endMonth={endDate}
            onMonthSelect={handleMonthSelect}
            minimumStay={minimumStay}
            selectionMode={selectionMode === 'complete' ? 'start' : selectionMode}
          />
        </div>

        {/* Clear selection button */}
        {startDate && <ClearDatesButton onClear={clearSelectedDates} />}
      </div>
    </div>
  );
};

// Default calendar section for SHORT-TERM rentals (nightly)
const ShortTermCalendarSection = ({ houseInfo }) => {
  const dispatch = useDispatch();

  const startDate = useSelector((store) => store.form.selectedStartDate);
  const endDate = useSelector((store) => store.form.selectedEndDate);
  // Custom handler for clearing the dates, using Redux dispatch
  const clearSelectedDates = () => {
    dispatch(setSelectedStartDate(null));
    dispatch(setSelectedEndDate(null));
  };

  let formatStartDate = startDate && format(new Date(startDate), "dd MMM yyyy");
  let formatEndDate = endDate && format(new Date(endDate), "dd MMM yyyy");

  let numOfNights = Math.abs(differenceInCalendarDays(startDate, endDate));

  function calendarTitle() {
    if (!startDate && !endDate) {
      return "Select check-In date";
    } else if (startDate && !endDate) {
      return "Select checkout date";
    } else {
      return `${numOfNights} nights in ${houseInfo?.city}`;
    }
  }

  return (
    <div className="1xz:py-12 pt-12">
      <div className="flex flex-col">
        <h3 id="calendar" className="text-2xl leading-6 font-medium">
          {calendarTitle()}
        </h3>

        {/* Date range or prompt to add dates */}
        <div className="h-9 flex pt-2 items-start">
          <div className="flex-center gap-1">
            <DateRangeDisplay
              startDate={startDate}
              endDate={endDate}
              formattedStartDate={formatStartDate}
              formattedEndDate={formatEndDate}
            />
          </div>
        </div>

        {/* Calendar display */}
        <div className="w-full flex pt-4 justify-center items-center">
          <Calendar />
        </div>

        {/* Clear dates button */}
        <ClearDatesButton onClear={clearSelectedDates} />
      </div>
    </div>
  );
};

// Main CalendarSection that renders based on property type
const CalendarSection = ({ houseInfo }) => {
  const priceType = houseInfo?.priceType || 'night';

  // For sale properties - show inquiry section
  if (priceType === 'total') {
    return <SaleCalendarSection houseInfo={houseInfo} />;
  }

  // For monthly rentals - show move-in date selector
  if (priceType === 'month') {
    return <MonthlyCalendarSection houseInfo={houseInfo} />;
  }

  // Default: short-term rentals (nightly)
  return <ShortTermCalendarSection houseInfo={houseInfo} />;
};

const DateRange = ({ startDate, endDate }) => {
  return (
    <>
      <span className="text-sm text-gray-500 font-light">{startDate}</span>
      <span className="flex-center">-</span>
      <span className="text-sm text-gray-500 font-light">{endDate}</span>
    </>
  );
};

// Main component

const SleepBedDetail = () => {
  const { id } = useParams();

  const houseInfo = useSelector((store) => store.houseDetail.houseInfo[id]);
  return (
    <div className="w-full">
      <BedroomSection houseInfo={houseInfo}></BedroomSection>
      <AmenitiesSection houseInfo={houseInfo}></AmenitiesSection>
      <CalendarSection houseInfo={houseInfo}></CalendarSection>
    </div>
  );
};

export default SleepBedDetail;
