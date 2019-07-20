const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/',auth2,(req,res) =>{
    res.render("ask.ejs",{user:req.user,title:'ask'});   // we can use redirect  
    console.log(req.user)
//res.send("Hello");
});

module.exports = router;
