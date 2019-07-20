const {User,validate} = require('../models/users');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi'); 
const auth2 = require('../middlewares/auth2');   // use it alllowing only certain access like marking some places protected
const admin = require('../middlewares/admin');


router.get('/login',auth2,(req,res) =>{
    res.render("login.ejs",{user:req.user,title:'login'});
});

router.get('/signup',auth2,(req,res) =>{
    res.render("signup.ejs",{user:req.user,title:'signup'});
});


router.post('/login',
  async(req,res)=>{
        // some validation function
        //  if error send 400
        const {error} = validateLogin(req.body);
        
        if(error) res.send({code:0});
        console.log(req.body);
        let user = await User.findOne({email:req.body.email});
        if(!user){
            return res.send({code:-1});
        }

        const isItValid = await bcrypt.compare(req.body.password,user.password);
        if(isItValid){
            
            res.cookie('Token',user.generateAuthToken(),{ maxAge: 24*60*60*1000, httpOnly: true })
            res.send({code:1})
        }else{
            return res.send({code:-2});
        }

  }
)


router.get('/google/redirect',passport.authenticate('google', { failureRedirect: '/auth/login' }),
    function(req, res) {
       // id = res.user.id

         res.redirect('/');
    }
);


router.get('/google',passport.authenticate('google',{ scope:['profile','email'] }));

// 0: invalid input
// -1: email already exist
// -2: could not save

router.post('/signup',async (req,res) =>{
    console.log(validate(req.body))
    const {error} = validate(req.body);
    if(error){
        return res.send({code:0,err:error.message});
    }
    let user = await User.findOne({email:req.body.email})
    if(user){
            return res.send({code:-1});
    }
    user = new User({
        name : req.body.username,
        email: req.body.email,
        password :req.body.password,
        });
    
    try{
        const hash = await bcrypt.genSalt(8);
        user.password = await bcrypt.hash(user.password,hash)
        const result = await user.save(function(err){
            if(err){
                res.send({code:-2,err:err.message})
            }else{
                //res.send("Done")
                res.cookie('Token',user.generateAuthToken(), { maxAge: 900000, httpOnly: true });    
                res.send('1');
            }
        })       
    }catch (err){
        console.log("second");
        console.log(err.message);//  this is not working
        res.redirect('/auth/signup').send("vs");
    }
      
});


function validateLogin(body){
    const schema = {
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(50).required()
    };
   
    return Joi.validate(body,schema);
}

  
// eq (equal)  use find(price: {$eq: 10})
// ne (not equal) price: {$gte:10 , $lte:60}  greater than less 10less than 60
// gt (greater than) .fing(price : {$gt})
// gte (greter than equal to)
// lte
// in 
// nin !in
// author: /^Sudh/ begins with Sudh 
// author: /Sudh$/i ends with Sudh with case in sensitive
// author: /.*dhans.*/ contains dhans


module.exports = router;