// server/index.js

//import express
const express = require("express");
const app = express();

//import nodemailer
const nodemailer = require("nodemailer");

//import sql
require('dotenv').config("../env");

//set port back-end 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

//import body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//importing route
let routes = require('./api/routes')
routes(app)