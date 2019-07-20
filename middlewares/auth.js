const jwt = require('jsonwebtoken');
const config = require('config');

module.exports  = function (req,res,next){
   const token = req.cookies.Token;
   //const token = req.header('x-auth-token');
    console.log(req.cookies.Token);
    //if(!token) return res.status(401).send("Hey Noobs! grow up Man..No token provided");
    //if(!token) return  res.redirect('/');
    // console.log(token);
    
    try{
        const decoded = jwt.verify(token,config.get('jwtPrivateKey')); // returns decoded token
        req.user = decoded;
        next();
    }catch (ex){
        res.status(400).send("Invalid token ...");
    }
    
    
}

