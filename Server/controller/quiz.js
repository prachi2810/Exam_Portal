const Quiz = require('../models/quiz');

const getQuizById = async (req, res, next) => {
    let quiz;

    try{
        quiz = await Quiz.findOne({ numQuiz: req.params.id });
        if(quiz == null){
            return res.status(404).send({ msg: `Cannot find question with id: ${req.params.id}`});
        }
    }catch(error){
        return res.status(500).send({ error });
    }
    res.quiz = quiz;
    next();

    
}

const createQuiz = async (req, res, next) => {
    if(req.verifyUser.role=="admin"){
    if(!req.body.title){
        return res.status(400).send({ error: 'Title field is required!' });
    }

    if(!req.body.startTime){
        return res.status(400).send({ error: 'Start Time field is required!' });
    }

    if(!req.body.endTime){
        return res.status(400).send({ error: 'End Time field is required!' });
    }

    if(req.body.questionGroup.length === 0){
        return res.status(400).send({ error: 'Please provide atleast one question group!' });
    }

    const quiz = new Quiz({
        title: req.body.title,
        description: req.body.description,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        questionGroup: req.body.questionGroup
    });

    try{
        const newQuiz = await quiz.save();
        res.status(201).json(newQuiz);
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

const getAllQuiz = async (req, res, next) => {
    try{
        const quiz = await Quiz.find();
        res.status(200).json(quiz);
    }catch(error){
        res.status(500).send({ error });
    }

    next();
}

const getQuiz = async (req, res, next) => {
    res.json(res.quiz);
    next();
}

const updateQuiz = async (req, res, next) => {
    if(req.verifyUser.role=="admin"){
    if(req.body.title) res.quiz.title =  req.body.title;
    if(req.body.description) res.quiz.description = req.body.description;
    if(req.body.startTime) res.quiz.startTime = req.body.startTime;
    if(req.body.endTime) res.quiz.endTime = req.body.endTime;
    if(req.body.questionGroup) res.quiz.questionGroup = req.body.questionGroup;

    try{
        const updateQuiz = await res.quiz.save();
        res.status(201).json(updateQuiz);
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

const deleteQuiz = async (req, res, next) => {
    if(req.verifyUser.role=="admin"){
    try{
        await res.quiz.remove();
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
    getQuizById,
    createQuiz,
    getAllQuiz,
    getQuiz,
    updateQuiz,
    deleteQuiz
};