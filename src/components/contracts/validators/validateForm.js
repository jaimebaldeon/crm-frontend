export const validateForm = (formData) => {
    let errors = {};

    // Validate Nombre Cliente
    if (!formData.nombreCliente.trim()) {
        errors.nombreCliente = "El nombre del cliente es obligatorio.";
      }
    
      // Validate Calle
      if (!formData.calle.trim()) {
        errors.calle = "La calle es obligatoria.";
      }
    
      // Validate Número
      if (!formData.numero.trim()) {
        errors.numero = "El número es obligatorio.";
      }
    
      // Validate CIF (assuming CIF should have a certain format)
      const cifPattern = /^[A-Za-z0-9]{9}$/; // Example: Spanish CIF format
      if (!cifPattern.test(formData.cif)) {
        errors.cif = "El CIF no es válido. Debe tener 9 caracteres alfanuméricos.";
      }
    
      // Validate CP (assuming it should be 5 digits in Spain)
      const cpPattern = /^\d{5}$/;
      if (!cpPattern.test(formData.cp)) {
        errors.cp = "El código postal debe tener 5 dígitos.";
      }
    
      // Validate Ciudad
      if (!formData.ciudad.trim()) {
        errors.ciudad = "La ciudad es obligatoria.";
      }
    
      // Validate Provincia
      if (!formData.provincia.trim()) {
        errors.provincia = "La provincia es obligatoria.";
      }
    
      // Validate Actividad
      if (!formData.actividad.trim()) {
        errors.actividad = "La actividad es obligatoria.";
      }
    
      // Validate Tipo Establecimiento
      if (!formData.tipoEstablecimiento.trim()) {
        errors.tipoEstablecimiento = "El tipo de establecimiento es obligatorio.";
      }
    
      // Validate Teléfono (assuming it should be a valid phone number)
      const telefonoPattern = /^\d{9}$/;
      if (!telefonoPattern.test(formData.telefono)) {
        errors.telefono = "El teléfono no es válido. Debe tener 9 dígitos.";
      }
    
      // Validate IBAN (assuming a general IBAN format)
      const ibanPattern = /^[A-Za-z]{2}\d{22}$/;
      if (formData.iban.trim() !== '' && !ibanPattern.test(formData.iban)) {
        errors.iban = "El IBAN no es válido.";
      }
    
      // Validate Dirección Facturación
      if (Object.keys(formData.direccionFacturacion).length === 0) {
        // errors.direccionFacturacion("La dirección de facturación es obligatoria.");
      }
    
      // Notas Adicionales (Optional - you can decide if this should be required or not)
      if (!formData.notasAdicionales.trim()) {
        // Optional, no error needed if not required
      }

  return errors;
};
