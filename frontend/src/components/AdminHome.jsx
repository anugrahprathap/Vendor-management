// VendorHome.js
import React from 'react';
import { Link } from 'react-router-dom';
import AcknowledgeOrders from './AcknowledgeOrders ';
import AdminNav from './adminNav';

const AdminHome = () => {
  return (
    <div>
      <AdminNav/>
      <h1>Admin Home</h1>
    </div>
  );
};

export default AdminHome;
