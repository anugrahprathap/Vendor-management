// VendorHome.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/admin-home">Admin Home</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/purchase-orders">Purchase Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/vendors-performance">Vendor Performance</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/vendors">Vendors</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    </div>
  );
};

export default AdminNav;
