const router = require("express").Router();
const loginRoutes = require('./login');
const tripRoutes = require('./trips');
const mapRoutes = require('./maps');
const waypointRoutes = require('./waypoints');

router.use('/users', loginRoutes);
router.use('/trips', tripRoutes);
router.use('/maps', mapRoutes);
router.use('/waypoints', waypointRoutes);

module.exports = router;
