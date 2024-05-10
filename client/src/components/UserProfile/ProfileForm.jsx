import React, { useState, useRef } from 'react';
import './ProfileForm.scss';
import DefaultImage from "../../assets/upload-photo-here.jpg";
import EditIcon from "../../assets/edit.svg";
import UploadingAnimation from "../../assets/uploading.gif.mp4";

const ProfileForm = () => {
  const [avatarURL, setAvatarURL] = useState(DefaultImage);
  const fileUploadRef = useRef();
  const [userName, setUserName] = useState('Chirag'); // Example name, replace with actual name
  const [personalFormData, setPersonalFormData] = useState({
    firstName: 'Chirag',
    lastName: 'A K',
    gender: 'male',
    CurrentPassword: '',
    NewPassword: '',
  });
  const [contactFormData, setContactFormData] = useState({
    mobileNumber: '',
    email: '',
    altMobileNumber: '',
    altEmail: '',
  });
  const [addressFormData, setAddressFormData] = useState({
    address: '',
    landmark: '',
    city: '',
    taluk: '',
    state: '',
    country: '',
    pincode: '',
  });
  const [addressFormDisabled, setAddressFormDisabled] = useState(true);
  const [personalFormDisabled, setPersonalFormDisabled] = useState(true);
  const [personalSaveButtonText, setPersonalSaveButtonText] = useState('Save');
  const [contactFormDisabled, setContactFormDisabled] = useState(true);
  const [contactSaveButtonText, setContactSaveButtonText] = useState('Save');

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = async () => {
    try {
      setAvatarURL(UploadingAnimation);
      const uploadedFile = fileUploadRef.current.files[0];
      const formData = new FormData();
      formData.append("file", uploadedFile);

      // Simulate image upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update avatarURL with the uploaded image
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarURL(reader.result);
      };
      reader.readAsDataURL(uploadedFile);
    } catch (error) {
      console.error(error);
      setAvatarURL(DefaultImage);
    }
  };

  const handlePersonalInputChange = (event) => {
    const { name, value } = event.target;
    setPersonalFormData({
      ...personalFormData,
      [name]: value,
    });
  };

  const handlePersonalEditClick = () => {
    if (personalFormDisabled) {
      setPersonalSaveButtonText('Save');
    } else {
      // Handle personal information form submission
      console.log(personalFormData);
      setPersonalSaveButtonText('Edit');
    }
    setPersonalFormDisabled(!personalFormDisabled);
  };

  const handlePersonalSave = (event) => {
    event.preventDefault();
    // Handle saving personal information here
    console.log("Saving personal information:", personalFormData);
    setPersonalFormDisabled(true); // Disable form after saving
  };

  const handleContactInputChange = (event) => {
    const { name, value } = event.target;
    setContactFormData({
      ...contactFormData,
      [name]: value,
    });
  };

  const handleContactEditClick = () => {
    if (contactFormDisabled) {
      setContactSaveButtonText('Save');
    } else {
      // Handle contact information form submission
      console.log(contactFormData);
      setContactSaveButtonText('Edit');
    }
    setContactFormDisabled(!contactFormDisabled);
  };

  const handleContactSave = (event) => {
    event.preventDefault();
    // Handle saving contact information here
    console.log("Saving contact information:", contactFormData);
    setContactFormDisabled(true); // Disable form after saving
  };

  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    setAddressFormData({
      ...addressFormData,
      [name]: value,
    });
  };

  const handleAddressEditClick = () => {
    setAddressFormDisabled(!addressFormDisabled);
  };

  const handleAddressSubmit = (event) => {
    event.preventDefault();
    // Handle address information form submission
    console.log("Saving address information:", addressFormData);
    setAddressFormDisabled(true); // Disable form after submission
  };

  return (
    <div className="UserProfile__container">
      <div className="coverpage"></div>
      <div className="image-upload-container">
        <img 
          src={avatarURL}
          alt="Avatar"
          className="avatar-image"
        />
        <div className="user-name sideheading">
          <strong>{userName}</strong>
        </div>
        <form encType='multipart/form-data'>
          <button
            type='button'
            onClick={handleImageUpload}
            className='edit-button'>
            <img
              src={EditIcon}
              alt="Edit"
              className='edit-icon' 
            />
          </button>
          <input 
            type="file"
            ref={fileUploadRef}
            onChange={uploadImageDisplay}
            hidden
          />
        </form>  
      </div>
      <div className='personal-information'>
        <button className='edittext' onClick={handlePersonalEditClick}>
          {personalFormDisabled ? 'Edit Personal Info' : 'Cancel'}
        </button>
        <strong><h2 className='sideheading'>Personal Information</h2></strong>
        <p>Update your information about you and details here</p>
        <div className="customForm"> 
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={personalFormData.firstName}
                onChange={handlePersonalInputChange}
                disabled={personalFormDisabled}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={personalFormData.lastName}
                onChange={handlePersonalInputChange}
                disabled={personalFormDisabled}
              />
            </div>
          </div>
          <div className='input-row'>
            <div className="input-group">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={personalFormData.gender}
                onChange={handlePersonalInputChange}
                disabled={personalFormDisabled}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="CurrentPassword">Current Password:</label>
              <input
                type="password"
                id="CurrentPassword"
                name="CurrentPassword"
                value={personalFormData.CurrentPassword}
                onChange={handlePersonalInputChange}
                disabled={personalFormDisabled}
              />
            </div>
            <div className="input-group">
              <label htmlFor="NewPassword">New Password:</label>
              <input
                type="password"
                id="NewPassword"
                name="NewPassword"
                value={personalFormData.NewPassword}
                onChange={handlePersonalInputChange}
                disabled={personalFormDisabled}
              />
            </div>
          </div>
          {!personalFormDisabled && (
            <button
              type="submit"
              className="save-button"
              onClick={handlePersonalSave}
            >
              {personalSaveButtonText}
            </button>
          )}
        </div>
      </div>
      <hr /> 
      <div className='contact-information'>
        <button className='edittext' onClick={handleContactEditClick}>
          {contactFormDisabled ? 'Edit Contact Info' : 'Cancel'}
        </button>
        <strong><h2 className='sideheading'>Contact Information</h2></strong>
        <p>Update your contact details here</p>
        <div className="customForm"> 
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={contactFormData.mobileNumber}
                onChange={handleContactInputChange}
                disabled={contactFormDisabled}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactFormData.email}
                onChange={handleContactInputChange}
                disabled={contactFormDisabled}
              />
            </div>
          </div>
          <div className='input-row'>
            <div className="input-group">
              <label htmlFor="altMobileNumber">Alt Mobile Number:</label>
              <input
                type="text"
                id="altMobileNumber"
                name="altMobileNumber"
                value={contactFormData.altMobileNumber}
                onChange={handleContactInputChange}
                disabled={contactFormDisabled}
              />
            </div>
            <div className="input-group">
              <label htmlFor="altEmail">Alt Email:</label>
              <input
                type="email"
                id="altEmail"
                name="altEmail"
                value={contactFormData.altEmail}
                onChange={handleContactInputChange}
                disabled={contactFormDisabled}
              />
            </div>
          </div>
          {!contactFormDisabled && (
            <button
              type="submit"
              className="save-button"
              onClick={handleContactSave}
            >
              {contactSaveButtonText}
            </button>
          )}
        </div>
      </div>
      <hr />
      <div className='address-information'>
        <p className='edittext' onClick={handleAddressEditClick}>
          {addressFormDisabled ? 'Edit Address Info' : 'Cancel'}
        </p>
        <strong><h2 className='sideheading'>Address Information</h2></strong>
        <p>Update your address details here</p>
        <form onSubmit={handleAddressSubmit}>
          <div className="customForm">
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={addressFormData.address}
                  onChange={handleAddressInputChange}
                  disabled={addressFormDisabled}
                />
              </div>
              <div className="input-group">
                <label htmlFor="landmark">Landmark:</label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={addressFormData.landmark}
                  onChange={handleAddressInputChange}
                  disabled={addressFormDisabled}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={addressFormData.city}
                  onChange={handleAddressInputChange}
                  disabled={addressFormDisabled}
                />
              </div>
              <div className="input-group">
                <label htmlFor="taluk">Taluk:</label>
                <input
                  type="text"
                  id="taluk"
                  name="taluk"
                  value={addressFormData.taluk}
                  onChange={handleAddressInputChange}
                  disabled={addressFormDisabled}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={addressFormData.state}
                  onChange={handleAddressInputChange}
                  disabled={addressFormDisabled}
                />
              </div>
              <div className="input-group">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={addressFormData.country}
                  onChange={handleAddressInputChange}
                  disabled={addressFormDisabled}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="pincode">Pincode:</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={addressFormData.pincode}
                  onChange={handleAddressInputChange}
                  disabled={addressFormDisabled}
                />
              </div>
            </div>
            {!addressFormDisabled && (
              <button type="submit" className="save-button">Save</button>
            )}
          </div>
        </form>
      </div>
      <hr />
    </div>
  );
};

export default ProfileForm;
