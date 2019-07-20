const mongoose = require('mongoose'),
     Joi = require('joi'),  //for validating
     jwt = require('jsonwebtoken'),
     config = require('config')
//const PasswordComplexity = require('joi-password-complexity');

  
const userSchema = new mongoose.Schema({
    name:{type: String ,
        required: true ,
        minlength:5,
        maxlength:250,
        lowercase:true
    },
    email:{type: String ,
       // required: true,
        trim:true,  //to remove paddings
        unique: true,
        // validate:{
        //     validator: function(e) {
            
        //     }
        // }
    },
    password:{
        required: true,
        type: String,
    },
    ques_answered:[{
        type: String
    }],
    ques_posted:[{
        type: String
    }],
    score:{
        type:Number,
        default:0
    },
    date:{type: Date, default: Date.now},
    isAdmin:{
        type:Boolean,
        default:false
    },
    googleid:{
        type:String
    },
    token:{
        token:String,
        time:Number
    },
    gemail:{
        type:String,
        default:"Not Provided"
    }               
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,name:this.name,isAdmin:this.isAdmin},config.get('jwtPrivateKey')); // the actual value is in environment variable
    return token;
}
const User = mongoose.model('User',userSchema);  // 1st arg is the singular object in database 2nd is Schema

function validate(user){
    const schema = {
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(8).max(50).required(),
        password: Joi.string().min(5).max(50).required()
    };
    // Joi.validate(user.password, new PasswordComplexity(complexityOptions), (err, value) => {
    //    if(err){
    //        return value;
    //    }
    //   })
      //we can also validate password for some pattern
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = validate;
