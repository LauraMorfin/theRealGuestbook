var express = require('express');
var router = express.Router();

/* GET landing page. */
router.get('/', function(req, res, next) {
  res.render('landing', { title: 'Landing Page' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET guestbook page. */
router.get('/guestbook', function(req, res, next) {
  res.render('guestbook', { title: 'Guestbook' });
});

/* GET single view page. */
router.get('/singleView', function(req, res, next) {
  res.render('guestbook', { title: 'singleView' });
});


module.exports = router;
