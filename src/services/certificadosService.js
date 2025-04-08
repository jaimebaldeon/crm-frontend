import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const generateCertificados = async (month) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/certificados/generate-certificados`, {params: { month },});
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};

export const getCertificados = async (clientId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/certificados/get-certificados`, {params: { clientId },});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateCertificado = async (certificadoData, cuota) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/certificados/update-certificado`, { certificadoData });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteCertificado = async (idCertificado) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/certificados/delete-certificado`, { idCertificado });
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      throw error.response.data;
    }
    throw error.response.data;
  }
};