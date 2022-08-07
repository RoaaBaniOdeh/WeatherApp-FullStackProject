
// Server setup
const express = require('express')
const app = express()
const api = require('./server/routes/api')
const path = require("path");
const bodyParser = require("body-parser");

app.use(`/`, api) 

//send clientside to browser
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
//to receive data from post method
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/weatherDB', { useNewUrlParser: true })



const port = 150
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})



