import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import ProfileCard from "../ProfileCard/ProfileCard";

function Navbar() {
  const [active, setActive] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Check login status from sessionStorage
  const token = sessionStorage.getItem("auth-token");
  const email = sessionStorage.getItem("email") || "";
  const userName = email.includes("@") ? email.split("@")[0] : "";

  const handleClick = () => {
    setActive(!active);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("email");

    navigate("/");
    window.location.reload(); // keep it consistent with your signup flow
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleProfileMenuClick = () => {
    setShowProfile(true);
    setShowDropdown(false);
  };

  const handleReportsClick = () => {
    navigate('/reports');
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav>
        {/* Navigation logo section */}
        <div className="nav__logo">
          <Link to="/">#Helseappen</Link>
        </div>

        {/* Navigation icon section */}
        <div className="nav__icon" onClick={handleClick}>
          <i className={`fa ${active ? "fa-times" : "fa-bars"}`}></i>
        </div>

        {/* Navigation links */}
        <ul className={`nav__links ${active ? "active" : ""}`}>
          <li className="link">
            <Link to="/search/doctors">Booking</Link>
          </li>

          <li className="link">
            <a href="#">Appointments</a>
          </li>

          <li className="link">
            <Link to="/instant-consultation">Instant Consultation</Link>
          </li>

          <li className="link">
            <Link to="/reviews">Reviews</Link>
          </li>

          {/* If NOT logged in */}
          {!token ? (
            <>
              <li className="link">
                <Link to="/signup">Sign up</Link>
              </li>

              <li className="link">
                <Link to="/login">
                  <button className="btn-login">Login</button>
                </Link>
              </li>
            </>
          ) : (
            /* If logged in: show dropdown menu */
            <li className="link user-menu" ref={dropdownRef}>
              <div className="user-menu-container">
                <span 
                  className="user-name" 
                  onClick={handleDropdownToggle}
                >
                  Welcome, {userName}
                  <i className={`fa fa-chevron-down dropdown-icon ${showDropdown ? 'open' : ''}`}></i>
                </span>
                {showDropdown && (
                  <div className="user-dropdown">
                    <button className="dropdown-item" onClick={handleProfileMenuClick}>
                      <i className="fa fa-user"></i>
                      Your Profile
                    </button>
                    <button className="dropdown-item" onClick={handleReportsClick}>
                      <i className="fa fa-file-text"></i>
                      Your Reports
                    </button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout-item" onClick={handleLogout}>
                      <i className="fa fa-sign-out"></i>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>
      </nav>
      
      {/* Show ProfileCard when user clicks on username */}
      {showProfile && <ProfileCard onClose={handleCloseProfile} />}
    </div>
  );
}

export default Navbar;
