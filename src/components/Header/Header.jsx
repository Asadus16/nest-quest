import icon from "../../asset/nestLogo.svg";
import MainForm from "./Form/MainForm";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import UserDashboard from "./UserDashboard";
import AuthenticationModal from "./AuthenticationModal";
import MobileForm from "./Form/MobileForm";

function Header({ headerRef }) {
  const location = useLocation();

  // Determine if the user is on specific pages based on the URL path
  const isHouseDetailPage = location.pathname.includes("/house/");
  const isWishListPage = location.pathname.includes("/wishlist");
  const isTripsPage = location.pathname.includes("trips");
  const isSignInPage = location.pathname.includes("/login");
  const isProfilePage = location.pathname.includes("/account-settings");
  const isStaysPage = location.pathname.includes("/stays");

  // Select which slice of the Redux store to use
  const currentSlice = isHouseDetailPage ? "houseSlice" : "app";
  const startScroll = useSelector((store) => store[currentSlice]?.startScroll);
  const minimizeHeader = useSelector((store) => store.app.minimize);

  // Generate class names for the "after" element depending on page state and scroll position
  const afterClass = generateAfterClass({
    startScroll,
    minimizeHeader,
    isWishListPage,
    isTripsPage,
    isSignInPage,
    isProfilePage,
    isStaysPage,
  });

  return (
    <div
      id="header"
      className={`w-full py-2 1xz:py-0 relative bg-white flex flex-col 1smd:items-center items-start justify-center ${afterClass}`}
    >
      <div
        className={`grid grid-cols-${
          isWishListPage || isTripsPage || isSignInPage || isProfilePage || isStaysPage
            ? "2"
            : "3"
        } ${
          isHouseDetailPage
            ? "max-w-7xl w-full px-10 1lg:px-20"
            : "w-full 1xl:px-20 px-10"
        }`}
      >
        <LogoSection />

        {!isTripsPage && !isSignInPage && !isWishListPage && !isProfilePage && !isStaysPage && (
          <CenterButtons
            startScroll={startScroll}
            minimizeHeader={minimizeHeader}
          />
        )}

        <div className="h-20 1xz:flex hidden items-center justify-end gap-3">
          {isStaysPage ? (
            <>
              <button className="text-sm h-[2.5rem] cursor-pointer hidden 1smm:flex items-center justify-center rounded-full hover:bg-shadow-gray-light text-nowrap px-4 font-[450]">
                Become a host
              </button>
              <button className="text-sm h-[2.5rem] cursor-pointer bg-black text-white px-6 rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                Start your search
              </button>
            </>
          ) : (
            <>
              <button className="text-sm h-[2.5rem] cursor-auto hidden 1smm:flex items-center justify-center rounded-full hover:bg-shadow-gray-light text-nowrap max-w-36 px-2 w-full font-[450]">
                Nest Quest your home
              </button>


              <UserDashboard />
            </>
          )}
        </div>

        <AuthenticationModal />
      </div>

      <MobileFormSection />

      {!isWishListPage && !isSignInPage && !isTripsPage && !isProfilePage && !isStaysPage && (
        <MainFormSection headerRef={headerRef} />
      )}
    </div>
  );
}

// Helper Components

// Renders the Nest Quest logo and text
function LogoSection() {
  return (
    <div>
      <a href="/">
        <div className="1xz:flex hidden h-20 items-center">
          <img className="h-[56px] w-auto" src={icon} alt="Nest Quest Logo" />
        </div>
      </a>
    </div>
  );
}

// Renders the center buttons (Stays and Experiences)
function CenterButtons({ startScroll, minimizeHeader }) {
  const translateClasses = startScroll
    ? "1sm:translate-y-12 1md:translate-y-0"
    : minimizeHeader
    ? "translate-y-0"
    : "-translate-y-20 1md:translate-x-0 1sm:-translate-x-56";

  return (
    <div
      className={`flex h-20 transition-transform duration-[0.3s] ease-in-out ${translateClasses} justify-center items-center`}
    >
      <button className=" hidden 1smd:block  px-4 py-2 rounded-md font-medium">
        Stays
      </button>
      <p className="h-[2.5rem] 1smd:flex items-center hidden justify-center hover:bg-gray-100 hover:text-slate-600 rounded-full text-center w-[8rem] text-grey font-light">
        Experiences
      </p>
    </div>
  );
}

// Renders the mobile form if the screen size is small
function MobileFormSection() {
  return (
    <div className="1xz:hidden w-full absolute top-0 flex">
      <MobileForm />
    </div>
  );
}

// Renders the main form component if it's not on specific pages
function MainFormSection({ headerRef }) {
  return (
    <div className="w-full 1smd:w-auto hidden 1xz:flex 1smd:block items-center justify-start 1smd:pl-0 pl-[16rem]">
      <MainForm headerRef={headerRef} />
    </div>
  );
}

// Helper Functions

/**
 * Generates the class for the after element based on scroll position and page state
 */
function generateAfterClass({
  startScroll,
  minimizeHeader,
  isWishListPage,
  isTripsPage,
  isSignInPage,
  isProfilePage,
  isStaysPage,
}) {
  // Hide the line on stays page
  if (isStaysPage) {
    return "after:hidden";
  }

  const transitionClasses = minimizeHeader
    ? "1md:after:translate-y-[6rem] after:opacity-0"
    : "1md:after:translate-y-[-0.2rem] 1sm:after:translate-y-[-0.2rem] after:opacity-100";

  return `after:content-[''] after:hidden after:1xz:block  ${
    !startScroll ||
    isWishListPage ||
    isTripsPage ||
    isSignInPage ||
    isProfilePage
      ? `${transitionClasses}`
      : "1md:after:translate-y-[5.5rem] 1sm:after:translate-y-[8.2rem]"
  } after:transition-transform after:duration-[0.3s] after:ease-in-out after:w-full after:bg-grey-dim after:z-50 after:h-[1px]`;
}

export default Header;
