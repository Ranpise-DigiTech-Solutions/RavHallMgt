import React, { useState } from 'react';
import { Grid, Typography, Avatar, Button } from '@mui/material'; // Assuming you are using Material-UI
import './ProfileForm.scss'; 

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    image: null, // Initialize profile state with null image
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProfile({
      ...profile,
      image: file,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="UserProfile">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} alignItems="center" justify="center">
          <Grid item xs={12}>
            <Typography className='sideheading' variant="h6">Personal Information</Typography>
          </Grid>
          <Grid item xs={12} sm={4} className='profileupload'>
            <Avatar
              src={profile.image ? URL.createObjectURL(profile.image) : ''}
              style={{ width: 150, height: 150 }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="profile-image"
            />
            <label htmlFor="profile-image" className="upload-label">
              <Button variant="contained" color="primary" component="span" className='upload-button'>
                Upload Image
              </Button>
            </label>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ProfileForm;
