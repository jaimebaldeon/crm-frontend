// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';  // Import the CSS for styling


const Dashboard = () => {
  const [data, setData] = useState({
    clientCount: 0,
    upcomingMaintenance: [],
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <span className="logo">CRM</span>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
        <ul className="menu-items">
          <li className="menu-item active">Home</li>
          <li className="menu-item">Analytics</li>
          <li className="menu-item">Settings</li>
          <li className="menu-item">Profile</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Dashboard</h1>
        <div  className="content-section">
          <h2>Client Overview</h2>
          <p>Total Active Clients: {data.clientCount}</p>
        </div>
        <div  className="content-section">
          <h2>Upcoming Maintenance</h2>
          <ul>
            {data.upcomingMaintenance.map((maintenance, index) => (
              <li key={index}>
                {maintenance.id_cliente} - {maintenance.productos_servicios}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
