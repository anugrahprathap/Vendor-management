// App.js
import React from 'react';
import { BrowserRouter as Router,Routes, Route, Switch } from 'react-router-dom';
import VendorList from './components/VendorList';
import VendorDetails from './components/VendorPerformance';
import Login from './components/Login';
import PurchaseOrderList from './components/PurchaseOrderList ';
import AcknowledgeOrders from './components/AcknowledgeOrders ';
import VendorHome from './components/VendorHome';
import AdminHome from './components/AdminHome';
import PurchaseOrderListForAdmin from './components/PurchaseOrderAll';
import PurchaseOrderDetail from './components/PurchaceOrderDetail';
import VendorPerformance from './components/VendorPerformance';
import Vendor from './components/Vendor';
import VendorEdit from './components/Vendoredit';
import PurchaseOrderForm from './components/PurchaseOrder';
const App = () => {
  return (
    
    <Router>
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='vendor' element={<Vendor/>}/>
        <Route path="/vendors"  element={<VendorList/>} />
        <Route path="/vendors/:vendorId" element={<VendorEdit/>} />
        <Route path="/purchase-order" element={<PurchaseOrderList/>} />
        <Route path="/acknowledge-order" element={<AcknowledgeOrders/>} />
        <Route path='/vendor-home' element={<VendorHome/>}/>
        <Route path='/admin-home' element={<AdminHome/>}/>
        <Route path='/purchase-orders' element={<PurchaseOrderListForAdmin/>}/>
        <Route path='/purchase-order/:orderId' element={<PurchaseOrderDetail/>}/>
        <Route path='/vendors-performance' element={<VendorPerformance/>}/>
        <Route path='/create-purchase-order' element={<PurchaseOrderForm/>}/>
      </Routes>
    </Router>
   
  );
};

export default App;
