import React, { useState } from 'react'

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const appointmentData = { name, phoneNumber };
      onSubmit(appointmentData);
      
      // Save to shared appointments list
      const appointments = JSON.parse(localStorage.getItem('allAppointments') || '[]');
      const newAppointment = {
        id: Date.now(),
        doctorName,
        doctorSpeciality,
        patientName: name,
        phoneNumber,
        date: new Date().toISOString().split('T')[0],
        timeSlot: 'Instant Consultation',
        reviewed: false
      };
      appointments.push(newAppointment);
      localStorage.setItem('allAppointments', JSON.stringify(appointments));
      
      setName('');
      setPhoneNumber('');
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentFormIC
