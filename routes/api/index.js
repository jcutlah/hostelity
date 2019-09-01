const router = require("express").Router();
const tripRoutes = require('./tripsAPI');
const waypointRoutes = require('./waypointsAPI');

router.use('/trips', tripRoutes);
router.use('/waypoints', waypointRoutes);

module.exports = router;
