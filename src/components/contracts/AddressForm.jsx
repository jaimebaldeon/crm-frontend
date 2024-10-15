import React from 'react';
import './ContractForm.css'; // Importing the existing style library

const AddressForm = ({ formData, handleChange }) => {
  return (
    <div className="address-form">
      {/* Calle y Número */}
      <div className="form-group">
        <label>Calle y Número</label>
        <div className="form-row">
          <input
            type="text"
            name="calle"
            value={formData.calle}
            onChange={handleChange}
            placeholder="C/ Sierra de aracena"
            required
            className="calle-input"
          />
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            placeholder="11, local 17, 1º IZQ"
            required
            className="numero-input"
          />
        </div>
      </div>

      {/* CP, Ciudad, Provincia */}
      <div className="form-group">
        <div className="form-row">
          <div className="form-column">
            <label>CP</label>
            <input
              type="text"
              name="cp"
              value={formData.cp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-column">
            <label>Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-column">
            <label>Provincia</label>
            <input
              type="text"
              name="provincia"
              value={formData.provincia}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
