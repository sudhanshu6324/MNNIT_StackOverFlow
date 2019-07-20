const jwt = require('jsonwebtoken');
const config = require('config');
const passport = require('passport');

module.exports  = function (req,res,next){
    const token = req.cookies.Token;
    const session = req.cookies.session;
   // console.log(session)
   //console.log("pta nhi")
    if(token){       
         try{
             const decoded = jwt.verify(token,config.get('jwtPrivateKey')); // returns decoded token
             req.user = decoded;             
             next();
         }catch (ex){
            //console.log("bye")
             req.user='';
         }
    }else{
        console.log("hi")
        next();
    }
}

