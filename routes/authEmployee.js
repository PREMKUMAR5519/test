const express = require('express');
const router = express.Router();
const multer = require('multer');
const Employee = require("../models/Employee")

///images

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Endpoint to handle form submission and image upload
router.post('/upload', upload.single('image'), (req, res) => {
  const { name, email, age, designation, gender, mobileNumber } = req.body;
  const imagePath = req.file.path;
  const newEmployee = new Employee({ name, email, age, designation, gender, mobileNumber, image: imagePath });
  newEmployee.save()
    .then(() => res.send('Employee Added Sucessfully'))
    .catch(err => res.status(400).send(err));
});
// Endpoint to get all users
router.get('/employee', (req, res) => {
  Employee.find()
    .then(employee => res.json(employee))
    .catch(err => res.status(400).send(err));
});

// Endpoint to get user by ID
router.get('/employee/:id', (req, res) => {
  const employeeId = req.params.id;
  Employee.findById(employeeId)
    .then(employee => {
      if (!employee) {
        return res.status(404).send('employee not found');
      }
      res.json(employee);
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;