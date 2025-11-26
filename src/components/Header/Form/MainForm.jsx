import React, { useEffect, useState } from "react";
import MainFormContent from "../../../hooks/MainFormContent";
import ReactDOM from "react-dom";
import searchIcon from "../../../asset/Icons_svg/search-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveInput,
  setMinimizeFormBtn,
  setOpenName,
} from "../../../redux/mainFormSlice";
import { setMinimize, setStartScroll } from "../../../redux/AppSlice";

import { useLocation } from "react-router";

// Custom hook to manage form visibility and effects
const useFormVisibility = () => {
  const minimize = useSelector((store) => store.app.minimize);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (minimize) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [minimize]);

  return isVisible;
};

// Custom hook to manage form state and scroll behavior
const useFormStateManager = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const onHouseDetailPage = location.pathname.includes("/house/");
  const sliceName = onHouseDetailPage ? "houseSlice" : "app";

  useEffect(() => {
    if (location.pathname === "/house") {
      dispatch(setStartScroll(false));
    }
  }, [dispatch, location.pathname]);

  return { onHouseDetailPage, sliceName };
};

// Custom hook to handle minimize button effects
const useMinimizeButtonEffect = (
  minimizeFormBtn,
  minimize,
  dateOption,
  dispatch
) => {
  useEffect(() => {
    if (!minimize) return;

    const buttonActions = {
      anywhere: () => {
        dispatch(setActiveInput("destination"));
        setTimeout(() => dispatch(setOpenName("destination")), 200);
      },
      week: () => {
        const inputType = dateOption === "dates" ? "checkIn" : dateOption;
        dispatch(setActiveInput(inputType));
        setTimeout(() => dispatch(setOpenName(inputType)), 200);
      },
      guest: () => {
        dispatch(setActiveInput("addGuest"));
        setTimeout(() => dispatch(setOpenName("addGuest")), 200);
      },
    };

    const action = buttonActions[minimizeFormBtn];
    if (action) action();
  }, [minimizeFormBtn, dispatch, minimize, dateOption]);
};

// Helper function to generate form classes
const getFormClasses = (minimize, startScroll, curSelectInput, isHomesPage = false) => {
  const styleForBefore = `before:content-[''] ${
    !startScroll
      ? minimize && curSelectInput
        ? "before:animate-bgShadow"
        : "before:bg-white"
      : "before:bg-shadow-gray"
  } before:transition-all before:duration-500 before:rounded-full before:z-[2] ease-in-out before:h-full before:w-full before:absolute before:top-0`;

  // When scrolled and NOT in minimize state - apply scale with width override and reduced height
  // Increase width for homes page to accommodate longer labels
  const compactWidth = isHomesPage ? "w-[40rem]" : "w-[25rem]";
  // Increased height for all pages to allow more padding
  const compactHeight = "h-[4.5rem]";
  const onScrollProperty =
    `1md:translate-x-0 translate-x-6 border-[2px] scale-[0.75] self-center inline-block ${compactHeight} ${compactWidth} shadow-[0_2px_8px_0px_rgba(0,0,0,0.12)]`;
  
  // When at top OR in minimize state - normal 100% scale
  const onScrollBack = `1md:translate-y-[0.2rem] 1sm:translate-y-[3rem] border-[1.5px] scale-100 self-center 1xz:w-auto 1smd:left-auto 1smd:right-auto 1xz:left-10 1xz:right-10 1smd:w-[53rem] h-[4rem] ${
    curSelectInput ? "" : "shadow-[0_3px_8px_0px_rgba(0,0,0,0.1)]"
  }`;

  // Apply animation based on minimize state
  const animateForm = minimize ? onScrollBack : onScrollProperty;

  return `transition-all ${
    !minimize ? (!startScroll ? "animate-formBlur" : "") : ""
  } duration-500 ease-in-out border-gray-250 flex ${
    !startScroll ? animateForm : onScrollBack
  } ${!startScroll && !minimize ? "" : "mb-5"} rounded-full ${
    !startScroll ? "" : curSelectInput ? styleForBefore : ""
  } ${!startScroll && !minimize ? "relative bg-gray-50 px-8 py-3 rounded-full" : "absolute"} flex-center ${minimize ? styleForBefore : ""}`;
};

function useModalClick(isCalendarModalOpen, openName, headerRef, setMinimize) {
  useEffect(() => {
    function handleClick(e) {
      if (isCalendarModalOpen) {
        return;
      } else if (
        !openName &&
        headerRef?.current &&
        !headerRef.current?.contains(e.target)
      ) {
        setMinimize(false);
      }
    }

    document.addEventListener("click", handleClick, false);
    return () => document.removeEventListener("click", handleClick, false);
  }, [isCalendarModalOpen, openName, headerRef, setMinimize]);
}

const BackGroundModal = ({
  isCalendarModalOpen,
  openName,
  headerRef,
  setMinimize,
  onHouseDetailPage,
  minimize,
}) => {
  // Use the custom hook for handling the click events
  useModalClick(isCalendarModalOpen, openName, headerRef, setMinimize);

  return ReactDOM.createPortal(
    <>
      <div
        className={`${
          onHouseDetailPage ? "absolute" : "fixed top-0"
        } transition-opacity duration-300 w-full bg-black ${
          minimize ? "opacity-40 h-full" : "opacity-0 h-0"
        }`}
      ></div>
    </>,
    document.body
  );
};

