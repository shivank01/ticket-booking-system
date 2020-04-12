const express = require('express');

const router = express.Router();

const busModel = require('../models/bus')
const ticketModel = require('../models/ticket')
const seatsRedis = require('../seatsRedis.js')

router.put('/bus/reset', async(req,res)=>{
    try{
        var seats = Array(40).fill(0);

        //update the seat status in DB
        const updateBus = await busModel.updateOne(
            {_id : req.body.busid},
            {$set: {Seats: seats}}
        );
        console.log(updateBus);
        //check if the seat matrix is there in redis
        var redisExists = await seatsRedis.exists(req.body.busid);
        //update the seat status in redis
        if(redisExists!=0)
            await seatsRedis.del(req.body.busid);
        
        await seatsRedis.set(req.body.busid, seats);

        const updateTicket = await ticketModel.updateMany(
            {bus_id : req.body.busid},
            {$set: {status: false}}
        );
        res.json("Reset server successfully");
    }
    catch(err){
        res.json({message:err})
    }
});

//export module
module.exports = router;