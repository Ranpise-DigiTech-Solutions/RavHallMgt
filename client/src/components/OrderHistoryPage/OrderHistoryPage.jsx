import React, { useState } from 'react';
import OrderDetailsPage from '../OrderDetailsPage/OrderDetailsPage';
import './OrderHistoryPage.scss';
import img from '../../assets/Hall_01.jpg'; // Assuming this is the correct path to your image
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle } from 'react-icons/fa';                                                          
const OrderHistoryPage = () => {
  // Mock data for orders
  const [orders, setOrders] = useState([
    {
      id: 1,
      Name: "Janatha Caterrers",
      type: "Caterrer",
      date: "2024-04-01",
      time: "10:00 AM",
      catering_available:'Yes',
      address:"Hotel Shaan Plaza, KS Rao Road, Mangalore - 575001",
      status: "Confirmed"
    },
    {
      id: "6612fc4e78d0ee968ca83c40",
      Name: "B. Sanjeeva Shetty Sabhagraha",
      type: "Hall",
      date: "2024-04-02",
      time: "11:00 AM",
      address:"Sh 101, Mangaluru, Bajpe, Mangalore - 574142",
      status: "Pending"
    },
    {
      id: 3,
      Name: "Hall C",
      type: "Hall",
      date: "2024-04-03",
      time: "12:00 PM",
      address:"Sh 101, Mangaluru, Bajpe, Mangalore - 574142",
      status: "Canceled"
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleClosePopup = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="order-history-page">
      <div className="order-history-panel">
        <div className="order-history">
          <h2>Booking History</h2>
          {orders.length === 0 ? (
            <p>No booking history available.</p>
          ) : (
            <div className="order-list">
              {orders.map(order => (
                <div key={order.id} className={`order-card ${order.status.toLowerCase()}`}>
                  <div className="order-info">
                    <div className="hall-image">
                      <img src={img} alt={order.hallName} />
                    </div>
                    <div>
                      <div className="book-id"><strong>Booking id: </strong>{order.id}</div>
                      <div className="name"><strong>Name:</strong> {order.Name}</div>
                      <div className="vendor-type"><strong>Vendor Type:</strong> {order.type}</div>
                      <div className="date-time"><strong>Date of Booking:</strong> {order.date} - {order.time}</div>
                      <div className={`status ${order.status}`}>
                      {order.status === 'Confirmed' && <FaCheckCircle className="status-icon" />}
                     {order.status === 'Pending' && <FaExclamationCircle className="status-icon" />}
                     {order.status === 'Canceled' && <FaTimesCircle className="status-icon" />}
                     <span className="status-text">{order.status}</span></div>
                      <button className="view-btn" onClick={() => handleViewDetails(order)}>View Details</button>
                    </div>
                  </div>
                 
                </div>
              ))}
            </div>
          )}
          {selectedOrder && (
            <OrderDetailsPage order={selectedOrder} onClose={handleClosePopup} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
