import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
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

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [feedback, setFeedback] = useState({
    name: '',
    review: '',
    rating: 0
  });

  const handleProvideFeedback = (appointment) => {
    setSelectedAppointment(appointment);
    setShowFeedbackForm(true);
    setFeedback({
      name: appointment.doctorName,
      review: '',
      rating: 0
    });
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    
    // Update the appointment as reviewed
    setAppointmentHistory(prevHistory =>
      prevHistory.map(appointment =>
        appointment.id === selectedAppointment.id
          ? { ...appointment, reviewed: true }
          : appointment
      )
    );

    // Reset form and close
    setShowFeedbackForm(false);
    setSelectedAppointment(null);
    setFeedback({ name: '', review: '', rating: 0 });
    
    alert('Feedback submitted successfully!');
  };

  const handleCancelFeedback = () => {
    setShowFeedbackForm(false);
    setSelectedAppointment(null);
    setFeedback({ name: '', review: '', rating: 0 });
  };

  return (
    <div className="review-form-container">
      <h2>Reviews</h2>
      
      {!showFeedbackForm ? (
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
                        onClick={() => handleProvideFeedback(appointment)}
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
        <div className="feedback-form-container">
          <h3>Give Your Feedback</h3>
          <form onSubmit={handleSubmitFeedback} className="feedback-form">
            <div className="form-group">
              <label htmlFor="doctorName">Doctor Name:</label>
              <input
                type="text"
                id="doctorName"
                value={feedback.name}
                readOnly
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="review">Review:</label>
              <textarea
                id="review"
                value={feedback.review}
                onChange={(e) => setFeedback({ ...feedback, review: e.target.value })}
                placeholder="Enter your review here..."
                rows="5"
                required
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label>Rating:</label>
              <div className="rating-container">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${feedback.rating >= star ? 'filled' : ''}`}
                    onClick={() => setFeedback({ ...feedback, rating: star })}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                Submit Feedback
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={handleCancelFeedback}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
