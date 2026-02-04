// Following code has been commented with appropriate comments for your reference.
import React, { useState } from "react";
import "./Sign_Up.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

// Function component for Sign Up form
const Sign_Up = () => {
  // State variables using useState hook
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showerr, setShowerr] = useState(""); // MUST always be a string
  const navigate = useNavigate(); // Navigation hook from react-router

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    // Name validation
    if (!name.trim()) {
      setShowerr("Name is required");
      return false;
    }
    if (name.trim().length < 2) {
      setShowerr("Name must be at least 2 characters long");
      return false;
    }

    // Email validation
    if (!email.trim()) {
      setShowerr("Email is required");
      return false;
    }
    if (!validateEmail(email)) {
      setShowerr("Please enter a valid email address");
      return false;
    }

    // Phone validation
    if (!phone.trim()) {
      setShowerr("Phone number is required");
      return false;
    }
    if (!validatePhone(phone)) {
      setShowerr("Please enter a valid phone number (at least 8 digits)");
      return false;
    }

    // Password validation
    if (!password) {
      setShowerr("Password is required");
      return false;
    }
    if (password.length < 8) {
      setShowerr("Password must be at least 8 characters long");
      return false;
    }
    if (!validatePassword(password)) {
      setShowerr("Password must contain at least one uppercase letter, one lowercase letter, and one number");
      return false;
    }

    return true;
  };

  // Function to handle form submission
  const register = async (e) => {
    e.preventDefault();
    setShowerr("");

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    let response;
    try {
      response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });
    } catch (err) {
      setShowerr("Unable to connect to server.");
      return;
    }

    // Read response safely
    const text = await response.text();
    let json;

    try {
      json = JSON.parse(text);
    } catch {
      setShowerr("Server error. Invalid response format.");
      return;
    }

    // Success
    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);

      navigate("/");
      window.location.reload();
      return;
    }

    // Error handling (NEVER store objects in state)
    if (Array.isArray(json.errors)) {
      const messages = json.errors
        .map((e) => (typeof e.msg === "string" ? e.msg : "Invalid input"))
        .join(" | ");
      setShowerr(messages);
    } else if (typeof json.error === "string") {
      setShowerr(json.error);
    } else {
      setShowerr("Registration failed.");
    }
  };

  // JSX to render the Sign Up form
  return (
    <>
      <div className="container" style={{ marginTop: "5%" }}>
        <div className="signup-grid">
          <div className="signup-form">
            <form onSubmit={register} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>

              {typeof showerr === "string" && showerr.length > 0 && (
                <div className="err" style={{ color: "red" }}>
                  {showerr}
                </div>
              )}

              <div className="btn-group">
                <button type="submit" className="btn btn-submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign_Up;
