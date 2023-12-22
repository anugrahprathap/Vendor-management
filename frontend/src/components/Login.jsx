// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [userRole, setUserRole] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use your login API endpoint
      const response = await axios.post('http://127.0.0.1:8000/api/vendors/login/', loginData);
      
      if (response.status === 200) {
        
        const { token, role } = response.data;

        // Save the token and role in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);

        // Update the userRole state
        setUserRole(role);
        console.log(role)
        if(userRole ==='vendor' || role ==='vendor'){
          navigate('/vendor-home')
        }
        else{
          
          navigate('/admin-home')
        }

      } else {
        
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              {/* Add more navbar items as needed */}
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className='container mt-4'>
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" name='username' onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name='password' onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <button type='submit' className="btn btn-primary m-2" style={{width:'10rem'}}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
