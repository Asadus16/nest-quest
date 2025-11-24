import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMobileNavOption } from "../../redux/AppSlice";
import { useLocation, useNavigate } from "react-router";
import nestLogo from "../../asset/nestLogo.svg";

const MobileFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const mobileNavOption = useSelector((state) => state.app.mobileNavOption);
  const userData = useSelector((state) => state.app.userData);

  useEffect(() => {
    if (location.pathname.includes("wishlist")) {
      dispatch(setMobileNavOption("Wishlist"));
    } else if (location.pathname.includes("account-settings")) {
      dispatch(setMobileNavOption("Profile"));
    }
  }, [dispatch, location.pathname]);

  function handleNavOption(option) {
    dispatch(setMobileNavOption(option));
    if (!userData) {
      if (
        option === "Login" &&
        // if the user is already on the login page, don't navigate to it
        !location.pathname.includes("/login")
      ) {
        navigate("/login");
      } else if (
        option === "Wishlist" &&
        // if the user is already on the wishlist page, don't navigate to it
        !location.pathname.includes("/wishlist")
      ) {
        navigate("/wishlist");
      } else if (
        option === "Explore" &&
        // if the user is already on the home page, don't navigate to it
        location.pathname !== "/"
      ) {
        navigate("/");
      }
    } else {
      if (
        option === "Explore" &&
        // if the user is already on the home page, don't navigate to it
        location.pathname !== "/"
      ) {
        navigate("/");
      } else if (
        option === "Wishlist" &&
        // if the user is already on the wishlist page, don't navigate to it
        !location.pathname.includes("/wishlist")
      ) {
        navigate("/wishlist");
      } else if (
        option === "Profile" &&
        // if the user is already on the profile page, don't navigate to it
        !location.pathname.includes("/account-settings")
      ) {
        navigate("/account-settings");
      }
    }
  }

  function HeartSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          fill: "none",
          height: "24px",
          width: "24px",
          stroke: mobileNavOption === "Wishlist" ? "#e63253" : "currentColor",
          strokeWidth: mobileNavOption === "Wishlist" ? "3" : "2",
          overflow: "visible",
          opacity: mobileNavOption === "Wishlist" ? "1" : "0.6",
        }}
      >
        <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
      </svg>
    );
  }

  function LoginSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          fill: "none",
          height: "24px",
          width: "24px",
          stroke: mobileNavOption === "Login" ? "#e63253" : "currentColor",
          strokeWidth: mobileNavOption === "Login" ? "3" : "2",
          overflow: "visible",
          opacity: mobileNavOption === "Login" ? "1" : "0.6",
        }}
      >
        <g fill="none">
          <circle cx="16" cy="16" r="14" />
          <path d="M14.02 19.66a6 6 0 1 1 3.96 0M17.35 19.67H18c3.69.61 6.8 2.91 8.54 6.08m-20.92-.27A12.01 12.01 0 0 1 14 19.67h.62" />
        </g>
      </svg>
    );
  }

  function ProfileSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          fill: "none",
          height: "24px",
          width: "24px",
          stroke: mobileNavOption === "Profile" ? "#e63253" : "currentColor",
          strokeWidth: mobileNavOption === "Profile" ? "3" : "2",
          overflow: "visible",
          opacity: mobileNavOption === "Profile" ? "1" : "0.6",
        }}
      >
        <g fill="none">
          <circle cx="16" cy="16" r="14" />
          <path d="M14.02 19.66a6 6 0 1 1 3.96 0M17.35 19.67H18c3.69.61 6.8 2.91 8.54 6.08m-20.92-.27A12.01 12.01 0 0 1 14 19.67h.62" />
        </g>
      </svg>
    );
  }


  function MessageSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          fill: "none",
          height: "24px",
          width: "24px",
          stroke: "currentColor",
          strokeWidth: "2",
          overflow: "visible",
          opacity: "0.6",
        }}
      >
        <path
          fill="none"
          d="M26 3a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-6.32L16 29.5 12.32 25H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"
        />
      </svg>
    );
  }

  function SearchSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          fill: "none",
          height: "24px",
          width: "24px",
          stroke: mobileNavOption === "Explore" ? "#e63253" : "currentColor",
          strokeWidth: mobileNavOption === "Explore" ? "3" : "2",
          overflow: "visible",
          opacity: mobileNavOption === "Explore" ? "1" : "0.6",
        }}
      >
        <g fill="none">
          <circle cx="12" cy="12" r="10" />
          <path d="m19 19 11 11" />
        </g>
      </svg>
    );
  }

  return (
    <div className="w-full fixed bottom-0 1xz:hidden border-t border-shadow-grey flex-center bg-white  ">
      {userData ? (
        <div className="grid grid-cols-5 py-2 w-full max-w-lg">
          <button
            onClick={() => handleNavOption("Explore")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <SearchSVG></SearchSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Explore" ? "text-black" : "text-grey"
              }`}
            >
              Explore
            </span>
          </button>
          <button
            onClick={() => handleNavOption("Wishlist")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <HeartSVG></HeartSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Wishlist" ? "text-black" : "text-grey"
              }`}
            >
              Wishlist
            </span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <img
              src={nestLogo}
              alt="Nest Quest"
              className="h-6 w-auto"
            />
          </button>

          <button className="flex flex-col space-y-1 cursor-auto items-center justify-center">
            <MessageSVG></MessageSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Login" ? "text-black" : " text-grey"
              }`}
            >
              Messages
            </span>
          </button>
          <button
            onClick={() => handleNavOption("Profile")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <ProfileSVG></ProfileSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Profile" ? "text-black" : " text-grey"
              }`}
            >
              Profile
            </span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 py-2 max-w-sm w-full">
          <button
            onClick={() => handleNavOption("Explore")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <SearchSVG></SearchSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Explore" ? "text-black" : "text-grey"
              }`}
            >
              Explore
            </span>
          </button>
          <button
            onClick={() => handleNavOption("Wishlist")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <HeartSVG></HeartSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Wishlist" ? "text-black" : "text-grey"
              }`}
            >
              Wishlist
            </span>
          </button>
          <button
            onClick={() => handleNavOption("Login")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <LoginSVG></LoginSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Login" ? "text-black" : " text-grey"
              }`}
            >
              Log in
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileFooter;
