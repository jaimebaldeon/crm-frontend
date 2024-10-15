// components/ContractForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContractForm.css'
import AddressForm from './AddressForm'; 


const ContractForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
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
  });

  const [direccionFacturacion, setDireccionFacturacion] = useState({
    calle: '',
    numero: '',
    cif: '',
    cp: '',
    ciudad: '',
    provincia: ''
  })

  const [tiposEstablecimiento, setTiposEstablecimiento] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false); // State to toggle AddressForm


   // Fetch data from the API
   const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tipoEstablecimiento');
      setTiposEstablecimiento(response.data);
    } catch (error) {
      console.error('Error fetching tipo establecimiento data', error);
    }
  };

  const toggleAddressForm = () => {
    setShowAddressForm(!showAddressForm);
    if (!showAddressForm) {
      setFormData({...formData, direccionFacturacion: direccionFacturacion})
    } 
    else {
      setFormData({...formData, direccionFacturacion: ''})
    }
  };

  useEffect(() => {
    fetchData(); // Call the API when the component mounts
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.toUpperCase() });
  };

  const handleChangeDirFact = (e) => {
    const updatedDireccionFacturacion = {
      ...direccionFacturacion,
      [e.target.name]: e.target.value.toUpperCase()
    };
    setDireccionFacturacion(updatedDireccionFacturacion);
    setFormData({ ...formData, direccionFacturacion: updatedDireccionFacturacion });
  };

  const validateForm = () => {
    let errors = [];
  
    // Validate Nombre Cliente
    if (!formData.nombreCliente.trim()) {
      errors.push("El nombre del cliente es obligatorio.");
    }
  
    // Validate Calle
    if (!formData.calle.trim()) {
      errors.push("La calle es obligatoria.");
    }
  
    // Validate Número
    if (!formData.numero.trim()) {
      errors.push("El número es obligatorio.");
    }
  
    // Validate CIF (assuming CIF should have a certain format)
    const cifPattern = /^[A-Za-z0-9]{9}$/; // Example: Spanish CIF format
    if (!cifPattern.test(formData.cif)) {
      errors.push("El CIF no es válido. Debe tener 9 caracteres alfanuméricos.");
    }
  
    // Validate CP (assuming it should be 5 digits in Spain)
    const cpPattern = /^\d{5}$/;
    if (!cpPattern.test(formData.cp)) {
      errors.push("El código postal debe tener 5 dígitos.");
    }
  
    // Validate Ciudad
    if (!formData.ciudad.trim()) {
      errors.push("La ciudad es obligatoria.");
    }
  
    // Validate Provincia
    if (!formData.provincia.trim()) {
      errors.push("La provincia es obligatoria.");
    }
  
    // Validate Actividad
    if (!formData.actividad.trim()) {
      errors.push("La actividad es obligatoria.");
    }
  
    // Validate Tipo Establecimiento
    if (!formData.tipoEstablecimiento.trim()) {
      errors.push("El tipo de establecimiento es obligatorio.");
    }
  
    // Validate Teléfono (assuming it should be a valid phone number)
    const telefonoPattern = /^\d{9}$/;
    if (!telefonoPattern.test(formData.telefono)) {
      errors.push("El teléfono no es válido. Debe tener 9 dígitos.");
    }
  
    // Validate IBAN (assuming a general IBAN format)
    const ibanPattern = /^[A-Za-z]{2}\d{22}$/;
    if (!ibanPattern.test(formData.iban)) {
      errors.push("El IBAN no es válido.");
    }
  
    // Validate Dirección Facturación
    if (Object.keys(formData.direccionFacturacion).length === 0) {
      // errors.push("La dirección de facturación es obligatoria.");
    }
  
    // Notas Adicionales (Optional - you can decide if this should be required or not)
    if (!formData.notasAdicionales.trim()) {
      // Optional, no error needed if not required
    }
  
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const errors = validateForm();
    if (errors.length > 0) {
      // Handle errors (e.g., show them to the user)
      alert(errors.join("\n"));
      return; // Stop the form submission
    }

    // Data Transformation: Set direccionFacturacion if it's empty
    setFormData({
      ...formData,
      direccionFacturacion: Object.keys(formData.direccionFacturacion).length === 0 
        ? `${formData.calle} ${formData.numero} | ${formData.ciudad} | ${formData.cp} | ${formData.provincia}` // Combine calle, numero, ciudad, cp, provincia into a string
        : formData.direccionFacturacion, // Keep existing value if it's not empty
    });


    // If no errors, proceed with the form submission
    onSubmit(formData); // Trigger parent callback to handle the form submission
  };

  return (
    <form className="contract-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre Cliente</label>
        <input type="text" name="nombreCliente" value={formData.nombreCliente} onChange={handleChange} required />
      </div>
      <AddressForm formData={formData} handleChange={handleChange} />
      <div className="form-group">
        <div className='form-row'>
          <div className='form-column'>
            <label>CIF</label>
            <input type="text" name="cif" value={formData.cif} onChange={handleChange} required />
          </div>
          <div className="form-column">
            <label>Actividad</label>
            <input type="text" name="actividad" value={formData.actividad} onChange={handleChange} required />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Tipo Establecimiento</label>
        <select
          name="tipoEstablecimiento"
          value={formData.tipoEstablecimiento}
          onChange={handleChange}
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
        <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>IBAN</label>
        <input type="text" name="iban" value={formData.iban} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Horario</label>
        <input type="text" name="horario" value={formData.horario} onChange={handleChange} />
      </div>
      <div className="form-group">
        <button type="button" onClick={toggleAddressForm} className="change-address-btn">
          Cambiar Dirección Facturación
        </button>
      </div>
      {/* Show AddressForm component on button click */}
      {showAddressForm && (
        <AddressForm formData={formData.direccionFacturacion} handleChange={handleChangeDirFact} />
      )}
      <div className="form-group">
        <label>Notas Adicionales</label>
        <textarea name="notasAdicionales" value={formData.notasAdicionales} onChange={handleChange}></textarea>
      </div>
      <button type="submit" className="submit-button">Siguiente</button>
    </form>
  );
};

export default ContractForm;
