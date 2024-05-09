const express=require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const employee = require("./routes/authEmployee")
const multer = require('multer');
const fs = require('fs');


require("dotenv").config()

const app = express()
app.use('/uploads', express.static('uploads'));

app.use(express.json())//
const connectDB = async()=>{//mongodb+srv://prem551969:Prem551969@fitnessapp.tomgeha.mongodb.net/?retryWrites=true&w=majority
    await mongoose.connect("mongodb://localhost:27017/newbase",{
        useNewUrlParser: true,
        useUnifiedTopology:true
    });
    console.log("connected to mongoDB")
};
connectDB()
app.use(cors())
app.use("/auth", authRoutes)
app.use("/", employee)
const port = 3000;
app.listen(port, ()=> console.log("listening on port 3000"))