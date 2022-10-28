require("dotenv").config();
const bcrypt = require ("bcrypt") 
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

var fs = require('fs');
const userRouter = require('./user')
const adminRouter = require('./admin')

//middleware
app.use(cors());
app.use(express.json());


//-------db connection-------------
try {
	mongoose.connect("mongodb+srv://incub:incub@cluster0.ifo59mn.mongodb.net/?retryWrites=true&w=majority")
	console.log("db connected");
} catch (error) {
	console.log('error');
	console.log(error);
}


app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)


app.listen(9000, () => {
  console.log("Server started on 9000");
});
