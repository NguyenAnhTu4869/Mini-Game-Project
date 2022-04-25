// server/index.js
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config("../env");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//importing route
let routes = require('./api/routes')
routes(app)

app.use(function (req, res) {
	res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});