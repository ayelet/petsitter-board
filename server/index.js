const app = require("./app");
const port = process.env || 8000;

app.listen(port, () => {
  console.log(`server run at http://localhost:${port}`);
});
