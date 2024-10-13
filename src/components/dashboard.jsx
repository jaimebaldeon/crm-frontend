// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';  // Import the CSS for styling
import ContractForm from './ContractForm';  // Import ContractForm component



const Dashboard = () => {
  const [data, setData] = useState({
    clientCount: 0,
    upcomingMaintenance: [],
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('Home'); // Track which section is active
  const [showContractForm, setShowContractForm] = useState(false); // Track if contract form should be displayed
  const [formType, setFormType] = useState(''); // Track whether creating or modifying contract

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

  const handleContractSubmit = (formData) => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here (create or modify)
    if (formType === 'create') {
      console.log('Creating new contract:', formData);
    } else if (formType === 'modify') {
      console.log('Modifying existing contract:', formData);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Home':
        return (
          <>
            <div className="content-section">
              <h2>Client Overview</h2>
              <p>Total Active Clients: {data.clientCount}</p>
            </div>
            <div className="content-section">
              <h2>Upcoming Maintenance</h2>
              <ul>
                {data.upcomingMaintenance.map((maintenance, index) => (
                  <li key={index}>
                    {maintenance.id_cliente} - {maintenance.productos_servicios}
                  </li>
                ))}
              </ul>
            </div>
          </>
        );
        case 'Contratos':
        return (
          <div className="content-section">
            <h2>Contratos</h2>
            {!showContractForm && (
              <>
                <button
                  className="action-button"
                  onClick={() => {
                    setShowContractForm(true);
                    setFormType('create'); // Set form type to "create"
                  }}
                >
                  Crear Contrato
                </button>
                <button
                  className="action-button"
                  onClick={() => {
                    setShowContractForm(true);
                    setFormType('modify'); // Set form type to "modify"
                  }}
                >
                  Modificar Contrato
                </button>
              </>
            )}
            {showContractForm && (
              <ContractForm
                onSubmit={handleContractSubmit}
                formType={formType} // Pass form type to know if it's creating or modifying
              />
            )}
          </div>
        );
      default:
        return <div>Select a section from the menu</div>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <img src="/logo.ico" alt="Logo" className="sidebar-logo" />
          <span className="logo">EL TUMI</span>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
        <ul className="menu-items">
          <li className={`menu-item ${activeSection === 'Home' ? 'active' : ''}`} onClick={() => setActiveSection('Home')}>Home</li>
          <li className={`menu-item ${activeSection === 'Contratos' ? 'active' : ''}`} onClick={() => setActiveSection('Contratos')}>Contratos</li>
          <li className="menu-item">Analytics</li>
          <li className="menu-item">Settings</li>
          <li className="menu-item">Profile</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Dashboard</h1>
        {renderContent()}  {/* Dynamically renders the content based on active section */}
      </div>
    </div>
  );
};

export default Dashboard;
