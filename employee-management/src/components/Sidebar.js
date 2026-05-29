import React from 'react';
import '../styles/Sidebar.css';

function Sidebar({ isOpen, activeMenu, onMenuClick }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav>
        <button className={`nav-btn ${activeMenu === 'home' ? 'active' : ''}`} onClick={() => onMenuClick('home')}>
          Home
        </button>
        <button className={`nav-btn ${activeMenu === 'employees' ? 'active' : ''}`} onClick={() => onMenuClick('employees')}>
          Employees
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
