import { NavLink } from "react-router-dom";
import "./App.css";

// The active link will be bolded

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg mb-2">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          Travel Itineraries
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/favorites" className="nav-link">
                Favorites
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
