import React, { useState } from 'react'

// AppointmentForm component with date and time slot booking
const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
  
    console.log('AppointmentForm loaded - with date and time fields');
  
    // Available time slots
    const timeSlots = [
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
      '05:00 PM'
    ];
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phoneNumber, date, selectedSlot });
      setName('');
      setPhoneNumber('');
      setDate('');
      setSelectedSlot('');
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
        <div className="form-group">
          <label htmlFor="date">Date of Appointment:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeSlot">Book Time Slot:</label>
          <select
            id="timeSlot"
            value={selectedSlot}
            onChange={(e) => handleSlotSelection(e.target.value)}
            required
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm
