import React, { useState } from 'react';
import './AlbaranForm.css'; // Add CSS for styling if needed

const AlbaranForm = ({ albaran, onSubmit, onCancel }) => {
  // Initialize state with the passed albaran object
  const [editableAlbaran, setEditableAlbaran] = useState({ ...albaran });

  // Handle input changes for cantidades, productos_servicios, and precios
  const handleInputChange = (index, field, value) => {
    setEditableAlbaran((prevState) => {
      const updatedField = [...prevState[field]];
      updatedField[index] = value; // Update the specific index
      return { ...prevState, [field]: updatedField };
    });
  };

  // Handle row deletion
  const handleDeleteRow = (index) => {
    setEditableAlbaran((prevState) => ({
      ...prevState,
      productos_servicios: prevState.productos_servicios.filter((_, i) => i !== index),
      cantidades: prevState.cantidades.filter((_, i) => i !== index),
      precios: prevState.precios.filter((_, i) => i !== index),
    }));
  };

  // Handle adding a new row
  const handleAddRow = () => {
    setEditableAlbaran((prevState) => ({
      ...prevState,
      productos_servicios: [...prevState.productos_servicios, ''],
      cantidades: [...prevState.cantidades, ''],
      precios: [...prevState.precios, ''],
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    onSubmit(editableAlbaran); // Pass the modified albaran to the parent
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
                  <input
                    type="text"
                    value={editableAlbaran.productos_servicios[index]}
                    onChange={(e) =>
                      handleInputChange(index, 'productos_servicios', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editableAlbaran.cantidades[index]}
                    onChange={(e) =>
                      handleInputChange(index, 'cantidades', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    value={editableAlbaran.precios[index]}
                    onChange={(e) =>
                      handleInputChange(index, 'precios', e.target.value)
                    }
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
