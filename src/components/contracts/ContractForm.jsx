// components/ContractForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContractForm.css'

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
    direccionFacturacion: '',
    notasAdicionales: ''
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Trigger parent callback to handle the form submission
  };

  return (
    <form className="contract-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre Cliente</label>
        <input type="text" name="nombreCliente" value={formData.nombreCliente} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Calle y Número</label>
        <div className="form-row">
          <input type="text" name="calle" value={formData.calle} onChange={handleChange} placeholder="C/ Sierra de aracena" required className='calle-input'/>
          <input type="text" name="numero" value={formData.numero} onChange={handleChange} placeholder="11, local 17, 1º IZQ" required className='numero-input'/>
        </div>
      </div>
      <div className="form-group">
        <div className="form-row">
          <div className='form-column'>
            <label>CP</label>
            <input type="text" name="cp" value={formData.cp} onChange={handleChange} required />
          </div>
          <div className="form-column">
            <label>Ciudad</label>
            <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
          </div>
          <div className="form-column">
            <label>Provincia</label>
            <input type="text" name="provincia" value={formData.provincia} onChange={handleChange} required />
          </div>
        </div>
      </div>
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
        <input type="text" name="horario" value={formData.horario} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Dirección Facturación</label>
        <input type="text" name="direccionFacturacion" value={formData.direccionFacturacion} onChange={handleChange} placeholder="C/ Minas 9; Brunete; 28691; Madrid" required />
      </div>
      <div className="form-group">
        <label>Notas Adicionales</label>
        <textarea name="notasAdicionales" value={formData.notasAdicionales} onChange={handleChange}></textarea>
      </div>
      <button type="submit" className="submit-button">Siguiente</button>
    </form>
  );
};

export default ContractForm;
