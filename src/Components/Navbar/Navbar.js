import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [active, setActive] = useState(true);

  const handleClick = () => {
    setActive(!active);
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
            <a href="#">Appointments</a>
          </li>

          <li className="link">
            <a href="#">Reviews</a>
          </li>

          <li className="link">
            <Link to="/signup">Sign up</Link>
          </li>

          <li className="link">
            <Link to="/login">
              <button className="btn-login">Login</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
