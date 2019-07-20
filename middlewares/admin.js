module.exports = function (req,res,next){
    //401 Unauthorized == providing wrong tokens 
    //403 Forbidden == providing right token but not allowed to access resourse
    if(!req.user.isAdmin) return res.status(403).send("Forbidden");

    next();
}