const router = require("express").Router();
const loginRoutes = require('./loginAPI');

router.use('/users', loginRoutes);

module.exports = router;