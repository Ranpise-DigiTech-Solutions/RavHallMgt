import React, { useState } from 'react';
import './HallForm.scss';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const HallForm = () => {
  const [formData, setFormData] = useState({
    hallId: '7648277489',
    hallName: 'Dr. TMA Pai International Convention Centre Mangalore',
    hallDescription: `Standing glorious in the coastal city of Mangaluru, the TMA Pai International Convention Centre is one of the largest of its kind in India.

Partnering with luxurious hospitality services, and accompanied by state-of-the-art facilities, the TMA Pai International Convention Centre is an extravagant one place stop for all your requirements.`,
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
    hallCapacity: 2000,
    hallRooms: 40,
    hallParking: 100,
    hallVegRate: 400,
    hallNonVegRate: 500,
  });

  const [hallInfoDisabled, setHallInfoDisabled] = useState(true);
  const [addressInfoDisabled, setAddressInfoDisabled] = useState(true);
  const [contactInfoDisabled, setContactInfoDisabled] = useState(true);
  const [additionalInfoDisabled, setAdditionalInfoDisabled] = useState(true);

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

  const handleHallInfoEdit = () => {
    setHallInfoDisabled(!hallInfoDisabled);
  };

  const handleAddressInfoEdit = () => {
    setAddressInfoDisabled(!addressInfoDisabled);
  };

  const handleContactInfoEdit = () => {
    setContactInfoDisabled(!contactInfoDisabled);
  };

  const handleAdditionalInfoEdit = () => {
    setAdditionalInfoDisabled(!additionalInfoDisabled);
  };

  return (
    <div className="HallForm">
      <form onSubmit={handleSubmit}>
        <div className='hall-information'>
          <div className='edit-section'>
            <strong><h2 className='sideheading'>Hall Information</h2></strong>
            <button className='edittext' onClick={handleHallInfoEdit}>
              {hallInfoDisabled ? 'Edit' : 'Cancel'}
            </button>
          </div>

          <div className='input-row'>
            <div className="fullwidth">
              <label htmlFor="hallId">Hall id:</label>
              <input
                type="number"
                id="hallId"
                name="hallId"
                value={formData.hallId}
                onChange={handleInputChange}
                disabled={hallInfoDisabled}
              />
            </div>
          </div>
          <div className='input-row'>
            <div className="fullwidth">
              <label htmlFor="hallName">Hall Name:</label>
              <input
                type="text"
                id="hallName"
                name="hallName"
                value={formData.hallName}
                onChange={handleInputChange}
                disabled={hallInfoDisabled}
              />
            </div>
          </div>
          <div className='input-row'>
            <div className="fullwidth">
              <label htmlFor="hallDescription">Description:</label>
              <textarea
                id="hallDescription"
                name="hallDescription"
                value={formData.hallDescription}
                onChange={handleInputChange}
                disabled={hallInfoDisabled}
              />
            </div>
          </div>
        </div>
        <hr />

        <div className='address-information'>
          <div className='edit-section'>
            <strong><h2 className='sideheading'>Address Information</h2></strong>
            <button className='edittext' onClick={handleAddressInfoEdit}>
              {addressInfoDisabled ? 'Edit' : 'Cancel'}
            </button>
          </div>
          <div className='input-row'>
            <div className="input-group">
              <label htmlFor="hallAddress">Hall Address:</label>
              <input
                type="text"
                id="hallAddress"
                name="hallAddress"
                value={formData.hallAddress}
                onChange={handleInputChange}
                disabled={addressInfoDisabled}
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
                disabled={addressInfoDisabled}
              />
            </div>
          </div>
          <div className='input-row'>
            <div className="input-group">
              <label htmlFor="hallState">State:</label>
              <input
                type="text"
                id="hallState"
                name="hallState"
                value={formData.hallState}
                onChange={handleInputChange}
                disabled={addressInfoDisabled}
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
                disabled={addressInfoDisabled}
              />
            </div>
          </div>

          <div className='input-row'>
            <div className="input-group">
              <label htmlFor="hallTaluk">Taluk:</label>
              <input
                type="text"
                id="hallTaluk"
                name="hallTaluk"
                value={formData.hallTaluk}
                onChange={handleInputChange}
                disabled={addressInfoDisabled}
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
                disabled={addressInfoDisabled}
              />
            </div>
          </div>
          <div className='input-row'>
            <div className="input-group">
              <label htmlFor="hallLandmark">Landmark:</label>
              <input
                type="text"
                id="hallLandmark"
                name="hallLandmark"
                value={formData.hallLandmark}
                onChange={handleInputChange}
                disabled={addressInfoDisabled}
              />
            </div>
          </div>
        </div>
        <hr />

        <div className='contact-information'>
          <div className='edit-section'>
            <strong><h2 className='sideheading'>Contact Information</h2></strong>
            <button className='edittext' onClick={handleContactInfoEdit}>
              {contactInfoDisabled ? 'Edit' : 'Cancel'}
              </button>
          </div>
          <div className='input-row'>
            <div className="input-group">
              <label htmlFor="hallMainOfficeNo">Contact Number:</label>
              <input
                type="text"
                id="hallMainOfficeNo"
                name="hallMainOfficeNo"
                value={formData.hallMainOfficeNo}
                onChange={handleInputChange}
                disabled={contactInfoDisabled}
              />
            </div>
            <div className="input-group">
              <label htmlFor="hallMainMobileNo">Alternate Contact Number:</label>
              <input
                type="text"
                id="hallMainMobileNo"
                name="hallMainMobileNo"
                value={formData.hallMainMobileNo}
                onChange={handleInputChange}
                disabled={contactInfoDisabled}
              />
            </div>
          </div>
          <div className='input-row'>
            <div className="input-group">
              <label htmlFor="hallMainEmail">Main Email:</label>
              <input
                type="email"
                id="hallMainEmail"
                name="hallMainEmail"
                value={formData.hallMainEmail}
                onChange={handleInputChange}
                disabled={contactInfoDisabled}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className='additional-information'>
          <div className='edit-section'>
            <strong><h2 className='sideheading'>Additional Information</h2></strong>
            <button className='edittext' onClick={handleAdditionalInfoEdit}>
              {additionalInfoDisabled ? 'Edit' : 'Cancel'}
            </button>
          </div>
          <div className='input-row'>
            <div className="input-group">
              <label htmlFor="hallCapacity">Capacity:</label>
              <input
                type="number"
                id="hallCapacity"
                name="hallCapacity"
                value={formData.hallCapacity}
                onChange={handleInputChange}
                disabled={additionalInfoDisabled}
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
                disabled={additionalInfoDisabled}
              />
            </div>
          </div>

          <div className='input-row'>
            <div className="input-group">
              <label htmlFor="hallParking">Parking Slots:</label>
              <input
                type="number"
                id="hallParking"
                name="hallParking"
                value={formData.hallParking}
                onChange={handleInputChange}
                disabled={additionalInfoDisabled}
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
                disabled={additionalInfoDisabled}
              />
            </div>
          </div>
          <div className='input-row'>
            <div className="input-group">
              <label htmlFor="hallNonVegRate">Non-Veg Rate:</label>
              <input
                type="number"
                id="hallNonVegRate"
                name="hallNonVegRate"
                value={formData.hallNonVegRate}
                onChange={handleInputChange}
                disabled={additionalInfoDisabled}
              />
            </div>
          </div>
        </div>
        <hr />
      <div className='Photos'>
    <strong><h2 className='sideheading'>Add Photos</h2></strong>
  <div> {/* New div to place Dragger on a new line */}
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Add your single/multiple photos here.
      </p>
    </Dragger>
  </div>
</div>
<hr />
<div className='Albums'>
    <strong><h2 className='sideheading'>Add Albums</h2></strong>
  <div> {/* New div to place Dragger on a new line */}
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Add your single/multiple photos here.
      </p>
    </Dragger>
  </div>
</div>

<hr />
<div className='Videos'>
    <strong><h2 className='sideheading'>Add Videos</h2></strong>
  <div> {/* New div to place Dragger on a new line */}
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Add your single/multiple videos here.
      </p>
    </Dragger>
  </div>
</div>


      </form>
    </div>
  );
};

export default HallForm;