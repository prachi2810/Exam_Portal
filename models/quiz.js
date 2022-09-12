const mongoose = require('mongoose');
const AutoIncrement=require('mongoose-sequence')(mongoose);
const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    questionGroup: {
        type: [],
        required: true
    }
})

quizSchema.plugin(AutoIncrement,{

    inc_field:'quizId',

    id:'numQuiz',

    start_seq:1

})
module.exports = mongoose.model('Quiz', quizSchema);