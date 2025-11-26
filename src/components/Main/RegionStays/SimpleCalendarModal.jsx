import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  isWithinInterval,
  isBefore,
} from "date-fns";
import arrowRight from "../../../asset/Icons_svg/arrow-right.svg";
import arrowLeft from "../../../asset/Icons_svg/arrow-left.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveInput,
  setSelectedEndDate,
  setSelectedStartDate,
} from "../../../redux/mainFormSlice";

const SimpleCalendarModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [monthWidth, setMonthWidth] = useState(440);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  const selectedStartDate = useSelector((store) => store.form.selectedStartDate);
  const selectedEndDate = useSelector((store) => store.form.selectedEndDate);
  const curSelectInput = useSelector((store) => store.form.curSelectInput);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Calculate month width
  useEffect(() => {
    const findMonthWidth = () => {
      const width = window.innerWidth <= 956 ? 384 : 440;
      setMonthWidth(width);
    };

    findMonthWidth();
    window.addEventListener("resize", findMonthWidth);
    return () => window.removeEventListener("resize", findMonthWidth);
  }, []);

  const renderHeader = (month) => {
    return (
      <div className="flex pb-4 justify-center items-center py-2">
        <div className="flex items-center justify-center flex-grow text-base font-medium">
          <span>{format(month, "MMMM yyyy")}</span>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "eee";
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      days.push(
        <div
          className="flex w-[3rem] justify-center text-xs text-center"
          key={format(day, "yyyy-MM-dd")}
        >
          {format(day, dateFormat)}
        </div>
      );
    }

    return <div className="flex justify-center items-center">{days}</div>;
  };

  const renderCells = (month) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const today = new Date();

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const isPastDate =
          isSameMonth(day, monthStart) && day < today.setHours(0, 0, 0, 0);

        let cellClass = "";
        let onClickHandler = () => onDateClick(cloneDay);

        if (
          selectedStartDate &&
          selectedEndDate &&
          isWithinInterval(day, {
            start: selectedStartDate,
            end: selectedEndDate,
          })
        ) {
          if (
            isSameDay(day, selectedStartDate) &&
            isSameMonth(day, monthStart)
          ) {
            cellClass =
              "halfRightColor text-white before:bg-black before:content-[''] before:w-full before:h-full before:rounded-full before:border-[1.5px] before:border-black before:absolute top-0 before:left-0";
          } else if (
            isSameDay(day, selectedEndDate) &&
            isSameMonth(day, monthStart)
          ) {
            cellClass =
              "halfLeftColor text-white before:bg-black before:content-[''] before:w-full before:h-full before:rounded-full before:border-[1.5px] before:border-black before:absolute top-0 before:left-0";
          } else if (!isSameMonth(day, monthStart)) {
            cellClass = "bg-white text-white hidden cursor-default";
            onClickHandler = null;
          } else {
            cellClass = "bg-shadow-gray-light text-black hover:before:content-[''] hover:before:w-full hover:before:h-full hover:before:rounded-full hover:before:border-[1.5px] hover:before:border-black hover:before:absolute hover:top-0 hover:before:left-0";
          }
        } else if (
          selectedStartDate &&
          !selectedEndDate &&
          isBefore(day, selectedStartDate)
        ) {
          cellClass = "bg-white text-gray-400 line-through !cursor-default";
          onClickHandler = null;
        } else if (
          isSameDay(day, selectedStartDate) &&
          isSameMonth(day, monthStart)
        ) {
          cellClass = "bg-black text-white rounded-full";
        } else if (
          isSameDay(day, selectedEndDate) &&
          isSameMonth(day, monthStart)
        ) {
          cellClass = "bg-black text-white rounded-full";
        } else if (!isSameMonth(day, monthStart)) {
          cellClass = "bg-white text-white hidden cursor-default";
          onClickHandler = null;
        } else if (isPastDate) {
          cellClass = "bg-white text-gray-300 cursor-default";
          onClickHandler = null;
        } else {
          cellClass =
            "bg-white text-black hover:rounded-full hover:border-[1.5px] hover:border-black";
        }

        days.push(
          <div
            key={day.toString()}
            className="relative w-full 1xz:h-[3rem] 1xz:w-[3rem] h-full aspect-square flex items-center justify-center"
          >
            <div
              className={`w-full 1xz:h-[3rem] 1xz:w-[3rem] aspect-square h-full flex items-center justify-center ${
                isPastDate ? "" : "cursor-pointer"
              } ${cellClass}`}
              onClick={onClickHandler}
            >
              <span className="text-sm w-full 1xz:w-auto text-center z-20 font-medium">
                {formattedDate}
              </span>
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div
          className="flex items-center justify-center w-full mb-[2px] place-items-stretch"
          key={day.toString()}
        >
          {days}
        </div>
      );
      days = [];
    }
    return (
      <div className="flex flex-col w-full justify-between items-stretch">
        {rows}
      </div>
    );
  };

  const onDateClick = (day) => {
    // If no start date is selected, set it as start date
    if (!selectedStartDate) {
      dispatch(setSelectedStartDate(day));
      dispatch(setSelectedEndDate(null));
      dispatch(setActiveInput("checkOut"));
    }
    // If start date is selected but no end date
    else if (selectedStartDate && !selectedEndDate) {
      // If the selected day is before the start date, make it the new start date
      if (day < selectedStartDate) {
        dispatch(setSelectedStartDate(day));
        dispatch(setSelectedEndDate(null));
        dispatch(setActiveInput("checkOut"));
      }
      // If the selected day is after the start date, set it as end date
      else if (day > selectedStartDate) {
        dispatch(setSelectedEndDate(day));
        dispatch(setActiveInput("checkOut"));
      }
      // If the same day is clicked, set it as end date (same day check-in/check-out)
      else {
        dispatch(setSelectedEndDate(day));
        dispatch(setActiveInput("checkOut"));
      }
    }
    // If both dates are selected, start a new selection
    else if (selectedStartDate && selectedEndDate) {
      // If clicked date is before current start date, make it new start
      if (day < selectedStartDate) {
        dispatch(setSelectedStartDate(day));
        dispatch(setSelectedEndDate(null));
        dispatch(setActiveInput("checkOut"));
      }
      // If clicked date is between start and end, make it new start
      else if (day >= selectedStartDate && day <= selectedEndDate) {
        dispatch(setSelectedStartDate(day));
        dispatch(setSelectedEndDate(null));
        dispatch(setActiveInput("checkOut"));
      }
      // If clicked date is after end date, make it new end
      else {
        dispatch(setSelectedEndDate(day));
        dispatch(setActiveInput("checkOut"));
      }
    }
  };

  const handleScroll = (direction) => {
    const maxIndex = 20;
    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (direction === "right" && currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    if (currentIndex >= 0 && currentIndex <= 20) {
      setScrollPosition(monthWidth * currentIndex);
    }
  }, [currentIndex, monthWidth]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[53rem] max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Calendar */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="relative">
            {/* Navigation buttons */}
            <button
              disabled={currentIndex === 0}
              className={`absolute left-0 top-[1.2rem] transform -translate-y-1/2 z-10 bg-white p-2 rounded-full ${
                currentIndex === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleScroll("left")}
            >
              <img className="h-4 w-4" src={arrowLeft} alt="Previous" />
            </button>
            <button
              disabled={currentIndex === 20}
              className={`absolute right-0 top-[1.2rem] transform -translate-y-1/2 z-10 bg-white p-2 rounded-full ${
                currentIndex === 20
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleScroll("right")}
            >
              <img className="h-4 w-4" src={arrowRight} alt="Next" />
            </button>

            {/* Days header */}
            <div className="absolute top-[3.6rem] left-[2.2rem] hidden 1md:block">
              {renderDays()}
            </div>
            <div className="absolute top-[3.6rem] right-[2.2rem] hidden 1md:block">
              {renderDays()}
            </div>

            {/* Calendar scroll container */}
            <div
              className="h-full overflow-x-hidden flex justify-center overflow-y-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div
                ref={scrollContainerRef}
                style={{
                  transition: "transform 200ms ease-out",
                  transform: `translateX(-${scrollPosition}px)`,
                }}
                className="inline-flex gap-x-8 w-full h-[calc(100vh-15rem)] 1xz:h-auto flex-row"
              >
                {Array.from({ length: 23 }, (_, index) => (
                  <div
                    key={`${index}-current`}
                    className={`w-full flex flex-col ${
                      index <= 0 ? "1md:pl-8" : "1md:pl-16"
                    } justify-between h-full gap-y-6 1xz:gap-y-10 1xz:mx-6 1md:mx-1 w-full rounded-lg`}
                  >
                    <div className="flex w-full justify-center">
                      {renderHeader(addMonths(currentMonth, index))}
                    </div>
                    <div className="w-full 1md:w-auto mt-10">
                      {renderCells(addMonths(currentMonth, index))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SimpleCalendarModal;

