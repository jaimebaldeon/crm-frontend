const pool = require('../config/db');

exports.saveContract = async (contractData) => {
  const {
    nombreCliente,
    calle,
    numero,
    cif,
    cp,
    ciudad,
    provincia,
    actividad,
    tipoEstablecimiento,
    telefono,
    iban,
    horario,
    direccionFacturacion,
    notasAdicionales,
  } = contractData;

  const query = `
  INSERT INTO clientes (Nombre, CIF, Direccion, CP, Ciudad, Provincia, Actividad, Horario, IBAN, Telefono, Direccion_Facturacion, Categoria_Establecimiento)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id_cliente;
  `;
  const idCliente = -1

  const values = [
    nombreCliente,
    cif,
    calle + ' ' + numero,
    cp,
    ciudad,
    provincia,
    actividad,
    horario,
    iban,
    telefono,
    direccionFacturacion,
    tipoEstablecimiento,
    // notasAdicionales
  ];
  
  const result = await pool.query(query, values);
  return result.rows[0]; // Return the inserted contract ID
  };