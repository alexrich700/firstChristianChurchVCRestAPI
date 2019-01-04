const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const deepPopulate = require("mongoose-deep-populate")(Mongoose);

const Users = Mongoose.Schema({
    name:{type:String, required: true},
    email:{type:String, unique: true, required:true},
    password:{type:String, required:true}
});

Users.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

Users.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

Users.plugin(deepPopulate);

module.exports = Mongoose.model("Users", Users);