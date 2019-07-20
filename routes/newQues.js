const express = require('express');
const router = express.Router();

router.get('/',(req,res) =>{
    res.render("editor.ejs");   // we can use redirect  
});

module.exports = router;