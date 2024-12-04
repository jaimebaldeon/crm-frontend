const { getAlbaranesByClientId } = require('../services/albaranesService');

exports.getAlbaranes = async (req, res) => {
  try {
    const data = await getAlbaranesByClientId(req.query.clientId);
    res.json(data);
  } catch (err) {
    console.error('Error fetching albaranes:', err);
    res.status(500).send('Server Error');
  }
};