import React, { useState } from 'react';
import './ContractForm.css'; // Import CSS for ContractForm

const ContractForm = ({ client, onSubmit }) => {
  const [contractData, setContractData] = useState({
    clientId: client, // Initialize with the created client's ID
    products: [
      {
        productoServicio: '',
        cantidad: '',
        precio: ''
      }
    ], // Initialize with one product/service entry
  });

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
    setContractData({
      ...contractData,
      products: updatedProducts,
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(contractData); // Pass contract data to parent component for handling
  };

  return (
    <form className='contract-form' onSubmit={handleSubmit}>
      <h2>Create Contract for {client}</h2>

      {/* General Contract Information */}
      <h3>Products/Services</h3>
      {/* Dynamically add multiple products/services */}
      {contractData.products.map((product, index) => (
        <div key={index} className="product-entry">
          <label>
            Producto/Servicio:
            <input
              type="text"
              name="productoServicio"
              value={product.productoServicio}
              onChange={(e) => handleProductChange(index, e)}
            />
          </label>
          <div className="form-row">
            <label className='form-column'>
                Cantidad:
                <input
                type="number"
                name="cantidad"
                value={product.cantidad}
                onChange={(e) => handleProductChange(index, e)}
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
    </form>
  );
};

export default ContractForm;
