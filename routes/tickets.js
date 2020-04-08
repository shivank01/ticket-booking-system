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
        flag=false;
        for(i=0;i<4;i++){
            for(j=0;j<10;++j){
                if(seats[i][j]==0){
                    seats[i][j]=1;
                    r=i;
                    c=j;
                    flag=true;
                    break;
                }
            }
            if(flag)
                break;
        }
        //update the seat status
        const updateBus = await busModel.updateOne(
            { _id : req.body.busid},
            {$set : { Seats: seats}}
        );

        seatno=r*4+c+1;

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
        let r = (seatno-1)%4;
        let c = seatno -1 - 4*r;

        //extract the current seat structure
        const findBus = await busModel.findOne(
            {_id : req.params.ID}
        );
        seats = findBus['Seats'];
        seats[r][c]=0;

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