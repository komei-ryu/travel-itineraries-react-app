import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Index from "./routes/Index";
import TripDetails from "./routes/TripDetails";
import LocationDetails from "./routes/LocationDetails";
import Favorites from "./routes/Favorites";
import {
  fetchTrips,
  fetchTripDetails,
  fetchOneLocation,
  fetchFavoritedLocations,
} from "./api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
        loader() {
          return fetchTrips();
        },
      },
      {
        path: "/trips/:tripId",
        element: <TripDetails />,
        loader({ params }) {
          return fetchTripDetails(params.tripId);
        },
      },
      {
        path: "/locations/:locationId",
        element: <LocationDetails />,
        loader({ params }) {
          return fetchOneLocation(params.locationId);
        },
      },
      {
        path: "/favorites",
        element: <Favorites />,
        loader() {
          return fetchFavoritedLocations();
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
