const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
// const auth = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
// const accountModel = require("./accounts.model");

const userSchema = mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  last_name: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is invalid");
    },
  },
  password: {
    type: String,
    required: true,
    unique: false,
    validate(value) {
      if (value.length < 4)
        throw new Error("Password length should be at least 4 characters");
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Generate Auth Token for a specific user
// methods are for instances of the model
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismysecret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Return only public profile of user as response
userSchema.methods.toJSON = function () {
  const user = this;
  const userAsObject = user.toObject();

  delete userAsObject.tokens;
  delete userAsObject.password;

  return userAsObject;
};

// Find user by email and password
// Statics are static methods of the whole class, not instances
userSchema.statics.findByCredentials = async (email, password) => {
  console.log("find by credentials");
  const user = await userModel.findOne({ email });
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
userSchema.pre("save", async function (next) {
  const user = this;
  console.log("pre save hashing", this);
  if (user.isModified("password")) {
    console.log("hashing password");
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete accounts whenever a user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await accountModel.deleteMany({ user_id: this.user_id });
  next();
});
const userModel = mongoose.model("User", userSchema);
module.exports = { userModel, userSchema };
// module.exports = mongoose.model("users", userSchema);
