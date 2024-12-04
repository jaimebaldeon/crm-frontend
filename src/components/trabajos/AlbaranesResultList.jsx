import React, { useState } from 'react';
import './AlbaranResultList.css'; 

const AlbaranesResultList = ({ albaranesList, onCancel, onSubmit }) => {
  const [selectedAlbaran, setSelectedAlbaran] = useState(null);

  const handleRowClick = (albaran) => {
    setSelectedAlbaran(albaran); // Mark the clicked row as selected
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (selectedAlbaran) {
      onSubmit(selectedAlbaran); // Pass the selected albaran to the parent component
    } else {
      alert('Por favor, seleccione un albaran antes de continuar.');
    }
  };

  return (
    <form className="client-form" onSubmit={handleSubmit}>
      <h3>Resultados de la Búsqueda</h3>
      <table className="albaran-table">
        <thead>
          <tr>
            <th>Cantidades</th>
            <th>Productos</th>
            <th>Precios</th>
            <th>Mes</th>
          </tr>
        </thead>
        <tbody>
          {albaranesList.map((albaran, index) => (
            <tr
              key={index}
              className={selectedAlbaran === albaran ? 'selected-row' : ''}
              onClick={() => handleRowClick(albaran)} // Handle row selection
              style={{ cursor: 'pointer' }}
            >
              <td>{albaran.cantidades?.join(', ')}</td>
              <td>{albaran.productos_servicios?.join(', ')}</td>
              <td>{albaran.precios?.join(', ')}</td>
              <td>{albaran.mes}</td>
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

export default AlbaranesResultList;
