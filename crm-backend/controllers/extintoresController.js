const extintoresService = require('../services/extintoresService');

exports.submitExtintoresForm = async (req, res) => {
    try {
      const extintoresData = req.body.extintoresData; // Retrieve the form data from request body
      const contratoId = req.body.contratoId; // Retrieve the form data from request body
      const result = await extintoresService.saveExtintores(extintoresData, contratoId); // Pass the data to the service
      res.status(201).json({ message: 'Contract form submitted successfully', extintoresId: result });
    } catch (error) {
      if (error.message === 'Extintores ya existe en la base de datos') {
        res.status(400).json({ message: 'Extintores ya existe en la base de datos' });
      } else {
        console.error('Error submitting extintores form:', error);
        res.status(500).json({ message: 'Fallo al enviar formulario del extintores' });
      }
    }
};

exports.getExtintoresCaducados = async (req, res) => {
    try {
      const extintoresData = req.query; // Retrieve the form data from request query
      const data = await extintoresService.getExtintoresCaducados(extintoresData); // Pass the data to the service
      res.status(201).json(data);
    } catch (error) {
      if (error.message === 'Extintores ya existe en la base de datos') {
        res.status(400).json({ message: 'Extintores ya existe en la base de datos' });
      } else {
        console.error('Error submitting extintores form:', error);
        res.status(500).json({ message: 'Fallo al enviar formulario del extintores' });
      }
    }
};

exports.updateExtintoresCaducados = async (req, res) => {
  try {
    const extintoresData = req.body; // Retrieve the form data from request body
    const data = await extintoresService.updateExtintoresCaducados(extintoresData); // Pass the data to the service
    res.status(201).json({ message: 'Contract form submitted successfully', extintoresCaducados: data });
  } catch (error) {
    if (error.message === 'Extintores ya existe en la base de datos') {
      res.status(400).json({ message: 'Extintores ya existe en la base de datos' });
    } else {
      console.error('Error submitting extintores form:', error);
      res.status(500).json({ message: 'Fallo al enviar formulario del extintores' });
    }
  }
};