import axios from 'axios';

export const submitContractForm = async (formData) => {
  try {
    // const formData = {
    //   nombreCliente: "JAIME",
    //   calle: "C/ SIERRA DE GATA",
    //   numero: "9",
    //   cif: "B81228504",
    //   cp: "28691",
    //   ciudad: "MADRID",
    //   provincia: "MADRID",
    //   actividad: "CASA",
    //   tipoEstablecimiento: "CENTROS RELIGIOSOS Y COMUNITARIOS",
    //   telefono: "696741451",
    //   iban: "ES1234567890123456789012",
    //   horario: "09-20H",
    //   direccionFacturacion: "C/ SIERRA DE GATA 9 | MADRID | 28691 | MADRID",
    //   notasAdicionales: "FSADFSDAGSGD",
    // }
    const response = await axios.post('http://localhost:5000/api/contratos', formData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to submit contract form');
  }
};
