import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const PurchaseOrderList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState('');
  const authToken = localStorage.getItem('authToken');

  const handleStatusChange = (e, orderId) => {
    const updatedStatus = { ...statusUpdate, [orderId]: e.target.value };
    setStatusUpdate(updatedStatus);
  };

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/vendors/purchase-orders/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      // Filter orders excluding the "pending" status
      const filteredOrders = response.data.filter((order) => order.status !== 'pending');
      setPurchaseOrders(filteredOrders);
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchPurchaseOrders();
    }
  }, [authToken]);

  const handleStatusUpdate = async (orderId) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/purchase-order/${orderId}/`,
        { status: statusUpdate[orderId] },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );

      // Fetch updated purchase orders after status update
      fetchPurchaseOrders();
      // Reset statusUpdate state
      setStatusUpdate('');
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Vendor Home</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/acknowledge-order">Acknowledge Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/purchase-order">Purchase Order List</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h2>Purchase Orders</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order Date</th>
              <th scope="col">Delivery Date</th>
              <th scope="col">Status</th>
              <th scope="col">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((order) => (
              <tr key={order.id}>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>{order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'Not set'}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    className="form-control d-inline-block mr-2"
                    value={statusUpdate[order.id] || order.status}
                    onChange={(e) => handleStatusChange(e, order.id)}
                    disabled = {order.status ==='completed' || order.status === 'canceled' || order.status === 'rejected'}
                  >
                    <option value="">---Select an option---</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleStatusUpdate(order.id)}
                    hidden = {order.status ==='completed' || order.status === 'canceled'|| order.status === 'rejected'}
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseOrderList;
