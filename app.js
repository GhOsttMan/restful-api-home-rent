const express = require("express");
const app = express();
const apartmentsRoute = require("./api/routes/apartments");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Database Connection

mongoose.connect(
  "mongodb+srv://saemshefat:saemshefat@rest-api-web-service-jbv8v.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTION") {
    res.header("Access-Control-Allow-Headers", "PUT , POST , GET , DELETE");
    return res.status(200).json({});
  }
  next();
});

// Routes

app.use("/apartments", apartmentsRoute);

// Error Handling

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});
module.exports = app;
