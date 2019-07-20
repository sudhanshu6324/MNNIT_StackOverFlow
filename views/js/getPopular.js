const {Ques,quesValidate} = require('../../models/ques');

module.exports = async function ()  { 
    // arr = new Array();
    // arr = str.split(' ');
    let list;
    try{
        list = await Ques
            .find()
            .sort({views: -1}) 
            return list;
        //console.log(list);    
    }        
    catch(ex){
      //  res. res.send("Something Went Wrong in getPopular");
    }
   
   // console.log(list)
   

}