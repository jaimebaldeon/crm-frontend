const extintoresService = require('../services/extintoresService');

exports.submitExtintoresForm = async (req, res) => {
    try {
      const extintoresData = req.body; // Retrieve the form data from request body
      const result = await extintoresService.saveExtintores(extintoresData); // Pass the data to the service
      res.status(201).json({ message: 'Contract form submitted successfully', extintoresId: result.id_extintores });
    } catch (error) {
      if (error.message === 'Extintores ya existe en la base de datos') {
        res.status(400).json({ message: 'Extintores ya existe en la base de datos' });
      } else {
        console.error('Error submitting extintores form:', error);
        res.status(500).json({ message: 'Fallo al enviar formulario del extintores' });
      }
    }
  };