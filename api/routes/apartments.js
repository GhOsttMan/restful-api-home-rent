const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");

const Apartment = require("../model/apartment");

route.get("/", (req, res, next) => {
  Apartment.find()
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Failed"
      });
    });
});

route.post("/", (req, res, next) => {
  const apartment = new Apartment({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  apartment
    .save()
    .then(doc => {
      console.log(doc);
      res.status(200).json({
        message: "created new entry of apartment",
        newly_added: apartment
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Failed to insert"
      });
    });
});

module.exports = route;