const SearchButton = ({
  label,
  content,
  onClick,
  extraClasses = "",
  width = "w-full",
  isHomesPage = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-[1.4rem] h-[5rem] flex-center ${isHomesPage ? "px-5" : "px-3"} font-normal ${extraClasses}`}
    >
      <span
        className={`${width} text-ellipsis overflow-hidden whitespace-nowrap`}
      >
        {content ? content : label}
      </span>
    </button>
  );
};

const Divider = () => <div className="w-[0.15rem] h-[2.5rem] bg-gray-200"></div>;

const GuestButton = ({ content, onClick, isHomesPage }) => {
  return (
    <button className={`text-[1.4rem] flex-center ${isHomesPage ? "pr-3" : "pr-2"} h-[5rem]`}>
      <p
        onClick={onClick}
        className={`${
          content ? "text-black font-normal" : "text-gray-400 font-light"
        } flex-center h-[5rem] ${isHomesPage ? "px-4" : "px-2"}`}
      >
        {content ? content : isHomesPage ? "guests" : "Who"}
      </p>
      <div
        onClick={onClick}
        className="w-[3.2rem] flex items-center justify-center bg-black rounded-full h-[3.2rem] transition-all duration-300 hover:scale-105"
      >
        <img className="scale-125" src={searchIcon} alt="search icon" />
      </div>
    </button>
  );
};

const SearchForm = ({ minimize }) => {
  const location = useLocation();
  const isHomesPage = location.pathname.includes("/homes");
  const dispatch = useDispatch();
  const { displaySearch, displayGuestInput, displaySearchWeek } = useSelector(
    (store) => store.form
  );

  const handleMinimize = (type) => {
    dispatch(setMinimize(true));
    dispatch(setMinimizeFormBtn(type));
  };

  return (
    <div
      className={`flex-center h-[5rem] transition-all duration-300 ease-in-out`}
    >
      <SearchButton
        label={isHomesPage ? "Homes in Map Area" : "Where"}
        content={displaySearch}
        onClick={() => handleMinimize("anywhere")}
        extraClasses="text-center max-w-[18rem] min-w-[7rem]"
        isHomesPage={isHomesPage}
      />
      <Divider />
      <SearchButton
        label={isHomesPage ? "Any Week" : "When"}
        content={displaySearchWeek}
        onClick={() => handleMinimize("week")}
        width="max-w-[14rem] min-w-[6rem]"
        isHomesPage={isHomesPage}
      />
      <Divider />
      <GuestButton
        content={displayGuestInput}
        onClick={() => handleMinimize("guest")}
        isHomesPage={isHomesPage}
      />
    </div>
  );
};

const MainComponent = ({ startScroll, minimize }) => {
  return (
    <div className={` ${startScroll ? "hidden" : ""}`}>
      <SearchForm minimize={minimize} />
    </div>
  );
};

// Main
const MainForm = ({ headerRef }) => {
  const location = useLocation();
  const isHomesPage = location.pathname.includes("/homes");
  const {
    curSelectInput,
    minimizeFormBtn,
    dateOption,
    openName,
    isCalendarModalOpen,
  } = useSelector((store) => store.form);
  const dispatch = useDispatch();

  const { onHouseDetailPage, sliceName } = useFormStateManager();
  const isVisible = useFormVisibility();
  useMinimizeButtonEffect(minimizeFormBtn, isVisible, dateOption, dispatch);
  const startScroll = useSelector((store) => store[sliceName]?.startScroll);

  const minimize = useSelector((store) => store.app.minimize);
  const formClass = getFormClasses(minimize, startScroll, curSelectInput, isHomesPage);

  useEffect(
    function () {
      if (!startScroll) {
        dispatch(setActiveInput(""));
      } else {
        dispatch(setOpenName(""));
      }
    },
    [startScroll, dispatch]
  );

  // Determine if form should be fixed at top when minimized and scrolling
  const isFixedOnScroll = !startScroll && !minimize;
  
  return (
    <div className={`${isFixedOnScroll ? 'fixed top-0 left-1/2 -translate-x-1/2 z-[60] w-auto h-[6rem] flex items-center justify-center' : 'flex items-center flex-col'}`}>
      <div className={formClass}>
        {!startScroll && !minimize ? (
          <MainComponent
            startScroll={startScroll}
            minimize={minimize}
          ></MainComponent>
        ) : (
          <MainFormContent></MainFormContent>
        )}
      </div>
      {isVisible && (
        <BackGroundModal
          isCalendarModalOpen={isCalendarModalOpen}
          openName={openName}
          headerRef={headerRef}
          dispatch={dispatch}
          setMinimize={(val) => dispatch(setMinimize(val))}
          onHouseDetailPage={onHouseDetailPage}
          minimize={minimize}
        />
      )}
    </div>
  );
};

export default MainForm;