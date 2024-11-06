// components/dashboard/DashboardContent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientForm from '../contracts/ClientForm';
import ContractForm from '../contracts/ContractForm'; 
import ExtintoresForm from '../activos/ExtintoresForm';
import './DashboardContent.css'; // Use same CSS file as Dashboard

const DashboardContent = ({ activeSection }) => {
  const [data, setData] = useState({
    clientCount: 0,
    upcomingMaintenance: [],
  });
  const [showClientForm, setShowClientForm] = useState(false);
  const [showContractForm, setShowContractForm] = useState(false);
  const [createdClient, setCreatedClient] = useState(null); // Store created client data
  const [createdContract, setCreatedContract] = useState(null); // Store created client data
  const [showExtintoresForm, setShowExtintoresForm] = useState(false);
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
      alert('Cliente guardado correctamente');
      setCreatedClient(clientData.clientId); // Store the newly created client data
      setShowClientForm(false); // Hide the ClientForm after submission
      setShowContractForm(true); // Automatically show the ContractForm
    } else if (formType === 'modify') {
      console.log('Modifying existing cliente:', clientData);
    }
  };

  const handleClientCancel = () => {
    const confirmCancel = window.confirm("¿Estás seguro de que deseas cancelar? Los datos ingresados se perderán.");
    if (confirmCancel) {
      setShowClientForm(false); // Hide the ClientForm if user confirms cancellation
    }
  };
  
  const handleContractSubmit = (contractData) => {
    console.log('Formulario de contrato enviado:', contractData)
    alert('Contrato guardado correctamente');
    // Handle the contract submission logic here
    if (contractData.hasExtintores) {
      console.log('Get extintores data', contractData);
      // Get EXTINTORES data
      setCreatedContract(contractData)
      setShowContractForm(false); // Hide the ContractForm after submission
      setShowExtintoresForm(true); // Automatically show the ExtintoresForm
    }
  };

  const handleContractCancel = () => {
    const confirmCancel = window.confirm("¿Estás seguro de que deseas cancelar? Los datos ingresados se perderán.");
    if (confirmCancel) {
      setShowContractForm(false); // Hide the ContractForm if user confirms cancellation
    }
  };

  const handleExtintoresSubmit = (extintoresData) => {
    console.log('Formulario de extintores enviado:', extintoresData);
    alert('Formulario de extintores guardado correctamente');
    setShowExtintoresForm(false)
  };

  const handleExtintoresCancel = () => {
    const confirmCancel = window.confirm("¿Estás seguro de que deseas cancelar? Los datos ingresados se perderán.");
    if (confirmCancel) {
      setShowExtintoresForm(false); // Hide the ContractForm if user confirms cancellation
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
            {!showClientForm && !showContractForm && !showExtintoresForm && (
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
                    // setShowClientForm(true);                    
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
                onCancel={handleClientCancel}
                formType={formType}
              />
            )}

            {/* Show the ContractForm once a client is created */}
            {showContractForm && createdClient && (
              <ContractForm
                client={createdClient} // Pass the created client to the ContractForm
                onSubmit={handleContractSubmit}
                onCancel={handleContractCancel}
              />
            )}

            {/* Show the ExtintoresForm once a contract is created */}
            {showExtintoresForm && createdContract && (
              <ExtintoresForm
                client={createdClient} // Pass the created client to the ExtintoresForm
                contract={createdContract} // Pass the created contract to the ExtintoresForm
                onSubmit={handleExtintoresSubmit}
                onCancel={handleExtintoresCancel}
              />
            )}
            
          </div>
        );
      case 'Trabajos':
        return (
          <div className="content-section">
            <h2>Trabajos</h2>
              <div className='trabajos'>
                <input
                  type="text"
                  placeholder="Ingrese el mes"
                  className="input-field"
                  value={inputMes} 
                  onChange={handleInputChange} 
                />
                <button
                  className="action-button"
                  onClick={() => {
                    getAlbaranesMes(inputMes);
                  }}
                >
                  Generar Albaranes
                </button>
                <button
                  className="action-button"
                  onClick={() => {
                    setShowTrabajoSearch(true);
                  }}
                >
                  Verificar Trabajo
                </button>
              </div>
          </div>
        );
      default:
        return <div>Select a section from the menu</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default DashboardContent;
