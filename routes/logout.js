const express = require('express');
const router = express.Router();

router.get('/',(req,res) =>{
    res.cookie("session.sig", "", { expires: new Date() });
    res.cookie("session", "", { expires: new Date() });
    res.clearCookie("Token").redirect('/');   // we can use redirect  
});

module.exports = router;
