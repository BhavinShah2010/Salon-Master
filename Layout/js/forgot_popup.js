


$(window).load(function() {
	$("#get_email_id").val() = "";

      
});



$(document).ready(function () {



$('#forgot_password').click(function () {
			
				$("#popup_box").css("-webkit-transition","all 1s ease");
				$("#popup_box").css("-moz-transition","all 1s ease");
				$("#popup_box").css("-o-transition","all 1s ease");
				$("#popup_box").css("display","block");
				$("#main_box").css("display","block"); 
				$("#popup_box").animate({opacity:"1.0"});
						
		});

		$('#close').click (function () {
			$("#main_box").css("display","none"); 
				$("#popup_box").css('display',"none");
		});

		$( document ).on( 'keydown', function ( e ) {
   			 if ( e.keyCode === 27 ) { // ESC
        		$( "#main_box" ).hide();
   		 }
});


		$('#get_pass').click(function () {

			var email_val = $("#get_email_id").val();

				//email_val = "";
			
			//alert(email_val);
			if(email_val == "")
			{	
				//alert(email_val);
						$('#get_pass_errmsg').text('Please Enter EmailID');	
					    $('#get_pass_err').css('display','table-row');
                         return false;
			}

			else if(email_val != "")
			 {
            	var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            	if (!filter.test(email_val))
            	 {
                	$("#get_pass_errmsg").text("Please Enter Valid EmailID");
                	$("#get_pass_err").css("display", "table-row");
                	return false;
            	 }

           else
         	{
         			//("xf");
         			$("#get_pass_errmsg").text("Password Has Been Sent to Your EmailID");
                	$("#get_pass_err").css("display", "table-row");
                	$("#get_pass_err").css("background", "green");
                	$("#get_pass_err").css("color", "white");
                	$("#main_box").fadeOut(5000);
         	}
         	}
         	//alert("sa");
         
		});
});


