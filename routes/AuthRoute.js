const express = require("express");
const userModel = require("../models/userModel");
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

    const user = await userModel.create({
        name,email,password
    })
    const token = jwt.sign({name:user.name,email:user.email},process.env.JWT_SECRET)
  
    res.cookie(token)
    res.status(201).json({
        message:"user Created successfully",
        user:user,
        token:token
    })

})

module.exports = AuthRouter;