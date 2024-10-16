export const validateForm = (formData) => {
    let errors = {};

    // Validate Nombre Cliente
    if (!formData.nombreCliente.trim()) {
        errors.push("El nombre del cliente es obligatorio.");
      }
    
      // Validate Calle
      if (!formData.calle.trim()) {
        errors.push("La calle es obligatoria.");
      }
    
      // Validate Número
      if (!formData.numero.trim()) {
        errors.push("El número es obligatorio.");
      }
    
      // Validate CIF (assuming CIF should have a certain format)
      const cifPattern = /^[A-Za-z0-9]{9}$/; // Example: Spanish CIF format
      if (!cifPattern.test(formData.cif)) {
        errors.push("El CIF no es válido. Debe tener 9 caracteres alfanuméricos.");
      }
    
      // Validate CP (assuming it should be 5 digits in Spain)
      const cpPattern = /^\d{5}$/;
      if (!cpPattern.test(formData.cp)) {
        errors.push("El código postal debe tener 5 dígitos.");
      }
    
      // Validate Ciudad
      if (!formData.ciudad.trim()) {
        errors.push("La ciudad es obligatoria.");
      }
    
      // Validate Provincia
      if (!formData.provincia.trim()) {
        errors.push("La provincia es obligatoria.");
      }
    
      // Validate Actividad
      if (!formData.actividad.trim()) {
        errors.push("La actividad es obligatoria.");
      }
    
      // Validate Tipo Establecimiento
      if (!formData.tipoEstablecimiento.trim()) {
        errors.push("El tipo de establecimiento es obligatorio.");
      }
    
      // Validate Teléfono (assuming it should be a valid phone number)
      const telefonoPattern = /^\d{9}$/;
      if (!telefonoPattern.test(formData.telefono)) {
        errors.push("El teléfono no es válido. Debe tener 9 dígitos.");
      }
    
      // Validate IBAN (assuming a general IBAN format)
      const ibanPattern = /^[A-Za-z]{2}\d{22}$/;
      if (!ibanPattern.test(formData.iban)) {
        errors.push("El IBAN no es válido.");
      }
    
      // Validate Dirección Facturación
      if (Object.keys(formData.direccionFacturacion).length === 0) {
        // errors.push("La dirección de facturación es obligatoria.");
      }
    
      // Notas Adicionales (Optional - you can decide if this should be required or not)
      if (!formData.notasAdicionales.trim()) {
        // Optional, no error needed if not required
      }

  return errors;
};
