//  Add your code here
const mongoose = require("mongoose");

const CelebritySchema = new mongoose.Schema({
  name: String,
  occupation: String,
  catchPharse: String,
});

const celebrityModel = mongoose.model("Celebrities", CelebritySchema);

module.exports = celebrityModel;
