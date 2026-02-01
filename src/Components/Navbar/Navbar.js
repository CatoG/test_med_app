import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [active, setActive] = useState(true);

  // handleClick is defined BEFORE return (correct React pattern)
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div>
      <nav>
        {/* Navigation logo section */}
        <div className="nav__logo">
          <a href="/">#Helseappen</a>
        </div>

        {/* Navigation icon section */}
        <div className="nav__icon" onClick={handleClick}>
          <i className={`fa ${active ? "fa-times" : "fa-bars"}`}></i>
        </div>

        {/* Navigation links */}
        <ul className={`nav__links ${active ? "active" : ""}`}>
          <li className="link">
            <a href="#">Appointments</a>
          </li>

          <li className="link">
            <a href="#">Reviews</a>
          </li>

          <li className="link">
            <a href="../Sign_Up/Sign_Up.html">Sign up</a>
          </li>

          <li className="link">
            <a href="../Login/Login.html">
              <button className="btn-login">Login</button>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
