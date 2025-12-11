import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Main/HomePage";
import HouseDetail from "./components/House-detail/HouseDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import Wishlist from "./components/Main/Wishlist";

import Trips from "./components/Main/Trips";

import CheckoutForm from "./payment/CheckoutForm";
import Profile from "./components/Main/Profile";
import LoginPage from "./components/Main/LoginPage";
import BecomeHostPage from "./components/Main/BecomeHostPage";
import HostStep1Page from "./components/Main/HostStep1Page";
import HostStep1PropertySelection from "./components/Main/HostStep1PropertySelection";
import HostPlaceType from "./components/Main/HostPlaceType";
import HostLocationSearch from "./components/Main/HostLocationSearch";
import HostConfirmAddress from "./components/Main/HostConfirmAddress";
import HostPinLocation from "./components/Main/HostPinLocation";
import HostBasics from "./components/Main/HostBasics";
import HostStep2Page from "./components/Main/HostStep2Page";
import HostAmenities from "./components/Main/HostAmenities";
import HostPhotos from "./components/Main/HostPhotos";
import HostTitle from "./components/Main/HostTitle";
import HostHighlights from "./components/Main/HostHighlights";
import HostDescription from "./components/Main/HostDescription";
import HostStep3Page from "./components/Main/HostStep3Page";
import HostBookingSettings from "./components/Main/HostBookingSettings";
import HostGuestSelection from "./components/Main/HostGuestSelection";
import HostPricing from "./components/Main/HostPricing";
import HostWeekendPrice from "./components/Main/HostWeekendPrice";
import HostDiscounts from "./components/Main/HostDiscounts";
import HostSafetyDetails from "./components/Main/HostSafetyDetails";
import RegionStays from "./components/Main/RegionStays";
import RegionHomes from "./components/Main/RegionStays/RegionHomes";

const queryClient = new QueryClient({});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },

  {
    path: "/house/:id",
    element: <HouseDetail></HouseDetail>,
  },
  {
    path: "/wishlist",
    element: <Wishlist></Wishlist>,
  },
  {
    path: "/trips",
    element: <Trips></Trips>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/become-host",
    element: <BecomeHostPage></BecomeHostPage>,
  },
  {
    path: "/host/step-1",
    element: <HostStep1Page></HostStep1Page>,
  },
  {
    path: "/host/step-1/property-type",
    element: <HostStep1PropertySelection></HostStep1PropertySelection>,
  },
  {
    path: "/host/place-type",
    element: <HostPlaceType></HostPlaceType>,
  },
  {
    path: "/host/location-search",
    element: <HostLocationSearch></HostLocationSearch>,
  },
  {
    path: "/host/confirm-address",
    element: <HostConfirmAddress></HostConfirmAddress>,
  },
  {
    path: "/host/pin-location",
    element: <HostPinLocation></HostPinLocation>,
  },
  {
    path: "/host/basics",
    element: <HostBasics></HostBasics>,
  },
  {
    path: "/host/step-2-intro",
    element: <HostStep2Page></HostStep2Page>,
  },
  {
    path: "/host/amenities",
    element: <HostAmenities></HostAmenities>,
  },
  {
    path: "/host/photos",
    element: <HostPhotos></HostPhotos>,
  },
  {
    path: "/host/title",
    element: <HostTitle></HostTitle>,
  },
  {
    path: "/host/highlights",
    element: <HostHighlights></HostHighlights>,
  },
  {
    path: "/host/description",
    element: <HostDescription></HostDescription>,
  },
  {
    path: "/host/step-3-intro",
    element: <HostStep3Page></HostStep3Page>,
  },
  {
    path: "/host/booking-settings",
    element: <HostBookingSettings></HostBookingSettings>,
  },
  {
    path: "/host/guest-selection",
    element: <HostGuestSelection></HostGuestSelection>,
  },
  {
    path: "/host/pricing",
    element: <HostPricing></HostPricing>,
  },
  {
    path: "/host/weekend-price",
    element: <HostWeekendPrice></HostWeekendPrice>,
  },
  {
    path: "/host/discounts",
    element: <HostDiscounts></HostDiscounts>,
  },
  {
    path: "/host/safety-details",
    element: <HostSafetyDetails></HostSafetyDetails>,
  },
  {
    path: "/account-settings",
    element: <Profile></Profile>,
  },
  {
    path: "/:regionName/stays",
    element: <RegionStays></RegionStays>,
  },
  {
    path: "/:regionName/homes",
    element: <RegionHomes></RegionHomes>,
  },
  {
    path: "/:id/book",
    element: <CheckoutForm></CheckoutForm>,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}
