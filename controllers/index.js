const router = require('express').Router();

// assign vars to route locations
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// direction to routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
