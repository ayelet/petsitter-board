const express = require("express");
const router = express.Router();
// const usersController = require("../controllers/users.controllers");
// const auth = require("../middleware/auth.middleware");

router

  // get a list of all users
  .post(
    "/login",
    //   /*auth, */ x(req, res) => {
    (req, res) => {
      console.log("POST request to login");
      //   usersController.getUsers(res);
      return res.status(200).send({ token: "test123" });
    }
  );

module.exports = router;
