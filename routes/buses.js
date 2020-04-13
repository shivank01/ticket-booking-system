const express = require('express');

const router = express.Router();

const busModel = require('../models/bus')

//add the bus
router.post('/add', async (req,res)=>{
    let seatArray = Array(40).fill(0)
    const newBus = new busModel({
        numberOfSeats: req.body.noofseats,
        Seats: seatArray,
        start_time: Date.parse(req.body.start_time),
        end_time:Date.parse(req.body.end_time),
        start_station: req.body.start_station,
        end_station: req.body.end_station
    });
    try{
        const bus = await newBus.save();
        res.json({message: "Bus successfully added!", bus });
    }catch(err){
        res.json({message: err});
    }

});

//list all buses
router.get('/search', async (req,res)=>{
    try{
        const findBus = await busModel.find();
        res.json(findBus);
    }catch(err){
        res.json({message:err});
    }
});

//search bus
router.get('/search/:Id', async (req,res)=>{
    try{
        const findBus = await busModel.findOne({'_id': req.params.Id});
        res.json(findBus);
    }catch(err){
        res.json({message:err});
    }
});

//delete bus
router.delete('/delete/:Id', async (req,res)=>{
    try{
        const removeBus = await busModel.remove({'_id': req.params.Id});
        res.json({message: "Delete bus successfully", removeBus });
    }catch(err){
        res.json({message:err});
    }
});

//export module
module.exports = router;