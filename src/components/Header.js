import React from 'react';
import '../styles/Header.css';

function Header({ userName, onLogout, onToggleSidebar }) {
  return (
    <header className="header">
      <button className="menu-btn" onClick={onToggleSidebar}>☰</button>
      <h2>Employee Dashboard</h2>
      <div className="user-section">
        <span>{userName}</span>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
    </header>
  );
}

export default Header;
