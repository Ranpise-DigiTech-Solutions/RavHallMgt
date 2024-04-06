// UserProfilePage.js

import React from 'react';
import { useState } from 'react';
import './UserProfileNavbar.scss'; // Import your SCSS file
import profileImg from '../../assets/profile_image.png'
import UserProfileUpdate from '../UserProfileUpdate/UserProfileUpdate';
import { UnderlineOutlined } from '@ant-design/icons';

const UserProfileNavbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userDetails, setuserDetails] = useState({
    // Populate with initial booking details or fetch them as required
  });
  const handleBooking = () => {
    setShowPopup(true); // This should set showPopup state to true when "Book Now" button is clicked
  };
  return (
    
   <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-image"> 
            <img src={profileImg} alt="Profile" /> {/* Placeholder image */}
          </div>
          <h2>Shamanth S Shetty</h2>
          <div className="profile-details">
            <p><i className="fa fa-phone"></i> Phone number : 1234567890</p>
            <p><i className="fa fa-home"></i> User address :xyz</p>
            <p><i className="fa fa-envelope"></i> Email Address : abc@gmail.com</p>
 
      
      
          </div>
          <div className="profile-actions">
            <button onClick={handleBooking}
          variant="contained"
          className="edit-button"
          sx={{
            backgroundColor: 'orange',
            '&:hover': {
              backgroundColor: 'darkorange', // Change to your desired shade of orange
            },
          }}>Edit</button>
            <UserProfileUpdate
            isOpen={showPopup}
            details={userDetails}
            onClose={() => setShowPopup(false)}
           /></div>
        </div>
      </div>
      <hr class="bold-dark-hr" />
      <h3><a href="#" >Recent activities</a></h3>
    </div>
    
    </div>
  );
};

export default UserProfileNavbar;
