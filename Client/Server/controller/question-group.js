const QuestionGroup = require('../models/question-group');

const getQuestionGroupById = async (req, res, next) => {

    let questionGroup;
    if(req.verifyUser.role=="admin"){
    try{
        questionGroup = await QuestionGroup.findOne({ nums: req.params.id });
        if(questionGroup == null){
            return res.status(404).send({ msg: `Cannot find question with id: ${req.params.id}`});
        }
    }catch(error){
        return res.status(500).send({ error });
    }
    res.questionGroup = questionGroup;
    next();
    }
    else{
        res.json({
            message:"you are not an admin"
        })
    }
}

const createQuestionGroup = async (req, res, next) => {
    if(req.verifyUser.role=="admin"){
    if(!req.body.name){
        return res.status(400).send({ error: 'Name field is required!' });
    }

    if(req.body.questionID.length === 0){
        return res.status(400).send({ error: 'Please provide atleast one questionId' });
    }

    const questionGroup = new QuestionGroup({
        name: req.body.name,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        questionID: req.body.questionID
    });

    try{
        const newQuestionGroup = await questionGroup.save();
        res.status(201).json(newQuestionGroup);
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

const getAllQuestionGroups = async (req, res, next) => {
    if(req.verifyUser.role=="admin"){
    try{
        const questionGroups = await QuestionGroup.find();
        res.status(200).json(questionGroups);
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

const getQuestionGroup = async (req, res, next) => {
    if(req.verifyUser.role=="admin"){
    res.json(res.questionGroup);
    next();
    }
    else{
        res.json({
            message:"you are not an admin"
        })
    }
}

const updateQuestionGroupById = async (req, res, next) => {
    if(req.verifyUser.role=="admin"){
    if(req.body.name) res.questionGroup.name =  req.body.name;
    res.questionGroup.updatedAt = new Date().toString();
    if(req.body.questionID) res.questionGroup.questionID = req.body.questionID;

    try{
        const updatedQuestionGroup = await res.questionGroup.save();
        res.status(201).json(updatedQuestionGroup);
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

const deleteQuestionGroupById = async (req, res, next) => {
    if(req.verifyUser.role=="admin"){
    try{
        await res.questionGroup.remove();
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
    getQuestionGroupById,
    createQuestionGroup,
    getAllQuestionGroups,
    getQuestionGroup,
    updateQuestionGroupById,
    deleteQuestionGroupById
}