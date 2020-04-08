const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv/config');

app.use(bodyParser.json());

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true},() =>{
    console.log("Connected to DB");
});


//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.get('/', (req, res) =>{
    res.send("Welcome to ticket booking system!");
});

const userRoute = require('./routes/users');
app.use('/user', userRoute);

const busRoute = require('./routes/buses');
app.use('/bus', busRoute);

app.listen(process.env.PORT);
