import React, { useState } from 'react';
import './HallForm.scss';
const HallForm = () => {
    const [formData, setFormData] = useState({
      hallName: 'Dr. TMA Pai International Convention Centre Mangalore',
      hallAddress: '#28, abc colony, 32nd street',
      hallCountry: 'India',
      hallState: 'Karnataka',
      hallCity: 'Mangalore',
      hallTaluk: 'Bejai',
      hallPincode: 570008,
      hallLandmark: 'near Temple Road',
      hallMainOfficeNo: '+918908393993',
      hallMainMobileNo: '+913892839823',
      hallMainEmail: 'abcd@gmail.com',
      hallDescription: `Standing glorious in the coastal city of Mangaluru, the TMA Pai International Convention Centre is one of the largest of its kind in India.
  
  Partnering with luxurious hospitality services, and accompanied by state-of-the-art facilities, the TMA Pai International Convention Centre is an extravagant one place stop for all your requirements.`,
      hallCapacity: 2000,
      hallRooms: 40,
      hallParking: 100,
      hallVegRate: 400,
      hallNonVegRate: 500,
    });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to backend or perform validation
    console.log("Form data:", formData);
  };



  return (
    <div className="HallForm">
      <h1>Hall Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="hallName">Hall Name:</label>
          <input
            type="text"
            id="hallName"
            name="hallName"
            value={formData.hallName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallAddress">Hall Address:</label>
          <input
            type="text"
            id="hallAddress"
            name="hallAddress"
            value={formData.hallAddress}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallDescription">Description:</label>
          <textarea
            id="hallDescription"
            name="hallDescription"
            value={formData.hallDescription}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallCountry">Country:</label>
          <input
            type="text"
            id="hallCountry"
            name="hallCountry"
            value={formData.hallCountry}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallState">State:</label>
          <input
            type="text"
            id="hallState"
            name="hallState"
            value={formData.hallState}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallCity">City:</label>
          <input
            type="text"
            id="hallCity"
            name="hallCity"
            value={formData.hallCity}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallTaluk">Taluk:</label>
          <input
            type="text"
            id="hallTaluk"
            name="hallTaluk"
            value={formData.hallTaluk}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallPincode">Pincode:</label>
          <input
            type="number"
            id="hallPincode"
            name="hallPincode"
            value={formData.hallPincode}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallLandmark">Landmark:</label>
          <input
            type="text"
            id="hallLandmark"
            name="hallLandmark"
            value={formData.hallLandmark}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallMainOfficeNo">Main Office Number:</label>
          <input
            type="text"
            id="hallMainOfficeNo"
            name="hallMainOfficeNo"
            value={formData.hallMainOfficeNo}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallMainMobileNo">Main Mobile Number:</label>
          <input
            type="text"
            id="hallMainMobileNo"
            name="hallMainMobileNo"
            value={formData.hallMainMobileNo}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallMainEmail">Main Email:</label>
          <input
            type="email"
            id="hallMainEmail"
            name="hallMainEmail"
            value={formData.hallMainEmail}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="hallCapacity">Capacity:</label>
          <input
            type="number"
            id="hallCapacity"
            name="hallCapacity"
            value={formData.hallCapacity}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallRooms">Rooms:</label>
          <input
            type="number"
            id="hallRooms"
            name="hallRooms"
            value={formData.hallRooms}
            onChange={handleInputChange}
          />
        </div>
    
        <div className="input-group">
          <label htmlFor="hallParking">Parking Slots:</label>
          <input
            type="number"
            id="hallParking"
            name="hallParking"
            value={formData.hallParking}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallVegRate">Veg Rate:</label>
          <input
            type="number"
            id="hallVegRate"
            name="hallVegRate"
            value={formData.hallVegRate}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hallNonVegRate">Non-Veg Rate:</label>
          <input
            type="number"
            id="hallNonVegRate"
            name="hallNonVegRate"
            value={formData.hallNonVegRate}
            onChange={handleInputChange}
          />
        </div>
        <button className="save-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HallForm;
