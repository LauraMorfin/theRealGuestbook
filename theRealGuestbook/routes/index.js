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

  //delete message
  router.get('/:id', function(req, res){
      var db = req.db;
      var objId = req.params.id;
      var collection = db.get('usercollection');
      collection.remove({"_id": objId}, function(err, docs) {
          if (err) return err;
          console.log(docs);
          res.send(docs);
      });
      res.redirect('/guestbook');
  });

  //to singleview message page
  router.get('/singleView/:id', function(req, res){
      var db = req.db;
      var id = req.params.id;


      var objectId = new ObjectID(id);
      var collection = db.get('usercollection');
      collection.find({_id: objectId}, {}, function(err, result){
        if(err){
          res.send("YOU BROKE SOMETHING");
        } else {
          res.render('singleView',{
            "message" : result[0]
          });
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
