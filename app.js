require('dotenv').config();
const express=require("express");
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')

const app=express();
const port=process.env.PORT || 6000;
mongoose.connect('mongodb://localhost:27017/Logindemo',{useNewUrlParser:true})
const con = mongoose.connection
const bodyParser = require('body-parser')
//const cors = require('cors')
const questionRoute = require('./routes/question');
const questionGroupRoute = require('./routes/question-group');
const quizRoute = require('./routes/quiz');

app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser())
const router_path=require('./routes/register')
app.use('/exam-portal',router_path)
app.use('/question', questionRoute);
app.use('/question-group', questionGroupRoute);
app.use('/quiz', quizRoute);

con.on('open',()=>{
    console.log("connected...");
})

module.exports = app.listen(port,()=>{
    console.log(`running on port ${port}`);
});
