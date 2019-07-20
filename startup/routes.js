

const home = require('../routes/home'),
    auth = require('../routes/auth'),
    error = require('../middlewares/error'),
    ques = require('../routes/ques'),
    newQues = require('../routes/newQues'),
    ask = require('../routes/ask'),
    postQues = require('../routes/postQues'),
    logout = require('../routes/logout'),
    search = require('../routes/search'),
    viewans = require('../routes/viewans'),
    postAns = require('../routes/postAns'),
    upvote = require('../routes/upvote'),
    downvote = require('../routes/downvote')
    profile = require('../routes/profie'),
    getquestioned = require('../routes/getquestioned'),
    forgot = require('../routes/forgot'),
    getanswered = require('../routes/getanswered'),
    leaderboard = require('../routes/leaderboard')

module.exports = function(app){
    app.use('/api/leaderboard',leaderboard);
    app.use('/api/forgot',forgot);
    app.use('/api/ask',ask);
    app.use('/api/getanswered',getanswered);
    app.use('/api/getquestioned',getquestioned);
    app.use('/api/profile',profile);
    app.use('/api/downvote',downvote);
    app.use('/api/upvote',upvote);
    app.use('/auth',auth);
    app.use('/api/ques',ques);
    app.use('/viewans',viewans);
    app.use('/api/postQues',postQues);
    app.use('/api/postAns',postAns);
    app.use('/api/logout',logout);
    app.use('/api',profile);
    app.use('/api/newQues',newQues);
    app.use('/search',search);
    app.use('/',home);
    app.use(error);
   
}
