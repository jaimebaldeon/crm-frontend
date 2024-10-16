const contratosService = require('../services/contratosService');

exports.submitContractForm = async (req, res) => {
    try {
      const contractData = req.body; // Retrieve the form data from request body
      const result = await contratosService.saveContract(contractData); // Pass the data to the service
      res.status(201).json({ message: 'Contract form submitted successfully', contractId: result.id_cliente });
    } catch (error) {
      console.error('Error submitting contract form:', error);
      res.status(500).json({ message: 'Failed to submit contract form' });
    }
  };