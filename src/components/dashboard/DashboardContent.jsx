// components/dashboard/DashboardContent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContractForm from '../contracts/ContractForm'; // Import contract form
import './DashboardContent.css'; // Use same CSS file as Dashboard

const DashboardContent = ({ activeSection }) => {
  const [data, setData] = useState({
    clientCount: 0,
    upcomingMaintenance: [],
  });
  const [showContractForm, setShowContractForm] = useState(false);
  const [formType, setFormType] = useState('');

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
                    setFormType('create');
                  }}
                >
                  Crear Contrato
                </button>
                <button
                  className="action-button"
                  onClick={() => {
                    setShowContractForm(true);
                    setFormType('modify');
                  }}
                >
                  Modificar Contrato
                </button>
              </>
            )}
            {showContractForm && (
              <ContractForm
                onSubmit={handleContractSubmit}
                formType={formType}
              />
            )}
          </div>
        );
      default:
        return <div>Select a section from the menu</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default DashboardContent;
