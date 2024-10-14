// components/ContractForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContractForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombreCliente: '',
    calleNumero: '',
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
        <input type="text" name="calleNumero" value={formData.calleNumero} onChange={handleChange} placeholder="C/ Sierra de aracena 11, local 17, 1º IZQ" required />
      </div>
      <div className="form-group">
        <label>CIF</label>
        <input type="text" name="cif" value={formData.cif} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>CP</label>
        <input type="text" name="cp" value={formData.cp} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Ciudad</label>
        <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Provincia</label>
        <input type="text" name="provincia" value={formData.provincia} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Actividad</label>
        <input type="text" name="actividad" value={formData.actividad} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Tipo Establecimiento</label>
        <select
          name="tipoEstablecimiento"
          value={formData.tipoEstablecimiento}
          onChange={handleChange}
          required
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
