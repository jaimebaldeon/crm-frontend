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