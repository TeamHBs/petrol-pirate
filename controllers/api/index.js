const router = require('express').Router();
const userRoutes = require('./userRoutes');
const priceRoutes = require('./priceRoutes');
const stationRoutes = require('./stationRoutes');

router.use('/users', userRoutes);
router.use('/prices', priceRoutes);
router.use('/stations', stationRoutes);

module.exports = router;
