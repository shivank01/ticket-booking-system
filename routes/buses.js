const express = require('express');

const router = express.Router();

const Post = require('../models/bus')

router.post('/add', async (req,res)=>{
    let seatArray = [...Array(4)].map(x=>Array(10).fill(0))    
    const post = new Post({
        numberOfSeats: 40,
        Seats: seatArray,
        date: req.body.mob,
        start_time: Date.parse(req.body.start_time),
        end_time:Date.parse(req.body.end_time),
        start_station: req.body.start_station,
        end_station: req.body.end_station
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }

});

router.get('/search', async (req,res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/search/:Id', async (req,res)=>{
    try{
        const posts = await Post.findOne({'_id': req.params.Id});
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

router.delete('/delete/:Id', async (req,res)=>{
    try{
        const posts = await Post.remove({'_id': req.params.Id});
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

module.exports = router;