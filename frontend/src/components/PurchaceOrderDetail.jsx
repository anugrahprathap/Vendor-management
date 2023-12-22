// PurchaseOrderDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminNav from './adminNav';
import {Rate} from 'antd'
const PurchaseOrderDetail = () => {
  const { orderId } = useParams();
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const authToken = localStorage.getItem('authToken');
  const [ratingValue, setRatingValue] = useState(null);
  
  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/purchase-order/${orderId}/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
        setPurchaseOrder(response.data);
      } catch (error) {
        console.error('Error fetching purchase order details:', error);
      }
    };

    fetchPurchaseOrder();
  }, [orderId, authToken]);

  
  const handleRatingChange = (value) => {
    // Update the local state with the new rating value
    setRatingValue(value);
  };

  const handleSaveRating = async () => {
    try {
      // Send the new rating value to the server
      const res =await axios.patch(
        `http://127.0.0.1:8000/api/purchase-order/${orderId}/`,
        { quality_rating: ratingValue },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      if(res.status===200){
        alert("Rating Saved Successfully")
      }
      // Optionally, update the local state or perform other actions upon successful save
      // You may want to refetch the purchase order to get the updated data
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  if (!purchaseOrder) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <AdminNav/>
      <h2 className="mb-4">Purchase Order Details</h2>
      <div className="card" style={{backgroundColor:"lightgrey", margin:'20px'}}>
        <div className="card-body">
          <p className="card-text"><strong>Order Date:</strong> {new Date(purchaseOrder.order_date).toLocaleDateString()}</p>
          <p className="card-text"><strong>Vendor Name:</strong> {purchaseOrder.vendor.name}</p>
          <p className="card-text"><strong>Delivery Date:</strong> {purchaseOrder.delivery_date ? new Date(purchaseOrder.delivery_date).toLocaleDateString() : 'N/A'}</p>
          <p className="card-text"><strong>Quantity:</strong> {purchaseOrder.quantity}</p>
          <p className="card-text"><strong>Status:</strong> {purchaseOrder.status}</p>
          <p className="card-text"><strong>Quality Rating:</strong> {purchaseOrder.quality_rating || 'N/A'}</p>
          <p className="card-text"><strong>Issue Date:</strong> {new Date(purchaseOrder.issue_date).toLocaleDateString()}</p>
          <p className="card-text"><strong>Acknowledgment Date:</strong> {purchaseOrder.acknowledgment_date ? new Date(purchaseOrder.acknowledgment_date).toLocaleDateString() : 'N/A'}</p>
          <p className="card-text"><strong>Items:</strong> {(purchaseOrder.items)}</p>
          
          <div hidden={purchaseOrder.status !=='completed'}>
          <p className="card-text"><strong>Rate the Order</strong> </p>
          
          <Rate allowHalf defaultValue={purchaseOrder.quality_rating} onChange={handleRatingChange} />
          
          {/* Add more details as needed */}
        
            <div>
            <button className="btn btn-primary mt-3" onClick={handleSaveRating}>
            Save Rating
          </button>
          </div>
          </div>
          
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetail;
