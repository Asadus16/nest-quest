import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../../Modals/Modal";
import { useDispatch } from "react-redux";
import { setHoverInput } from "../../../redux/mainFormSlice";
import CheckInOption from "./DatesOption";
import Calendar from "./FormFields/Calendar";
import cross from "../../../asset/Icons_svg/cross.svg";
import { useHandleCrossClick } from "../../../hooks/MainFormContent";

// Custom hook for handling input hover state
const useInputHover = () => {
  const dispatch = useDispatch();

  const handleMouseEnter = () => dispatch(setHoverInput("when"));
  const handleMouseLeave = () => dispatch(setHoverInput(null));

  return { handleMouseEnter, handleMouseLeave };
};

// Date Display Component
const DateDisplay = ({
  startDateToShow,
  EndDateToShow,
  curSelectInput,
  whenResetRef,
  handleCrossClick,
  isHomesPage,
}) => {
  const hasDates = startDateToShow && EndDateToShow;
  const displayText = hasDates
    ? `${startDateToShow} - ${EndDateToShow}`
    : startDateToShow || EndDateToShow || (isHomesPage ? "Any Week" : "Add dates");

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col justify-center items-start">
        <p className="text-xs font-medium">{isHomesPage ? "Any Week" : "When"}</p>
        <p
          className={`${
            hasDates && curSelectInput === "when"
              ? "text-sm font-medium"
              : "font-extralight text-[0.9rem]"
          }`}
        >
          {displayText}
        </p>
      </div>
      {hasDates && curSelectInput === "when" && (
        <div
          ref={whenResetRef}
          onClick={(e) => {
            e.stopPropagation();
            handleCrossClick(e, "checkIn");
            handleCrossClick(e, "checkOut");
          }}
          className="w-[1.5rem] flex justify-center items-center z-[60] hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
        >
          <img className="h-4 w-4" src={cross} alt="" />
        </div>
      )}
    </div>
  );
};

// Main WhenDateForm Component
const WhenDateForm = ({
  onlyOneTime,
  whenRef,
  whenResetRef,
  modalRef,
  curSelectInput,
  startDateToShow,
  EndDateToShow,
  handleInputField,
}) => {
  const location = useLocation();
  const isHomesPage = location.pathname.includes("/homes");
  
  const { handleMouseEnter, handleMouseLeave } = useInputHover();
  const handleCrossClick = useHandleCrossClick();

  const isActive = curSelectInput === "checkIn" || curSelectInput === "checkOut";

  return (
    <Modal onlyOneTime={onlyOneTime}>
      <Modal.Open opens="checkIn">
        <div
          ref={whenRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`flex 1xz:w-full 1xz:relative 1smd:static ${
            isActive
              ? "shadow-checkInShadow rounded-full"
              : ""
          } justify-center items-center`}
        >
          <div
            onClick={(e) => {
              handleInputField(e.target, "checkIn");
            }}
            className={`1smd:w-[17.34rem] hover:before:content-[''] 1smd:before:w-[17.34rem] 1xz:before:w-full before:absolute before:top-0 before:h-[3.85rem] 1smd:before:left-[17.67rem] before:rounded-full 
              ${
                isActive
                  ? "rounded-full w-full bg-white"
                  : curSelectInput && !isActive
                  ? "rounded-full w-full bg-shadow-gray"
                  : "before:hover:bg-grey-light-50"
              }
              before:hover:opacity-40 flex-col flex justify-center items-center h-[3.85rem] cursor-pointer`}
          >
            <div
              className={`1smd:w-[15rem] ${isHomesPage ? "1smd:pl-2 1smd:pr-2" : "1smd:pl-0 1smd:pr-0"} ${isHomesPage ? "1xz:pl-8 1xz:pr-4" : "1xz:pl-6 1xz:pr-3"} 1xz:w-full outline-none flex justify-between items-center focus:outline-none h[2rem] placeholder:text-sm 
                ${curSelectInput && !isActive ? "bg-shadow-gray" : ""} 
                placeholder:font-extralight placeholder:text-black`}
            >
              <DateDisplay
                startDateToShow={startDateToShow}
                EndDateToShow={EndDateToShow}
                curSelectInput={curSelectInput}
                whenResetRef={whenResetRef}
                handleCrossClick={handleCrossClick}
                isHomesPage={isHomesPage}
              />
            </div>
          </div>
        </div>
      </Modal.Open>
      <Modal.Window
        resetRef={whenResetRef}
        modalRef={modalRef}
        name="checkIn"
      >
        <div className="flex flex-col justify-center items-center relative z-[60]">
          <CheckInOption />
          <Calendar />
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default WhenDateForm;

