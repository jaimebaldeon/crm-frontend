import React from 'react';

const TableHeader = ({ columns }) => {
  return (
    <tr>
      {columns.map((col, index) => (
        <th key={index}>{col}</th>
      ))}
    </tr>
  );
};

export default TableHeader;