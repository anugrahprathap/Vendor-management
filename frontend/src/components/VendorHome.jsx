// VendorHome.js
import React from 'react';
import { Link } from 'react-router-dom';
import AcknowledgeOrders from './AcknowledgeOrders ';

const VendorHome = () => {
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
      
    </div>
  );
};

export default VendorHome;
