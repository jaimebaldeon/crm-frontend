import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContractForm.css'; 
import {validateForm} from './validators/validateContractForm'
import { submitContractForm } from '../../services/contractService';

const ContractForm = ({ client, onSubmit, onCancel }) => {

  const [productosServicios, setProductosServicios] = useState([]);
  const [errors, setErrors] = useState({});
  const [contractData, setContractData] = useState({
    clientId: client, // Initialize with the created client's ID
    products: [
      {
        productoServicio: '',
        cantidad: '',
        precio: ''
      }
    ], // Initialize with one product/service entry
    hasExtintores: false,
    tipo: ''
  });

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/productos-mantenibles');
      setProductosServicios(response.data);
    } catch (error) {
      console.error('Error fetching productos y servicios data', error);
    }
  };

  useEffect(() => {
    fetchData(); // Call the API when the component mounts
  }, []);

  // Handle input change for the contract form fields (not products/services)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContractData({
      ...contractData,
      [name]: value,
    });
  };

  // Handle input change for the products/services fields
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = contractData.products.map((product, i) => (
      i === index ? { ...product, [name]: value } : product
    ));
    // Check if any of the products contain the substring 'EXTINTOR'
    const hasExtintor = updatedProducts.some(product =>
        product.productoServicio && product.productoServicio.toUpperCase().includes('EXTINTOR')
      );
    setContractData({
      ...contractData,
      products: updatedProducts,
      hasExtintores: hasExtintor
    });
  };

  // Add new product/service entry
  const handleAddProduct = () => {
    setContractData({
      ...contractData,
      products: [...contractData.products, { productoServicio: '', cantidad: '', precio: '' }],
    });
  };

  // Remove a product/service entry
  const handleRemoveProduct = (index) => {
    const updatedProducts = contractData.products.filter((_, i) => i !== index);
    setContractData({
      ...contractData,
      products: updatedProducts,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(contractData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
        const response = await submitContractForm(contractData);
        onSubmit(contractData) // Trigger parent callback after successful API submission
      } catch (error) {
        alert('Error enviando formulario: ' + error.message);
      }
  }; 

  return (
    <form className='contract-form' onSubmit={handleSubmit}>
      <h2>Create Contract for {client}</h2>

      {/* General Contract Information */}
      <h3>Products/Services</h3>
      <div className="product-entry">
        <label>
                TIpo Contrato:
                <select
                    name="tipo"
                    value={contractData.tipo}
                    onChange={handleInputChange}
                    required
                    className='custom-select'
                >
                    <option value="Anual">Anual</option>
                    <option value="Trimestral">Trimestral</option>
                    <option value="Único">Único</option>
                </select>
            </label>
      </div>
      {/* Dynamically add multiple products/services */}
      {contractData.products.map((product, index) => (
        <div key={index} className="product-entry">
          <label>
            Producto/Servicio:
            <select
              name="productoServicio"
              value={product.productoServicio}
              onChange={(e) => handleProductChange(index, e)}
              required
              className='custom-select'
            >
                <option value="">Seleccione un tipo</option>
                {productosServicios.map((producto, index) => (
                    <option key={index} value={producto.concepto}>
                        {producto.concepto}
                    </option>
                ))}
            </select>
          </label>
          <div className="form-row">
            <label className='form-column'>
                Cantidad:
                <input
                type="number"
                name="cantidad"
                value={product.cantidad}
                onChange={(e) => handleProductChange(index, e)}
                required
                />
            </label>
            <label className='form-column'>
                Precio:
                <input
                type="number"
                step="0.01"
                name="precio"
                value={product.precio}
                onChange={(e) => handleProductChange(index, e)}
                required
                />
            </label>
        </div>

          {/* Button to remove a product/service entry */}
          {contractData.products.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveProduct(index)}
              className="remove-product-btn"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {/* Button to add new product/service entry */}
      <button type="button" onClick={handleAddProduct} className="add-product-btn">
        Add Product/Service
      </button>

      {/* Submit form button */}
      <button type="submit" className="submit-button">Submit Contract</button>

      {/* Cancel button*/}
      <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>
    </form>
  );
};

export default ContractForm;
