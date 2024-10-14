// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api', routes);
// const dashboardRoutes = require('./routes/dashboard');
// app.use('/api/dashboard', dashboardRoutes);
// const tipoEstablecimientoRoutes = require('./routes/tipoEstablecimiento');
// app.use('/api/tipoEstablecimiento', tipoEstablecimientoRoutes);

// Error handling middleware
app.use(require('./utils/errorHandler'));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
