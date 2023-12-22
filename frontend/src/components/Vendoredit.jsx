// VendorEdit.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import AdminNav from './adminNav'
const VendorEdit = () => {
    
  const navigate = useNavigate();
  const { vendorId } = useParams();
    console.log(vendorId)

  const [formData, setFormData] = useState({
    name: '',
    contact_details: '',
    address: '',
    vendor_code: '',
    // Add more fields as needed
  });

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/vendors/${vendorId}/`);
        setFormData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching vendor details:', error);
      }
    };

    fetchVendorDetails();
  }, [vendorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/vendors/${vendorId}/`, formData);
      if (response.status === 200) {
        // Handle success, e.g., redirect to another page or show a success message
        console.log('Vendor details updated successfully!');
        navigate('/vendors'); // Redirect to the vendor list page
      } else {
        // Handle error
        console.error('Vendor update failed.');
      }
    } catch (error) {
      console.error('Error updating vendor details:', error);
    }
  };

  return (
    <div >
        <AdminNav/>
      <h2>Edit Vendor</h2>
      <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            className="form-control"
            name="contact_details"
            value={formData.contact_details}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Vendor Code</label>
          <input
            type="text"
            className="form-control"
            name="vendor_code"
            value={formData.vendor_code}
            onChange={handleInputChange}
          />
        </div>
        {/* Add more fields as needed */}
        <div className="form-group">
          <button type="submit" className="btn btn-primary mt-2">
            Save Changes
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default VendorEdit;
