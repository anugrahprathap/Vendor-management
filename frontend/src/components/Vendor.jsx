import './style.css';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import AdminNav from './adminNav';
import { useNavigate } from 'react-router-dom';

function Vendor() {
  const navigate = useNavigate();
  const originalText = "vendor registration";
  const upperCaseText = originalText.toUpperCase();
  const [formData, setFormData] = useState({
    name: '',
  
    contact_details: '',
    address: '',
    vendor_code: '',
    on_time_delivery_rate: '0',
    quality_rating_avg: '0',
    average_response_time: '0',
    fulfillment_rate: '0',
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData)
      const response = await axios.post('http://127.0.0.1:8000/api/vendors/', formData);
      
      if (response.status === 201) {
        
        alert('Vendor registration successful!');
        navigate('/vendors');
      } else if(response.status === 400) {
        // Handle error
        alert('Vendor registration failed.',response.data);
      }
    } catch (error) {
      console.error('Error during vendor registration:', error);
    }
  };

  return (
    <div>
      <AdminNav/>
      <div className='container mt-4'>
        <h2>{upperCaseText}</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="name" onChange={handleInputChange} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Contact Number</label>
                <input type="text" className="form-control" name='contact_details' onChange={handleInputChange} />
              </div>
            </div>
            {/* Repeat the pattern for other fields */}
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea type="text" className="form-control" name='address' onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label >Vendor code</label>
            <input type="text" className="form-control" name='vendor_code' onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" name='username' onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name='password' onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" className="form-control" />
          </div>
          <div className="form-group " >
            <button type='submit' className="btn btn-primary m-2" style={{width:'10rem'}}>Submit</button>
            <button type='button' className="btn btn-secondary m-2" style={{width:'10rem'}}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Vendor;
