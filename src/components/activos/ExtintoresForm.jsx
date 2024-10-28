import React, { useState, useEffect } from 'react';
import './ExtintoresForm.css'; 
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { fetchTipoExtintorOptions, fetchMarcaOptions } from '../../services/extintoresService';  // Import API functions


const ExtintoresForm = ({ contract, onSubmit }) => {
  // Initial empty state with no rows
  const [extintoresData, setExtintoresData] = useState([]);
  const [nombreOptions, setNombreOptions] = useState([]);
  const [marcaOptions, setMarcaOptions] = useState([]);

  // Fetch options for 'Tipo Extintor' and 'Marca_Modelo' when the component mounts
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const nombreResponse = await fetchTipoExtintorOptions();
        const marcaResponse = await fetchMarcaOptions();
        
        setNombreOptions(nombreResponse.data);
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
              nombreOptions={nombreOptions}
              marcaOptions={marcaOptions}
              onInputChange={handleInputChange}
            />
          ))}
        </tbody>
      </table>

      {/* Button to add a new row */}
      <button className="add-row-button" onClick={addRow}>
        Añadir extintor
      </button>
    </div>
  );
};

export default ExtintoresForm;
