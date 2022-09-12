const env = require('dotenv')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const getUsers = async (req, res, next) => {
    try{
        const user = await User.find()
        res.status(200).json(user)
    }catch(err){
        res.status(400).send('error'+err)
    }

    next();
}

const logoutUser = async (req, res, next) => {
    try{
        
        res.clearCookie("jwt");
       
        res.json({
            message:'Logout Successfully!!'
        });
    }catch(error){
        res.status(400).send(error);
    }

    next();
}

const registerUser = async (req, res, next) => {
          const password = req.body.password;
          const cpassword = req.body.confirmpassword;
          try{
          if(password === cpassword){
            const registerEmployee=new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
                password: password,
                confirmpassword: cpassword,
                role: req.body.role
            })
            
            const registered = await registerEmployee.save();
            res.status(200).send(registered)
        }else{
            res.json({
                message:'passwords are not matching'
            });
        }

    }
    catch(error){
            res.send(error);
        }

    next();
}

const loginUser = async (req, res, next) => {
    
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        const useremail = await User.findOne({email:email});
        
        const isMatch = await bcrypt.compare(password, useremail.password);
       
        const token = jwt.sign({email:useremail.email,role:useremail.role},process.env.SECRET_KEY)
        res.cookie("jwt",token);
        if(isMatch){
            res.status(200).json({
                message:'Login Successful'
            });
        }
        else{
            res.status(400).json({
                message:'Invalid Login'
            });
        }
        
    }catch(error){
        res.status(400).json({
            message:'Invalid Email'
        });
    }

    next();
}

const sayHello = (req, res, next) => {
    
    res.json({
        message:'Welcome'
    });

    next();
}

module.exports = {
    getUsers,
    logoutUser,
    registerUser,
    loginUser,
    sayHello
}