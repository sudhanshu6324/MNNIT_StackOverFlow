const express = require('express'),
    router = express.Router(),
    auth2 = require('../middlewares/auth2'),
    fuse = require('fuse.js'),
    {Ques,quesValidate} = require('../models/ques')
    
router.post('/',async (req,res) =>{
        Ques.find({author_id:req.body._id}).then((ques=>{
            res.render('./partials/quespalette.ejs',{ques:ques,isHome:true});
        }))

})

module.exports = router;
