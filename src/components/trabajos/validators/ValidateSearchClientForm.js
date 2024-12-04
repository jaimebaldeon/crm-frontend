export const validateForm = (formData) => {
    let errors = {};

    // Ensure at least one field is not empty
    if (
      !formData.nombreCliente.trim() &&
      !formData.direccion.trim() &&
      !formData.cif.trim() &&
      !formData.idCliente
    ) {
        errors.general = "Al menos uno de los campos debe estar lleno.";
    }
    
    
    // Validate CIF (assuming CIF should have a certain format)
    const cifPattern = /^[A-Za-z0-9]{9}$/; // Example: Spanish CIF format
    if (formData.cif.trim() && !cifPattern.test(formData.cif)) {
      errors.cif = "El CIF no es válido. Debe tener 9 caracteres alfanuméricos.";
    }
  
    // Validate idCliente
    if (!Number.isInteger(Number(formData.idCliente))) {
      errors.cp = "El ID Cliente debe ser un número.";
    }
    
  return errors;
};
