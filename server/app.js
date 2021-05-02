const express = require("express");
// const port = process.env || 8000;
const cors = require("cors");
require("./db/mongoose");
const newRoute = require("./routes/newRoutes.routes"); //TODO-change to proper routes later

const app = express();
app.use(express.json());
app.use(cors());
app.use(newRoute);

module.exports = app;
