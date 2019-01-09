const config = require('../config')

var jwt = require("jsonwebtoken");
var Users = require('../models/users.js');

exports.loginRequired = function(req, res, next) {
  try {
    let token = req.cookies.accesstoken;
    jwt.verify(token, config.SECRET_KEY, function(err, decoded) {
      if (decoded) {
        next();
      } else {
        res.redirect('/login');
        return next();
      }
    });
  } catch (e) {
    console.log(e)
    res.redirect('/login')
    return next();
  }
};

// exports.ensureCorrectUser = function(req, res, next) {
//   try {
//     let token = '';
//     const authcookie = req.cookies.accesstoken;
//     if (authcookie === undefined) {
//       token = req.headers.authorization.split(" ")[1];
//     } else {
//       token = authcookie;
//     }
//     jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
//       if (decoded && decoded.id === req.params.id) {
//         return next();
//       } else {
//         return next({ status: 401, message: "Unauthorized" });
//       }
//     });
//   } catch (e) {
//     return next({ status: 401, message: "Unauthorized" });
//   }
// };
