var express = require('express');
var router = express.Router();
const Mail= require('../models/mailModel')
 const passport = require('passport');

 const User = require("../models/userModel");

 passport.use(User.createStrategy());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// -----------------------------------------------

router.get('/signup', function(req, res, next) {
  res.render('signup');
});
router.post('/signup', function(req, res, next) {
  const {name, username,email,password} =req.body;
  User.register({name,username,email},password)
  .then(() =>{
     res.redirect("/signin")
  }).catch((err)=> res.send(err));
});

// ----------------------------------------
router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.get('/sig', function (req, res, next) {
  res.send('signin faliure');
});

 router.post('/signin',
 passport.authenticate("local",{
  successRedirect: "/signin",
   failureRedirect: "/main",
 }),
 function(req, res, next) {});

// -------------------------------------------

router.get('/main', isLoggedIn, function(req, res, next) {
   res.render('main');
});

// --------------------------------------
router.get('/signout', isLoggedIn, function(req, res, next) {
  res.render('signout');
});
// --------------------------------------------------------

router.get('/setting', isLoggedIn, function(req, res, next) {
  res.render('setting');
});
// ---------------------------------------------------------
router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile');
});

// ---------------------------------------------
router.get('/starred', isLoggedIn, function(req, res, next) {
  res.render('starred');
});

// ===---------------------------------------
router.get('/inbox', isLoggedIn, function(req, res, next) {
  res.render('inbox');
});
// -----------------------------------------------
router.get('/compose', isLoggedIn, function(req, res, next) {
  res.render('compose');
});
// --------------------------------------------------

router.get('/email', function(req, res, next) {
 
  res.render('email')
});

router.post('/email', isLoggedIn, function(req, res, next) {
  let mail = new Mail()
  // const {name,email,subject} =req.body;
  mail.name=req.body.name
  mail.email=req.body.email
  mail.subject=req.body.subject
  mail.save()
  res.json(req.body);
});


// -----------------------------------------------
router.get('/snooze', isLoggedIn, function(req, res, next) {
  res.render('snooze');
});
// ------------------------------------------------------

router.get('/sent', isLoggedIn, function(req, res, next) {
  res.render('sent');
});
// ----------------------------------------------
router.get('/send',isLoggedIn, function(req, res, next) {
  res.render('send');
});
// -------------------------------------
function isLoggedIn(req,res,next){
  if (req.isAuthenticated) return next();
  req.redirect("/signin");
}



// --------------------

module.exports = router;
