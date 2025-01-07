const express = require('express');
const dashboardRoutes = require('./dashboard');
const tipoEstablecimientoRoutes = require('./tipoEstablecimiento');
const clientesRoutes = require('./clientes');
const productosManteniblesRoutes = require('./productosMantenibles');
const contratosRoutes = require('./contratos');
const tipoExtintorRoutes = require('./tipoExtintor');
const marcaExtintorRoutes = require('./marcaExtintor');
const extintoresRoutes = require('./extintores');
const generateAlbaranesRoutes = require('./generateAlbaranes');
const getAlbaranesRoutes = require('./getAlbaranes');
const updateAlbaranRoutes = require('./updateAlbaran');
const searchClientesRoutes = require('./searchClientes')
const productosServiciosNoManteniblesRoutes = require('./productosServiciosNoMantenibles');
const productosRoutes = require('./productos');

const router = express.Router();

router.use('/dashboard', dashboardRoutes);
router.use('/tipoEstablecimiento', tipoEstablecimientoRoutes);
router.use('/clientes', clientesRoutes);
router.use('/productos-mantenibles', productosManteniblesRoutes);
router.use('/contratos', contratosRoutes);
router.use('/tipoExtintor-options', tipoExtintorRoutes);
router.use('/marca-options', marcaExtintorRoutes);
router.use('/datos-extintores', extintoresRoutes);
router.use('/generate-albaranes', generateAlbaranesRoutes);
router.use('/get-albaranes', getAlbaranesRoutes);
router.use('/update-albaran', updateAlbaranRoutes);
router.use('/search-clientes', searchClientesRoutes);
router.use('/productos-servicios-no-mantenibles', productosServiciosNoManteniblesRoutes);
router.use('/productos', productosRoutes);


module.exports = router;
