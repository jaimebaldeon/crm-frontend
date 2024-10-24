const contratosService = require('../services/contratosService');

exports.submitContractForm = async (req, res) => {
    try {
      const contratoData = req.body; // Retrieve the form data from request body
      const result = await contratosService.saveContrato(contratoData); // Pass the data to the service
      res.status(201).json({ message: 'Contract form submitted successfully', contratoId: result.id_contrato });
    } catch (error) {
      if (error.message === 'Contrato ya existe en la base de datos') {
        res.status(400).json({ message: 'Contrato ya existe en la base de datos' });
      } else {
        console.error('Error submitting contrato form:', error);
        res.status(500).json({ message: 'Fallo al enviar formulario del contrato' });
      }
    }
  };