const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
// const auth = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
// const accountModel = require("./accounts.model");
const userSchema = require("./users.model/userSchema");

// providers=> user Credentials, service type, address,
const providerSchema = mongoose.Schema({
  user: userSchema,
  serviceType: {

  },
  address: {

  },
  reviews: {
      
  }
});

// Generate Auth Token for a specific user
// methods are for instances of the model
providerSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismysecret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Return only public profile of user as response
providerSchema.methods.toJSON = function () {
  const user = this;
  const userAsObject = user.toObject();

  delete userAsObject.tokens;
  delete userAsObject.password;

  return userAsObject;
};

// Find user by email and password
// Statics are static methods of the whole class, not instances
providerSchema.statics.findByCredentials = async (email, password) => {
  console.log("find by credentials");
  const user = await providerModel.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  console.log("comparing " + password + " to " + user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Passwords do not match");
    throw new Error("Unable to login");
  }
  console.log("user found, can LOGIN");
  return user;
};

// Hash a plain text password prior to saving
providerSchema.pre("save", async function (next) {
  const user = this;
  console.log("pre save hashing", this);
  if (user.isModified("password")) {
    console.log("hashing password");
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete accounts whenever a user is removed
providerSchema.pre("remove", async function (next) {
  const user = this;
  await accountModel.deleteMany({ user_id: this.user_id });
  next();
});
const providerModel = mongoose.model("providers", providerSchema);
module.exports = providerModel;
// module.exports = mongoose.model("users", providerSchema);
