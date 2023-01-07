var express = require('express');
const Users = require('../models/Users');
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


module.exports = router;
