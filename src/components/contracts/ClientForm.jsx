// components/ClientForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientForm.css'
import useForm from '../../hooks/useForm';
import AddressForm from './AddressForm'; 
import { validateForm } from './validators/validateForm';
import { transformData } from '../../utils/transformData';
import { submitClientForm } from '../../services/clientService';



const ClientForm = ({ onSubmit }) => {

  const [tiposEstablecimiento, setTiposEstablecimiento] = useState([]);


   // Fetch data from the API
   const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tipoEstablecimiento');
      setTiposEstablecimiento(response.data);
    } catch (error) {
      console.error('Error fetching tipo establecimiento data', error);
    }
  };

  

  useEffect(() => {
    fetchData(); // Call the API when the component mounts
  }, []);

  const { formData, errors, handleInputChange, handleDirFactChange, showAddressForm, toggleAddressForm, handleSubmit} = useForm({
    initialValues: {
      nombreCliente: '',
      calle: '',
      numero: '',
      cif: '',
      cp: '',
      ciudad: '',
      provincia: '',
      actividad: '',
      tipoEstablecimiento: '',
      telefono: '',
      iban: '',
      horario: '',
      direccionFacturacion: {},
      notasAdicionales: ''
    },
    validate: validateForm,
    onSubmit: async (values) => {
      const transformedData = transformData(values);
      try {
        const response = await submitClientForm(transformedData);
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
        <input type="text" name="nombreCliente" value={formData.nombreCliente} onChange={handleInputChange} required />
      </div>
      <AddressForm formData={formData} handleChange={handleInputChange} />
      <div className="form-group">
        <div className='form-row'>
          <div className='form-column'>
            <label>CIF</label>
            <input type="text" name="cif" value={formData.cif} onChange={handleInputChange} required />
          </div>
          <div className="form-column">
            <label>Actividad</label>
            <input type="text" name="actividad" value={formData.actividad} onChange={handleInputChange} required />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Tipo Establecimiento</label>
        <select
          name="tipoEstablecimiento"
          value={formData.tipoEstablecimiento}
          onChange={handleInputChange}
          required
          className='custom-select'
        >
          <option value="">Seleccione un tipo</option>
          {tiposEstablecimiento.map((tipo, index) => (
            <option key={index} value={tipo.general}>
              {tipo.general}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Teléfono</label>
        <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>IBAN</label>
        <input type="text" name="iban" value={formData.iban} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Horario</label>
        <input type="text" name="horario" value={formData.horario} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <button type="button" onClick={toggleAddressForm} className="change-address-btn">
          Cambiar Dirección Facturación
        </button>
      </div>
      {/* Show AddressForm component on button click */}
      {showAddressForm && (
        <AddressForm formData={formData.direccionFacturacion} handleChange={handleDirFactChange} />
      )}
      <div className="form-group">
        <label>Notas Adicionales</label>
        <textarea name="notasAdicionales" value={formData.notasAdicionales} onChange={handleInputChange}></textarea>
      </div>
      <button type="submit" className="submit-button">Siguiente</button>
    </form>
  );
};

export default ClientForm;
