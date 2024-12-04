const express = require('express');
const dashboardRoutes = require('./dashboard');
const tipoEstablecimientoRoutes = require('./tipoEstablecimiento');
const clientesRoutes = require('./clientes');
const productosServiciosRoutes = require('./productosServicios');
const contratosRoutes = require('./contratos');
const tipoExtintorRoutes = require('./tipoExtintor');
const marcaExtintorRoutes = require('./marcaExtintor');
const extintoresRoutes = require('./extintores');
const generateAlbaranesRoutes = require('./generateAlbaranes');
const getAlbaranesRoutes = require('./getAlbaranes');
const searchClientesRoutes = require('./searchClientes')


const router = express.Router();

router.use('/dashboard', dashboardRoutes);
router.use('/tipoEstablecimiento', tipoEstablecimientoRoutes);
router.use('/clientes', clientesRoutes);
router.use('/productosServicios', productosServiciosRoutes);
router.use('/contratos', contratosRoutes);
router.use('/tipoExtintor-options', tipoExtintorRoutes);
router.use('/marca-options', marcaExtintorRoutes);
router.use('/datos-extintores', extintoresRoutes);
router.use('/generate-albaranes', generateAlbaranesRoutes);
router.use('/get-albaranes', getAlbaranesRoutes);
router.use('/search-clientes', searchClientesRoutes);


module.exports = router;
