var express = require('express');
var ObjectID = require('mongodb').ObjectID;
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
router.get('/guestbook', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function(e,docs){
    res.render('guestbook', {
      "userlist" : docs
    });
  });
});

// post to the database
router.post('/postMessage', function(req, res){
  var db = req.db;
  var email = req.body.useremail;
  var name = req.body.username;
  var message = req.body.usermessage;
  var collection = db.get('usercollection');

    collection.insert({
      "email" : email,
      "name" : name,
      "message" : message
    }, function (err,doc) {
      if (err) {
        res.send("There was a problem!  What did you do?!");
      } else {
        res.redirect("/guestbook");
      }
    });
  });




/* GET single view page. */
router.get('/singleView', function(req, res, next) {
  res.render('singleView', { title: 'singleView' });
});

/* GET new user page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

module.exports = router;
