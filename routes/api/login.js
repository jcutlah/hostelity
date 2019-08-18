const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/hostels"
router.route("/api/users")
  .get(function(req, res){
      console.log(req);
      console.log(res);
  })
  .post(userController.addUser);



module.exports = router;