import React, { useState } from 'react';
import ClientForm from './ClientForm';
import ContractForm from './ContractForm'; 
import ExtintoresForm from '../activos/ExtintoresForm';
import SearchClientForm from '../trabajos/SearchClientForm';
import ClientResultList from '../trabajos/ClientResultList';
import { getContratos } from '../../services/contratosService';  


const ContratosContent = () => {
    const [showClientForm, setShowClientForm] = useState(false);
    const [showContractForm, setShowContractForm] = useState(false);
    const [showExtintoresForm, setShowExtintoresForm] = useState(false);
    const [createdClient, setCreatedClient] = useState(null); // Store created client data
    const [createdContract, setCreatedContract] = useState(null);
    const [formType, setFormType] = useState('');
    const [showClientSearch, setShowClientSearch] = useState(false);
    const [clientList, setClientList] = useState([]);
    const [showClientList, setShowClientList] = useState(false);
  
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
            // Hide the current window if user confirms cancellation
            setShowClientForm(false); 
            setShowClientSearch(false)
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

    const handleClientSearch = (resultList) => {
      console.log('Formulario enviado:', resultList)
      // display client search list showing columns: nombre, cif and direccion
      if (resultList.length > 0) {
        setClientList(resultList);
        setShowClientList(true);
      } else {
        alert("No se encontraron clientes con los datos ingresados.");
        setShowClientList(false);
      }
    
    };

    const handleContratoSearch = async (selectedClient) => {
          console.log('Cliente seleccionado:', selectedClient);
          const resultList = await getContratos(selectedClient.id_cliente);
          if (resultList.length > 0) {
          //   setAlbaranesList(resultList);
          //   setShowClientList(false);
          //   setShowAlbaranesList(true);
          } else {
            alert("No se encontraron albaranes con los datos ingresados.")
            // setShowAlbaranesList(false);
          }
    };

    return (
        <div className="content-section">
          <h2>Contratos</h2>
          {!showClientForm && !showContractForm && !showExtintoresForm && !showClientSearch && (
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
                  setShowClientSearch(true);                    
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

          {/* Show the Client Search Form */}
          {showClientSearch && !showClientList && (
              <SearchClientForm
                onSubmit={handleClientSearch}
                onCancel={handleClientCancel}
              />
            )}

          {/* Show Client Search Result List as a selection list */}
          {showClientList && clientList.length > 0 && (
            <ClientResultList
              clientList={clientList}
              onSubmit={handleContratoSearch}
              onCancel={() => {
                setShowClientList(false);
              }}
            />
          )}
          
        </div>
    );
};

export default ContratosContent;