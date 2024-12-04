import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const submitClientForm = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/clientes`, formData);
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

export const searchClientes = async (searchData) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search-clientes`, {params: { searchData },});
    return response.data;
  } catch (error) {
    throw error.response.data;

  }
};
