const express = require('express'),
    router = express.Router(),
    auth2 = require('../middlewares/auth2'),
    {Ques,quesValidate} = require('../models/ques'),
    {User,validate} = require('../models/users')
router.get('/:id',async (req,res) =>{
    //res.send("Hello")        
    id = req.params.id
    try{
        user = await User.findById(id)
        if(user){
            res.render('profile.ejs',{user:user,title:'profile'})
        }else{
            res.status(404).send("Not Found");
        }
    }
    catch(ex){
        res.status(500).send("Something went wrong :",ex.message);
    }
    
})

module.exports = router;
