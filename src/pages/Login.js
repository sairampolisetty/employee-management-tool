import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateName, validateMobileNumber } from '../utils/validators';
import { formatDate } from '../utils/formatters';
import '../styles/Login.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', mobileNumber: '', timestamp: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(prev => ({ ...prev, timestamp: new Date().toISOString() }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === 'mobileNumber' ? value.replace(/\D/g, '') : value;
    setForm(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameError = validateName(form.name);
    const mobileError = validateMobileNumber(form.mobileNumber);
    
    setErrors({ name: nameError, mobileNumber: mobileError });
    
    if (!nameError && !mobileError) {
      onLogin(form.name);
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Employee Dashboard</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Mobile Number *</label>
            <input
              type="tel"
              name="mobileNumber"
              value={form.mobileNumber}
              onChange={handleChange}
              placeholder="Enter 10 digits"
              maxLength="10"
              className={errors.mobileNumber ? 'error' : ''}
            />
            {errors.mobileNumber && <span className="error-msg">{errors.mobileNumber}</span>}
          </div>

          <div className="form-group">
            <label>Timestamp</label>
            <input type="text" value={formatDate(form.timestamp)} readOnly className="readonly" />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
