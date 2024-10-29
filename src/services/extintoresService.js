import axios from 'axios';

// Define base URL for the API
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch options for "Tipo Extintor"
export const fetchTipoExtintorOptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tipoExtintor-options`);
    return response;  // Return the fetched data
  } catch (error) {
    throw new Error('Failed to fetch Tipo Extintor options');
  }
};

// Fetch options for "Marca_Modelo"
export const fetchMarcaOptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/marca-options`);
    return response;  // Return the fetched data
  } catch (error) {
    throw new Error('Failed to fetch Marca_Modelo options');
  }
};

// Submit Datos Extintores
export const submitExtintoresForm = async (extintoresData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/datos-extintores`, extintoresData);
    return response.data;
  } catch (error) {
    throw error.response.data;

  }
};
