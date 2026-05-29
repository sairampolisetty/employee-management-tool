import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Home from './Home';
import Employees from './Employees';
import '../styles/Dashboard.css';

function Dashboard({ userName, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('home');
  const [backgroundImage, setBackgroundImage] = useState(localStorage.getItem('backgroundImage') || '');

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setActiveMenu(path || 'home');
  }, [location]);

  useEffect(() => {
    localStorage.setItem('backgroundImage', backgroundImage);
  }, [backgroundImage]);

  const handleLogout = () => {
    if (window.confirm('Logout?')) {
      onLogout();
      navigate('/login');
    }
  };

  return (
    <div className="dashboard-container">
      <Header userName={userName} onLogout={handleLogout} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="dashboard-content">
        <Sidebar isOpen={sidebarOpen} activeMenu={activeMenu} onMenuClick={(item) => {
          setActiveMenu(item);
          navigate(`/dashboard/${item}`);
          if (window.innerWidth <= 768) {
            setSidebarOpen(false);
          }
        }} />
        <main
          className={`main-content ${!sidebarOpen ? 'full-width' : ''}`}
          style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          <Routes>
            <Route path="/" element={<Home userName={userName} backgroundImage={backgroundImage} onBackgroundChange={setBackgroundImage} />} />
            <Route path="home" element={<Home userName={userName} backgroundImage={backgroundImage} onBackgroundChange={setBackgroundImage} />} />
            <Route path="employees" element={<Employees />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
