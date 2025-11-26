import icon from "../../asset/nestLogo.svg";
import MainForm from "./Form/MainForm";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import UserDashboard from "./UserDashboard";
import AuthenticationModal from "./AuthenticationModal";
import MobileForm from "./Form/MobileForm";

function Header({ headerRef }) {
  const location = useLocation();
  const hostPortalUrl =
    import.meta?.env?.VITE_HOST_PORTAL_URL || "https://pms-fe-two.vercel.app/";

  // Determine if the user is on specific pages based on the URL path
  const isHouseDetailPage = location.pathname.includes("/house/");
  const isWishListPage = location.pathname.includes("/wishlist");
  const isTripsPage = location.pathname.includes("trips");
  const isSignInPage = location.pathname.includes("/login");
  const isProfilePage = location.pathname.includes("/account-settings");
  const isStaysPage = location.pathname.includes("/stays");
  const isHomesPage = location.pathname.includes("/homes");

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
    isHomesPage,
  });

  return (
    <div
      id="header"
      className={`w-full ${isStaysPage ? "py-2 1xz:py-0" : "py-2 1xz:py-0"} relative bg-gray-50 flex flex-col 1smd:items-center items-start justify-center ${afterClass}`}
    >
      <div
        className={`grid grid-cols-2 ${
          isHouseDetailPage
            ? "max-w-7xl w-full px-10 1lg:px-20"
            : "w-full 1xl:px-20 px-10"
        } ${isStaysPage ? "1xz:h-24 h-14" : ""}`}
      >
        <LogoSection isStaysPage={isStaysPage} />

        <div className={`${isStaysPage ? "h-14 1xz:h-24" : "h-24"} ${isStaysPage ? "flex" : "1xz:flex hidden"} items-center justify-end gap-3`}>
          {isStaysPage ? (
            <>
              <button className="text-sm h-[2.5rem] cursor-pointer flex items-center justify-center rounded-full hover:bg-shadow-gray-light text-nowrap px-4 font-[450]">
                Become a host
              </button>
            
            </>
          ) : (
            <>
              <a
                href={hostPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm h-[2.5rem] cursor-pointer hidden 1smm:flex items-center justify-center rounded-full hover:bg-shadow-gray-light text-nowrap max-w-36 px-4 py-2 w-full font-[450]"
              >
                Host Your Properties
              </a>


              <UserDashboard />
            </>
          )}
        </div>

        <AuthenticationModal />
      </div>

      <MobileFormSection isStaysPage={isStaysPage} />

      {((!isWishListPage && !isSignInPage && !isTripsPage && !isProfilePage && !isStaysPage) || isHomesPage) && (
        <MainFormSection headerRef={headerRef} />
      )}
    </div>
  );
}

// Helper Components

// Renders the Nest Quest logo and text
function LogoSection({ isStaysPage }) {
  return (
    <div>
      <a href="/">
        <div className={`${isStaysPage ? "flex" : "1xz:flex hidden"} ${isStaysPage ? "h-14 1xz:h-24" : "h-24"} items-center`}>
          <img className={`${isStaysPage ? "h-10 1xz:h-[56px]" : "h-[56px]"} w-auto`} src={icon} alt="Nest Quest Logo" />
        </div>
      </a>
    </div>
  );
}

// Renders the mobile form if the screen size is small
function MobileFormSection({ isStaysPage }) {
  // Hide mobile form on stays page, show desktop header instead
  if (isStaysPage) return null;
  
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
  isHomesPage,
}) {
  // Hide the line on stays page
  if (isStaysPage) {
    return "after:hidden";
  }
  
  // Show the line on homes page (like homepage)
  if (isHomesPage) {
    const transitionClasses = minimizeHeader
      ? "1md:after:translate-y-[6rem] after:opacity-0"
      : "1md:after:translate-y-[-0.2rem] 1sm:after:translate-y-[-0.2rem] after:opacity-100";
    
    return `after:content-[''] after:hidden after:1xz:block ${
      !startScroll
        ? `${transitionClasses}`
        : "1md:after:translate-y-[5.5rem] 1sm:after:translate-y-[8.2rem]"
    } after:transition-transform after:duration-[0.3s] after:ease-in-out after:w-full after:bg-grey-dim after:z-50 after:h-[1px]`;
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
