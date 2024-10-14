// components/dashboard/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../common/Sidebar'; // Reusable Sidebar component
import DashboardContent from './DashboardContent'; // Extracted Dashboard content
import './Dashboard.css'; 

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('Home'); // Track active section

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      {/* Main Content */}
      <div className="main-content">
        <h1>Dashboard</h1>
        <DashboardContent activeSection={activeSection} />
      </div>
    </div>
  );
};

export default Dashboard;
