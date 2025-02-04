import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const generateFacturas = async (month) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/facturas/generate-facturas`, {params: { month },});
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};

export const getFacturas = async (clientId, estado) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/facturas/get-facturas`, {params: { clientId, estado },});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateFactura = async (facturaData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/facturas/update-factura`, { facturaData });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteFactura = async (idFactura) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/facturas/delete-factura`, { idFactura });
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      throw error.response.data;
    }
    throw error.response.data;
  }
};