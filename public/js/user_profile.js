function change_pass_call()
{
	
	document.getElementById("user_det_cnt").style.display = 'none';
	document.getElementById("change_pass_box").style.display = 'block';
	document.getElementById("previous_booking").style.display = 'none';

}



function user_det_call()
{
	document.getElementById("change_pass_box").style.display = 'none';
	document.getElementById("user_det_cnt").style.display = 'block';
	document.getElementById("previous_booking").style.display = 'none';
}



function previous_booking_call()

{
	document.getElementById("change_pass_box").style.display = 'none';
	document.getElementById("user_det_cnt").style.display = 'none';
	document.getElementById("previous_booking").style.display = 'block';
}



function edit_det_call()
{
	
	document.getElementById("user_name").style.display = "none";
	document.getElementById("user_email").style.display = "none";
	document.getElementById("user_contact").style.display = "none";
	document.getElementById("user_name_text").style.display = "block";
	document.getElementById("user_email_text").style.display = "block";
	document.getElementById("user_contact_text").style.display = "block";	
	document.getElementById("user_det_change_btn").style.display = "block";
	//$("#user_name_val").innerHTML($("#lblUserName").val());
	document.getElementById("user_name_val").value = document.getElementById("lblUserName").textContent;
	document.getElementById("user_email_val").value = document.getElementById("lblUserEmail").textContent;
	document.getElementById("user_contact_val").value = document.getElementById("lblUserContact").textContent;

}


function user_det_save()
{
  

	document.getElementById("user_name").innerHTML = document.getElementById("user_name_val").value ;
	document.getElementById("user_email").innerHTML = document.getElementById("user_email_val").value ;
	document.getElementById("user_contact").innerHTML = document.getElementById("user_contact_val").value ;

	document.getElementById("user_name").style.display = "block";
	document.getElementById("user_email").style.display = "block";
	document.getElementById("user_contact").style.display = "block";
	document.getElementById("user_name_text").style.display = "none";
	document.getElementById("user_email_text").style.display = "none";
	document.getElementById("user_contact_text").style.display = "none";	
	document.getElementById("user_det_change_btn").style.display = "none";		



}


