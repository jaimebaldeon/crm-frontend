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

export const fetchExistingExtintores = async (clientId, contratoId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/datos-extintores/extintores`, {params: { clientId,  contratoId},});
    return response.data; 
  } catch (error) {
    console.error("Error fetching existing extintores:", error);
    throw error.response.data;
  }
};

// Submit Datos Extintores
export const saveActivos = async (activosData, contratoId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/datos-extintores`, {activosData, contratoId});
    return response.data;
  } catch (error) {
    throw error.response.data;

  }
};

// Get Extintores Nuevos del cliente
export const getExtintoresNuevos = async (clientId, contratoId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/datos-extintores/nuevos`, {params: { clientId,  contratoId},});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get Extintores Caducados del cliente
export const getExtintoresCaducados = async (clientId, contratoId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/datos-extintores/caducados`, {params: { clientId,  contratoId},});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update Extintores Caducados del cliente
export const updateExtintoresCaducados = async (clientId, contratoId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/datos-extintores/update-caducados`, { clientId,  contratoId });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update Extintores Caducados del cliente
export const updateExtintoresRetimbrados = async (clientId, contratoId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/datos-extintores/update-retimbrados`, { clientId,  contratoId });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update Datos Extintores
export const updateActivos = async (activosData, contratoId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/datos-extintores/update`, {activosData, contratoId});
    return response.data;
  } catch (error) {
    throw error.response.data;

  }
};