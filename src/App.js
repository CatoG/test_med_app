// Import necessary modules from React library
import React from "react";

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from "./Components/Navbar/Navbar";

// Import landing page component
import Landing_Page from "./Components/Landing_Page/Landing_Page";

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
      </Routes>
    </BrowserRouter>
  );
}

// Export the App component as the default export
export default App;
