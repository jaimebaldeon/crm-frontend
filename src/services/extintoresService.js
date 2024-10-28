import axios from 'axios';

// Define base URL for the API
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch options for "Tipo Extintor"
export const fetchTipoExtintorOptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tipoExtintor-options`);
    return response.data;  // Return the fetched data
  } catch (error) {
    throw new Error('Failed to fetch Nombre options');
  }
};

// Fetch options for "Marca_Modelo"
export const fetchMarcaOptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/marca-options`);
    return response.data;  // Return the fetched data
  } catch (error) {
    throw new Error('Failed to fetch Marca_Modelo options');
  }
};
