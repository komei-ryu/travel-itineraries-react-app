import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import { ToastContainer } from "react-toastify";

export default function Root() {
  return (
    <div className="container-fluid">
      <Navigation />
      <Outlet />
      <ToastContainer
        position="bottom-left"
        autoClose={
          5000 /* make the notification box automatically disappear after 5 seconds */
        }
      />
    </div>
  );
}
