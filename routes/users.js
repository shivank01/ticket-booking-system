const express = require('express');

const router = express.Router();

const userModel = require('../models/user')

//add a new user
router.post('/add', async (req,res)=>{
    const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        mob: req.body.mob
    });
    try{
        const user = await newUser.save();
        res.json(user);
    }catch(err){
        res.json({message: err});
    }
});

//list all users
router.get('/search', async (req,res)=>{
    try{
        const searchUser = await userModel.find();
        res.json(searchUser);
    }catch(err){
        res.json({message:err});
    }
});

//search the user
router.get('/search/:Id', async (req,res)=>{
    try{
        const searchUser = await userModel.findOne({'_id': req.params.Id});
        res.json(searchUser);
    }catch(err){
        res.json({message:err});
    }
});

//delete the user
router.delete('/delete/:Id', async (req,res)=>{
    try{
        const deleteUser = await userModel.remove({'_id': req.params.Id});
        res.json(deleteUser);
    }catch(err){
        res.json({message:err});
    }
});

//export module
module.exports = router;