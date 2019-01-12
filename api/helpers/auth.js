const config = require('../config')

const JWT = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(config.SENDGRID_API);

const Users = require('../models/users.js');
const { updatePassword } = require('./users')


exports.signin = async function(req, res, next) {
  // finding a user
  try {
    let user = await Users.findOne({
      email: req.body.email
    });
    if (user === null || user === undefined) {
      return res.status(403).redirect('/login')
      
    }
    let { name, email } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = JWT.sign(
        {
          name,
          email, 
          expiresIn: 604800
        },
        config.SECRET_KEY
      );
      return res.status(200).cookie('accesstoken', token, {expire : new Date() + 86400}).redirect('/');
    } else {
      return res.status(401).send("Unable to login. Please try again.");
    }
  } catch (e) {
    console.log(e)
    return res.status(500).send("Unable to login. Please try again.");
  }
};

exports.signup = async function (req, res, next) {
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
          config.SECRET_KEY
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


exports.sendPasswordResetLink = async function (req, res) {
    
  try {
    let token = JWT.sign(
      {
        email: req.body.email,
        expiresIn: 6048
      },
      config.RESET_KEY
    );

    const msg = {
      to: req.body.email,
      from: 'scottjr632@gmail.com',
      subject: 'Reset password link',
      text: 'Follow link to reset password',
      html: `<a href="https://${req.headers.host}/passwordreset?token=${token}">Reset link</a>`,
    };

    sgMail.send(msg);
    return res.status(200).send(`Email sent to ${req.body.email}`)
  } catch (error) {
    return res.status(500).send(err)
  }
}

exports.passwordReset = async function (req, res, next) {
  const token = req.query.token;
  let email = ""
  try {
    data  = JWT.decode(token, config.RESET_KEY)  
    email = data.email
  } catch (error) {
    return res.status(500).send(error, "Invalid token.")
  }

  if (email && token && email === req.body.email) { 
    return updatePassword(req, res, next)
  } else {
    return res.status(401).send("Unable to change password. Email is invalid.")
  }
};