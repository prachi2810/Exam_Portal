const express = require('express');
const { getQuestionGroupById, createQuestionGroup, getAllQuestionGroups, getQuestionGroup,
     updateQuestionGroupById, deleteQuestionGroupById } = require('../controller/question-group');
const router = express.Router();
const auth=require("../middleware/auth");
router.post('/',auth,createQuestionGroup, async (req, res) => {
    
})

router.get('/',auth,getAllQuestionGroups, async (req, res) => {
    
})

router.get('/:id',auth,getQuestionGroupById, getQuestionGroup, async (req, res) => {
    
})

router.put('/:id',auth,getQuestionGroupById, updateQuestionGroupById, async (req, res) => {
    
})

router.delete('/:id',auth,getQuestionGroupById, deleteQuestionGroupById, async (req, res) => {
    
})

module.exports = router;