const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const startDebugger = require('debug')('app:startup'); // set DEBUG=app:startup to use this
const passportSetup = require('./config/passport-setup'); // this is kick start passport-setup
const passportLocalSetup = require('./config/passport_local_setup');
const passport = require('passport');
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
const winston = require('winston');
require('winston-mongodb');
const cookieSession = require('cookie-session');
const key = require('./config/keys');
const error = require('./middlewares/error');
const logger = require('./middlewares/logger')

//winston.add(winston.transports.File,{filename:'logfile.log'});
//winston.add(winston.transports.MongoDB)

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[key.session.cookieKey]
}));
app.use(session({ secret: "cats" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize()); // initialise passport
app.use(passport.session()); 

if(!config.get('jwtPrivateKey')){       // to set it run set stack_jwtPrivateKey=myKeyWhatever
    console.error('ERROR : jwtPrivateKey is not set');
    process.exit(1);        // 1 for error 0 for success
}
 
app.use(morgan('tiny'));     //this is log list //will display on console
app.use(helmet());
app.use(morgan('dev'));   
app.set('view engine','ejs');             //app.use(express.urlencoded);  //converts url encoded params to key value pair
app.use('/static', express.static('public'))   //this is to fool the client that there is a satic file on the server
app.use('/static', express.static(path.join(__dirname, 'views'))) //app.use(express.static('public'));



require('./startup/db')();
require('express-async-errors');
require('winston-mongodb');
require('./startup/routes')(app);



// this is to catch some unhandeled exception
process.on('uncaughtException',(ex)=>{
    console.log("There was some uncaught exception");
   // winston.error(ex.message,ex); // to log in file
})
// process.on('unhandledRejection',(ex)=>{
//     console.log("There was some unhandled Promise");
// })
// const p = Promise.reject(new Error('Rejected Promise'));
// p.then(()=>console.log("Handeled"))

//in case you want to store log in data base
//winston.add(winston.transports.File,{filename: 'logfile.log'});
// winston.add(winston.transports.MongoDB,{
//      db: 'mongodb://localhost/stack',
//      level: 'info' // everything till info will be logged
// });








//getting cofigs
startDebugger(port); //Again not working
startDebugger(process.env.NODE_ENV);
console.log('Application name : '+config.get('name'));
console.log('Application name : '+config.get('mail.host'));


app.listen(port,()=>{
    console.log(`Listening on ${port}...`);
});
