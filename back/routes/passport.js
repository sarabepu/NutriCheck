
const passport = require('passport');
const express = require('express');
const router= express.Router();
// Define routes.
router.get('/',
  function(req, res) {
    res.send( { user: req.user });
  });

router.get('/login',
  function(req, res){
    console.log("fallo");
  });
  
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.send( { user: req.user });
  });
  
router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

router.get('/getUser', (req,res) =>{
    console.log("asked for user", req.user)
    return res.json(req.user||null);
});

module.exports= router;