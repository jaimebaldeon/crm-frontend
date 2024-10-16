// Data Transformation: Set direccionFacturacion if it's empty
export const transformData = (formData) => {
    return {
      ...formData,
      direccionFacturacion:
        Object.keys(formData.direccionFacturacion).length === 0
          ? `${formData.calle} ${formData.numero} | ${formData.ciudad} | ${formData.cp} | ${formData.provincia}`
          : formData.direccionFacturacion,
    };
};
  