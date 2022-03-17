const router = require('express').Router();
const userRoutes = require('./userRoutes');
const priceRoutes = require('./priceRoutes');

router.use('/users', userRoutes);
router.use('/projects', priceRoutes);

module.exports = router;
