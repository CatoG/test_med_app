// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Function to check and update appointment data
    const checkAppointmentData = () => {
      // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
      const storedUsername = sessionStorage.getItem('email');
      const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
      const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

      console.log('Checking notification data:', { 
        storedUsername, 
        storedDoctorData, 
        storedAppointmentData 
      });

      // Set isLoggedIn state to true and update username if storedUsername exists
      if (storedUsername) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
      } else {
        setIsLoggedIn(false);
        setUsername("");
      }

      // Set doctorData state if storedDoctorData exists, otherwise clear it
      if (storedDoctorData) {
        setDoctorData(storedDoctorData);
      } else {
        setDoctorData(null);
      }

      // Set appointmentData state if storedAppointmentData exists, otherwise clear it
      if (storedAppointmentData) {
        setAppointmentData(storedAppointmentData);
      } else {
        setAppointmentData(null);
      }
    };

    // Check initially
    checkAppointmentData();

    // Set up interval to check for updates every 1 second
    const interval = setInterval(checkAppointmentData, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      <Navbar ></Navbar>
      {/* Render children components */}
      {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && appointmentData && (
        <>
          <div className="appointment-card">
            <div className="appointment-card__content">
              {/* Display title for appointment details */}
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Doctor:</strong> {doctorData?.name}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's speciality */}
                <strong>Speciality:</strong> {doctorData?.speciality}
              </p>
              <p className="appointment-card__message">
                {/* Display patient's name */}
                <strong>Name:</strong> {appointmentData?.name}
              </p>
              <p className="appointment-card__message">
                {/* Display patient's phone number */}
                <strong>Phone Number:</strong> {appointmentData?.phoneNumber}
              </p>
              <p className="appointment-card__message">
                {/* Display appointment date */}
                <strong>Date of Appointment:</strong> {appointmentData?.date}
              </p>
              <p className="appointment-card__message">
                {/* Display appointment time slot */}
                <strong>Time Slot:</strong> {appointmentData?.selectedSlot}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;