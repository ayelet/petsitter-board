// const roomModel = require("../db/model");
const { request } = require("express");
const providerModel = require("../model/providers.model");
const userModel = require("../model/users.model");
const userController = require("./users.controllers");
// Helper functions
const validate = (id) => {
  if (!id || id < 0) return false;
  return true;
};
// 1. Get all providers
const getProviders = async (res) => {
  try {
    const providers = await providerModel.find({});
    if (!providers) return res.status(404).send("No providers found");
    return res.status(200).send(providers);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// 2. Get a specific user
const getUser = async (req, res) => {
  try {
    const user_id = parseInt(req.params.id);
    if (!validate(user_id))
      return res.status(400).send("Bad request, invalid ID");
    console.log("1. getting user by id ", user_id);
    const user = await userModel.find({ user_id: user_id });
    if (!user) return res.status(404).send("user does not exist");
    console.log("2. getting user  ", user_id, user);
    return res.status(200).send({ user: user });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const getUserProfile = async (req, res) => {
  return res.send(req.user);
};

// 3. add a new user
const addProvider = async (req, res) => {
  console.log(req.body.user);
  // const { providerReq } = req.body;
  // console.log(providerReq.gender);
  const date = Date.now();
  try {
    if (req.body.dateAdded) date = req.body.dateAdded;
    console.log("date Added: ", date);
    console.log("images: ", req.body.images[0].imageUrl);
    const provider = new providerModel({
      // first_name: req.body.first_name,
      id: req.body.id,
      details: req.body.details,
      address: req.body.address,
      ratings: req.body.ratings,
      serviceTypes: req.body.serviceTypes,
      images: [...req.body.images],
    });
    const newProvider = await provider.save();

    // const token = user.generateAuthToken();
    return res.status(201).json({ newProvider /*, token*/ });
  } catch (err) {
    console.log("error in adding user: ", err);
    return res.status(400).json({ Error: err });
  }
};

// 4. update an existing user
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["first_name", "last_name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdate.includes(update)
  );
  const { id } = req.params;
  if (!validateId(id)) return res.status(400).send("Bad request, invalide ID");
  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });
  try {
    const user = await userModel.find({ user_id: id });

    updates.forEach((update) => {
      userModel[update] = req.body[update];
    });
    await user.save();
    if (!user) return res.status(404).send({ error: "could update user" });

    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const user = await userModel.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
};

// Log out from one session
const logoutUser = async (req, res) => {
  try {
    console.log("log out user ", req.user);
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
};
// Logout from all session (delete all tokens)
const logoutAll = async (req, res) => {
  try {
    console.log("log out all session", req.user);
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
// Delete a specific user by its id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateId(id))
      return res.status(400).send("Bad request, invalide ID");
    let user = await userModel.findByIdAndDelete(id);
    console.log("request to delete user ", id, user);
    if (!user) return res.status(404).send("user does not exist");
    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// 2. Delete all users
const deleteAllUsers = async (req, res) => {};

// const user = new userModel({
//   name: "room1",
//   category: "suite",
//   isActive: true,
//   details: {
//     description: "this is a very nice room",
//     price: 123,
//     discount: 5,
//     images: ["image1", "image2"],
//     phone: "97243424323",
//   },
// });

module.exports = {
  getProviders,
  getUser,
  addProvider,
  updateUser,
  deleteUser,
  deleteAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  logoutAll,
};
