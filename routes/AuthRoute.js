const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const AuthRouter = express.Router();

AuthRouter.post("/register",async (req,res)=>{
  
    const {name,email,password} = req.body;

    const isUserExisted = await userModel.findOne({email});

      if(isUserExisted){
        return res.status(400).json({
            message:"user already exisit"
        })
    }
  const hashedPassword = await bcrypt.hash(password,12)
  console.log(hashedPassword);

    const user = await userModel.create({
        name,email,password:hashedPassword
    })
    const token = jwt.sign({name:user._id},process.env.JWT_SECRET)
  
    res.cookie("jwt_token",token);

    res.status(201).json({
        message:"user Created successfully",
        user:user,
        token:token
    })

})


AuthRouter.post("/login",async(req,res)=>{
     let {email,password} = req.body;


      const user = await userModel.findOne({email});

      if(!user){
        return res.status(404).json({
            message:"User does not exist please register"
        })
      }
       
      const isPasswordCorrect = await bcrypt.compare(password,user.password);

      if(!isPasswordCorrect){
        return res.status(400).json({
            message:"Invalid password"
        })
      }
         const token = jwt.sign({name:user._id},process.env.JWT_SECRET)
      
         res.cookie("jwt_token",token);
         
      res.status(200).json({
        message:"Login succesfully",
        user:user,
        token:token
      })

})

module.exports = AuthRouter;