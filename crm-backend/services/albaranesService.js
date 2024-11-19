// services/albaranService.js
const pool = require('../config/db');
const fs = require('fs-extra');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const { getUltimoIdAlbaran, getDate } = require('../utils/documentHelpers');


// Fetch contracts for a specific month from the database
async function getContractsByMonth(month) {
  const query = `SELECT * FROM contratos WHERE UPPER(mes) = UPPER($1)`;
  const result = await pool.query(query, [month]);
  return result.rows;
}

// Get client data for a specific contract from the database
async function getClientByContract(contract) {
    try {
        const query = `SELECT * FROM clientes WHERE id_cliente = $1`;
        const result = await pool.query(query, [contract.id_cliente]);
        // Return the single client object if found, otherwise return null
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error fetching client by contract:', error);
        throw new Error('Failed to retrieve client data');
    }
}

// Get client assets from the database
async function getClientAssets(client) {
    try {
        const query = `SELECT * FROM activos WHERE id_cliente = $1 AND estado = 'ACTIVO'`;
        const result = await pool.query(query, [client.id_cliente]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching client assets:', error);
        throw new Error('Failed to retrieve client assets');
    }
}

// Derive Maintenance Services and Products for a given client
async function deriveMaintenance(activosCliente, clientes_sin_datos = [], clientes_incorrectos = []) {
    const productosServicios = []; // List of derived products and services
    let saltarAlbaran = false; // Flag to skip albaran if there's missing data
    
    // Current year for maintenance calculations
    const currentYear = new Date().getFullYear();
  
    // Loop through each client asset
    for (const row_activo of activosCliente) {
      try {
        // Check for "EXTINTOR" assets
        if (row_activo.nombre.includes('EXTINTOR')) {
          // Validate extintor data
          if (!Number.isInteger(row_activo.fecha_fabricacion)) {
            console.log(`FALTAN DATOS EXTINTORES: ${row_activo.nombre}`);
            clientes_sin_datos.push(row_activo);
            saltarAlbaran = true;
            break;
          }
  
          // Check extintor lifecycle (caducado, retimbrado, nuevo)
          const fabricationYear = parseInt(row_activo.fecha_fabricacion, 10);
          const caducado = fabricationYear && (currentYear - fabricationYear) >= 20;
          const retimbrado = !row_activo.fecha_retimbrado || (currentYear - parseInt(row_activo.fecha_retimbrado, 10)) >= 5;
          const nuevo = fabricationYear === currentYear;
  
          if (caducado || nuevo) {
            // Add new extintor to products and services
            const desc = await fetchProductDescription(row_activo.nombre, 'PRODUCTOS');
            productosServicios.push(desc);
          } else {
            // Add maintenance service
            const maintenanceDesc = await fetchServiceDescription(row_activo.nombre, 'MANTENIMIENTO');
            productosServicios.push(maintenanceDesc);
  
            // Add retimbrado service if necessary
            if (retimbrado) {
              const retimbradoDesc = await fetchServiceDescription(row_activo.nombre, 'RETIMBRADO');
              productosServicios.push(retimbradoDesc);
            }
          }
  
        } else if (row_activo.nombre.includes('BOCAS DE INCENDIO EQUIPADAS')) {
          // Handle "BOCAS DE INCENDIO EQUIPADAS" assets
  
          const maintenanceDesc = await fetchServiceDescription(row_activo.nombre, 'MANTENIMIENTO');
          productosServicios.push(...Array(row_activo.cantidad).fill(maintenanceDesc));
  
        } else {
          // General case for other assets
          const maintenanceDesc = await fetchServiceDescription(row_activo.nombre, 'MANTENIMIENTO');
          productosServicios.push(...Array(row_activo.cantidad).fill(maintenanceDesc));
        }
  
      } catch (error) {
        console.error('ERROR PRODUCTOS CLIENTE:', error);
        clientes_incorrectos.push(row_activo);
        saltarAlbaran = true;
        break;
      }
    }

    // Count occurrences of each product/service in productos_servicios
    const productosServiciosCounter = productosServicios.reduce((counter, item) => {
        counter[item] = (counter[item] || 0) + 1;
        return counter;
    }, {});
  
    return { productosServiciosCounter, saltarAlbaran };
}
  
  // Helper function to fetch product description from a reference table
async function fetchProductDescription(productName, conceptType) {
    // Simulate fetching from REF_PRODUCTOS table
    // Replace this with actual database logic
    return `Descripción para ${productName} (${conceptType})`;
}
  
// Helper function to fetch service description from a reference table
async function fetchServiceDescription(productName, conceptType) {
    // Simulate fetching from REF_SERVICIOS table
    // Replace this with actual database logic
    return `Servicio de ${conceptType} para ${productName}`;
}
  


// Generate an albaran document and save it to a directory
async function generateAlbaranDocument(contract, client, activosCliente, productosServiciosCounter) {
    try {
      // Load the DOCX template file
      const templatePath = path.join(__dirname, '../templates/plantilla_albaran.docx');
      const templateContent = await fs.readFile(templatePath, 'binary');
  
      // Load template content into PizZip and Docxtemplater
      const zip = new PizZip(templateContent);
      const doc = new Docxtemplater(zip);
  
      // Get additional data for the template
      const albaranNumber = await getUltimoIdAlbaran() + 1;
      const [day, month, year] = getDate();

      // Set Maintenance services Data
      const sortedProductosServicios = Object.keys(productosServiciosCounter)
        .sort()  // Sort keys alphabetically
        .reduce((sortedObj, key) => {
            sortedObj[key] = productosServiciosCounter[key];
            return sortedObj;
        }, {});

      // Separate keys and values into two lists
      const productosServicios = Object.keys(sortedProductosServicios); 
      const cantidades = Object.values(sortedProductosServicios);  

      // Prepare the maintenance data for the table
      const maintenanceData = productosServicios.map((producto, index) => ({
        cant: cantidades[index] || '',
        concepto: producto,
      }));

      // Prepare combined table data
      const combinedTableData = [];

      // Filter extintores data from activosCliente
      const extintoresCliente = activosCliente.filter(activo =>
        activo.nombre.toLowerCase().includes('extintor')
      );
      
      // Prepare extintores data
      if (extintoresCliente.length > 10) {
        // Add only maintenance data
        for (const item of maintenanceData) {
            combinedTableData.push({
              cant: item.cantidad,
              concepto: item.concepto,
              num: '', // No placa for maintenance
              ano_fab: '',
              ano_rt: '',
            });
          }
      }
      else {
        // Add extintores data in albaran row-by-row
        const maxLength = Math.max(maintenanceData.length, extintoresCliente.length);
        for (let i = 0; i < maxLength; i++) {
            combinedTableData.push({
                cant: maintenanceData[i]?.cant || '',
                concepto: maintenanceData[i]?.concepto || '',
                num: extintoresCliente[i]?.n_identificador || '',
                ano_fab: extintoresCliente[i]?.fecha_fabricacion || '',
                ano_rt: extintoresCliente[i]?.fecha_retimbrado || '',
            });
        }
      }

      // Calculate empty rows to add
      const emptyRowsCount = Math.max(14 - combinedTableData.length - Math.floor((maintenanceData.length - 1) / 2), 0);
      for (let i = 0; i < emptyRowsCount; i++) {
        combinedTableData.push({
            cant: '',
            concepto: '',
            num: '',
            ano_fab: '',
            ano_rt: '',
        });
      }

      // Set template variables
      doc.setData({
        num_albaran: albaranNumber,
        date: `${day} de ${month} de ${year}`,
        client_name: client.nombre,
        client_address: client.direccion,
        client_city: client.ciudad,
        client_province: client.provincia,
        client_schedule: client.horario || '',
        client_iban: client.iban || '',
        client_cif: client.cif || '',
        client_postal_code: client.cp || '',
        client_phone: client.telefono || '',
        client_activity: client.actividad || '',
        combined_table: combinedTableData,
      });
  
      // Render the document with the data
      doc.render();
  
      // Generate the final document as a buffer
      const output = doc.getZip().generate({ type: 'nodebuffer' });
  
      // Define the output path
      const outputDirectory = path.join(__dirname, '../albaranes');
      await fs.ensureDir(outputDirectory);
      const outputPath = path.join(outputDirectory, `albaran_${albaranNumber}.docx`);
  
      // Write the generated document to file
      await fs.writeFile(outputPath, output);
  
      console.log(`Albarán generated and saved at: ${outputPath}`);
    } catch (error) {
      console.error('Error generating albaran document:', error);
      throw new Error('Failed to generate albaran document');
    }
}

module.exports = {
  getContractsByMonth,
  getClientByContract,
  getClientAssets,
  deriveMaintenance,
  generateAlbaranDocument,
};
