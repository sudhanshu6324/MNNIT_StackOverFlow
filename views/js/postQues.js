
$(document).ready(function(){
	$("#postQues").on('click',function(){
		console.log("Hello");
		var asd = CKEDITOR.instances['content'].getData()
		var title=$('textarea#title').val();
		$.post("/api/postQues",{title:title,content:asd},function(result){
			if(result.code == 1){
				alert("Question Successfully Posted")
				setTimeout(function(){ window.location.replace("http://localhost:3000")},1500)
			}else if(result.code == -1){
				alert("Please login to Ask Any question")
			}else{
				alert(result.err)	
			}	
			
		})	
	});
});
	