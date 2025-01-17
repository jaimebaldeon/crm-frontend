import axios from 'axios';

export const submitContractForm = async (contractData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/contratos', contractData);
    return response.data;
  } catch (error) {
    // if (error.response.status == 400) {
    //   // Client already exists or other validation issue
    //   throw new Error(error.response.data.message || 'Error de validación en el formulario del cliente');
    // }
    // throw new Error('Failed to submit client form');
    throw error.response.data;

  }
};
