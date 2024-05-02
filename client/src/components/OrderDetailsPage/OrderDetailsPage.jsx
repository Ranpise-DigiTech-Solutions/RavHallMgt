import React, { useState } from 'react';
import './OrderDetailsPage.scss';
import logo from '../../assets/logo.png';
import { FaWifi, FaUtensils, FaParking, FaArrowRight, FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaEdit, FaSave, FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaHotel, FaUsers, FaClock, FaCarSide, FaBed, FaCommentAlt } from 'react-icons/fa';

const OrderDetailsPage = ({ userId, onClose, userType }) => {
  const [curSlide, setCurSlide] = useState(0);
  const [bookingStatus, setBookingStatus] = useState('PENDING');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [newStatus, setNewStatus] = useState('PENDING');
  userType = "VENDOR";
  const dummyOrder = {
    _id: '1234567890',
    customerData: {
      customerName: 'John Doe',
      customerContact: '+1 234 567 890',
      customerAltContact: '+1 098 765 432',
      customerEmail: 'johndoe@example.com',
      customerCurrentLocation: 'New York',
      customerProfileImage: 'https://via.placeholder.com/150',
    },
    vendorData: {
      vendorName: 'Acme Event Hall',
      vendorEmail: 'info@acmeeventhall.com',
      vendorProfileImage: 'https://via.placeholder.com/150',
    },
    hallData: {
      hallImages: ['https://via.placeholder.com/500x300'],
    },
    bookingType: 'Wedding',
    bookingDuration: 6,
    guestsCount: 200,
    roomsCount: 10,
    vehiclesCount: 50,
    parkingRequirement: true,
    bookCaterer: true,
    customerVegItemsList: 'Paneer Tikka, Daal Makhani, Veg Biryani',
    customerVegRate: 500,
    customerNonVegItemsList: 'Chicken Tikka, Mutton Curry, Fish Fry',
    customerNonVegRate: 800,
    customerSuggestion: 'Please provide a separate vegan menu.',
    vendorContact: '+1 987 654 321',
    vendorAddress: '123 Main St, New York, NY 10001',
    hallName: 'Acme Event Hall',
    hallLocation: 'New York',
    createdAt: new Date('2023-05-01T10:00:00Z'),
  };

  const handleViewDetails = () => {
    // Navigate to the description page when the button is clicked
    // Implement the navigation logic here
  };

  const handleStatusChange = (newStatus) => {
    setNewStatus(newStatus);
  };

  const updateBookingToconfirm = async (bookingId) => {
    try {
      // Update the bookingStatus in the bookingMaster table
      const updatedbookingresponse = await axios.put(`http://localhost:8000/eventify_server/bookingMaster/${bookingId}`, {
        bookingStatus: 'CONFIRMED',
      });
      const updatedbooking = updatedbookingresponse.data;
      // Get the confirmed booking data
      const confirmedBookingResponse = await axios.get(`http://localhost:8000/eventify_server/bookingMaster/${bookingId}`);
      const confirmedBooking = confirmedBookingResponse.data;

      // Manually add the required fields with default values
      confirmedBooking.finalVehicleCount = updatedbooking.vehiclesCount;
      confirmedBooking.finalHallParkingRequirement = updatedbooking.parkingRequirement;
      confirmedBooking.finalRoomCount = updatedbooking.roomsCount;
      confirmedBooking.finalGuestCount = updatedbooking.guestsCount;

      // Post the confirmed booking data to the hallBookingMaster table
      await axios.post('http://localhost:8000/eventify_server/hallBookingMaster/', confirmedBooking);
      fetchBookings();

    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  const updateBookingToReject = async (bookingId) => {
    try {
      await axios.put(`http://localhost:8000/eventify_server/bookingMaster/${bookingId}`, {
        bookingStatus: 'REJECTED',
      });
      fetchBookings();

    } catch (error) {
      console.error('Error rejecting booking:', error);
    }
  };

  const handleSaveStatus = () => {
    setBookingStatus(newStatus);
    setShowStatusDropdown(false);

    if (newStatus === 'CONFIRMED') {
      updateBookingToconfirm(order._id);
    } else if (newStatus === 'REJECTED') {
      updateBookingToReject(order._id);
    } else if (newStatus === 'ONHOLD') {
      // Call a function to update the booking status to PENDING in the database
      updateBookingToOnHold(order._id);
    }
  };

  const updateBookingToOnHold = async (bookingId) => {
    try {
      await axios.put(`http://localhost:8000/eventify_server/bookingMaster/${bookingId}`, {
        bookingStatus: 'ONHOLD',
      });
      // Refetch bookings after updating to PENDING
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking to PENDING:', error);
    }
  };

  const renderVendorDetails = () => {
    return (
      <div className="vendor-details">
        <div className="customer-profile">
          <div className="customer-profile-image">
            <img src={dummyOrder.customerData.customerProfileImage} alt="Customer Profile" />
          </div>
          <div className="customer-contact-details">
            <h2> Customer Contact Details</h2>
            <p><FaUser /> <strong>Name:</strong> {dummyOrder.customerData.customerName}</p>
            <p><FaPhone /> <strong>Contact Number:</strong> {dummyOrder.customerData.customerContact}</p>
            <p><FaPhone /> <strong>Alternative Number:</strong> {dummyOrder.customerData.customerAltContact}</p>
            <p><FaEnvelope /> <strong>Email:</strong> {dummyOrder.customerData.customerEmail}</p>
            <p><FaMapMarkerAlt /> <strong>City:</strong> {dummyOrder.customerData.customerCurrentLocation}</p>
            <p><FaCalendarAlt /> <strong>Date of Booking:</strong> {new Date(dummyOrder.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="booking-details">
          <h2>Booking Details</h2>
          <div className='bookingdata-left'>
          <p><FaUsers /> <strong>Booking Type :</strong> {dummyOrder.bookingType}</p>
          <p><FaClock /> <strong>Booking Duration: </strong> {dummyOrder.bookingDuration} hours</p>
          <p><FaUsers /> <strong>Guests Count :</strong> {dummyOrder.guestsCount}</p>
          <p><FaBed /> <strong>Rooms Count :</strong> {dummyOrder.roomsCount}</p>
          <p><FaCarSide /> <strong>Vehicles Count :</strong> {dummyOrder.vehiclesCount}</p>
          <p><FaParking /> <strong>Parking Requirement :</strong> {dummyOrder.parkingRequirement ? 'Yes' : 'No'}</p>
          </div>
          <div className='bookingdata-right'>
          <p><FaUtensils /> <strong>Book Caterer :</strong> {dummyOrder.bookCaterer ? 'Yes' : 'No'}</p>
          {dummyOrder.bookCaterer && (
            <>
              <p ><FaUtensils /> <strong className='food-menu'>Veg Items List:</strong> </p><p>{dummyOrder.customerVegItemsList}</p>
              <p><FaUtensils /> <strong>Veg Rate :</strong> {dummyOrder.customerVegRate}</p>
              <p ><FaUtensils /> <strong className='food-menu'>Non-Veg Items List :</strong> </p><p>{dummyOrder.customerNonVegItemsList}</p>
              <p><FaUtensils /> <strong>Non-Veg Rate :</strong> {dummyOrder.customerNonVegRate}</p>
            </>
          )}
          </div>
          <p className="customer-suggestion-full-width"><FaCommentAlt /> <strong>Customer Suggestion:</strong> {dummyOrder.customerSuggestion}</p>
        </div>
       
      </div>
    );
  };

  const renderCustomerDetails = () => {
    return (
      <div>
        <div className="vendor-profile">
        <div className="vendor-profile-image">
        <img src={dummyOrder.hallData.hallImages[0]} alt="Hall Photo" />
        </div>
        <div className="vendor-contact-details">
        
          <h2> Vendor Contact Details</h2>
          <p><FaUser /> <strong>Name:</strong> {dummyOrder.vendorData.vendorName}</p>
          <p><FaPhone /> <strong>Contact Number:</strong> {dummyOrder.vendorContact}</p>
          <p><FaEnvelope /> <strong>Email:</strong> {dummyOrder.vendorData.vendorEmail}</p>
          <p><FaMapMarkerAlt /> <strong>Address:</strong> {dummyOrder.vendorAddress}</p>
          <p><FaHotel /> <strong>Hall Name:</strong> {dummyOrder.hallName}</p>
          <p><FaMapMarkerAlt /> <strong>Hall Location:</strong> {dummyOrder.hallLocation}</p>
          <p><FaCalendarAlt /> <strong>Date of Booking:</strong> {new Date(dummyOrder.createdAt).toLocaleString()}</p>
        </div>
        </div>
        <div className="booking-details">
          <h2>Booking Details</h2>
          <div className='bookingdata-left'>
          <p><FaUsers /> <strong>Booking Type:</strong> {dummyOrder.bookingType}</p>
          <p><FaClock /> <strong>Booking Duration:</strong> {dummyOrder.bookingDuration} hours</p>
          <p><FaUsers /> <strong>Guests Count:</strong> {dummyOrder.guestsCount}</p>
          <p><FaBed /> <strong>Rooms Count:</strong> {dummyOrder.roomsCount}</p>
          <p><FaCarSide /> <strong>Vehicles Count:</strong> {dummyOrder.vehiclesCount}</p>
          <p><FaParking /> <strong>Parking Requirement:</strong> {dummyOrder.parkingRequirement ? 'Yes' : 'No'}</p>
          </div>
          <div className='bookingdata-right'>
          <p><FaUtensils /> <strong>Book Caterer:</strong> {dummyOrder.bookCaterer ? 'Yes' : 'No'}</p>
          {dummyOrder.bookCaterer && (
            <>
              <p ><FaUtensils /> <strong className='food-menu'>Veg Items List:</strong> </p><p>{dummyOrder.customerVegItemsList}</p>
              <p><FaUtensils /> <strong>Veg Rate :</strong> {dummyOrder.customerVegRate}</p>
              <p ><FaUtensils /> <strong className='food-menu'>Non-Veg Items List :</strong> </p><p>{dummyOrder.customerNonVegItemsList}</p>
              <p><FaUtensils /> <strong>Non-Veg Rate :</strong> {dummyOrder.customerNonVegRate}</p>
            </>
          )}
          </div>
          <p className="customer-suggestion-full-width"><FaCommentAlt /> <strong>Customer Suggestion:</strong> {dummyOrder.customerSuggestion}</p>
        </div>
        <div className="view-details-button" onClick={handleViewDetails}>
                <button>
                  View Full Details
                </button>
        </div>
      </div>
    );
  };

  const renderAdminDetails = () => {
    const { customerName, customerContact, customerEmail, customerProfileImage } = dummyOrder.customerData;
    const { vendorName, vendorContact, vendorEmail, vendorProfileImage } = dummyOrder.vendorData;

    return (
      <div>
        <div className="vendor-contact-details">
          <h2><FaHotel /> Vendor Contact Details</h2>
          <p><FaUser /> <strong>Name:</strong> {vendorName}</p>
          <p><FaPhone /> <strong>Contact Number:</strong> {vendorContact}</p>
          <p><FaEnvelope /> <strong>Email:</strong> {vendorEmail}</p>
          <p><FaMapMarkerAlt /> <strong>Address:</strong> {dummyOrder.vendorAddress}</p>
          <img src={vendorProfileImage} alt="Vendor Profile" />
        </div>
        <div className="customer-contact-details">
          <h2><FaUser /> Customer Contact Details</h2>
          <p><FaUser /> <strong>Name:</strong> {customerName}</p>
          <p><FaPhone /> <strong>Contact Number:</strong> {customerContact}</p>
          <p><FaEnvelope /> <strong>Email:</strong> {customerEmail}</p>
          <p><FaMapMarkerAlt /> <strong>City:</strong> {dummyOrder.customerData.customerCurrentLocation}</p>
          <img src={customerProfileImage} alt="Customer Profile" />
        </div>
        <div className="hall-details">
          <h2><FaHotel /> Hall Details</h2>
          <p><FaHotel /> <strong>Hall Name:</strong> {dummyOrder.hallName}</p>
          <p><FaMapMarkerAlt /> <strong>Hall Location:</strong> {dummyOrder.hallLocation}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="custom-order-detail-page__container">
      <div className="custom-popup">
        <div className="custom-popup-inner">
          <header className="custom-popup-header">
            <img src={logo} alt="Logo" className="logo" />
            <h1><strong>Booking Description</strong></h1>
            <button className="custom-close-btn" onClick={onClose}>Close</button>
          </header>
          <div className="custom-popup-content">
            <div className='firstHalf'>
              {userType === 'VENDOR' && renderVendorDetails()}
              {userType === 'CUSTOMER' && renderCustomerDetails()}
              {userType === 'ADMIN' && renderAdminDetails()}
            </div>
            <div className="custom-order-info">
              {userType === 'VENDOR' && (
                <div className="status-dropdown">
                  {bookingStatus !== 'CONFIRMED' && (
                    <div className="edit-status" onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
                      <FaEdit className="edit-icon" />
                      <span className="edit-text">Edit Status</span>
                    </div>
                  )}
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
                  {showStatusDropdown && (
                    <div className="status-dropdown-menu">
                      <div className="status-option-container">
                        <div className="status-option" onClick={() => handleStatusChange('ONHOLD')}>
                          <FaExclamationCircle className="status-icon" />
                          <span>On Hold</span>
                        </div>
                        <div className="status-option" onClick={() => handleStatusChange('CONFIRMED')}>
                          <FaCheckCircle className="status-icon" />
                          <span>Confirm</span>
                        </div>
                        <div className="status-option" onClick={() => handleStatusChange('REJECTED')}>
                          <FaTimesCircle className="status-icon" />
                          <span>Reject</span>
                        </div>
                      </div>
                      <div className="status-action-buttons">
                        <button className="save-btn" onClick={handleSaveStatus}>
                          <FaSave className="save-icon" />
                          <span>Save</span>
                        </button>
                        <button className="cancel-btn" onClick={() => setShowStatusDropdown(false)}>
                          <FaTimes className="cancel-icon" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

