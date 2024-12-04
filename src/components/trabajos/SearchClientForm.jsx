import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useForm from '../../hooks/useForm';
import { validateForm } from './validators/ValidateSearchClientForm';
import { searchClientes } from '../../services/clientService';

const SearchClientForm = ({ onSubmit, onCancel }) => {
    const { formData, errors, handleInputChange, _handleDirFactChange, _showAddressForm, _toggleAddressForm, handleSubmit} = useForm({
        initialValues: {
          nombreCliente: '',
          direccion: '',
          cif: '',
          idCliente: ''
        },
        validate: validateForm,
        onSubmit: async (values) => {
          try {
            const response = await searchClientes(values);
            onSubmit(response); // Trigger parent callback after successful API submission
          } catch (error) {
            alert('Error enviando formulario: ' + error.message);
          }
        }
    });

    return (
        <form className="client-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nombre Cliente</label>
                <input type="text" name="nombreCliente" value={formData.nombreCliente} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>CIF</label>
                <input type="text" name="cif" value={formData.cif} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>Direccion</label>
                <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>Id Cliente</label>
                <input type="text" name="idCliente" value={formData.idcliente} onChange={handleInputChange} />
            </div>
            <button type="submit" className="submit-button">Buscar</button>
            <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>            
        </form>
    );
};

export default SearchClientForm;