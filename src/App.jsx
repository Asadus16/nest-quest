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
