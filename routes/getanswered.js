const express = require('express'),
    router = express.Router(),
    auth2 = require('../middlewares/auth2'),
    fuse = require('fuse.js'),
    {Ans,ansValidate} = require('../models/ans'),
    {Ques,quesValidate} = require('../models/ques')
    
router.post('/',async (req,res) =>{
        const ans = await Ans.find({author_id:req.body._id}).select({ques_id:1})
        ques = []
        ans.forEach(function(item){
            ques.push(Ques.findById(item.ques_id))
        })
        
        Promise.all(ques)
            .then((ques)=>{
                res.render('./partials/quespalette.ejs',{ques:ques,isHome:true});
            })
        

})

module.exports = router;
