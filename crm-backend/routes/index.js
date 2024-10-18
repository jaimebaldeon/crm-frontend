const express = require('express');
const dashboardRoutes = require('./dashboard');
const tipoEstablecimientoRoutes = require('./tipoEstablecimiento');
const contratosRoutes = require('./clientes');

const router = express.Router();

router.use('/dashboard', dashboardRoutes);
router.use('/tipoEstablecimiento', tipoEstablecimientoRoutes);
router.use('/clientes', contratosRoutes);

module.exports = router;
