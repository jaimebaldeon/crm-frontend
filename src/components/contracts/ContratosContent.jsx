import React, { useState } from 'react';
import ClientForm from './ClientForm';
import ContractForm from './ContractForm'; 
import ExtintoresForm from '../activos/ExtintoresForm';

const ContratosContent = () => {
    const [showClientForm, setShowClientForm] = useState(false);
    const [showContractForm, setShowContractForm] = useState(false);
    const [showExtintoresForm, setShowExtintoresForm] = useState(false);
    const [createdClient, setCreatedClient] = useState(null); // Store created client data
    const [createdContract, setCreatedContract] = useState(null);
    const [formType, setFormType] = useState('');

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
};

export default ContratosContent;