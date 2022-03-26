// assign vars to route locations
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const priceRoutes = require('./priceRoutes');
const stationRoutes = require('./stationRoutes');

// direction to routes
router.use('/users', userRoutes);
router.use('/prices', priceRoutes);
router.use('/stations', stationRoutes);

module.exports = router;
