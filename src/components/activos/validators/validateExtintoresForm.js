import { getExtintoresCaducados } from '../../../services/extintoresService'; 
import { getConceptoByDescCorta } from '../../../services/productosServiciosService';  


export const validateForm = async (formData, contractData) => {
        /*BORRAR*/
        // const contractData =
        //   {
        //     clientId: 4760,
        //     products: [
        //       {
        //         productoServicio: "EXTINTOR POLVO 6 KG",
        //         cantidad: "1",
        //         precio: "0.01",
        //       },
        //       {
        //         productoServicio: "EXTINTOR POLVO 2 KG",
        //         cantidad: "1",
        //         precio: "0.02",
        //       },
        //     ],
        //     hasExtintores: true,
        //     tipo: "",
        //   }


        let errors = {};

        // Check if formData is empty
        if (formData.length === 0) {
            errors['General'] = 'Debe ingresar al menos un extintor';
            return errors; // Return early if no data is present
        }
      
        // Iterate over each row in the form data to validate each field
        formData.forEach((row, index) => {
          // Validate "Fecha_Fabricacion" as a date (should be in format YYYY)
          if (!row.Fecha_Fabricacion || !/^\d{4}$/.test(row.Fecha_Fabricacion)) {
            errors[`Fecha_Fabricacion_${index}`] = 'Fecha de fabricación debe estar en formato YYYY';
          }
      
          // Validate "Fecha_Retimbrado" as a date (should be in format YYYY or YYYY-MM-DD)
          if (row.Fecha_Retimbrado && !/^\d{4}(-\d{2}-\d{2})?$/.test(row.Fecha_Retimbrado)) {
            errors[`Fecha_Retimbrado_${index}`] = 'Fecha de retimbrado debe estar en formato YYYY o YYYY-MM-DD';
          }
      
          // Validate "N_Identificador" as a number
          if (row.N_Identificador && !/^\d+$/.test(row.N_Identificador)) {
            errors[`N_Identificador_${index}`] = 'El identificador debe ser un número válido';
          }
      
          // Ensure "Extintor" and "Marca_Modelo" are not empty
          if (!row.Extintor) {
            errors[`Extintor_${index}`] = 'El campo Extintor es obligatorio';
          }
          if (!row.Marca_Modelo) {
            errors[`Marca_Modelo_${index}`] = 'El campo Marca/Modelo es obligatorio';
          }
          if (!row.N_Identificador) {
            errors[`N_Identificador${index}`] = 'El campo N_Identificador es obligatorio';
          }
        });

        // Chequear que los datos introducidos corresponden con el contrato
        let contractErrors;

        if (!'id_albaran' in contractData) {
          contractErrors = validateContractWithFormData(contractData, formData)
        } else {
          contractErrors = await validateAlbaranWithFormData(contractData, formData)
        }
        
        errors = { ...errors, ...contractErrors };
        
        return errors;
      };


// Chequear que los datos introducidos corresponden con el contrato
export const validateContractWithFormData = (contractData, formData) => {
        let errors = {};
      
        // Create a map of product quantities from formData
        const formDataMap = formData.reduce((acc, item) => {
          const { Extintor } = item;
          acc[Extintor] = (acc[Extintor] || 0) + 1; // Count occurrences of each product
          return acc;
        }, {});
      
        // Check each product in contractData against the formDataMap
        contractData.products.forEach((product, index) => {
          const { productoServicio, cantidad } = product;
          const expectedQuantity = parseInt(cantidad, 10); // Quantity in contractData
          const actualQuantity = formDataMap[productoServicio] || 0; // Quantity in formData
      
          if (actualQuantity !== expectedQuantity) {
            errors[`product_${index}`] = `La cantidad de ${productoServicio} no coincide. Esperado: ${expectedQuantity}, Encontrado: ${actualQuantity}`;
          }
        });
      
        return errors;
      };

const albaran2ProductsDict = async (rawAlbaranData) => {
  // Filter the productos_servicios array to include only items containing "Nuevo extintor"
  const listaNuevos = rawAlbaranData.productos_servicios.filter((c) => c.includes("Nuevo extintor"));

  // Convert descripcion_corta into concepto
  const listaNuevosConceptos = await getConceptoByDescCorta(listaNuevos)

  // Map the filtered items to their corresponding quantities
  const listaNuevosCantidades = listaNuevos.map(
    (concepto) => rawAlbaranData.cantidades[rawAlbaranData.productos_servicios.indexOf(concepto)]
  );

  // Filter productos_servicios to include only items containing "Nuevo extintor"
  const products = listaNuevosConceptos
    .map((productoServicio, index) => ({
      productoServicio: productoServicio.concepto,
      cantidad: listaNuevosCantidades[index],
    }));

  return { products };
};

      
      
// Chequear que los datos introducidos corresponden con el albaran
export const validateAlbaranWithFormData = async (rawAlbaranData, formData) => {
  let errors = {};

  // Create a map of product quantities from formData
  const formDataMap = formData.reduce((acc, item) => {
    const { Extintor } = item;
    acc[Extintor] = (acc[Extintor] || 0) + 1; // Count occurrences of each product
    return acc;
  }, {});

  // Crear el diccionario de Conceptos y Cantidades
  const albaranData = await albaran2ProductsDict(rawAlbaranData);

  // Check each product in albaranData against the formDataMap
  albaranData.products.forEach((product, index) => {
    const { productoServicio, cantidad } = product;
    const expectedQuantity = parseInt(cantidad, 10); // Quantity in albaranData
    const actualQuantity = formDataMap[productoServicio] || 0; // Quantity in formData

    if (actualQuantity !== expectedQuantity) {
      errors[`product_${index}`] = `La cantidad de ${productoServicio} no coincide. Esperado: ${expectedQuantity}, Encontrado: ${actualQuantity}`;
    }
  });

  return errors;
};