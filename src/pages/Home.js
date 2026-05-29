import React from 'react';
import '../styles/Home.css';

function Home({ userName, backgroundImage, onBackgroundChange }) {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        onBackgroundChange(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    onBackgroundChange('');
  };

  return (
    <div className="home-container">
      <div className="welcome-box">
        <h1>Welcome, {userName}!</h1>
        <p>You are logged into the Employee Management System.</p>
        <div className="background-form">
          <label htmlFor="background-upload">Upload background image</label>
          <input
            id="background-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button type="button" onClick={handleClear}>Clear</button>
        </div>
        {backgroundImage && <p className="background-note">Background image is active.</p>}
      </div>
    </div>
  );
}

export default Home;
