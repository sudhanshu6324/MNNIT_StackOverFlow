const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {Ques,quesValidate} = require('../models/ques');

router.post('/',auth2,(req,res) =>{
    
    if(!req.user){res.send({code:-1})}
    const content = req.body.content;
    const title1 = req.body.title;
    const {error} = quesValidate({title:title1,content:content});
    console.log(error)
    if(error) return res.send({code:0,err:error.message});
   
    ques = new Ques({
        title:title1,
        content:content,
        author_id:req.user._id,
        author:req.user.name
    });
    try{
        ques.save()
            .then(result => res.send({code:1}));
    }
    catch(ex){
        res.send({code:-1,err:'some internal server error'});
    }
    
});

module.exports = router;
