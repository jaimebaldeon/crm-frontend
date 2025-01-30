import React, { useState } from 'react';
import SearchClientForm from '../trabajos/SearchClientForm';
import ClientResultList from '../trabajos/ClientResultList';
import { getContratos } from '../../services/contratosService';  
import UpdateClienteForm from '../clientes/UpdateClienteForm';
import { saveActivos, updateActivos } from '../../services/extintoresService';  


const ClientesContent = () => {
    const [formType, setFormType] = useState('');
    const [showClientSearch, setShowClientSearch] = useState(false);
    const [clientList, setClientList] = useState([]);
    const [showClientList, setShowClientList] = useState(false);
    const [clienteModificable, setClienteModificable] = useState([]);
    const [showClienteUpdateForm, setShowClienteUpdateForm] = useState(false);
  
    const handleClientSearchCancel = () => {
        const confirmCancel = window.confirm("¿Estás seguro de que deseas cancelar? Los datos ingresados se perderán.");
        if (confirmCancel) {
            // Hide the current window if user confirms cancellation
            setShowClientSearch(false);
        }
    };

    const handleClientUpdateCancel = () => {
        const confirmCancel = window.confirm("¿Estás seguro de que deseas cancelar? Los datos ingresados se perderán.");
        if (confirmCancel) {
          setShowClienteUpdateForm(false); 
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

    const handleClientVerification = (selectedCliente) => {
      console.log('Cliente seleccionado:', selectedCliente);
      setClienteModificable(selectedCliente);
      setShowClientList(false);
      setShowClienteUpdateForm(true);
    };

    const handleClientUpdate = async (clientData) => {
      console.log('Formulario de cliente enviado:', clientData);
      alert('Cliente actualizado correctamente');
      setShowClienteUpdateForm(false);
      setShowClientSearch(false);
  };

    return (
        <div className="content-section">
          <h2>Clientes</h2>
          { !showClientSearch && (
            <>
              <button
                className="action-button"
                onClick={() => {
                  setFormType('create');
                }}
                disabled
              >
                Crear
              </button>
              <button
                className="action-button"
                onClick={() => {
                  setShowClientSearch(true);                    
                  setFormType('modify');
                }}
              >
                Modificar Cliente
              </button>
            </>
          )}

          {/* Show the Client Search Form */}
          {showClientSearch && !showClientList && !showClienteUpdateForm && (
              <SearchClientForm
                onSubmit={handleClientSearch}
                onCancel={handleClientSearchCancel}
              />
          )}

          {/* Show Client Search Result List as a selection list */}
          {showClientList && clientList.length > 0 && (
            <ClientResultList
              clientList={clientList}
              onSubmit={handleClientVerification}
              onCancel={() => {
                setShowClientList(false);
              }}
            />
          )}

          {/* Show Contrato Form */}
          {showClienteUpdateForm && (
              <UpdateClienteForm
                cliente={clienteModificable}
                onSubmit={ handleClientUpdate}
                onCancel={ handleClientUpdateCancel }
              />
          )}
          
        </div>
    );
};

export default ClientesContent;