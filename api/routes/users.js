var express = require("express");
var mongoose = require("mongoose");
var Router = express.Router();
var JWT = require("jsonwebtoken");
const { signup, signin, logout, passwordReset, sendPasswordResetLink } = require("../helpers/auth");
const { loginRequired } = require("../middleware/auth");
const { getUsers, getUser, updateUser, getCurrentUser } = require("../helpers/users");
mongoose.Promise = global.Promise;

Router.get("/getcurrentuser", getCurrentUser);

Router.post("/signup", signup);

Router.post("/login", signin);

Router.get("/logout", logout);

Router.post("/send/resetlink", sendPasswordResetLink)

Router.post("/passwordreset", passwordReset);

Router.put("/", loginRequired, updateUser);

Router.delete('/:id' , (req, res)=>{
});

module.exports = Router;