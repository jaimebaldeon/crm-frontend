import axios from 'axios';

export const submitContractForm = async (formData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/contracts', formData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to submit contract form');
  }
};
