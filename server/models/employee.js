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
const Item = require('./item');

//Define a schema
var Schema = mongoose.Schema; 

//Create the employee schema
let employeeSchema = mongoose.Schema({
  employeeId: String,
  firstName: String,
  lastName: String,
  roles: Array, 
  tasks: Array,
  todo: [Item],
  done: [Item]
});

//Attach EmployeeSchema to an Employee Model
module.exports = mongoose.model('Employee', employeeSchema);