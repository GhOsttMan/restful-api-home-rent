const mongoose = require("mongoose");

const apartmentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  apartmentId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  floor: { type: Number, required: true },

  address: {
    road: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  roomDetail: {
    bedroom: { type: Number, required: true },
    dining: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    kitchen: { type: Boolean, required: true },
    balcony: { type: Number, required: true },
    drawingroom: { type: Number, required: true }
  },
  mapCordination: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
  }
});

module.exports = mongoose.model("Apartment", apartmentSchema);
