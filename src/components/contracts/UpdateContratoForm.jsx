import React, { useState, useEffect } from 'react';
import './ContratoForm.css'; 
import { getProductosMantenibles } from '../../services/productosServiciosService';
import { validateForm } from './validators/validateContractForm';
import { updateContract } from '../../services/contratosService';

const UpdateContratoForm = ({ contrato, onSubmit, onCancel }) => {
  const [editableContrato, setEditableContrato] = useState({ ...contrato });
  const [productosServicios, setProductosServicios] = useState([]);

  useEffect(() => {
    const fetchProductosServiciosNoMantenibles = async () => {
      try {
        const productosServiciosResponse = await getProductosMantenibles(); 
        setProductosServicios(productosServiciosResponse);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductosServiciosNoMantenibles();
  }, []);

  const handleInputChange = (index, field, value) => {
    setEditableContrato((prevState) => {
      const updatedField = [...prevState[field]];
      updatedField[index] = value;
      return { ...prevState, [field]: updatedField };
    });
  };

  const handleDeleteRow = (index) => {
    setEditableContrato((prevState) => ({
      ...prevState,
      productos_servicios: prevState.productos_servicios.filter((_, i) => i !== index),
      cantidades: prevState.cantidades.filter((_, i) => i !== index),
      precios: prevState.precios.filter((_, i) => i !== index),
    }));
  };

  const handleAddRow = () => {
    setEditableContrato((prevState) => ({
      ...prevState,
      productos_servicios: [...prevState.productos_servicios, ""],
      cantidades: [...prevState.cantidades, ""],
      precios: [...prevState.precios, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validateForm(editableContrato);
    if (Object.keys(validationErrors).length > 0) {
      alert(Object.values(validationErrors).join('\n'));
      return;
    }

    try {
      const response = await updateContract(editableContrato);
      const productos_servicios = editableContrato.productos_servicios.map((producto, index) => ({
        productoServicio: producto,
        cantidad: editableContrato.cantidades[index],
        precio: editableContrato.precios[index],
      }));

      const hasExtintor = editableContrato.productos_servicios.some(product =>
        product && product.toUpperCase().includes('EXTINTOR')
      );

      const updatedEditableContrato = {
        id_cliente: editableContrato.id_cliente, 
        products: productos_servicios, 
        hasExtintores: hasExtintor,
        tipo: editableContrato.tipo,
        id_contrato: editableContrato.id_contrato
      };

      onSubmit(updatedEditableContrato);
    } catch (error) {
      alert('Error actualizando contrato: ' + error.message);
    }
  };

  return (
    <div className="contrato-form">
      <h3>Editar Contrato</h3>

      {/* 🔹 Sección 1: Información del Contrato (No Modificable) */}
      <fieldset className="contract-info">
        <legend>Información del Contrato</legend>
        <div className="contract-row">
          <label>ID Contrato:</label>
          <input type="text" value={editableContrato.id_contrato} disabled />
        </div>
        <div className="contract-row">
          <label>ID Cliente:</label>
          <input type="text" value={editableContrato.id_cliente} disabled />
        </div>
        <div className="contract-row">
          <label>Fecha Inicio:</label>
          <input type="text" value={editableContrato.fecha_inicio} disabled />
        </div>
        <div className="contract-row">
          <label>Año del Contrato:</label>
          <input type="text" value={editableContrato.año} disabled />
        </div>
      </fieldset>

      {/* 🔹 Sección 2: Detalles del Contrato (Modificable) */}
      <form onSubmit={handleSubmit}>
        <fieldset className="contract-details">
          <legend>Detalles del Contrato</legend>

          {/* Tabla Editable de Productos y Servicios */}
          <table className="contrato-table">
            <thead>
              <tr>
                <th>Producto/Servicio</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {editableContrato.productos_servicios.map((producto, index) => (
                <tr key={index}>
                  <td>
                    {producto !== "" ? (
                      <span>{producto}</span>
                    ) : (
                      <select
                        value={editableContrato.productos_servicios[index]}
                        onChange={(e) => handleInputChange(index, "productos_servicios", e.target.value)}
                        required
                      >
                        <option value="" disabled>Seleccione un producto/servicio</option>
                        {productosServicios.map((option, i) => (
                          <option key={i} value={option.concepto}>{option.concepto}</option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editableContrato.cantidades[index]}
                      onChange={(e) => handleInputChange(index, "cantidades", e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step="0.01"
                      value={editableContrato.precios[index]}
                      onChange={(e) => handleInputChange(index, "precios", e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <button type="button" className="delete-button" onClick={() => handleDeleteRow(index)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Campos Adicionales */}
          <div className="contract-row">
            <label>Tipo de Contrato:</label>
            {/* <input type="text" value={editableContrato.tipo} onChange={(e) => setEditableContrato({...editableContrato, tipo: e.target.value})} /> */}
            <select value={editableContrato.tipo} onChange={(e) => setEditableContrato({...editableContrato, tipo: e.target.value})}>
              <option value="Anual">Anual</option>
              <option value="Trimestral">Trimestral</option>
            </select>
          </div>
          <div className="contract-row">
            <label>Mes de Mantenimiento:</label>
            <select value={editableContrato.mes} onChange={(e) => setEditableContrato({...editableContrato, mes: e.target.value.toUpperCase()})}>
              {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].map(mes => (
                <option key={mes} value={mes.toUpperCase()}>{mes}</option>
              ))}
            </select>
            {/* <input type="text" value={editableContrato.mes} onChange={(e) => setEditableContrato({...editableContrato, mes: e.target.value})} /> */}
          </div>
          <div className="contract-row">
            <label>Estado:</label>
            <select value={editableContrato.estado} onChange={(e) => setEditableContrato({...editableContrato, estado: e.target.value})}>
              <option value="Activo">Activo</option>
              <option value="Terminado">Terminado</option>
            </select>
            {/* <input type="text" value={editableContrato.estado} onChange={(e) => setEditableContrato({...editableContrato, estado: e.target.value})} /> */}
          </div>
          <div className="contract-row">
            <label>Notas Adicionales:</label>
            <textarea value={editableContrato.notas_adicionales} onChange={(e) => setEditableContrato({...editableContrato, notas_adicionales: e.target.value})} />
          </div>
        </fieldset>

        {/* 🔹 Sección 3: Acciones */}
        <div className="action-buttons">
          <button type="button" className="add-button" onClick={handleAddRow}>Agregar Nuevo Producto</button>
          <button type="submit" className="submit-button">Guardar Cambios</button>
          <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContratoForm;
