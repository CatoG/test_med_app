import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const nextErrors = {};

    // Email validation
    if (!values.email.trim()) {
      nextErrors.email = "E-mail is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
      nextErrors.email = "Please enter a valid e-mail address.";
    }

    // Password validation
    if (!values.password) {
      nextErrors.password = "Password is required.";
    } else if (values.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return; // Block submit
    }

    // ✅ Treat the popup as a successful login (dummy)
    sessionStorage.setItem("auth-token", "dummy-token");
    sessionStorage.setItem("email", form.email.trim());

    alert("Login successful ✅");

    // Reload so Navbar reads sessionStorage and shows Logout
    window.location.reload();
  };

  const handleReset = () => {
    setForm({ email: "", password: "" });
    setErrors({});
  };

  return (
    <>
      <div className="signup-container">
        {/* Left side with image */}
        <div className="signup-image"></div>

        {/* Right side with form */}
        <div className="signup-form-container">
          <h1>Login</h1>

          <p className="login-link">
            Are you a new member?{" "}
            <a href="../Sign_Up/Sign_Up.html">Sign up here</a>
          </p>

          <form
            className="signup-form"
            onSubmit={handleSubmit}
            onReset={handleReset}
            noValidate
          >
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
              {errors.email && (
                <small className="error-text">{errors.email}</small>
              )}
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
              {errors.password && (
                <small className="error-text">{errors.password}</small>
              )}
            </div>

            <div className="btn-group">
              <button type="reset" className="btn btn-reset">
                Reset
              </button>
              <button type="submit" className="btn btn-submit">
                Submit
              </button>
            </div>

            <p className="forgot-password">
              <a href="#">Forgot your password?</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
