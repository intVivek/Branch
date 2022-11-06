const express = require('express');
const router = express.Router();
const validator = require('validator');
const User = require("../Model/User.js");
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    console.log(req.body);
    const {email, pass} = req.body;
    if(!validator.isEmail(email)) return res.json({status:0,message:'Enter a valid Email'});
    if(!pass) return res.json({status:0,message:'Enter a valid Password'});
    try{
        user = await User.findOne({ email});
        if (!user) return res.json({status:0,message:'User not found'});
        if(!await bcrypt.compare(pass, user.hashedPass)) return res.json({status:0,message:'Incorrect Password'});
        return res.json({status:1,message:'Login successfull',user:{id: user._id, name:user.name,email:user.email}});
    }
    catch(error){
        console.log(error);
        return res.json({status:0,message:"error"});
    }
  });

module.exports = router