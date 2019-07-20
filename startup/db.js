const mongoose = require('mongoose');
const logger = require('../middlewares/logger')
module.exports = function (){
    mongoose.connect('mongodb://localhost/stack')
        .then(() => logger.info("connected to database"))
        .catch(err => logger.info('Could not connect',err));  // err is an error object

}