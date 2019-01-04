var Users = require('../models/users.js');
var jwt = require("jsonwebtoken");

exports.getUsers = async function (req, res, next) {
    try {
        let users = await Users.find();
        return res.status(200).json(users);
    } catch (err) {
        return next(err);
    }
};

exports.getCurrentUser = async function (req, res, next) {
    try {
        let decoded = jwt.decode(req.cookies.accesstoken, process.env.SECRET_KEY);
        res.json(decoded);
    } catch (err) {
        return next(err);
    }
};

exports.getUser = async function(req, res, next) {
    try {
        let foundUser = await Users.find({_id: req.params.id});
        return res.status(200).json(foundUser);
    } catch (err) {
        return next(err);
    }
};

exports.updateUser = async function (req, res, next) {
    try {
        let foundUser = await Users.find({_id: req.params.id});
        await foundUser.update(req.body);
        return res.status(200).json(foundUser);
    } catch (err) {
        return next(err);
    }
};

exports.deleteUser = async function (req, res, next) {
    try {
        let foundUser = await Users.find({_id: req.params.id});
        await foundUser.remove();
        return res.status(200).json(foundUser);
      } catch (err) {
        return next(err);
      }
};