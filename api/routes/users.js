var express = require("express");
var mongoose = require("mongoose");
var Router = express.Router();
var JWT = require("jsonwebtoken");
const { signup, signin } = require("../helpers/auth");
const { loginRequired, ensureCorrectUser } = require("../middleware/auth");
const { getUsers, getUser, updateUser } = require("../helpers/users");

mongoose.connect('mongodb://localhost/text-api', (error)=>{
    if(error) console.log(error);
});

Router.post("/signup", signup);

Router.post("/login", signin);

Router.put("/", loginRequired, updateUser);

Router.delete('/:id' , (req, res)=>{
});

module.exports = Router;