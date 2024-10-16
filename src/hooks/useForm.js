import { useState } from 'react';

const useForm = ({ initialValues, validate, onSubmit }) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [direccionFacturacion, setDireccionFacturacion] = useState({
    calle: '',
    numero: '',
    cif: '',
    cp: '',
    ciudad: '',
    provincia: ''
  });
  const [showAddressForm, setShowAddressForm] = useState(false); // State to toggle AddressForm


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.toUpperCase(),
    });
  };

  const handleDirFactChange = (e) => {
    const updatedDireccionFacturacion = {
      ...direccionFacturacion,
      [e.target.name]: e.target.value.toUpperCase()
    };
    setDireccionFacturacion(updatedDireccionFacturacion);
    setFormData({ ...formData, direccionFacturacion: updatedDireccionFacturacion });
  };

  const toggleAddressForm = () => {
    setShowAddressForm(!showAddressForm);
    if (!showAddressForm) {
      setFormData({...formData, direccionFacturacion: direccionFacturacion})
    } 
    else {
      setFormData({...formData, direccionFacturacion: ''})
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    await onSubmit(formData); // Trigger submission after successful validation
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleDirFactChange,
    showAddressForm,
    toggleAddressForm,
    handleSubmit,
  };
};

export default useForm;
