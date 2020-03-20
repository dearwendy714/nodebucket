/*
=======================================
  ; Title: item.js
  ; Author: Wendy Portillo
  ; Date: 12 March 2020
  ; Description: item.js schema file
========================================
*/

//requires mongoose
const mongoose = require('mongoose');

//create item schema 
let itemSchema = mongoose.Schema({
    text: {type: String}

});
//export model for public
module.exports = ItemSchema; 
