const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    //nutzt mongoose compare func und bestimmt token lebzeit
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        console.log("user" +JSON.stringify(user.toJSON()))
        const user_min = {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          password: user.password
        }
        console.log("user_min" + JSON.stringify(user_min))
        const token = jwt.sign(user_min, config.secret, {
          expiresIn: 604800 // 1 week
        });
        
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile wird abgesichert durch passport authentifizierung mit jwt wegen um festgelegte JWTstrategy zu verwenden
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

router.get('/userList', passport.authenticate('jwt', {session:false}),(req, res, next) =>{
  User.find({}, function(err, users) {
    res.send(users);  
  });
}
);

router.get('/userFavorites', passport.authenticate('jwt', {session:false}),(req, res, next) =>{
console.log('userfavorites for: '+ req.user.username)
var id = req.user._id;
 User.findById(id, function(err, user) {
        if (err) {
            console.log('cant find user id')
            res.send(err);
        } 
        user.movies = user.movies || [];
        res.send(user.movies); 
      })
})


router.post('/userupdate', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  User.update({_id:req.body._id}, { $set: { username: req.body.username, name: req.body.name, email: req.body.email }},{new: true}, function(err, user){
      if(err){
        console.log('NOT ABLE TO UPDATE USER!!' +err);
        res.send(err);
      }
      else{
        res.send(
          user)
      }
  })
});

router.post('/userdelete', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  console.log(req.body._id)
  User.findByIdAndRemove(req.body._id, function(err, user){
      if(err){
        console.log('NOT ABLE TO DELETE USER!!' +err);
        res.send(err);
      }
      else{
        res.send(
          user)
      }
  })
});

router.post('/movieadd', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  console.log(req.user._id)
  var id = req.user._id;
  var data = req.body;
    User.findById(id, function(err, user) {
        if (err) {
            console.log('cant find user id')
            res.send(err);
        }
        
        user.movies = user.movies || [];
        user.movies.push(req.body); 
        user.save(function(err,user) {
            if (err) {
                console.log('error bei save')
                res.send(err);
            }
            console.log('movie: '+req.body.title+ ' added to user: ' + user.name);
            res.json(user);
        })

    });

});

router.post('/moviedelete/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  var id = req.user._id;
    User.findById(id, function(err, user) {
        if (err) {
            console.log('cant find user id')
            res.send(err);
        }
        else{
           user.movies = user.movies || [];
           newArray = user.movies.filter(function(movie) {
            return movie.id != req.params.id; 
            });
           user.movies = newArray;
           user.save();
          console.log('user movie removed');
          res.send(user);
        }

    });



});

router.post('/movieupdate', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  console.log('heellllooo update movie')
  var id = req.user._id;
    User.findById(id, function(err, user) {
        if (err) {
            console.log('cant find user id')
            res.send(err);
        }
        else{
           user.movies = user.movies || [];
           newArray = user.movies.filter(function(movie) {
            return movie.id != req.body.id; 
          });
           newArray.push(req.body)
           user.movies = newArray;
           user.save();
          console.log('user movie geupdate: '+req.body.title);
          res.send(user);
        }

    });

});

module.exports = router;
