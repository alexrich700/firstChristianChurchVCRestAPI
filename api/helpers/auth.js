const Users = require('../models/users.js');
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signin = async function(req, res, next) {
  // finding a user
  try {
    let user = await Users.findOne({
      email: req.body.email
    });
    let { name, email } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = JWT.sign(
        {
          name,
          email, 
          expiresIn: 604800
        },
        process.env.SECRET_KEY
      );
      return res.status(200).cookie('accesstoken', token, {expire : new Date() + 86400}).redirect('/');
    } else {
      return next({
        status:403,
        message: "j"
      });
    }
  } catch (e) {
    console.log(err)
    return next({ 
        status: 500, message: e 
    });
  }
};

exports.signup = async function (req, res, next) {
  console.log(req.body)
    try {
        let user = await Users.create(req.body);
        let{ name, email, password } = user;
        let token = JWT.sign(
          {
            name,
            email, 
            password,
            expiresIn: 604800
          },
          process.env.SECRET_KEY
        );
        return res.status(200).cookie('accesstoken', token, {expire : new Date() + 86400}).redirect('/');
    } catch (err) {
      console.log(err)
      if (err.code === 11000) {
          err;
      }
      return next({
          status: 400,
          err
      });
    }
};

exports.logout = async function (req, res, next) {
  try {
    res.cookie('accesstoken', {expires: Date.now()});
  } catch (err) {
    if (err.code === 11000) {
      err;
    }
    return next({
      status: 400,
      err
    });
  }
  res.redirect('/');
};

exports.passwordReset = async function (req, res, next) {
  try {
    let user = await Users.findOne({
      email: req.body.email
    });
    
    let token = JWT.encode(user, process.env.SECRET_KEY);
    
  } catch (err) {
    err;
  }
};