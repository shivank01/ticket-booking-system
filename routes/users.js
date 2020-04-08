const express = require('express');

const router = express.Router();

const Post = require('../models/user')

router.post('/add', async (req,res)=>{
    const post = new Post({
        name: req.body.name,
        email: req.body.email,
        mob: req.body.mob
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