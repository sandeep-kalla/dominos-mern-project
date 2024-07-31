// OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import './styles/orderHistory.css';

const OrderHistory = ({ onClose }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_ORDER_HISTORY);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError('Error fetching order history');
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className="order-history">
      <button className="close-button" onClick={onClose}>Close</button>
      {error && <p className="error">{error}</p>}
      <ul className="order-list">
        {orders.map(order => (
          <li key={order._id} className="order-item">
            <p>Email: {order.email}</p>
            <p>Payment ID: {order.paymentid}</p>
            <p>Status: {order.status}</p>
            <p>Name: {order.name}</p>
            <p>Address: {order.address}</p>
            <p>Total: ₹{order.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
