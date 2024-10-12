// routes/dashboard.js
const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Route to fetch dashboard data (client count, upcoming maintenance)
router.get('/', async (req, res) => {
  try {
    // Query example: fetching number of active clients and upcoming maintenance
    const clientCount = await pool.query('SELECT COUNT(*) FROM clientes');
    const upcomingMaintenance = await pool.query(`
      SELECT * FROM contratos
      WHERE mes = 'OCTUBRE'
      LIMIT 5
    `);
    
    res.json({
      clientCount: clientCount.rows[0].count,
      upcomingMaintenance: upcomingMaintenance.rows
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
