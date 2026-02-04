// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './ReviewForm.css';

// Function component for giving reviews
function GiveReviews() {
  // State variables using useState hook
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });

  // Appointment history state
  const [appointmentHistory, setAppointmentHistory] = useState([
    {
      id: 1,
      doctorName: 'Dr. John Doe',
      specialty: 'Cardiology',
      reviewed: false
    },
    {
      id: 2,
      doctorName: 'Dr. Jane Smith',
      specialty: 'Dermatology',
      reviewed: false
    }
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Function to handle button click event for providing feedback
  const handleButtonClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowForm(true);
    setFormData({
      name: appointment.doctorName,
      review: '',
      rating: 0
    });
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    // Update the form data based on user input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled before submission
    if (formData.name && formData.review && formData.rating > 0) {
      setShowWarning(false);
      setSubmittedMessage(formData);
      
      // Update the appointment as reviewed
      setAppointmentHistory(prevHistory =>
        prevHistory.map(appointment =>
          appointment.id === selectedAppointment.id
            ? { ...appointment, reviewed: true }
            : appointment
        )
      );

      // Reset form and close
      setShowForm(false);
      setSelectedAppointment(null);
      setFormData({
        name: '',
        review: '',
        rating: 0
      });
      
      alert('Feedback submitted successfully!');
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div style={{ marginTop: '100px', padding: '20px' }}>
      <h2>Reviews</h2>
      
      {!showForm ? (
        // Display table with appointment history
        <div className="reviews-table-container">
          <table className="reviews-table">
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Doctor Name</th>
                <th>Doctor Speciality</th>
                <th>Provide feedback</th>
                <th>Review Given</th>
              </tr>
            </thead>
            <tbody>
              {appointmentHistory.map((appointment, index) => (
                <tr key={appointment.id}>
                  <td>{index + 1}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.specialty}</td>
                  <td>
                    {!appointment.reviewed ? (
                      <button 
                        className="feedback-btn"
                        onClick={() => handleButtonClick(appointment)}
                      >
                        Click Here
                      </button>
                    ) : (
                      <span className="reviewed-text">-</span>
                    )}
                  </td>
                  <td>
                    {appointment.reviewed ? (
                      <span className="reviewed-check">✓</span>
                    ) : (
                      <span className="not-reviewed">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Display form for giving feedback
        <form onSubmit={handleSubmit}>
          <h2>Give Your Feedback</h2>
          {/* Display warning message if not all fields are filled */}
          {showWarning && <p className="warning">Please fill out all fields.</p>}
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} readOnly />
          </div>
          <div>
            <label htmlFor="review">Review:</label>
            <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
            <input 
              type="number" 
              id="rating" 
              name="rating" 
              value={formData.rating} 
              onChange={handleChange}
              min="1"
              max="5"
            />
          </div>
          {/* Submit button for form submission */}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default GiveReviews;
