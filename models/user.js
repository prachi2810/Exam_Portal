require('dotenv').config()
const mongoose=require("mongoose")
const jwt =require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const employeeSchema=new mongoose.Schema({
    firstname:{
        type:String,
       
    },
    lastname:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
      
    },
    userName:{
        type:String,
        unique:true
    },
    phone:{
        type:Number,
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    confirmpassword:{
        type:String
    },
    role:{
        type:String
    }
})


employeeSchema.pre("save",async function(next){
    if(this.isModified("password")){
   this.password = await bcrypt.hash(this.password,10);

    this.confirmpassword=await bcrypt.hash(this.password,10);
    }
    next();
})



module.exports = mongoose.model('register',employeeSchema);