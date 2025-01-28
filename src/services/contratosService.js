import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const submitContractForm = async (contractData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/contratos`, contractData);
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

export const getContratos = async (clientId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contratos/contratos-cliente`, {params: { clientId },});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateContract = async (contractData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/contratos/update-contrato`, contractData);
    return response.data;
  } catch (error) {
    throw error.response.data;

  }
};