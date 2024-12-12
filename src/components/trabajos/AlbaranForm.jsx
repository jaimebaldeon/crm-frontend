import React, { useState, useEffect } from 'react';
import './AlbaranForm.css'; // Add CSS for styling if needed
import { getProductosServiciosNoMantenibles } from '../../services/productosServiciosService';
import { existenNuevosExtintores, validateExtintoresCaducados } from './validators/ValidateAlbaranForm';


const AlbaranForm = ({ albaran, onSubmit, onCancel }) => {
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
    if (existenNuevosExtintores(editableAlbaran)) {
      // Validar extintores en BBDD
      const validated = await validateExtintoresCaducados(editableAlbaran)

      // Interrumpir Envio si no es validado
      if (!validated) {
        return
      };
      
      onSubmit(editableAlbaran, true); // Pass `true` to indicate nuevos extintores exist
    } else {
      onSubmit(editableAlbaran, false); // Pass `false` otherwise
    }
    // check_retimbrados_extintores
    // update_albaranesBBDD
  };

  return (
    <div className="albaran-form">
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
