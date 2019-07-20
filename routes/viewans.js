const express = require('express'),
    router = express.Router(),
    auth2 = require('../middlewares/auth2'),
    {Ques,quesValidate} = require('../models/ques'),
    getPopular = require('../views/js/getPopular'),
    {Ans,ansValidate} = require('../models/ans')
router.get('/:id',auth2, async (req, res) => {
    
    _id = req.params.id
    let ques
    try{
        ques = await Ques.findById(_id)
        ques.views = ques.views +1;
        result = await ques.save()
        
        ans = await Ans.find({ques_id:_id})
        if(ans.count == 1){
            ans = [ans];
        }
        console.log(ans);
        res.render("viewans.ejs",{user:req.user,ques:[ques],ans:ans,isHome:false,title:'viewans'})   
    } 
    catch(ex){
        console.log(ex.message)
    }   
})

module.exports = router;
