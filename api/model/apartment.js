const mongoose = require("mongoose");

const apartmentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  apartmentId: String,
  name: String,
  description: String,
  price: Number,
  floor: Number,

  address: {
    road: String,
    city: String,
    country: String
  },
  roomDetail: {
    bedroom: Number,
    dining: Number,
    bathroom: Number,
    kitchen: Boolean,
    balcony: Number,
    drawingroom: Number
  },
  mapCordination: {
    lat: Number,
    long: Number
  }
});

module.exports = mongoose.model("Apartment", apartmentSchema);
