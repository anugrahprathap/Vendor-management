import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AcknowledgeOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const authToken = localStorage.getItem('authToken');
  const [updateData, setUpdateData] = useState({});
  const acknowledgementDate = new Date();

  const handleUpdate = async (orderId, actionType) => {
    try {
      let payload;

      if (actionType === 'acknowledged' && !updateData[orderId]?.deliveryDate) {
        alert('Please select a delivery date');
        return;
      }

      if (actionType === 'acknowledged') {
        console.log(acknowledgementDate)
        payload = { status: 'acknowledged', delivery_date: updateData[orderId]?.deliveryDate , acknowledgment_date: acknowledgementDate};

        const order = purchaseOrders.find((order) => order.id === orderId);

        if (!order) {
          console.error(`Order with ID ${orderId} not found.`);
          return;
        }
  
     
       
    
      } else if (actionType === 'rejected') {
        payload = { status: 'rejected', delivery_date: null ,acknowledgment_date: acknowledgementDate}; // Set delivery_date to null for rejected orders
      } else if (actionType === 'deliveryDate') {
        payload = { delivery_date: updateData[orderId]?.deliveryDate };
      }

      const response = await axios.patch(
        `http://127.0.0.1:8000/api/purchase-order/${orderId}/`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      if(response.status===200){
        alert('Order '+actionType)
      }

      fetchPurchaseOrders();
    } catch (error) {
      console.error(`Error updating order:`, error);
    }
  };

  const handleInputChange = (e, orderId) => {
    const updatedData = { ...updateData, [orderId]: { ...updateData[orderId], [e.target.name]: e.target.value } };
    setUpdateData(updatedData);
  };

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/vendors/purchase-orders/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      // Filter only pending orders
      console.log(response.data.filter((order) => order.status === 'pending'))
      const pendingOrders = response.data.filter((order) => order.status === 'pending');
      setPurchaseOrders(pendingOrders);
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchPurchaseOrders();
    }
  }, [authToken]);

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
        <h2>Pending Orders</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
              <th scope="col">Update Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((order) => (
              <tr key={order.id}>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdate(order.id, 'acknowledged')}
                    disabled={order.status === 'rejected'} // Disable for rejected orders
                  >
                    Acknowledge
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => handleUpdate(order.id, 'rejected')}
                    disabled={order.status === 'rejected'} // Disable for rejected orders
                  >
                    Reject
                  </button>
                </td>
                <td>
                  <input
                    type="date"
                    className="form-control d-inline-block mr-2"
                    name="deliveryDate"
                    value={updateData[order.id]?.deliveryDate || ''}
                    onChange={(e) => handleInputChange(e, order.id)}
                    disabled={order.status === 'rejected'} // Disable for rejected orders
                  />
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcknowledgeOrders;
