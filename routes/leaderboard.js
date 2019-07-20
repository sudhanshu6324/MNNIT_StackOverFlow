const express = require('express'),
    router = express.Router(),
    auth2 = require('../middlewares/auth2'),
    {User,validate} = require('../models/users')

router.get('/',auth2,async (req,res) =>{
   
    try{       
        list = await User.find().sort({score:-1})
        console.log(list)
        //res.send("hello")
        //console.log(list)
        res.render("leaderboard.ejs",{user:req.user,list:list,title:'leaderboard'})        
    }
    catch(ex){
        console.log(ex.message);
    }
});

module.exports = router;
