const mongoose = require('mongoose');
const AutoIncrement=require('mongoose-sequence')(mongoose);
const questionSchema = new mongoose.Schema({
    
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    }
})
questionSchema.plugin(AutoIncrement,{

    inc_field:'uId',

    id:'Id',

    start_seq:1

})
module.exports = mongoose.model('Question', questionSchema);