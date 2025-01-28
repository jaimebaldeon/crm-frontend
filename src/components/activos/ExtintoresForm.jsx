import React, { useState, useEffect } from 'react';
import './ExtintoresForm.css'; 
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { fetchTipoExtintorOptions, fetchMarcaOptions, fetchExistingExtintores, saveActivos, updateExtintoresCaducados, updateActivos } from '../../services/extintoresService';  // Import API functions
import { validateForm, checkExtintoresRetimbrados } from './validators/validateExtintoresForm';

const ExtintoresForm = ({ client, contract, onSubmit, onCancel, formType }) => {
  // Initial empty state with no rows
  const [extintoresData, setExtintoresData] = useState([]);
  const [tipoExtintorOptions, setTipoExtintorOptions] = useState([]);
  const [marcaOptions, setMarcaOptions] = useState([]);

  // Fetch options for 'Tipo Extintor' and 'Marca_Modelo' when the component mounts
  useEffect(() => {
    const fetchOptionsAndExtintores = async () => {
      try {
        // Fetch dropdown options for Tipo Extintor and Marca_Modelo
        const tipoExtintorResponse = await fetchTipoExtintorOptions();
        const marcaResponse = await fetchMarcaOptions();
        
        setTipoExtintorOptions(tipoExtintorResponse.data);
        setMarcaOptions(marcaResponse.data);

        // Check for existing extintores for the given client and contract
        const existingExtintores = await fetchExistingExtintores(contract.id_cliente, contract.id_contrato);

        // Update extintoresData with existing extintores or leave it empty
        if (existingExtintores.length > 0) {
          setExtintoresData(
            existingExtintores.map((extintor) => ({
              Id_Cliente: extintor.id_cliente,
              Nombre: extintor.nombre,
              Marca_Modelo: extintor.marca_modelo,
              N_Identificador: extintor.n_identificador,
              Fecha_Fabricacion: extintor.fecha_fabricacion || '',
              Fecha_Retimbrado: extintor.fecha_retimbrado || '',
              Ubicacion: extintor.ubicacion !== "NULL" ? extintor.ubicacion : '', 
              Notas: extintor.notas !== "NULL" ? extintor.notas : '', 
            }))
          );
        } else {
          setExtintoresData([]); // Empty table
        }
      } catch (error) {
        console.error('Error inicializando el formulario:', error);
      }
    };

    fetchOptionsAndExtintores();
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
        Id_Cliente: client || contract.id_cliente, // Initialize with the created client's ID
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

   // Function to remove a row based on its index
   const removeRow = (rowIndex) => {
    const updatedData = extintoresData.filter((_, index) => index !== rowIndex);
    setExtintoresData(updatedData);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validateForm(extintoresData, contract);
    if (Object.keys(validationErrors).length > 0) {
      const errorMessages = Object.values(validationErrors).join('\n');
      alert(errorMessages)
      return;
    }
    try {
        if ('id_albaran' in contract) {
          const responseCaducados = await updateExtintoresCaducados(contract.id_cliente, contract.id_contrato);
          // Update Extitnores Retimbrados
          const responseRetimbrados = await checkExtintoresRetimbrados(contract);
        }

        // Unify activos format to insert in common DDBB
        const extintores = extintoresData.map((extintor) => ({
          Id_Cliente: extintor.Id_Cliente,
          Nombre: extintor.Nombre,
          Marca_Modelo: extintor.Marca_Modelo,
          N_Identificador: extintor.N_Identificador,
          Fecha_Fabricacion: extintor.Fecha_Fabricacion || null,
          Fecha_Retimbrado: extintor.Fecha_Retimbrado || null,
          Ubicacion: extintor.Ubicacion || null,
          Notas: extintor.Notas || null,
          Cantidad: 1, // Default quantity for extintores
          Tipo: null
        }));

        const nonExtintores = contract.products
          .filter((product) => !product.productoServicio.toLowerCase().includes("extintor")) // Exclude extintores
          .map((product) => ({
            Id_Cliente: contract.id_cliente,
            Nombre: product.productoServicio,
            Marca_Modelo: null, // Not applicable for non-extintores
            N_Identificador: null, // Not applicable for non-extintores
            Fecha_Fabricacion: null, // Not applicable for non-extintores
            Fecha_Retimbrado: null, // Not applicable for non-extintores
            Ubicacion: null,
            Notas: null,
            Cantidad: parseInt(product.cantidad, 10),
            Tipo: null
        }));

        const activosData = [...extintores, ...nonExtintores];
        
        if (formType == 'modify') {
          // Actualiza activos existentes en BBDD
          const response = await updateActivos(activosData, contract.id_contrato);
        } else {
          // Inserta nuevos activos en BBDD
          const response = await saveActivos(activosData, contract.id_contrato);
        }
        
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
