const express = require('express');
const { getQuestionById, createQuestion, getAllQuestions, getQuestion,
     updateQuestion, deleteQuestion} = require('../controller/question');
const router = express.Router();
const auth=require("../middleware/auth");
router.post('/', auth, createQuestion, async (req, res) => {
    
})

router.get('/', auth, getAllQuestions, async (req, res) => {
    
})

router.get('/:id', auth, getQuestionById, getQuestion, async (req, res) => {
    
})

router.put('/:id', auth, getQuestionById, updateQuestion, async (req, res) => {
    
})

router.delete('/:id', auth, getQuestionById, deleteQuestion, async (req, res) => {
    
})

module.exports = router;