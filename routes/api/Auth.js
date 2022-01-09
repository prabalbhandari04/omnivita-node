const router = require("express").Router();
const passport = require('passport');


module.exports = function(passport, User){
  router.get('/', (req, res, next) => {
      res.json('req.user is: ' + req.user);
    });
    
    router.post(
      '/login',
      passport.authenticate('local'),
      (req, res) => {
        console.log(req.user)
        res.json({message: "The user is logged in", userId: req.user._id})
      } 
    );
    
    router.post('/logout', (req, res) => {
      req.logout();
      res.json("signed out");
    });
    

    router.post('/signup', (req, res) => {
      var user = new User({
        email: req.body.email,
        password: req.body.password
      });
      console.log("user is " + user);
      user
        .save()
        .then(data => {
          
          res.json("everything is good in signup");
        })
        .catch(err => res.json(err));
      // res.redirect('/');


    });

  return router;
}