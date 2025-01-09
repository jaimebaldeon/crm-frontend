import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const generateAlbaranes = async (month) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/generate-albaranes`, {params: { month },});
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};

export const getAlbaranes = async (clientId, estado) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-albaranes`, {params: { clientId, estado },});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateAlbaran = async (albaranData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update-albaran`, { albaranData });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteAlbaran = async (idAlbaran) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/delete-albaran`, { idAlbaran });
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      throw error.response.data;
    }
    throw error.response.data;
  }
};