import React from 'react';

const TableInput = ({ value, onChange }) => {
  return (
    <input type="text" value={value} onChange={onChange} />
  );
};

export default TableInput;
