/*
=======================================
  ; Title: employee.js
  ; Author: Wendy Portillo
  ; Date: 12 March 2020
  ; Description: employee.js schema file
========================================
*/

//Required module
const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema; 

//Create the employee schema
let employeeSchema = mongoose.Schema({
  employeeId: String,
  firstName: String,
  lastName: String,
  roles: Array, 
  todo: Array,
  done: Array
});

//Attach EmployeeSchema to an Employee Model
module.exports = mongoose.model('Employee', employeeSchema);

