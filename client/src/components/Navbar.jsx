import React, { useState, useEffect } from "react";
import "./css/navbar.css";
import { useNavigate } from "react-router-dom";
import profileIcon from "../images/profile.png";
import { logoutUser, getUser } from "../services/task-services";

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setloggedIn] = useState(false);
  useEffect(() => {
    const getLoggedInUser = async () => {
      // Redirect to login page after logout
      const userN = await getUser();
      if (userN.data && userN.data.userId) {
        setloggedIn(true);
      }
      console.log("userget", userN);
    };
    getLoggedInUser();
  }, [loggedIn]);
  const handleLogout = async () => {
    // Redirect to login page after logout
    const userN = await getUser();
    console.log("userget", userN);
    await logoutUser();
    setloggedIn(false);
    navigate("/login");
    console.log("You have been logged out!");
  };
  return (
    <div class="page">
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            FinishLine.
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Task Tracker
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <a
                    className="nav-link mx-lg-2 "
                    aria-current="page"
                    href="/tasks"
                  >
                    My Tasks
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-2 " href="/create/tasks">
                    Create Tasks
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-2 " href="/calender">
                    Calender
                  </a>
                </li>
              </ul>
              {loggedIn ? (
                <div className="dropdown navbar-profile-icon">
                  <img
                    src={profileIcon}
                    alt="Profile"
                    className="profile-img dropdown-toggle"
                    id="profileDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="profileDropdown"
                  >
                    <li>
                      <button
                        className="dropdown-item logout-btn"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
