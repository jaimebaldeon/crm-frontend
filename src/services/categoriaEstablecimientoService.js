import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';


export const getCategoriaEstablecimiento = async () => {
    try {
    //   const response = await axios.get('http://localhost:5000/api/tipoEstablecimiento');
      const response = await axios.get(`${API_BASE_URL}/categoria-establecimiento`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tipo establecimiento', error);
    }
  };