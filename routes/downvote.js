const express = require('express'),
    router = express.Router(),
    auth2 = require('../middlewares/auth2'),
    {Ques,quesValidate} = require('../models/ques'),
    {Ans,ansValidate} = require('../models/ans'),
    {User,validate} = require('../models/users')
router.post('/',auth2,async (req,res,next) =>{
    // ques_id = req.body.ques_id
    if(!req.user){
        res.send({code:'0'})
        next()
    }
    ans_id = req.body.ans_id
    author_id = req.body.author_id
    user_id=req.user._id
    
    voter = await User.findById(user_id)
    if(voter.score < 100){
        res.send({code:'-2'})
    }
    
    try{
        ans = await Ans.findById(ans_id)
       
        let flag=0,i=0;
        ans.upvoted_by.forEach(function(element) {            
           if(element.id == user_id){
                if(element.code == -1){
                    flag = 1;
                }else{
                    ans.upvoted_by.splice(i-1,1)
                }
                // flag = 1;
                // console.log(ans.upvoted_by)
                // ans.upvoted_by.splice(i-1,1)
                // console.log(ans.upvoted_by)
                // break;
           }
           i++;
        })
        
        if(flag == 1){
            res.send({code:'1'});
        }else{
            ans.votes = ans.votes-1;
            upvo = {code:-1,id:user_id}
            ans.upvoted_by.push(upvo);
            user = await  User.findById(author_id)
            user.score = user.score-50
          //  console.log(author_id)
            console.log(ans);
            const result2 = await user.save();
            const result = await ans.save()
            res.send({code:'1'});
        }
      //  console.log(ans.upvoted_by)
    }
    catch(ex){
        res.status(400).send({code:'-1',error:ex.message});
        console.log(ex.message);
    }
});

module.exports = router;
