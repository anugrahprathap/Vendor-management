import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from './adminNav';

const VendorList = () => {
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
  const handleDeleteVendor = async (vendorId) => {
    const shouldDelete = window.confirm("Are you shure you want to delet this vendor?");
    if(shouldDelete){
      try {
        await axios.delete(`http://127.0.0.1:8000/api/vendors/${vendorId}/`);
        // Remove the deleted vendor from the state
        setVendors((prevVendors) => prevVendors.filter((vendor) => vendor.id !== vendorId));
      } catch (error) {
        console.error('Error deleting vendor:', error);
      }
    }
    
  };

  return (
    <div>
      <AdminNav />
      <h2>Vendors</h2>
      {vendors.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Address</th>
                <th>Vendor Code</th>
                {/* Add more columns as needed */}
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td>{vendor.id}</td>
                  <td>{vendor.name}</td>
                  <td>{vendor.contact_details}</td>
                  <td>{vendor.address}</td>
                  <td>{vendor.vendor_code}</td>
                  
                  <td>
                    <Link to={`/vendors/${vendor.id}`} className="btn btn-primary btn-sm m-2">
                      Edit Vendor
                    </Link>
                    <button  onClick={() => handleDeleteVendor(vendor.id)} className="btn btn-danger btn-sm m-2">
                      Delete Vendor
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No vendors available.</p>
      )}
      <Link to="/vendor" className="btn btn-success">
        Create Vendor
      </Link>
    </div>
  );
};

export default VendorList;
