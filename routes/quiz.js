const express = require('express');
const { getQuizById, createQuiz, getAllQuiz, getQuiz,
     updateQuiz, deleteQuiz } = require('../controller/quiz');
const router = express.Router();
const auth=require("../middleware/auth");
router.post('/',auth,createQuiz, async (req, res) => {
    
})

router.get('/',auth,getAllQuiz, async (req, res) => {

})

router.get('/:id',auth,getQuizById, getQuiz, async (req, res) => {
    
})

router.put('/:id',auth,getQuizById, updateQuiz, async (req, res) => {
    
})

router.delete('/:id',auth,getQuizById, deleteQuiz, async (req, res) => {
   
})

module.exports = router;