$(document).ready(function(){
		$("#postQues").on('click',function(){
			$.ajax({  
                    content : $('#content').val(),
					url : '/api/validateQues',
					method :'post',
					data : {
							 content:content
					         },
					dataType :'text', 
					success :   function(response){
												$("#message").html('Success')				    
												// if(response == "-1")
												// 	{$("#message").html("Too Short ");
												// }else
												// if(response == "1"){
												// 	$("#message").html("Question Submitted successfully");			
												// }
								}											
			})		
		})
})	