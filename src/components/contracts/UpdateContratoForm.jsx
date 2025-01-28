import React, { useState, useEffect } from 'react';
import './ContratoForm.css'; 
import { getProductosMantenibles } from '../../services/productosServiciosService';
import {validateForm} from './validators/validateContractForm'
import { updateContract } from '../../services/contratosService';

const UpdateContratoForm = ({ contrato, onSubmit, onCancel }) => {
  const [editableContrato, setEditableContrato] = useState({ ...contrato });
  const [productosServicios, setProductosServicios] = useState([]);

  const fetchProductosServiciosNoMantenibles = async () => {
    try {
        const productosServiciosResponse = await getProductosMantenibles(); 
        setProductosServicios(productosServiciosResponse);
    } catch (error) {
        console.error(error);
    }
};

  useEffect(() => {
    fetchProductosServiciosNoMantenibles();
  }, []);

  // Manejar cambios en los campos de las filas
  const handleInputChange = (index, field, value) => {
    setEditableContrato((prevState) => {
      const updatedField = [...prevState[field]];
      updatedField[index] = value; // Actualiza el valor en el índice correspondiente
      return { ...prevState, [field]: updatedField };
    });
  };

  // Manejar eliminación de filas
  const handleDeleteRow = (index) => {
    setEditableContrato((prevState) => ({
      ...prevState,
      productos_servicios: prevState.productos_servicios.filter((_, i) => i !== index),
      cantidades: prevState.cantidades.filter((_, i) => i !== index),
      precios: prevState.precios.filter((_, i) => i !== index),
    }));
  };

  // Manejar adición de nuevas filas
  const handleAddRow = () => {
    setEditableContrato((prevState) => ({
      ...prevState,
      productos_servicios: [...prevState.productos_servicios, ""], // Valor inicial vacío
      cantidades: [...prevState.cantidades, ""],
      precios: [...prevState.precios, ""],
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar comportamiento predeterminado

    // Validar Formulario Contrato
    const validationErrors = await validateForm(editableContrato);
    if (Object.keys(validationErrors).length > 0) {
      const errorMessages = Object.values(validationErrors).join('\n');
      alert(errorMessages)
      return;
    }

    try {
      // update contrato en BBDD
      const response = await updateContract(editableContrato);

      // Reformatear productos_servicios para ExtintoresForm
      const productos_servicios = editableContrato.productos_servicios.map((producto, index) => ({
        productoServicio: producto,
        cantidad: editableContrato.cantidades[index],
        precio: editableContrato.precios[index],
      }));

      // Check if any of the products contain the substring 'EXTINTOR'
      const hasExtintor = editableContrato.productos_servicios.some(product =>
        product && product.toUpperCase().includes('EXTINTOR')
      );

      // Reformatear objeto contrato para ExtintoresForm
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
      <form onSubmit={handleSubmit}>
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
                    <span>{producto}</span> // Mostrar como texto si es una fila existente
                  ) : (
                    <select
                      value={editableContrato.productos_servicios[index]}
                      onChange={(e) =>
                        handleInputChange(index, "productos_servicios", e.target.value)
                      }
                      required
                    >
                      <option value="" disabled>
                        Seleccione un producto/servicio
                      </option>
                      {productosServicios.map((option, i) => (
                        <option key={i} value={option.concepto}>
                          {option.concepto}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    value={editableContrato.cantidades[index]}
                    onChange={(e) =>
                      handleInputChange(index, "cantidades", e.target.value)
                    }
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    value={editableContrato.precios[index]}
                    onChange={(e) =>
                      handleInputChange(index, "precios", e.target.value)
                    }
                    required
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDeleteRow(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="action-buttons">
          <button type="button" className="add-button" onClick={handleAddRow}>
            Agregar Nueva Fila
          </button>
          <button type="submit" className="submit-button">
            Guardar Cambios
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContratoForm;
