import React, { useState } from 'react';
import './OrderDetailsPage.scss';
import logo from '../../assets/logo.png'; 
import img1 from '../../assets/Hall_01.jpg'; // Import images from assets folder
import img2 from '../../assets/Hall_02.jpg';
import img3 from '../../assets/Hall_03.jpg';
import { FaWifi, FaUtensils, FaParking, FaArrowRight } from 'react-icons/fa'; // Import icons for extra features

const OrderDetailsPage = ({ order, onClose }) => {
  const [curSlide, setCurSlide] = useState(0);

  const images = [img1, img2, img3];

  const nextSlide = () => {
    setCurSlide(curSlide === images.length - 1 ? 0 : curSlide + 1);
  };

  const prevSlide = () => {
    setCurSlide(curSlide === 0 ? images.length - 1 : curSlide - 1);
  };

  const handleViewDetails = () => {
    // Navigate to the description page when the button is clicked
    // Implement the navigation logic here
  };

  return (
    <div className="custom-order-detail-page">
      <div className="custom-popup">
        <div className="custom-popup-inner">
          <header className="custom-popup-header">
            <img src={logo} alt="Logo" className="logo" />
            <h1><strong>Booking Details</strong></h1>
            <button className="custom-close-btn" onClick={onClose}>Close</button>
          </header>
          <div className="custom-popup-content">
            <div className='firstHalf'>
            <div className="slider">
              <div className="slide" style={{ transform: `translateX(-${curSlide * 100}%)` }}>
                {images.map((image, index) => (
                  <img key={index} src={image} alt={`Venue ${index + 1}`} />
                ))}
              </div>
              <button className="btn btn-next" onClick={nextSlide}> &gt; </button>
              <button className="btn btn-prev" onClick={prevSlide}> &lt; </button>
            </div>
            <div className="vendor-contact-details">
              <h2>Contact Details</h2>
              <p><strong>Contact Number:</strong> +91 9945154956</p>
              <p><strong>Email:</strong>abc@gmail.com</p>
              <p><strong>Address:{order.address}</strong></p>
              {/* Add more vendor contact details here if needed */}
            </div>
            </div>
            <div className="custom-order-info">
              <p><strong>Name:</strong> {order.Name}</p>
              <p><strong>Type:</strong> {order.type}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Time:</strong> {order.time}</p>
              <p><div className={`status ${order.status}`}>{order.status}</div></p>
            </div>
           
            <div className="view-details-button" onClick={handleViewDetails}>
              <button >
                View Full Details <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
