import React, { useState } from 'react';
import './ClientResultList.css'; 

const ClientResultList = ({ clientList, onCancel, onSubmit }) => {
  const [selectedClient, setSelectedClient] = useState(null);

  const handleRowClick = (client) => {
    setSelectedClient(client); // Mark the clicked row as selected
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (selectedClient) {
      onSubmit(selectedClient); // Pass the selected client to the parent component
    } else {
      alert('Por favor, seleccione un cliente antes de continuar.');
    }
  };

  return (
    <form className="client-form" onSubmit={handleSubmit}>
      <h3>Resultados de la Búsqueda</h3>
      <table className="client-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>CIF</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {clientList.map((client, index) => (
            <tr
              key={index}
              className={selectedClient === client ? 'selected-row' : ''}
              onClick={() => handleRowClick(client)} // Handle row selection
              style={{ cursor: 'pointer' }}
            >
              <td>{client.nombre}</td>
              <td>{client.cif}</td>
              <td>{client.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit" className="submit-button">Buscar</button>
      <button type="button" className="cancel-button" onClick={onCancel}>
          Cancelar
      </button>
    </form>
  );
};

export default ClientResultList;
