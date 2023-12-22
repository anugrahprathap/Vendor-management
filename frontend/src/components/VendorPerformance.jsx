// VendorPerformance.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './adminNav';
const VendorPerformance = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/vendors/');
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, []);
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
  
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div >
        <AdminNav/>
      <h2>Vendors Performance</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Vendor Code</th>
            <th>On-Time Delivery Rate</th>
            <th>Quality Rating Average</th>
            <th>Average Response Time</th>
            <th>Fulfillment Rate</th>
            {/* Add more fields as needed */}
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.vendor_code}</td>
              <td>{vendor.on_time_delivery_rate.toFixed(2)}%</td>
              <td>{vendor.quality_rating_avg.toFixed(2)}</td>
              <td>{formatTime(vendor.average_response_time)}</td>
              <td>{vendor.fulfillment_rate.toFixed(2)}%</td>
              {/* Add more cells for additional fields */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorPerformance;
