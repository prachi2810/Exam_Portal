const mongoose = require('mongoose');
const AutoIncrement=require('mongoose-sequence')(mongoose);
const questionGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
    },
    questionID: {
        type: [],
        required: true
    }
})
questionGroupSchema.plugin(AutoIncrement,{

    inc_field:'questionId',

    id:'nums',

    start_seq:1

})
module.exports = mongoose.model('QuestionGroup', questionGroupSchema);

