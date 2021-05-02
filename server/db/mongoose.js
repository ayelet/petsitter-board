// const dotenv = require("dotenv");
require("dotenv").config();
// dotenv.config({ path: "ENV_FILENAME" });
const mongoose = require("mongoose");

const url = process.env.MONGODB_DEV || "test";
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
    console.log("Connected")
  }
);

connection
  .once("open", () => {
    console.log("*** Connected to MongoAtlas Database Successfully");
  })
  .on("error", function (error) {
    console.log("Error is: ", error);
  });
