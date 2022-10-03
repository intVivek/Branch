const express = require('express');
const router = express.Router();
const validator = require('validator');
const User = require("../Model/User.js");
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    console.log(req.body);
    const {email, name, pass} = req.body;
    if(!name) return res.json({status:0,message:'Enter a valid userName'});
    if(!validator.isEmail(email)) return res.json({status:0,message:'Enter a valid Email'});
    if(!pass) return res.json({status:0,message:'Enter a valid Password'});
    try{
        user = await User.findOne({email});
        if (user) return res.json({status:0,message:'User already exists'});
        user = await User.create({ email, name, hashedPass: await bcrypt.hash(pass, 10)});
        return res.json({status:1,message:'User created',user:{name:user.name,email:user.email}});
    }
    catch(error){
        console.log(error);
        return res.json({status:0,message:'Error'});
    }
  });

module.exports = router