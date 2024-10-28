import React from 'react';
import TableInput from './TableInput';

const TableRow = ({ rowData, rowIndex, nombreOptions, marcaOptions, onInputChange }) => {
  return (
    <tr>
      {/* Nombre - Render as a select input */}
      <td>
        <select
          value={rowData.Nombre}
          onChange={(e) => onInputChange(rowIndex, 'Nombre', e.target.value)}
        >
          <option value="">Select Nombre</option>
          {nombreOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </td>

      {/* Marca_Modelo - Render as a select input */}
      <td>
        <select
          value={rowData.Marca_Modelo}
          onChange={(e) => onInputChange(rowIndex, 'Marca_Modelo', e.target.value)}
        >
          <option value="">Select Marca_Modelo</option>
          {marcaOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </td>

      {/* Other fields - Render as regular text inputs */}
      {Object.keys(rowData).map((field, index) => {
        if (field !== 'Nombre' && field !== 'Marca_Modelo') {
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
