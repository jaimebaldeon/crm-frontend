import React, { useState, useEffect } from 'react';
import './ExtintoresForm.css'; 
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { fetchTipoExtintorOptions, fetchMarcaOptions, submitExtintoresForm, updateExtintoresCaducados } from '../../services/extintoresService';  // Import API functions
import { validateForm } from './validators/validateExtintoresForm';

const ExtintoresForm = ({ client, contract, onSubmit, onCancel }) => {
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
        Id_Cliente: client, // Initialize with the created client's ID
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
    const validationErrors = await validateForm(extintoresData, contract);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const errorMessages = Object.values(validationErrors).join('\n');
      alert(errorMessages)
      return;
    }
    setErrors({});
    try {
        if ('id_albaran' in contract) {
          const response = await updateExtintoresCaducados(contract.id_cliente, contract.id_contrato);
          // !!
          // UPDATE EXTINTORES RETIMBRADOS !!
          // !!
        }
        const response = await submitExtintoresForm(extintoresData, contract.id_contrato);
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

      {/* Cancel button*/}
      <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>

    </div>
  );
};

export default ExtintoresForm;
