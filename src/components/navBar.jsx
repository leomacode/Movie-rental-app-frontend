import React from "react";
import { Link, NavLink } from "react-router-dom";
const NavBar = ({ user }) => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-light">
        <Link className="navbar-brand " to="/movies">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/movies">
              Movies
            </NavLink>

            {!user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/customers">
                  Customers
                </NavLink>
                <NavLink className="nav-item nav-link" to="/rentals">
                  Rentals
                </NavLink>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
