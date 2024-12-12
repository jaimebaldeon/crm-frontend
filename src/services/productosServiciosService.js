import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getProductosMantenibles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/productos-mantenibles`);
      return response.data;
    } catch (error) {
      throw error.response.data;
  
    }
};

export const getProductosServiciosNoMantenibles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/productos-servicios-no-mantenibles`);
      return response.data;
    } catch (error) {
      throw error.response.data;
  
    }
};

export const getConceptoByDescCorta = async (descripcionesCortas) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/productos/concepto-by-descripcion-corta`, {params: { descripcionesCortas },});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
