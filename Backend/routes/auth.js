const express = require("express");
const routes = express.Router();
const User = require("../models/userSchema")
const { body, validationResult } = require('express-validator');
const bcrypt  = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Fetchuser = require("../Middleware/gettoken");

const JWT_secert = "kartikg@2002"

let sucess = false;


routes.post("/createuser",[
    body('name',"Name should be greter than 1 charcter").isLength({ min: 2 }),
    body('email',"Please enter a valid email").isEmail(),
    body('password',"Password length should be minimum of 6 charcter").isLength({min:6})
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let newuser = await User.findOne({email:req.body.email});


    if(newuser){
        return res.status(400).json({
            error:"User alerdy exist"
        })

    }

    const salt =await bcrypt.genSaltSync(10);

   const  secpassword = await bcrypt.hash(req.body.password,salt);

   newuser= await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secpassword
    })

    const data = {
        newuser:{
            id:newuser.id
        }
    }

    const authtoken = jwt.sign(data,JWT_secert)

    res.json({authtoken});


})





// Route 2
routes.post("/login",[
   
    body('email',"Please enter a valid email").isEmail(),
    body('password',"Password cannot be empty").exists()
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const{email,password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please enter correct credentials"})
        }

        const pascompare = await bcrypt.compare(password,user.password);
        if(!pascompare){
            return res.status(400).json({error:"Please enter correct credentials"})
        }

        const payload = {
            user:{
                id:user.id
            }
        }
    
        const authtoken = jwt.sign(payload,JWT_secert)
    
        res.json({authtoken,sucess:true});

    } catch (error) {
        res.status(500).send(error);
    }

})



// Route 3


routes.post("/getUser", Fetchuser,async (req,res)=>{
   
    
    try {
     const  userId = req.user.id;

     const user  = await User.findById(userId).select("-password");
     res.send(user)


    } catch (error) {
        res.status(500).send(error);
    }

})




module.exports = routes;