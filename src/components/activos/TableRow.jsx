import React from 'react';
import TableInput from './TableInput';

const TableRow = ({ rowData, rowIndex, onInputChange }) => {
  return (
    <tr>
      {Object.keys(rowData).map((field, index) => (
        <td key={index}>
          <TableInput
            value={rowData[field]}
            onChange={(e) => onInputChange(rowIndex, field, e.target.value)}
          />
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
