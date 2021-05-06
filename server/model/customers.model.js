const mongoose = require("mongoose");


const customerSchema = mongoose.Schema({})



const customerModel = mongoose.model("customer", customerSchema);
module.exports = customerModel;
// module.exports = mongoose.model("users", providerSchema);