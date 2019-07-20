
$(document).ready(function(){
	console.log($('.our-services-wrapper').attr('data-id'))
	$("#postAns").on('click',function(){
		console.log("hello");
		console.log("Hello");
		var ans = CKEDITOR.instances['content'].getData()
        id = $('.our-services-wrapper').attr('data-id')
		$.post("/api/postAns/"+id,{ans:ans},function(result){
			if(result.code == '0'){
				$('#message').html("Please Login to ans this ques")
			}else if(result.code == -1){
				$('#message').html("Ans can't be empty");
			}else if(result.code == -2){
				$('#message').html("You Have already answered this question");
			}else if(result.code == -3){
				$('#message').html(resul.code);
			}else{
				$('#message').html("Your Answer was successfully recorded refreshing page to view")
				setTimeout(function(){location.reload()},1500)
			}
			$("#ckeditor").html = ''
			console.log(result)
		})	
	});
});
	