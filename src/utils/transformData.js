// Data Transformation: Set direccionFacturacion if it's empty
export const transformData = (formData) => {
    const direccionFacturacionFormatted =
        Object.keys(formData.direccionFacturacion).length === 0
          ? `${formData.calle} ${formData.numero} | ${formData.ciudad} | ${formData.cp} | ${formData.provincia}`
          : `${formData.direccionFacturacion.calle} ${formData.direccionFacturacion.numero} | ${formData.direccionFacturacion.ciudad} | ${formData.direccionFacturacion.cp} | ${formData.direccionFacturacion.provincia}`;
    
    return {
      ...formData,
      direccionFacturacion: direccionFacturacionFormatted,
    };
};
  