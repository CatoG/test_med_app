import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import ProfileCard from "../ProfileCard/ProfileCard";

function Navbar() {
  const [active, setActive] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

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
                <Lin
                style={{ color: "#666", cursor: "pointer", textDecoration: "underline" }} 
                onClick={handleProfileClick}
              >
                {userName}
              </span>
              <button className="btn-login" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
      
      {/* Show ProfileCard when user clicks on username */}
      {showProfile && <ProfileCard onClose={handleCloseProfile} />}<li className="link" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: "#666" }}>{userName}</span>
              <button className="btn-login" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
