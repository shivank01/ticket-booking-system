const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv/config');

//to parse the body of the APIs
app.use(bodyParser.json());

//connect to mongo db
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true},() =>{
    console.log("Connected to DB");
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//default route
app.get('/', (req, res) =>{
    res.send("Welcome to ticket booking system!");
});

//to access user
const userRoute = require('./routes/users');
app.use('/user', userRoute);

//to access bus
const busRoute = require('./routes/buses');
app.use('/bus', busRoute);

//to access ticket
const ticketRoute = require('./routes/tickets');
app.use('/ticket', ticketRoute);

//start the node server
app.listen(process.env.PORT);
