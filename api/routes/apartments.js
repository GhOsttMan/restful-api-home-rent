const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");

const Apartment = require("../model/apartment");

// GET REQUEST

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
        message: "Failed to get all the available apartment"
      });
    });
});

route.get("/city/:cityName", (req, res, next) => {
  var name = req.params.cityName;
  Apartment.find({
    "address.city": name
  })
    .exec()
    .then(doc => {
      console.log("city");
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Failed to get all the available apartment for this city"
      });
    });
});

route.get("/country/:countryName", (req, res, next) => {
  var name = req.params.countryName;
  Apartment.find({
    "address.country": name
  })
    .exec()
    .then(doc => {
      console.log("country");
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Failed to get all the available apartment for this country"
      });
    });
});

// POST REQUEST

route.post("/", (req, res, next) => {
  const apartment = new Apartment({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    floor: req.body.floor,
    description: req.body.description,
    address: {
      road: req.body.road,
      city: req.body.city,
      country: req.body.country
    },
    roomDetail: {
      bedroom: req.body.bedroom,
      dining: req.body.dining,
      bathroom: req.body.bathroom,
      kitchen: req.body.kitchen,
      balcony: req.body.balcony,
      drawingroom: req.body.drawingroom
    },
    mapCordination: {
      lat: req.body.lat,
      long: req.body.long
    }
  });
  apartment.apartmentId = "" + apartment._id;
  apartment
    .save()
    .then(doc => {
      console.log(doc);
      res.status(200).json({
        message: "created new entry of an apartment",
        newly_added: apartment
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Failed to create new entry",
        error: err
      });
    });
});

// DELETE

route.delete("/:apartmentID", (req, res, next) => {
  const id = req.params.apartmentID;
  // console.log(apartmentId);
  Apartment.remove({ apartmentId: id })
    .exec()
    .then(doc => {
      res.status(200).json({
        msg: "successfully deleted",
        doc: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: "fail to delete"
      });
    });
});

// UPDATE  OPERATION
route.patch("/:apartmentID", (req, res, next) => {
  const id = req.params.apartmentID;
  Apartment.update(
    { apartmentId: id },
    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        floor: req.body.floor,
        description: req.body.description,
        address: {
          road: req.body.road,
          city: req.body.city,
          country: req.body.country
        },
        roomDetail: {
          bedroom: req.body.bedroom,
          dining: req.body.dining,
          bathroom: req.body.bathroom,
          kitchen: req.body.kitchen,
          balcony: req.body.balcony,
          drawingroom: req.body.drawingroom
        },
        mapCordination: {
          lat: req.body.lat,
          long: req.body.long
        }
      }
    }
  )
    .exec()
    .then(doc => {
      res
        .status(200)
        .json({
          message: "Successfully Updated the data",
          doc: doc
        })
        .catch(err => {
          res.status(500).json({
            message: "Something went wrong updating data"
          });
        });
    });
});
module.exports = route;
