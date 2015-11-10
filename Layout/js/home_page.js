
//document.getElementById('disablingDiv').style.display='block';

function body_spa_filter (obj) {
	if (obj.checked == true) {
			$("#first_image").hide();

	}
	else
		$("#first_image").show();

}



function body_treatment_filter (obj) {
	if (obj.checked == true) {
			$("#second_image").hide();

	}
	else
		$("#second_image").show();
}



function waxing_filter (obj) {
	if (obj.checked == true) {
			$("#third_image").hide();

	}
	else
		$("#third_image").show();

}



function Laser_Hair_filter (obj) {
	if (obj.checked == true) {
			$("#fourth_image").hide();

	}
	else
		$("#fourth_image").show();

}



function Body_scrub (obj) {
	if (obj.checked == true) {
			$("#fifth_image").hide();

	}
	else
		$("#fifth_image").show();

}



function hair_smooth(obj) {
	if (obj.checked == true) {
			$("#sixth_image").hide();

	}
	else
		$("#sixth_image").show();

}







function hair_cut (obj) {
	if (obj.checked == true) {
			$("#first_image").hide();

	}
	else
		$("#first_image").show();

}



function hair_wash (obj) {
	if (obj.checked == true) {
			$("#second_image").hide();

	}
	else
		$("#second_image").show();

}



function straight (obj) {
	if (obj.checked == true) {
			$("#third_image").hide();

	}
	else
		$("#third_image").show();

}



function hair_treatment (obj) {
	if (obj.checked == true) {
			$("#fourth_image").hide();

	}
	else
		$("#fourth_image").show();

}




function nail_art (obj) {
	if (obj.checked == true) {
			$("#fifth_image").hide();

	}
	else
		$("#fifth_image").show();

}



function manicure_padicure (obj) {
	if (obj.checked == true) {
			$("#sixth_image").hide();

	}
	else
		$("#sixth_image").show();

}



function nail_extension (obj) {
	if (obj.checked == true) {
			$("#first_image").hide();

	}
	else
		$("#first_image").show();

}



function facial (obj) {
	if (obj.checked == true) {
			$("#second_image").hide();

	}
	else
		$("#second_image").show();

}



function bleach (obj) {
	if (obj.checked == true) {
			$("#third_image").hide();

	}
	else
		$("#third_image").show();

}


function cleanup (obj) {
	if (obj.checked == true) {
			$("#fourth_image").hide();

	}
	else
		$("#fourth_image").show();

}


function threading (obj) {
	if (obj.checked == true) {
			$("#fifth_image").hide();

	}
	else
		$("#fifth_image").show();

}



function marriage (obj) {
	if (obj.checked == true) {
			$("#sixth_image").hide();

	}
	else
		$("#sixth_image").show();

}



function party (obj) {
	if (obj.checked == true) {
			$("#first_image").hide();

	}
	else
		$("#first_image").show();

}

function search_btn()
{
	var textBox = document.getElementById("search-text");
	var textLength = textBox.value.length;

	if(textLength == 0)
	{
		alert("Enter City Name ");
	}
	else

	$("#disablingDiv").remove();
	document.getElementById("loc_name").innerHTML = textBox.value;
	$("#location_div").remove();
	document.getElementById("text_value").innerHTML = textBox.value;

}


