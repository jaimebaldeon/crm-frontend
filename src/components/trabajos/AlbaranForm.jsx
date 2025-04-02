import React, { useState, useEffect } from 'react';
import './AlbaranForm.css'; // Add CSS for styling if needed
import { getProductosServiciosNoMantenibles } from '../../services/productosServiciosService';
import { existenNuevosExtintores, esNuevoContrato, validateExtintoresCaducados } from './validators/ValidateAlbaranForm';
import { checkExtintoresRetimbrados } from '../activos/validators/validateExtintoresForm';


const AlbaranForm = ({ albaran, onSubmit, onCancel }) => {
  const {
    id_albaran,
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
  const [editableAlbaran, setEditableAlbaran] = useState({ ...albaran });
  const [productosServicios, setProductosServicios] = useState([]);

  const fetchProductosServiciosNoMantenibles = async () => {
    try {
        const productosServiciosResponse = await getProductosServiciosNoMantenibles(); // Call the API when the component mounts
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
    setEditableAlbaran((prevState) => {
      const updatedField = [...prevState[field]];
      updatedField[index] = value; // Actualiza el valor en el índice correspondiente
      return { ...prevState, [field]: updatedField };
    });
  };

  // Manejar eliminación de filas
  const handleDeleteRow = (index) => {
    setEditableAlbaran((prevState) => ({
      ...prevState,
      productos_servicios: prevState.productos_servicios.filter((_, i) => i !== index),
      cantidades: prevState.cantidades.filter((_, i) => i !== index),
      precios: prevState.precios.filter((_, i) => i !== index),
    }));
  };

  // Manejar adición de nuevas filas
  const handleAddRow = () => {
    setEditableAlbaran((prevState) => ({
      ...prevState,
      productos_servicios: [...prevState.productos_servicios, ""], // Valor inicial vacío
      cantidades: [...prevState.cantidades, ""],
      precios: [...prevState.precios, ""],
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar comportamiento predeterminado
    if (existenNuevosExtintores(editableAlbaran) && !(await esNuevoContrato(editableAlbaran))) {
      // Validar extintores en BBDD
      const validated = await validateExtintoresCaducados(editableAlbaran)

      // Interrumpir Envio si no es validado
      if (!validated) {
        return
      };

      onSubmit(editableAlbaran, true); // Pass `true` to indicate nuevos extintores exist
    } else {
      // Actualizar Extintores Retimbrados si Existen
      const responseRetimbrados = await checkExtintoresRetimbrados(editableAlbaran);
      onSubmit(editableAlbaran, false); // Pass `false` otherwise
    }
    // check_retimbrados_extintores
    // update_albaranesBBDD
  };

  return (
    <div className="albaran-form">
      <h3>Detalles del Albarán</h3>

      {/* 🔹 Información General del Albarán */}
      <fieldset className="contract-info">
        <legend>Información del Albarán</legend>
        <div className="contract-row">
          <label>ID Albaran:</label>
          <input type="text" value={id_albaran} disabled />
        </div>
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

      <h3>Editar Albarán</h3>
      <form onSubmit={handleSubmit}>
        <table className="albaran-table">
          <thead>
            <tr>
              <th>Producto/Servicio</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {editableAlbaran.productos_servicios.map((producto, index) => (
              <tr key={index}>
                <td>
                  {producto !== "" ? (
                    <span>{producto}</span> // Mostrar como texto si es una fila existente
                  ) : (
                    <select
                      value={editableAlbaran.productos_servicios[index]}
                      onChange={(e) =>
                        handleInputChange(index, "productos_servicios", e.target.value)
                      }
                      required
                    >
                      <option value="" disabled>
                        Seleccione un producto/servicio
                      </option>
                      {productosServicios.map((option, i) => (
                        <option key={i} value={option.descripcion_corta}>
                          {option.concepto}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    value={editableAlbaran.cantidades[index]}
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
                    value={editableAlbaran.precios[index]}
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

export default AlbaranForm;
