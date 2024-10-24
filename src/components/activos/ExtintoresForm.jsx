import React, { useState } from 'react';
import './ExtintoresForm.css'; 
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const ExtintoresForm = ({ contract, onSubmit }) => {
  // Initial empty state with no rows
  const [extintoresData, setExtintoresData] = useState([]);

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
        Nombre: '',
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
          <TableHeader columns={['Nombre', 'Marca_Modelo', 'N_Identificador', 'Fecha_Fabricacion', 'Fecha_Retimbrado', 'Ubicacion', 'Notas']} />
        </thead>
        <tbody>
          {extintoresData.map((row, index) => (
            <TableRow
              key={index}
              rowData={row}
              rowIndex={index}
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
