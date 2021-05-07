// const dotenv = require("dotenv");
require("dotenv").config();
// dotenv.config({ path: "ENV_FILENAME" });
const mongoose = require("mongoose");

const url = process.env.MONGODB || "test";
const connection = mongoose.connection;

// console.log(process.env.MONGODB);
mongoose.connect(
  url,
  {
    // useMongoClient:true ,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to databse");
    }
    console.log("Connected to models: ", client.models);
  }
);

connection
  .once("open", () => {
    let dbConnection = "";
    if (url === process.env.MONGODB) {
      dbConnection = "mongoDb on Atlas (remote)";
    } else dbConnection = url;
    console.log("*** Connected to: ", dbConnection);
  })
  .on("error", function (error) {
    console.log("Error is: ", error);
  });
