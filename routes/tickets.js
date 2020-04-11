const express = require('express');

const router = express.Router();

const busModel = require('../models/bus')
const ticketModel = require('../models/ticket')

//to book a ticket
router.post('/book', async (req,res)=>{
    try{
        //find the available seat and book it
        const bus = await busModel.findOne({'_id':req.body.busid});
        seats = bus['Seats']
        var seatno=-1;
        for(i=0;i<40;i++){
            if(seats[i]==0){
                seats[i]=1;
                seatno=i+1;
                break;
            }
        }
        if(seatno==-1){
            res.json("Seats not available");
        }
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
        //update ticket status
        const updateTicket = await ticketModel.updateOne(
            {_id : req.params.ID},
            {$set : {status: false}}
        );
        
        //find the seat no on which the ticket is cancelled
        const findTicket = await ticketModel.findOne(
            {_id : req.params.ID}
        );
        seatno = findTicket['seatno'];

        //extract the current seat structure
        const findBus = await busModel.findOne(
            {_id : req.params.ID}
        );
        seats = findBus['Seats'];
        seats[seatno-1]=0;

        //update the seat status
        const updateBus = await busModel.updateOne(
            {_id : req.params.ID},
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
        res.json(findTicket)
    }catch(err){
        res.json({message:err});
    }
});

//export module
module.exports = router;