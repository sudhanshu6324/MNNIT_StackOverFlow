const mongoose = require('mongoose');
const Joi = require('joi');   //for validating
var searchable = require('mongoose-searchable');

const quesSchema = new mongoose.Schema({
    title :{
        type: String,
        minlength:2,  // should be increased
        required: true},
    content:{
        type: String,
        minlength: 2,//should be increased
        required: true
    },
    author:{
        type: String,
        required: true
    },
    author_id:{
        type:String,
        required:true
    },
    time:{
        type: Date,
        default: Date.now},
    votes:{
        type:Number,
        default:0},
    views:{
        type:Number,
        default:0},
    noOfAns:{
        type:Number,
        default:0}    
});

// here comes the concept of models and Schema
// so model = Class and Schema = defines shape of data
// quesSchema.plugin(searchable)

const Ques = mongoose.model('Ques',quesSchema);

function validate(body){
    const schema = {
        title: Joi.string().min(5).max(100).required(),
        content: Joi.string().min(5).max(5000).required(),
    };
    
    return Joi.validate(body,schema);
}

exports.Ques = Ques;
exports.quesValidate = validate;