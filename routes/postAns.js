const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {Ans,ansValidate} = require('../models/ans');
const {User,validate} = require('../models/users');

router.post('/:id',auth2,async (req,res) =>{
    
    if(!req.user){
        res.send({code:'0'})
    }
    let content = req.body.ans;
    let ques_id = req.params.id;
    if(content == ''){
        res.send({code:'-1'});  //-1 for empty or deleted field
    }
   
// check if user has already anwered this ques  
    ans = await Ans.findOne({author_id:req.user._id,ques_id:ques_id})
    if(ans){
        res.send({code:'-2'})    // already answered
    }else{
        ans = {
            content:content,
            author:req.user.name,
            author_id:req.user._id,
            ques_id:ques_id
        };
        
        user = await User.findById(req.user._id)
        user.score = user.score + 10
        
        // const {error} = ansValidate(ans);    
        // if(error) return res.send({code:0,error:error.message});   //to handle wrong inputs  // alphanumeric problem
    
        ans = new Ans(ans);
        
        try{
            user = await user.save()
            ans.save()
                .then(result => res.send({code:'1'}));
            console.log("Reached")    
        }
        catch(ex){
            res.send({code:-3,error:ex.message});
        }
    }   
   
    
});

module.exports = router;
