const pool = require('../config/db');

exports.getProductosServicios = async () => {
  const result = await pool.query(`
    SELECT concepto FROM public.ref_productos
    WHERE mantenible IS NOT NULL
    ORDER BY concepto ASC`);
  return result.rows;
};
