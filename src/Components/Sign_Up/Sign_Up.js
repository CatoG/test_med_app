import React, { useState } from "react";
import "./Sign_Up.css";

function Sign_Up() {
  const [form, setForm] = useState({
    role: "patient",
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const nextErrors = {};

    // Role
    if (!values.role) {
      nextErrors.role = "Please select a role.";
    }

    // Name (basic: required, min length, allowed chars)
    const name = values.name.trim();
    if (!name) {
      nextErrors.name = "Name is required.";
    } else if (name.length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    } else if (!/^[a-zA-ZÀ-ž' -]+$/.test(name)) {
      nextErrors.name = "Name contains invalid characters.";
    }

    // Phone (required + simple validation)
    const phone = values.phone.trim();
    if (!phone) {
      nextErrors.phone = "Phone number is required.";
    } else {
      // Allow +, spaces, -, parentheses; require 8+ digits total
      const digitsOnly = phone.replace(/\D/g, "");
      if (digitsOnly.length < 8) {
        nextErrors.phone = "Phone number must contain at least 8 digits.";
      } else if (!/^[0-9+() -]+$/.test(phone)) {
        nextErrors.phone = "Phone number format looks invalid.";
      }
    }

    // Email (required + format)
    const email = values.email.trim();
    if (!email) {
      nextErrors.email = "E-mail is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      nextErrors.email = "Please enter a valid e-mail address.";
    }

    // Password (required + basic strength)
    const password = values.password;
    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      nextErrors.password = "Password must include at least one letter and one number.";
    }

    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Optional: live-validate as user types
    setErrors((prev) => {
      const updated = { ...prev };
      const newValues = { ...form, [name]: value };
      const nextErrors = validate(newValues);

      // Keep only the current field error updated (less noisy)
      if (nextErrors[name]) updated[name] = nextErrors[name];
      else delete updated[name];

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return; // Block submit
    }

    // ✅ Form is valid — replace this with API call / navigation
    alert("Signup details look valid ✅");
  };

  const handleReset = () => {
    setForm({
      role: "patient",
      name: "",
      phone: "",
      email: "",
      password: "",
    });
    setErrors({});
  };

  return (
    <>
      <div className="signup-container">
        {/* Left side with image */}
        <div className="signup-image"></div>

        {/* Right side with form */}
        <div className="signup-form-container">
          <h1>Sign up</h1>

          <p className="login-link">
            Already a member? <a href="../Login/Login.html">Login</a>
          </p>

          <form className="signup-form" onSubmit={handleSubmit} onReset={handleReset} noValidate>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                className="form-control"
                value={form.role}
                onChange={handleChange}
                aria-invalid={!!errors.role}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
              {errors.role && <small className="error-text">{errors.role}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Fridjof Nansen"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
              />
              {errors.name && <small className="error-text">{errors.name}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="+47 22 22 22 22"
                value={form.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <small className="error-text">{errors.phone}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="fridjof-nansen@polarmuseet.no"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              {errors.email && <small className="error-text">{errors.email}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
              />
              {errors.password && <small className="error-text">{errors.password}</small>}
            </div>

            <div className="btn-group">
              <button type="reset" className="btn btn-reset">
                Reset
              </button>
              <button type="submit" className="btn btn-submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Sign_Up;
