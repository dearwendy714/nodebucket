/*
 *  Title: app.js
 *  Author: Professor Cristy Cross
 *  Modified by: Wendy Portillo
 *  Date: 12 March 2020
 *  Description: The app file for the nodebucket application.
 */
 
 
 /** Require statements
 */
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const Employee = require("./models/employee");

/**
 * App configurations
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

/**
 * Variables
 */
const port = 3000; // server port

/************************* Mongoose connection strings go below this line  ***************/
// TODO: This line will need to be replaced with your actual database connection string
const conn =
  "mongodb+srv://dearwendy714:87Myvonne@cluster0-zwnbo.mongodb.net/test?retryWrites=true&w=majority";

/**
 * Database connection
 */
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.debug(`Connection to the database instance was successful`);
  })
  .catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
  }); // end mongoose connection

/**
 * API(s)
 */

//find employee by id
app.get("/api/employees/:id", function(req, res, next) {
  Employee.findOne({ employeeId: req.params.id }, function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);
      res.json(employee);
    }
  });
});

//add an employee
app.post("/api/addemployee", (req, res) => {
  const employee = new Employee({
    employeeId: req.body.employeeId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    roles: req.body.roles,
    tasks: req.body.tasks
  });

  employee
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

//get all employees
app.get("/api/employees", async (req, res) => {
  try {
    const employee = await Employee.find();
    res.json(employee);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
