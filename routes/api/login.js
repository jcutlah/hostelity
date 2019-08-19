const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require('../../passport');;

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
      userController.addUser(req.body,function(err, response){
          if (err){
              console.log(err);
              res.json(err);
          } else {
              console.log(response);
              res.json(response);
          }
      })
  })
router.route('/login')
  .post(passport.authenticate('local'), function(req, res) {
      res.json(req.user.email);
    });


module.exports = router;