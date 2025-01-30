import React, { useState, useEffect } from 'react';
import './UpdateClienteForm.css'; 
import { getCategoriaEstablecimiento } from '../../services/categoriaEstablecimientoService';
import { validateForm } from './validators/validateUpdateClienteForm';
import { updateCliente } from '../../services/clientService';

const UpdateClienteForm = ({ cliente, onSubmit, onCancel }) => {
  const [editableCliente, setEditableCliente] = useState({ ...cliente });
  const [categoriaEstablecimiento, setCategoriaEstablecimiento] = useState([]);

  useEffect(() => {
      const fetchCategoriaEstablecimiento = async () => {
        try {
          const categoriaEstablecimiento = await getCategoriaEstablecimiento(); 
          setCategoriaEstablecimiento(categoriaEstablecimiento);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCategoriaEstablecimiento();
    }, []);

  const handleInputChange = (field, value) => {
    setEditableCliente((prevState) => ({
      ...prevState,
      [field]: value.toUpperCase()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validateForm(editableCliente);
    if (Object.keys(validationErrors).length > 0) {
      alert(Object.values(validationErrors).join('\n'));
      return;
    }

    try {
      const response = await updateCliente(editableCliente);
      
    //   const updatedEditableCliente = {
    //     id_cliente: editableCliente.id_cliente, 
    //     products: productos_servicios, 
    //     hasExtintores: hasExtintor,
    //     tipo: editableCliente.tipo,
    //     id_cliente: editableCliente.id_cliente
    //   };

      onSubmit(editableCliente);
    } catch (error) {
      alert('Error actualizando cliente: ' + error.message);
    }
  };

  return (
    <div className="contrato-form">
      <h3>Editar Cliente</h3>

      {/* 🔹 Sección 1: Información del Cliente */}
      <form onSubmit={handleSubmit}>
        <fieldset className="client-info">
            <legend>Información del Cliente</legend>

            <div className="client-row">
            <label>ID Cliente:</label>
            <input type="text" value={editableCliente.id_cliente} disabled />
            </div>

            <div className="client-row">
            <label>Nombre:</label>
            <input 
              type="text" 
              value={editableCliente.nombre} 
              onChange={(e) => handleInputChange("nombre", e.target.value)} 
              required
            />
          </div>

          <div className="client-row">
            <label>CIF:</label>
            <input 
              type="text" 
              value={editableCliente.cif} 
              onChange={(e) => handleInputChange("cif", e.target.value)}
              required 
            />
          </div>

          <div className="client-row">
            <label>Dirección:</label>
            <input 
              type="text" 
              value={editableCliente.direccion} 
              onChange={(e) => handleInputChange("direccion", e.target.value)}
              required 
            />
          </div>

          <div className="client-row">
            <label>Código Postal:</label>
            <input 
              type="text" 
              value={editableCliente.cp} 
              onChange={(e) => handleInputChange("cp", e.target.value)}
              required
            />
          </div>

          <div className="client-row">
            <label>Ciudad:</label>
            <input 
              type="text" 
              value={editableCliente.ciudad} 
              onChange={(e) => handleInputChange("ciudad", e.target.value)}
              required
            />
          </div>

          <div className="client-row">
            <label>Provincia:</label>
            <input 
              type="text" 
              value={editableCliente.provincia} 
              onChange={(e) => handleInputChange("provincia", e.target.value)}
              required
            />
          </div>

          <div className="client-row">
            <label>Actividad:</label>
            <input 
              type="text" 
              value={editableCliente.actividad} 
              onChange={(e) => handleInputChange("actividad", e.target.value)}
              required
            />
          </div>

          <div className="client-row">
            <label>Horario:</label>
            <input 
              type="text" 
              value={editableCliente.horario} 
              onChange={(e) => handleInputChange("horario", e.target.value)}
            />
          </div>

          <div className="client-row">
            <label>IBAN:</label>
            <input 
              type="text" 
              value={editableCliente.iban} 
              onChange={(e) => handleInputChange("iban", e.target.value)}
            />
          </div>

          <div className="client-row">
            <label>Telefono:</label>
            <input 
              type="text" 
              value={editableCliente.telefono} 
              onChange={(e) => handleInputChange("telefono", e.target.value)}
              required
            />
          </div>

          <div className="client-row">
            <label>Direccion Facturacion:</label>
            <input 
              type="text" 
              value={editableCliente.direccion_facturacion} 
              onChange={(e) => handleInputChange("direccion_facturacion", e.target.value)}
              required
            />
          </div>

          <div className="client-row">
            <label>Categoria Establecimiento:</label>
            <select 
              value={editableCliente.categoria_establecimiento} 
              onChange={(e) => handleInputChange("categoria_establecimiento", e.target.value)}
              required
            >
                <option value="">Seleccione un tipo</option>
                {categoriaEstablecimiento.map((tipo, index) => (
                    <option key={index} value={tipo.general}>
                    {tipo.general}
                    </option>
                ))}
            </select>
          </div>
          
        </fieldset>

        {/* 🔹 Sección 3: Acciones */}
        <div className="action-buttons">
          <button type="submit" className="submit-button">Guardar Cambios</button>
          <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClienteForm;
