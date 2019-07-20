const express = require('express')
    router = express.Router()
    auth2 = require('../middlewares/auth2')
    fuse = require('fuse.js')
    getPopular = require('../views/js/getPopular')
router.get('/',auth2,async (req,res) =>{
    
    try{       
        list = await getPopular()     
          //  res.send("Hello");
         res.render("home.ejs",{user:req.user,ques:list,isHome:true,title:'home'})        
    }
    catch(ex){
        console.log(ex.message);
    }
});

module.exports = router;
