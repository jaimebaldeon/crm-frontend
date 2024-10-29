import React, { useState, useEffect } from 'react';
import './ExtintoresForm.css'; 
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { fetchTipoExtintorOptions, fetchMarcaOptions, submitExtintoresForm } from '../../services/extintoresService';  // Import API functions
import { validateForm } from './validators/validateExtintoresForm';

const ExtintoresForm = ({ contract, onSubmit }) => {
  // Initial empty state with no rows
  const [extintoresData, setExtintoresData] = useState([]);
  const [tipoExtintorOptions, setTipoExtintorOptions] = useState([]);
  const [marcaOptions, setMarcaOptions] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch options for 'Tipo Extintor' and 'Marca_Modelo' when the component mounts
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const tipoExtintorResponse = await fetchTipoExtintorOptions();
        const marcaResponse = await fetchMarcaOptions();
        
        setTipoExtintorOptions(tipoExtintorResponse.data);
        setMarcaOptions(marcaResponse.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  // Function to handle input changes in the table
  const handleInputChange = (rowIndex, field, value) => {
    const updatedData = extintoresData.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setExtintoresData(updatedData);
  };

  // Function to add a new empty row to the table
  const addRow = () => {
    setExtintoresData([
      ...extintoresData,
      {
        Extintor: '',
        Marca_Modelo: '',
        N_Identificador: '',
        Fecha_Fabricacion: '',
        Fecha_Retimbrado: '',
        Ubicacion: '',
        Notas: '',
      },
    ]);
  };

   // Function to remove a row based on its index
   const removeRow = (rowIndex) => {
    const updatedData = extintoresData.filter((_, index) => index !== rowIndex);
    setExtintoresData(updatedData);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(extintoresData, contract);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const errorMessages = Object.values(validationErrors).join('\n');
      alert(errorMessages)
      return;
    }
    setErrors({});
    try {
        const response = await submitExtintoresForm(extintoresData);
        onSubmit(extintoresData) // Trigger parent callback after successful API submission
      } catch (error) {
        alert('Error enviando formulario: ' + error.message);
      }
  }; 

  return (
    <div className="extintores-form">
      <table className="excel-table">
        <thead>
          <TableHeader columns={['Extintor', 'Marca_Modelo', 'N_Identificador', 'Fecha_Fabricacion', 'Fecha_Retimbrado', 'Ubicacion', 'Notas']} />
        </thead>
        <tbody>
          {extintoresData.map((row, index) => (
            <TableRow
              key={index}
              rowData={row}
              rowIndex={index}
              tipoExtintorOptions={tipoExtintorOptions}
              marcaOptions={marcaOptions}
              onInputChange={handleInputChange}
              onRemoveRow={() => removeRow(index)} 
            />
          ))}
        </tbody>
      </table>

      {/* Button to add a new row */}
      <button className="add-row-button" onClick={addRow}>
        Añadir extintor
      </button>

      {/* Final submit button */}
      <button className="submit-button" onClick={handleSubmit}>
        Actualizar Activos
      </button>
    </div>
  );
};

export default ExtintoresForm;
