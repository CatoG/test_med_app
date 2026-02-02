// Import necessary modules from React library
import React from "react";

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from "./Components/Navbar/Navbar";

// Import page components
import Landing_Page from "./Components/Landing_Page/Landing_Page";
import Login from "./Components/Login/Login";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation";
import FindDoctorSearch from "./Components/FindDoctorSearch/FindDoctorSearch";

// Function component for the main App
function App() {
  return (
    <BrowserRouter>
      {/* Display the Navbar component */}
      <Navbar />

      {/* Set up the Routes for different pages */}
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Landing_Page />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Sign Up route */}
        <Route path="/signup" element={<Sign_Up />} />

        {/* Find Doctor route */}
        <Route path="/search/doctors" element={<FindDoctorSearch />} />

        {/* Instant Consultation route */}
        <Route path="/instant-consultation" element={<InstantConsultation />} />
      </Routes>
    </BrowserRouter>
  );
}

// Export the App component as the default export
export default App;
