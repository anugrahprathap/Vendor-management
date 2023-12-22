// PurchaseOrderForm.js

import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNav from './adminNav';
import { useNavigate } from 'react-router-dom';
const PurchaseOrderForm = () => {
  const navigate = useNavigate()
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format: "YYYY-MM-DDTHH:mm"
  };
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

  // Dummy items
  const dummyItems = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  const [formData, setFormData] = useState({
    order_date: getCurrentDateTime(),
    items: [{ id: 1, quantity: 1 }],
    status: 'pending',
    issue_date: getCurrentDateTime(),
  });

  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
  
    if (name === 'id' && selectedItemIds.includes(value)) {
      console.log('Item already selected');
      return;
    }
  
    newItems[index][name] = value;
  
    setFormData({
      ...formData,
      items: newItems,
    });
  
    if (name === 'id') {
      setSelectedItemIds((prevIds) => [...new Set([...prevIds, value])]);
    }
  };
  
  

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: 1, quantity: 1 }],
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = [...formData.items];
    const removedItemId = newItems[index].id;

    newItems.splice(index, 1);

    setFormData({
      ...formData,
      items: newItems,
    });

    // Remove the item from the selected list
    setSelectedItemIds(selectedItemIds.filter((id) => id !== removedItemId));
  };

  const handleQuantityChange = (index, value) => {
    const newItems = [...formData.items];
    newItems[index].quantity = Math.max(1, Math.min(50, newItems[index].quantity + value));

    setFormData({
      ...formData,
      items: newItems,
    });
  };

  const calculateTotalQuantity = () => {
    return formData.items.reduce((total, item) => total + parseInt(item.quantity, 10), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const totalQuantity = calculateTotalQuantity();

      const response = await axios.post('http://127.0.0.1:8000/api/purchase/', {
        ...formData,
        items: JSON.stringify(formData.items),
        quantity: totalQuantity,
      });

      if (response.status === 201) {
        alert('Purchase order created successfully!');
        navigate('/purchase-orders')
      } else {
        console.error('Failed to create purchase order.');
      }
    } catch (error) {
      console.error('Error during purchase order creation:', error);
    }
  };

  return (
    <div>
      <AdminNav/>
      <div className="container mt-4">
        <h2>Create Purchase Order</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-item">
        <label>Vendor</label>
        <select
          name="vendor"
          className="form-control"
          value={formData.vendor}
          onChange={(e) => setFormData({ ...formData, vendor: parseInt(e.target.value, 10) || '' })}
          required
        >
          <option value="">Select a vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </option>
          ))}
        </select>
      </div>
          <div className="form-item">
            <label>Order Date</label>
            <input
              type="datetime-local"
              className="form-control"
              name="order_date"
              value={formData.order_date}
              readOnly
            />
          </div>

          {/* Items Section */}
          <div className="form-group">
            <h3>Items</h3>
            {formData.items.map((item, index) => (
              <div key={index} className="mb-3">
                <label>Item Name</label>
                <select
                  name="id"
                  className="form-control"
                  value={item.id}
                  onChange={(e) => handleInputChange(e, index)}
                >
                  {dummyItems.map((dummyItem) => (
                    <option
                      key={dummyItem.id}
                      value={dummyItem.id}
                      disabled={selectedItemIds.includes(dummyItem.id)}
                    >
                      {dummyItem.name}
                    </option>
                  ))}
                </select>
                <label>Quantity</label>
                <div className="input-group">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantityChange(index, -1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, index)}
                    min="1"
                    max="50"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantityChange(index, 1)}
                  >
                    +
                  </button>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-danger mt-2"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove Item
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn btn-success " onClick={handleAddItem}>
              Add Item
            </button>
          </div>

          <div className="form-item">
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseOrderForm;
