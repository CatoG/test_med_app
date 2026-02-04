import React, { useEffect, useState } from 'react';
import './ProfileCard.css';

const ProfileCard = ({ onClose }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // Load user details from sessionStorage
    const name = sessionStorage.getItem('name') || 'N/A';
    const email = sessionStorage.getItem('email') || 'N/A';
    const phone = sessionStorage.getItem('phone') || 'N/A';

    setUserDetails({ name, email, phone });
  }, []);

  return (
    <div className="profile-card-overlay" onClick={onClose}>
      <div className="profile-card" onClick={(e) => e.stopPropagation()}>
        <div className="profile-card-header">
          <h2>Profile</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="profile-card-body">
          <div className="profile-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="profile-icon" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
          </div>

          <div className="profile-info">
            <div className="profile-field">
              <label>Name:</label>
              <p>{userDetails.name}</p>
            </div>

            <div className="profile-field">
              <label>Email:</label>
              <p>{userDetails.email}</p>
            </div>

            <div className="profile-field">
              <label>Phone:</label>
              <p>{userDetails.phone}</p>
            </div>
          </div>
        </div>

        <div className="profile-card-footer">
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
