const express = require('express'),
    router = express.Router(),
    auth2 = require('../middlewares/auth2'),
    fuse = require('fuse.js'),
    {Ques,quesValidate} = require('../models/ques'),
    getResults = require('../views/js/getResults')

router.get('/',auth2,async (req,res) =>{
    result = await getResults(req.query.sad);
    
    res.render("home.ejs",{user:req.user,ques:result,isHome:true,title:'result'});
    
    // we can use redirect  
    //console.log(req.user)
    //res.send(result);
});

module.exports = router;
