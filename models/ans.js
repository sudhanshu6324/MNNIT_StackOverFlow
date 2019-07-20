const mongoose = require('mongoose');
const Joi = require('joi');   //for validating

const ansSchema = new mongoose.Schema({
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
    ques_id:{
        type:String,
        required:true
    },
    time:{
        type: Date,
        default: Date.now},
    votes:{
        type:Number,
        default:0},
    upvoted_by:[{
        code:Number,
        id:{
            type:String
        }
    }]      
});

// here comes the concept of models and Schema
// so model = Class and Schema = defines shape of data

const Ans = mongoose.model('Ans',ansSchema);


function validate(ans){
    const schema = {
        content: Joi.string().min(10).max(500).required(),
        author: Joi.string().min(5).max(50).required(),
        author_id: Joi.string().min(5).max(40).required(),
        ques_id: Joi.string().min(5).max(40).required(),
    
    };
    console.log("is there eerror",Joi.validate(ans,schema))
      //we ca also validate password for some pattern
    return Joi.validate(ans,schema);
}
exports.Ans = Ans;
exports.ansValidate = validate;