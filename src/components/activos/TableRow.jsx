import React from 'react';
import TableInput from './TableInput';

const TableRow = ({ rowData, rowIndex, tipoExtintorOptions = [], marcaOptions = [], onInputChange }) => {
  return (
    <tr>
      {/* Tipo Extintor - Render as a select input */}
      <td>
        <select
          value={rowData.Extintor}
          onChange={(e) => onInputChange(rowIndex, 'Extintor', e.target.value)}
        >
          <option value="">Select Extintor</option>
          {tipoExtintorOptions.length > 0 ? (
            tipoExtintorOptions.map((option, index) => (
              <option key={index} value={option.concepto}>
                {option.concepto}
              </option>
            ))
          ) : (
            <option disabled>Loading...</option>
          )}
        </select>
      </td>

      {/* Marca_Modelo - Render as a select input */}
      <td>
        <select
          value={rowData.Marca_Modelo}
          onChange={(e) => onInputChange(rowIndex, 'Marca_Modelo', e.target.value)}
        >
          <option value="">Select Marca_Modelo</option>
          {marcaOptions.length > 0 ? (
            marcaOptions.map((option, index) => (
              <option key={index} value={option.marca}>
                {option.marca}
              </option>
            ))
          ) : (
            <option disabled>Loading...</option>
          )}
        </select>
      </td>

      {/* Other fields - Render as regular text inputs */}
      {Object.keys(rowData).map((field, index) => {
        if (field !== 'Extintor' && field !== 'Marca_Modelo') {
          return (
            <td key={index}>
              <TableInput
                value={rowData[field]}
                onChange={(e) => onInputChange(rowIndex, field, e.target.value)}
              />
            </td>
          );
        }
        return null;
      })}
    </tr>
  );
};

export default TableRow;
