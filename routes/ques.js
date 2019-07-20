const express = require('express');
const router = express.Router();

router.get('/:_id',(req,res) =>{
    res.send(req.params._id);
    //res.render("ques.ejs");   // we can use redirect  
    //console.log(req.user)
});

module.exports = router;