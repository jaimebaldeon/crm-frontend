import React, { useState } from 'react';
import './ContratosResultList.css'; 

const ContratosResultList = ({ contratosList, onCancel, onSubmit }) => {
  const [selectedContrato, setSelectedContrato] = useState(null);

  const handleRowClick = (contrato) => {
    setSelectedContrato(contrato); // Mark the clicked row as selected
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (selectedContrato) {
      onSubmit(selectedContrato); // Pass the selected contrato to the parent component
    } else {
      alert('Por favor, seleccione un contrato antes de continuar.');
    }
  };

  return (
    <form className="client-form" onSubmit={handleSubmit}>
      <h3>Resultados de la Búsqueda</h3>
      <table className="contrato-table">
        <thead>
          <tr>
            <th>Cantidades</th>
            <th>Productos</th>
            <th>Precios</th>
            <th>Mes</th>
          </tr>
        </thead>
        <tbody>
          {contratosList.map((contrato, index) => (
            <tr
              key={index}
              className={selectedContrato === contrato ? 'selected-row' : ''}
              onClick={() => handleRowClick(contrato)} // Handle row selection
              style={{ cursor: 'pointer' }}
            >
              <td>{contrato.cantidades?.join(', ')}</td>
              <td>{contrato.productos_servicios?.join(', ')}</td>
              <td>{contrato.precios?.join(', ')}</td>
              <td>{contrato.mes}</td>
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

export default ContratosResultList;
