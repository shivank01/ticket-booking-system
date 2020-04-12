const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const redis = require("async-redis");

require('dotenv/config');

//setup environment constants
const port = process.env.PORT || 3000;
const port_redis = process.env.REDIS_PORT || 6379;
const host = process.env.REDIS_HOST || 'localhost'
const pass = process.env.REDIS_PASS || ''

//create redis client
const client = redis.createClient({
  port      : process.env.REDIS_PORT,              
  host      : process.env.REDIS_HOST,        
  password  : process.env.REDIS_PASS   
});

//checking for error in redis
client.on("error", function(error) {
  console.error(error);
});

//export client
module.exports = client

module.exports = app

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

//to access ticket
const adminRoute = require('./routes/admin');
app.use('/admin', adminRoute);

//start the node server
app.listen(process.env.PORT);
