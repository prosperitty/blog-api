var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.get('/', userController.users_login_get);

//redirect to client side route
//check the login route on client side to see why it reroutes to server side route and try scope option

// app.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });

// app.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { 
//       console.log(err);
//       return next(err);
//      }
//     if (!user) {
//       console.log(info.message);
//       // Display an error message to the user
//       req.flash('error', info.message);
//       return res.redirect("https://alex-lvl.github.io/blog-react/login");
//     }
//     req.logIn(user, function(err) {
//       if (err) { 
//         console.log(err, 'login user error')
//         return next(err);
//        }
//       return res.redirect("https://alex-lvl.github.io/blog-react");
//     });
//   })(req, res, next);
// });

router.post(
  '/',
  function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) { 
          console.log(err);
          return next(err);
         }
        if (!user) {
          console.log(info.message);
          // Display an error message to the user
          req.flash('error', info.message);
          return res.redirect("https://alex-lvl.github.io/blog-react/login");
        }
        req.logIn(user, function(err) {
          if (err) { 
            console.log(err, 'login user error')
            return next(err);
           }
           console.log('successful login')
           console.log(user);
          return res.redirect("https://alex-lvl.github.io/blog-react");
        });
      })(req, res, next);
    }
);

module.exports = router;
