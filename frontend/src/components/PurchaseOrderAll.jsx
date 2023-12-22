// PurchaseOrderListForAdmin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from './adminNav';

const PurchaseOrderListForAdmin = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/purchase-orders/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
        setPurchaseOrders(response.data);
      } catch (error) {
        console.error('Error fetching purchase orders:', error);
      }
    };

    fetchPurchaseOrders();
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className='m-2'>Purchase Orders for Admin</h2>
          <Link to="/create-purchase-order" className="btn btn-primary">
            Create New Purchase Order
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order Date</th>
              <th scope="col">Vendor Name</th>
              <th scope="col">Delivery Date</th>
              <th scope="col">Quantity</th>
              <th scope="col">Status</th>
              <th scope="col">Quality Rating</th>
              <th scope="col">Issue Date</th>
              <th scope="col">Acknowledgment Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((order) => (
              <tr key={order.id}>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>{order.vendor.name}</td>
                <td>{order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'N/A'}</td>
                <td>{order.quantity}</td>
                <td>{order.status}</td>
                <td>{order.quality_rating || 'N/A'}</td>
                <td>{new Date(order.issue_date).toLocaleDateString()}</td>
                <td>{order.acknowledgment_date ? new Date(order.acknowledgment_date).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <Link to={`/purchase-order/${order.id}`} className="btn btn-info btn-sm">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseOrderListForAdmin;
