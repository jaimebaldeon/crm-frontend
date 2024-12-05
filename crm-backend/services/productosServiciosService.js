const pool = require('../config/db');

exports.getProductosMantenibles = async () => {
  const result = await pool.query(`
    SELECT concepto FROM ref_productos
    WHERE mantenible IS NOT NULL
    ORDER BY concepto ASC`);
  return result.rows;
};

exports.getProductosNoMantenibles = async () => {
  const result = await pool.query(`
    SELECT concepto FROM ref_productos
    WHERE mantenible IS NULL
    ORDER BY concepto ASC`);
  return result.rows;
};

exports.getServiciosNoRecurrentes = async () => {
  const result = await pool.query(`
    SELECT concepto FROM ref_servicios
    WHERE recurrente = 'NO'
    ORDER BY concepto ASC`);
  return result.rows;
};