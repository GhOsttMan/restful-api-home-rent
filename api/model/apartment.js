const mongoose = require("mongoose");

const apartmentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number
});

module.exports = mongoose.model("Apartment", apartmentSchema);
