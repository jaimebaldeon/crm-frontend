const productosServiciosService = require('../services/productosServiciosService');

exports.getProductosServicios = async (req, res) => {
  try {
    const data = await productosServiciosService.getProductosServicios();
    res.json(data);
  } catch (err) {
    console.error('Error fetching productos y servicios:', err);
    res.status(500).send('Server Error');
  }
};
