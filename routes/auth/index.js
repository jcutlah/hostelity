const router = require("express").Router();
const loginRoutes = require('./login');

router.use('/users', loginRoutes);

module.exports = router;