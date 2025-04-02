import React, { useState } from 'react';
import './CertificadosResultList.css'; 
import { getAlbaran } from '../../services/albaranesService';

const CertificadosResultList = ({ facturasList, onCancel, onSubmit }) => {
  const [selectedCertificado, setSelectedCertificado] = useState(null);

  const handleRowClick = (factura) => {
    setSelectedCertificado(factura); // Mark the clicked row as selected
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (selectedCertificado) {
      // Coger datos del albaran
      const selectedAlbaran = await getAlbaran(selectedCertificado.id_albaran)
      selectedAlbaran.id_factura = selectedCertificado.id_factura;

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
            <th>Id Certificado</th>
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
              className={selectedCertificado === factura ? 'selected-row' : ''}
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

export default CertificadosResultList;
