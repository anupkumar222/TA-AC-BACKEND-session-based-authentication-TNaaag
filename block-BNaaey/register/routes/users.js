var express = require('express');
var Users = require('../models/Users');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("login");
});

router.get("/register", (req, res, next) => {
  res.render('register')
})

router.post('/register', (req, res, next) => {
  Users.create(req.body, (err, user) => {
    console.log(err, user);
    res.redirect('/users');
  })
})

router.post('/login', (req, res, next) => {
  var { email, password} = req.body;
  if(!email || !password)
  return res.redirect('/users');
  Users.findOne({ email }, (err, user) => {
    if(err) return next(err);
    if(!user) {
      res.redirect('/users');
    }
    user.verifyPassword(password, (err, result) => {
      if(err) return next(err);
      if(!result) {
       return res.redirect('/users')
      }
      req.session.userId = user.id;
      res.redirect('/dashboard')
    })
  })
})


module.exports = router;
