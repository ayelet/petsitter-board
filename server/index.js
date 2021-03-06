const port = process.env.PORT || 8000;

const express = require("express");
const path = require("path");
// const port = process.env || 8000;
const cors = require("cors");
require("./db/mongoose");
// const newRoute = require("./routes/newRoutes.routes"); //TODO-change to proper routes later
const loginRoute = require("./routes/login.routes");
const providersRoute = require("./routes/providers.routes");
const usersRoute = require("./routes/users.routes");

const app = express();
app.use(express.json());
app.use(cors());
// app.use(newRoute);
app.use(loginRoute);
app.use(providersRoute);
app.use(usersRoute);

if (process.env.NODE_ENV === "production") {
  // app.use(express.static(path.join(__dirname, "../client/build")));

  /*
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})
*/

  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`### server run at ${port}`);
});
