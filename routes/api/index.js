const router = require("express").Router();
const tripRoutes = require('./tripsAPI');
const waypointRoutes = require('./waypointsAPI');
const googleRoutes = require('./googleAPI');

router.use('/trips', tripRoutes);
router.use('/waypoints', waypointRoutes);
router.use('/google', googleRoutes);


module.exports = router;
