const app = require("./app");
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server run at http://localhost:${port}`);
});

console.log(__dirname);
// set static folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}


