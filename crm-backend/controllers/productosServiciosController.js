const productosServiciosService = require('../services/productosServiciosService');

exports.getProductosMantenibles = async (req, res) => {
  try {
    const data = await productosServiciosService.getProductosMantenibles();
    res.json(data);
  } catch (err) {
    console.error('Error fetching productos y servicios:', err);
    res.status(500).send('Server Error');
  }
};

exports.getProductosServiciosNoMantenibles = async (req, res) => {
  try {
    const productosData = await productosServiciosService.getProductosNoMantenibles();
    const serviciosData = await productosServiciosService.getServiciosNoRecurrentes();
    const data = productosData.concat(serviciosData);
    res.json(data);
  } catch (err) {
    console.error('Error fetching productos y servicios:', err);
    res.status(500).send('Server Error');
  }
};