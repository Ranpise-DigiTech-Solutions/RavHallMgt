import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle } from 'react-icons/fa';

const CustomerBookingCard = ({ order, bookingStatus, onViewDetails }) => {
  return (
    <div className={`order-card ${bookingStatus.toLowerCase()}`}>
      <div className="order-info">
        <div>
          <div className="book-id"><strong>Booking ID: </strong>{order._id}</div>
          <div className="hall-name"><strong>Hall Name:</strong> {order.hallData.hallName}</div>
          <div className="date-time"><strong>Booked date:</strong> {new Date(order.bookingStartDateTimestamp).toLocaleString()}</div>
          <div className="date-time"><strong>Date of booking:</strong> {new Date(order.createdAt).toLocaleString()}</div>
          <div className={`status ${bookingStatus.toLowerCase()}`}>
            {bookingStatus === 'CONFIRMED' && <FaCheckCircle className="status-icon" />}
           
            {bookingStatus === 'PENDING' && (
              <FaExclamationCircle className="status-icon" />
            )}
            {bookingStatus === 'ONHOLD' && (
              <FaExclamationCircle className="status-icon" />
            )}
            {bookingStatus === 'REJECTED' && <FaTimesCircle className="status-icon" />}
            <span className="status-text">{bookingStatus}</span>
          </div>
          <button className="view-btn" onClick={() => onViewDetails(order)}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerBookingCard;