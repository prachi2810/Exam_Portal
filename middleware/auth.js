require('dotenv').config();
const jwt=require('jsonwebtoken')
const register=require('../models/user')

const auth=async (req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        const verifyUser=jwt.verify(token,process.env.SECRET_KEY);
        const user=await register.findOne({_id:verifyUser._id})
        req.token=token;
        req.verifyUser=verifyUser;
        next();
    
    }catch(error){
        res.send(error);
    }

    
}

module.exports=auth;
