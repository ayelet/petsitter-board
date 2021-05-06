const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
// const auth = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
// const accountModel = require("./accounts.model");
const Schema = mongoose.Schema;
const userSchema = require("./users.model").Schema;

// providers=> user Credentials, service type, address,
const serviceTypes = ["Cat Sitting", "Dog Walking", "House Sitting"];
const providerSchema = mongoose.Schema({
  // user: { type: Schema.Types.ObjectId, ref: "User" },
  details: {
    first_name: {},
    last_name: {},
    gender: {},
    email: {},
    password: {},
    phone: {},
  },

  serviceType: [
    {
      type: String,
      required: true,
      unique: false,
      enum: serviceTypes,
    },
  ],
  address: {
    street: {
      type: String,
      require: false,
    },
    city: {
      type: String,
      required: true,
    },
  },
  images: [
    {
      imageUrl: {
        type: String,
        validate(value) {
          if (!validator.isURL(value)) throw new Error("Invalid Url");
        },
      },
    },
  ],
  ratings: [
    {
      score: {
        type: Number,
        required: true,
        validator(value) {
          if (value < 1 || value > 5)
            throw new Error("Rating should be a number between 1 to 5");
        },
      },
      rater: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// // Generate Auth Token for a specific user
// // methods are for instances of the model
// providerSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, "thisismysecret");
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };

// Return only public profile of user as response
// providerSchema.methods.toJSON = function () {
//   const user = this;
//   const userAsObject = user.toObject();

//   delete userAsObject.tokens;
//   delete userAsObject.password;

//   return userAsObject;
// };

// Find user by email and password
// Statics are static methods of the whole class, not instances
providerSchema.statics.findByCredentials = async (email, password) => {
  console.log("find by credentials");
  const user = await providerModel.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  console.log("comparing " + password + " to " + user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Passwords do not match");
    throw new Error("Unable to login");
  }
  console.log("user found, can LOGIN");
  return user;
};

// // Hash a plain text password prior to saving
// providerSchema.pre("save", async function (next) {
//   const user = this;
//   console.log("pre save hashing", this);
//   if (user.isModified("password")) {
//     console.log("hashing password");
//     user.password = await bcrypt.hash(user.password, 8);
//   }

//   next();
// });

// Delete accounts whenever a user is removed
providerSchema.pre("remove", async function (next) {
  const user = this;
  await accountModel.deleteMany({ user_id: this.user_id });
  next();
});
const providerModel = mongoose.model("Provider", providerSchema);
module.exports = providerModel;
// module.exports = mongoose.model("users", providerSchema);

// {
//   "id": 1,
//   "details": {
//     "first_name": "Morrie",
//     "last_name": "Nolder",
//     "gender": "Male",
//     "email": "mnolderh@state.tx.us",
//     "password": "rakeajyBTO",
//     "phone": "748-525-1553"
//   },
//   "serviceTypes": [
//     {
//       "serviceType": "House Sitting"
//     },
//     {
//       "serviceType": "Cat Sitting"
//     }
//   ],
//   "address": {
//     "street": "677 Manley Place",
//     "city": "Rehovot"
//   },
//   "ratings": [
//     {
//       "rater_id": "Agata",
//       "score": 4,
//       "date": {"$date":{"$numberLong":159707380300}}
//     },
//     {
//       "rater_id": "Dill",
//       "score": 4,
//       "date": {"$date":{"$numberLong":161075349100}}
//     },
//     {
//       "rater_id": "Alon",
//       "score": 5,
//       "date": {"$date":{"$numberLong":161214170000}}
//     }
//   ],
//   "images": [
//     {
//       "imageUrl": "http://dummyimage.com/231x100.png/5fa2dd/ffffff"
//     },
//     {
//       "imageUrl": "http://dummyimage.com/149x100.png/cc0000/ffffff"
//     },
//     {
//       "imageUrl": "http://dummyimage.com/200x100.png/ff4444/ffffff"
//     }
//   ]
// }
