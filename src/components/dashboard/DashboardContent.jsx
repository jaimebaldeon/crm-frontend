// components/dashboard/DashboardContent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientForm from '../contracts/ClientForm';
import ContractForm from '../contracts/ContractForm'; 
import './DashboardContent.css'; // Use same CSS file as Dashboard

const DashboardContent = ({ activeSection }) => {
  const [data, setData] = useState({
    clientCount: 0,
    upcomingMaintenance: [],
  });
  const [showClientForm, setShowClientForm] = useState(false);
  const [showContractForm, setShowContractForm] = useState(false);
  const [createdClient, setCreatedClient] = useState(null); // Store created client data
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

  const handleClientSubmit = (clientData) => {
    console.log('Formulario enviado:', clientData);
    if (formType === 'create') {
      console.log('Creando nuevo cliente:', clientData);
      setCreatedClient(clientData.clientId); // Store the newly created client data
      setShowClientForm(false); // Hide the ClientForm after submission
      setShowContractForm(true); // Automatically show the ContractForm
    } else if (formType === 'modify') {
      console.log('Modifying existing cliente:', clientData);
    }
  };

  const handleContractSubmit = (contractData) => {
    console.log('Formulario de contrato enviado:', contractData);
    // Handle the contract submission logic here (e.g., save contract to database)
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
            {!showClientForm && !showContractForm && (
              <>
                <button
                  className="action-button"
                  onClick={() => {
                    setShowClientForm(true);
                    setFormType('create');
                  }}
                >
                  Crear Contrato
                </button>
                <button
                  className="action-button"
                  onClick={() => {
                    setShowClientForm(true);
                    setFormType('modify');
                  }}
                >
                  Modificar Contrato
                </button>
              </>
            )}

            {/* Show the ClientForm when creating a new client */}
            {showClientForm && (
              <ClientForm
                onSubmit={handleClientSubmit}
                formType={formType}
              />
            )}

            {/* Show the ContractForm once a client is created */}
            {showContractForm && createdClient && (
              <ContractForm
                client={createdClient} // Pass the created client to the ContractForm
                onSubmit={handleContractSubmit}
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
