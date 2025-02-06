import React, { useState } from 'react';
import './FacturasResultList.css'; 
import { getAlbaran } from '../../services/albaranesService';

const FacturasResultList = ({ facturasList, onCancel, onSubmit }) => {
  const [selectedFactura, setSelectedFactura] = useState(null);

  const handleRowClick = (factura) => {
    setSelectedFactura(factura); // Mark the clicked row as selected
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (selectedFactura) {
      // Coger datos del albaran
      const selectedAlbaran = await getAlbaran(selectedFactura.id_albaran)

      onSubmit(selectedAlbaran); // Pass the selected factura to the parent component
    } else {
      alert('Por favor, seleccione un factura antes de continuar.');
    }
  };

  return (
    <form className="client-form" onSubmit={handleSubmit}>
      <h3>Resultados de la Búsqueda</h3>
      <table className="factura-table">
        <thead>
          <tr>
            <th>Id Factura</th>
            <th>Id Cliente</th>
            <th>Id Albaran</th>
            <th>Cuota</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {facturasList.map((factura, index) => (
            <tr
              key={index}
              className={selectedFactura === factura ? 'selected-row' : ''}
              onClick={() => handleRowClick(factura)} // Handle row selection
              style={{ cursor: 'pointer' }}
            >
              <td>{factura.id_factura}</td>
              <td>{factura.id_cliente}</td>
              <td>{factura.id_albaran}</td>
              <td>{factura.cuota}</td>
              <td>{factura.fecha}</td>
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

export default FacturasResultList;
