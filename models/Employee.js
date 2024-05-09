const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  designation: String,
  gender: String,
  mobileNumber: String,
  image: String // path to the image file
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;