const pool = require('../config/db');

exports.saveExtintores = async (extintoresData) => {
  const query = `
    INSERT INTO activos 
      (id_cliente, nombre, cantidad, marca_modelo, tipo, n_identificador, fecha_fabricacion, fecha_retimbrado, estado, ubicacion, notas)
    VALUES 
      ($1, $2, 1, $3, 'EXTINTOR', $4, $5, $6, 'ACTIVO', $7, $8)
    RETURNING id_activo;
  `;

  // Array to store the inserted IDs
  const insertedIds = [];

  try {
    // Begin a transaction to ensure atomicity in case of errors
    await pool.query('BEGIN');

    // Insert each item in extintoresData as a separate row
    for (const item of extintoresData) {
      const {
        Id_Cliente,
        Extintor,
        Marca_Modelo,
        N_Identificador,
        Fecha_Fabricacion,
        Fecha_Retimbrado,
        Ubicacion,
        Notas
      } = item;

      const values = [
        Id_Cliente,
        Extintor,
        Marca_Modelo,
        N_Identificador,
        Fecha_Fabricacion || null,
        Fecha_Retimbrado || null,
        Ubicacion || null,
        Notas || null
      ];

      // Execute the insert query for each item
      const result = await pool.query(query, values);
      insertedIds.push(result.rows[0].id_activo); // Store the ID of the inserted row
    }

    // Commit the transaction if all inserts succeed
    await pool.query('COMMIT');
    return insertedIds; // Return the IDs of all inserted rows
  } catch (error) {
    console.error('Error inserting extintores data:', error);
    await pool.query('ROLLBACK'); // Rollback transaction on error
    throw new Error('Failed to insert extintores data');
  }
};