const express = require("express");
const router = express.Router();
// const providersController = require("../controllers/providers.controllers");
const providersControllers = require("../controllers/providersControllers");
const auth = require("../middleware/auth.middleware");

router

  // get a list of all providers
  .get(
    "/providers",
    //   /*auth, */ x(req, res) => {
    // auth,
    (req, res) => {
      console.log("GET request to fetch all providers");
      providersControllers.getProviders(res);
    }
  )
  .get("/providers/:id", (req, res) => {
    console.log("Get provider by id", req.params.id);
    providersControllers.getProvider(req, res);
  })
  // .get("/me", auth, (req, res) => {
  //   providersControllers.getProviderProfile(req, res);
  // })
  .post("/providers/", (req, res) => {
    console.log("Add provider", req.body);
    providersControllers.addProvider(req, res);
  })
  // .post("/login", (req, res) => {
  //   console.log("Provider Login");
  //   providersControllers.loginProvider(req, res);
  // })
  // .post("/logout", auth, (req, res) => {
  //   console.log("Provider logout");
  //   providersControllers.logoutProvider(req, res);
  // })
  // .post("/logoutAll", auth, (req, res) => {
  //   console.log("logout all sessions");
  //   providersControllers.logoutAll(req, res);
  // })
  .put("providers/:id", (req, res) => {
    console.log("Update existing provider", req.params.id);
    providersControllers.updateProvider(req, res);
  })
  .delete("/:id", (req, res) => {
    console.log("Delete provider ", req.params.id);
    providersControllers.deleteProvider(req, res);
  })
  .delete("/deleteAll", (req, res) => {
    console.log("Delete all providers request");
    providersControllers.deleteAllProviders(req, res);
  });

module.exports = router;
