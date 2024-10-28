const express = require('express');
const marcaExtintorController = require('../controllers/marcaExtintorController');
const pool = require('../config/db.js');
const router = express.Router();

// Route to fetch tipo extintor data
router.get('/', marcaExtintorController.getMarcaExtintor);

module.exports = router;
