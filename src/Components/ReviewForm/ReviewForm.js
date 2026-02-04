// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
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

  // Appointment history state - Load from localStorage or use default
  const [appointmentHistory, setAppointmentHistory] = useState(() => {
    const saved = localStorage.getItem('appointmentHistory');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
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
    ];
  });

  // Save appointmentHistory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('appointmentHistory', JSON.stringify(appointmentHistory));
  }, [appointmentHistory]);

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
            ? { ...appointment, reviewed: true, rating: formData.rating }
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
                      <button 
                        className="feedback-btn"
                        disabled
                        style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }}
                      >
                        Click Here
                      </button>
                    )}
                  </td>
                  <td>
                    {appointment.reviewed ? (
                      <div className="rating-display">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`star-display ${appointment.rating >= star ? 'filled' : ''}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
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
        <form onSubmit={handleSubmit} className="feedback-form">
          <h2>Give Your Review</h2>
          {/* Display warning message if not all fields are filled */}
          {showWarning && <p className="warning">Please fill out all fields.</p>}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              readOnly 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="review">Review:</label>
            <textarea 
              id="review" 
              name="review" 
              value={formData.review} 
              onChange={handleChange}
              className="form-textarea"
              rows="4"
            />
          </div>
          <div className="form-group">
            <label>Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${formData.rating >= star ? 'filled' : ''}`}
                  onClick={() => setFormData({ ...formData, rating: star })}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          {/* Submit button for form submission */}
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      )}
    </div>
  );
}

export default GiveReviews;
