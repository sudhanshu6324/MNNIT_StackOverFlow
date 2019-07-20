function upvote(id) {
        console.log(id);
       
         ans_id = $("#"+id).attr('data-id')
         author_id = id
         ques_id = $('.our-services-wrapper').attr('data-id')
         
        console.log(id)
        $.post("/api/upvote",{ans_id:ans_id,author_id:author_id,ques_id:ques_id},function(result){
                if(result.code == 0){
                    alert("Login to upvote")
            }else if(result.code == -1){
                    alert(result.error)
            }else{
                location.reload();
            }              
        })	      
}