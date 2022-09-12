const Question = require('../models/question');

//const auth=require('../middleware/auth')

const getQuestionById = async (req, res, next) => {
    let question;
    if(req.verifyUser.role=="admin"){
    try{
        question = await Question.findOne({ Id: req.params.id });
        if(question == null){
            return res.status(404).send({ msg: `Cannot find question with id: ${req.params.id}`});
        }
    }catch(error){
        return res.status(500).send({ error });
    }

    res.question = question;
    next();
}
else{
    res.json({
        message:"you are not an admin"
    })
}
}

const createQuestion = async (req, res, next) => {
    if(req.verifyUser.role=="admin"){
        if(!req.body.question){
            return res.status(400).send({ error: 'Question field is required!' });
        }

        if(!req.body.option1){
            return res.status(400).send({ error: 'Option1 field is required!' });
        }

        if(!req.body.option2){
            return res.status(400).send({ error: 'Option2 field is required!' });
        }

        if(!req.body.option3){
            return res.status(400).send({ error: 'Option3 field is required!' });
        }

        if(!req.body.option4){
            return res.status(400).send({ error: 'Option4 field is required!' });
        }

        if(!req.body.answer){
            return res.status(400).send({ error: 'Answer field is required!' });
        }

        if(!req.body.difficulty){
            return res.status(400).send({ error: 'Difficulty field is required!' });
        }

        const question = new Question({
            id: req.body.id,
            question: req.body.question,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            answer: req.body.answer,
            difficulty: req.body.difficulty
        });
      
        try{
            const newQuestion = await question.save();
            res.status(201).json(newQuestion);
        }catch(error){
            res.status(400).send({ error });
        }

        next();
    }
    else{
        res.json({
            message:"you are not an admin"
        })
    }
}

const getAllQuestions = async (req, res, next) => {
    if(req.verifyUser.role=="admin"){
    try{
        const questions = await Question.find();
        res.status(200).json(questions);
    }catch(error){
        res.status(500).send({ error });
    }

    next();
    }
    else{
        res.json({
            message:"you are not an admin"
        })
    }
}

const getQuestion = async (req, res, next) => {
    if(req.verifyUser.role=="admin"){
    res.json(res.question);
    next();
    }
    else{
        res.json({
            message:"you are not an admin"
        })
    }
}

const updateQuestion = async (req, res, next) => {
    if(req.verifyUser.role=="admin"){
    if(req.body.id) res.question.id = req.body.id;
    if(req.body.question) res.question.question = req.body.question;
    if(req.body.option1) res.question.option1 = req.body.option1;
    if(req.body.option2) res.question.option2 = req.body.option2;
    if(req.body.option3) res.question.option3 = req.body.option3;
    if(req.body.option4) res.question.option4 = req.body.option4;
    if(req.body.answer) res.question.answer = req.body.answer;
    if(req.body.difficulty) res.question.difficulty = req.body.difficulty;

    try{
        const updatedQuestion = await res.question.save();
        res.status(201).json(updatedQuestion);
    }catch(error){
        res.status(400).send({ error });
    }

    next();
    }
    else{
        res.json({
            message:"you are not an admin"
        })
    }
}

const deleteQuestion = async (req, res, next) => {
    if(req.verifyUser.role=="admin"){
    try{
        await res.question.remove();
        res.send({ msg: `Question with id: ${req.params.id} deleted successfully!`});
    }catch(error){
        res.status(500).send({ error });
    }
    
    next();
    }
    else{
        res.json({
            message:"you are not an admin"
        })
    }
}

module.exports = {
    getQuestionById,
    createQuestion,
    getAllQuestions,
    getQuestion,
    updateQuestion,
    deleteQuestion
};