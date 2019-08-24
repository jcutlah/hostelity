const router = require("express").Router();
const loginRoutes = require('./login');
const tripRoutes = require('./trips');
const mapRoutes = require('./maps');

router.use('/users', loginRoutes);
router.use('/trips', tripRoutes);
router.use('/maps', mapRoutes);

module.exports = router;
