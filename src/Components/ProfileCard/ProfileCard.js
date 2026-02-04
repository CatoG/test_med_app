import React, { useEffect, useState } from 'react';
import './ProfileCard.css';
import { API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ onClose }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Function to fetch user profile data from the API
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken) {
        // If no auth token, load from sessionStorage as fallback
        const name = sessionStorage.getItem('name') || 'N/A';
        const email = sessionStorage.getItem('email') || 'N/A';
        const phone = sessionStorage.getItem('phone') || 'N/A';
        setUserDetails({ name, email, phone });
        setUpdatedDetails({ name, email, phone });
      } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email,
          },
        });
        
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);
        } else {
          // Fallback to sessionStorage if API fails
          const name = sessionStorage.getItem('name') || 'N/A';
          const email = sessionStorage.getItem('email') || 'N/A';
          const phone = sessionStorage.getItem('phone') || 'N/A';
          setUserDetails({ name, email, phone });
          setUpdatedDetails({ name, email, phone });
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Fallback to sessionStorage
      const name = sessionStorage.getItem('name') || 'N/A';
      const email = sessionStorage.getItem('email') || 'N/A';
      const phone = sessionStorage.getItem('phone') || 'N/A';
      setUserDetails({ name, email, phone });
      setUpdatedDetails({ name, email, phone });
    }
  };

  // Function to enable edit mode
  const handleEdit = () => {
    setEditMode(true);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        alert('Please log in to update your profile');
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Update session storage
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        alert('Profile Updated Successfully!');
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setUpdatedDetails(userDetails);
    setEditMode(false);
  };

  return (
    <div className="profile-card-overlay" onClick={onClose}>
      <div className="profile-card" onClick={(e) => e.stopPropagation()}>
        <div className="profile-card-header">
          <h2>{editMode ? 'Edit Profile' : 'Profile'}</h2>
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

          {editMode ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="profile-field">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedDetails.email}
                  disabled
                />
              </div>

              <div className="profile-field">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={updatedDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="profile-form-buttons">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          ) : (
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
          )}
        </div>

        {!editMode && (
          <div className="profile-card-footer">
            <button className="edit-profile-btn" onClick={handleEdit}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
