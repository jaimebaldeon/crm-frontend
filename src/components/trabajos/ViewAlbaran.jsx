import React from 'react';
import '../contracts/ContractForm.css';

const ViewAlbaran = ({ albaran, onCancel }) => {
  const {
    id_contrato,
    id_cliente,
    productos_servicios,
    cantidades,
    precios,
    cuota,
    mes,
    año,
    estado,
    nota,
    notas_adicionales,
    fecha
  } = albaran;

  return (
    <div className="contrato-form">
      <h3>Detalles del Albarán</h3>

      {/* 🔹 Información General del Albarán */}
      <fieldset className="contract-info">
        <legend>Información del Albarán</legend>
        <div className="contract-row">
          <label>ID Contrato:</label>
          <input type="text" value={id_contrato} disabled />
        </div>
        <div className="contract-row">
          <label>ID Cliente:</label>
          <input type="text" value={id_cliente} disabled />
        </div>
        <div className="contract-row">
          <label>Cuota:</label>
          <input type="text" value={`€ ${cuota}`} disabled />
        </div>
        <div className="contract-row">
          <label>Mes:</label>
          <input type="text" value={mes} disabled />
        </div>
        <div className="contract-row">
          <label>Año:</label>
          <input type="text" value={año} disabled />
        </div>
        <div className="contract-row">
          <label>Estado:</label>
          <input type="text" value={estado} disabled />
        </div>
        <div className="contract-row">
          <label>Nota:</label>
          <input type="text" value={nota || "Sin nota"} disabled />
        </div>
        <div className="contract-row">
          <label>Notas Adicionales:</label>
          <input type="text" value={notas_adicionales || "Sin notas adicionales"} disabled />
        </div>
        <div className="contract-row">
          <label>Fecha:</label>
          <input type="text" value={new Date(fecha).toLocaleDateString()} disabled />
        </div>
      </fieldset>

      {/* 🔹 Detalles de Productos y Servicios */}
      <fieldset className="contract-details">
        <legend>Productos y Servicios</legend>
        <table className="contrato-table">
          <thead>
            <tr>
              <th>Producto/Servicio</th>
              <th>Cantidad</th>
              <th>Precio (€)</th>
            </tr>
          </thead>
          <tbody>
            {productos_servicios.map((producto, index) => (
              <tr key={index}>
                <td><span>{producto}</span></td>
                <td><span>{cantidades[index]}</span></td>
                <td><span>{precios[index]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>

      {/* 🔹 Botón de Cierre */}
      <div className="action-buttons">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ViewAlbaran;
