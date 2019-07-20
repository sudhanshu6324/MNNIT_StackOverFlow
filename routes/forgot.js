const express = require('express'),
    router = express.Router(),
    auth2 = require('../middlewares/auth2'),
    crypto = require('crypto'),
    nodemailer = require('nodemailer'),
    {User,validate} = require('../models/users'),
    bcrypt = require('bcrypt')

router.get('/',auth2 ,(req,res) =>{     
        res.render('forgot.ejs',{user:req.user,title:'forgot'})
        //res.send("Hello");
});

router.post('/',async (req,res) => {
	const mail=req.body.email;
	var token;
      crypto.randomBytes(20, function(err, buf) {
       token = buf.toString('hex');
      });
      console.log(mail) 
    user = await User.findOne({email:mail})
    
    if(!user){
        res.send({code:0})
    }else{
        console.log("helloq")
        console.log("Email Exists");
        var time=Date.now()+30*1000*60;
        console.log("valid till",time)
        console.log("Now is",Date.now())
        console.log("Token = ",token)
        user.token = {token,time} 
        try{
            const result = await user.save()
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: '25',
                auth: {
                        user: 'sudhanshuat6324@gmail.com',
                        pass: 'abkyalikhu'
                    },
                    secureConnection: 'false',
                    tls: {
                        ciphers: 'SSLv3'
                    }
                });
                var mailOptions = {
                    to:mail,
                from: 'sudhanshuat6324@gmail.com',
                subject: 'Stack Over flow  Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/api/forgot/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
        
                transporter.sendMail(mailOptions, function(error,info) {                    
                    if (error) {
                        res.send({ code : -1, message : 'Internal Error' });
                    }
                    else{
                        res.send({ code : 1, message : 'Email Sent Check Inbox' });
                    }
                });
        }
        catch(ex){
            res.send({ code : -1, message : 'Internal Error' });
        }
               
    }   
});

router.get('/reset/:id',async (req,res)=>{
   
    try{
        const user = await User.findOne({'token.token':req.params.id})
       // console.log(user)
        if(!user){
             res.redirect('/api/login');
        }else{
            //console.log(user)
            if(user.token.time < Date.now()){
                //console.log("Now is ",Date.now())
                console.log("Invalid token or Date expired");
		  	    res.redirect('/api/forgot');
            }else{
                res.cookie('Token',user.generateAuthToken(),{ maxAge: 24*60*60*1000, httpOnly: true })
                user.password=''
                res.render('reset.ejs',{user:user,title:'reset'});
                //res.send("reached")
            }
        }
    }
    catch(ex){
        conslole.log(ex.message)
    }
	
});
router.post('/reset',auth2,async (req,res,next) => {
    password = req.body.password

    if(!req.user){
        res.status(400).send({code:-1,error:"Not Found"});
        //res.redirect('/api/forgot')
    }else{
        try{
            user = await User.findById(req.user._id)
            if(!user){
                res.status(400).send({code:-1,error:"Not Found"});
            }else{
                if(password.length<5){
                    res.send({code:-1,error:"Too Short password"})
                    next();
                }
                const hash = await bcrypt.genSalt(8);
                user.password = await bcrypt.hash(password,hash)
                const result = await user.save(function(err){
                if(err){
                    res.send({code:-1,error:err.message})
                }else{
                    //res.send("Done")
                    res.cookie('Token',user.generateAuthToken(), { maxAge: 900000, httpOnly: true });    
                    res.send({code:1});
                }
                })   // end of result
            }
        }
        catch(ex){
            res.send({code:-1,error:ex.message})
        }
    }    
})

module.exports = router;
