const router = require("express").Router();
const tripRoutes = require('./trips');
const mapRoutes = require('./maps');
const waypointRoutes = require('./waypoints');

router.use('/trips', tripRoutes);
router.use('/maps', mapRoutes);
router.use('/waypoints', waypointRoutes);

module.exports = router;
