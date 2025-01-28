export const validateForm = (contractData) => {
    let errors = {};

    // Validate Precio
    // if (!contractData.products[i].precio.trim()) {
    //     errors.nombreCliente = "El nombre del cliente es obligatorio.";
    // }

    // Check if formData is empty
    if (contractData.productos_servicios.length === 0) {
        errors['General'] = 'Debe ingresar al menos un producto/servicio';
        return errors; // Return early if no data is present
    }

    return errors;

}