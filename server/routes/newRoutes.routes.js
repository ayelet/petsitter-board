const express = require("express");
const route = new express.Router();
// const newController = require("../controllers/newPost.controller");

route.get("/api/", async (req, res) => {
  //   console.log(req.body);
  // await newController.createNewPost(req, res);
  //   res.send(req.body);
  res.status(200).send("hola");
});

module.exports = route;
