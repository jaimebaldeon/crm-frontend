const express = require('express');
const extintoresController = require('../controllers/extintoresController');
const pool = require('../config/db.js');
const router = express.Router();

// Route to fetch tipo extintor data
router.post('/', extintoresController.submitExtintoresForm);

module.exports = router;
