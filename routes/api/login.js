const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/hostels"
router.route("/users")
  .get(function(req, res){
      console.log(req);
      console.log(res);
  })
//   .post(userController.addUser);

router.route('/signup')
  .get(function(req, res){
      console.log(req.data);
    })
  .post(function(req, res){
      console.log(`request received`);
      console.log(req.body);
      userController.addUser(req.body,function(user){
          res.json(user);
      })
  })


module.exports = router;