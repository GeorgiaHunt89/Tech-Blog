const router = require('express').Router();
const sequelize = require('./../config/connection');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('./dashboard', dashboardRoutes)

module.exports = router;
