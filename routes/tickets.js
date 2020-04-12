const express = require('express');

const router = express.Router();

const busModel = require('../models/bus')
const ticketModel = require('../models/ticket')
const seatsRedis = require('../seatsRedis.js')

//to book a ticket
router.post('/book', async (req,res)=>{
    try{
        //check if the seat matrix is there in redis
        var redisExists = await seatsRedis.exists(req.body.busid);
        
        if(redisExists!=0){
            seats = await seatsRedis.get(req.body.busid);
        }
        else{
            const bus = await busModel.findOne({'_id':req.body.busid});
            seats = bus['Seats']
        }
        
        //find the available seat and book it
        var seatno=-1;
        for(i=0;i<40;i++){
            if(seats[i]==0){
                seats[i]=1;
                seatno=i+1;
                break;
            }
        }

        //return if seats are not available
        if(seatno==-1){
            return res.json("Seats not available");
        }
        
        //push to redis if not already available
        if(redisExists==0)
            await seatsRedis.set(req.body.busid, seats);
        
        //update the seat status
        const updateBus = await busModel.updateOne(
            { _id : req.body.busid},
            {$set : { Seats: seats}}
        );

        //add ticket in db
        const newTicket = new ticketModel({
            user_id: req.body.userid,
            bus_id: req.body.busid,
            status: true,
            seatno: seatno
        });
            const Ticket = await newTicket.save();
            res.json(Ticket);
    }catch(err){
        res.json({message: err});
    }

});

//to cancel a ticket
router.put('/cancel/:ID', async (req,res)=>{
    try{
        //find the seat no on which the ticket is cancelled
        const findTicket = await ticketModel.findOne(
            {_id : req.params.ID}
        );
        busID=findTicket['bus_id'];
        seatno = findTicket['seatno'];
        status = findTicket['status'];
        
        //check if ticket is already cancelled
        if(status==false)
            return res.json("Ticket already cancelled");

        //update ticket status
        const updateTicket = await ticketModel.updateOne(
            {_id : req.params.ID},
            {$set : {status: false}}
        );

        //extract the current seat structure
        //check if the seat matrix is there in redis
        var redisExists = await seatsRedis.exists(busID);
        
        var seats=[]
        if(redisExists!=0){
            seats = await seatsRedis.get(busID);
        }
        else{
            const findBus = await busModel.findOne(
                {_id : busID}
            );
            
            seats = findBus['Seats'];
        }
        
        seats[seatno-1]=0;
        
        //update the seat status in redis
        if(redisExists!=0)
            await seatsRedis.update(busID, seatno, 0);
        else
            await seatsRedis.set(busID, seats);

        //update the seat status in DB
        const updateBus = await busModel.updateOne(
            {_id : busID},
            {$set: {Seats: seats}}
        );
        
        res.json(updateBus);

    }catch(err){
        res.json({message:err});
    }
});

//to search a ticket
router.get('/search/:Id', async (req,res)=>{
    try{
        const findTicket = await ticketModel.findOne({'_id': req.params.Id});
        res.json(findTicket);
    }catch(err){
        res.json({message:err});
    }
});

//to search all open tickets
router.get('/Ticketstatus', async (req,res)=>{
    try{
        console.log(req.query.status);
        const findTicket = await ticketModel.find({'status':req.query.status=='true'});
        res.json(findTicket);
    }
    catch{
        res.json({message:err});
    }
});

//export module
module.exports = router;