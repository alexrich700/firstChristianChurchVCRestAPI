var Users = require('../models/users.js');
var MD5 = require("md5");
var JWT = require("jsonwebtoken");
var ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.issuer = 'accounts.https://rest-api-alexrich700.c9users.io/';
opts.audience = 'https://rest-api-alexrich700.c9users.io/';
opts.secretOrKey = 'secret';

exports.signin = async function(req, res, next) {
  // finding a user
  try {
    let user = await Users.findOne({
      email: req.body.email
    });
    let { first_name, last_name, email, level } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = JWT.sign(
        {
          first_name, 
          last_name, 
          email, 
          level
        },
        opts.secretOrKey
      );
      return res.status(200).json({
        first_name, 
        last_name, 
        email, 
        level,
        token
      });
    } else {
      return next({
        status:403,
        message: "j"
      });
    }
  } catch (e) {
    return next({ 
        status: 403, message: e 
    });
  }
};

exports.signup = async function (req, res, next) {
    try {
        let user = await Users.create(req.body);
        let{ first_name, last_name, email, level, password } = user;
        let token = JWT.sign(
          {
            first_name, 
            last_name, 
            email, 
            level,
            password
          },
          opts.secretOrKey
        );
        return res.status(200).json({
            first_name, 
            last_name, 
            email, 
            level,
            password,
            token
        });
        } catch (err) {
        if (err.code === 11000) {
            err;
        }
        return next({
            status: 400,
            err
        });
    }
};