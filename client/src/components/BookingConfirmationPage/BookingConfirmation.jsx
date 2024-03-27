// ConfirmationPopup.js
import React from 'react';
import './BookingConfirmation.scss';

const ConfirmationPopup = ({ isOpen, details, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Booking Details</h2>
        <p><strong>Hall Name:</strong> {details.hallName}</p>
        <p><strong>City:</strong> {details.city}</p>
        <p><strong>Address:</strong> {details.address}</p>
        {details.vegRate && <p><strong>Veg Rate:</strong> {details.vegRate}</p>}
        {details.nonVegRate && <p><strong>Non-Veg Rate:</strong> {details.nonVegRate}</p>}
        <p><strong>Date:</strong> {details.date}</p>
        <p><strong>Time:</strong> {details.time}</p>

        <h2>Customer Details</h2>
        <p><strong>Name:</strong> {details.customerName}</p>
        <p><strong>Address:</strong> {details.customerAddress}</p>
        <p><strong>Mobile Number:</strong> {details.mobileNumber}</p>

        <button className="confirm-button" onClick={onClose}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
