
const Fuse = require('fuse.js'),
    {Ques,quesValidate} = require('../../models/ques')

module.exports = async function(str){ 
    // arr = new Array();
    // arr = str.split(' ');
    list = await Ques.find();
    var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "title",
          "content"
      ]
      };
    var fuse = new Fuse(list, options); // "list" is the item array
    var result = fuse.search(str);
   console.log(result);
    return result;
}



// function escapeRegex(text) {
    //     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    // };
    // console.log(str);
    // const regex = new RegExp(escapeRegex(str), 'gi');
    //     // Get all campgrounds from DB
    //     console.log(regex);
    //     Ques.find({'content': regex}, function(err, allCampgrounds){
    //        if(err){
    //            console.log(err);
    //        } else {
    //           consol.log(allCampgrounds);
             
    //        }
    // });

     // Ques.find({content:{ $regex: /going kumar/, $options: 'i' }}, function (err, docs) {
    //     console.log(docs);
    //  })
    //newStr =  Ques.find({content:{$in:arr}});
   // console.log(newStr)
    