const express = require('express');
const dashboardRoutes = require('./dashboard');
const tipoEstablecimientoRoutes = require('./tipoEstablecimiento');
const clientesRoutes = require('./clientes');
const productosServiciosRoutes = require('./productosServicios');
const contratosRoutes = require('./contratos');
const tipoExtintorRoutes = require('./tipoExtintor');
const marcaExtintorRoutes = require('./marcaExtintor');

const router = express.Router();

router.use('/dashboard', dashboardRoutes);
router.use('/tipoEstablecimiento', tipoEstablecimientoRoutes);
router.use('/clientes', clientesRoutes);
router.use('/productosServicios', productosServiciosRoutes);
router.use('/contratos', contratosRoutes);
router.use('/tipoExtintor-options', tipoExtintorRoutes);
router.use('/marca-options', marcaExtintorRoutes);

module.exports = router;
