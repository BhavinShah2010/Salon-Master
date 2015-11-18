
//document.getElementById('disablingDiv').style.display='block';

var services = [];
var salons = [];
function servicesForBody(){
    salons =[];
    services=[];
    $('#servicesForBody input:checked').each(function() {
    services.push($(this).attr('name'));   
    });

    //Retrieve checked service details
    $.each(services,function(i,serviceName){
        /*$.post("/services/getServiceDetail",{name:serviceName},function(serviceDetail){
            //Get salonIds of salons, who provide selected services
            //Binary search is used to check existance of salonId in an array
            $.each(serviceDetail,function(index,data){
                var start=0,end=salons.length,mid=0;
                var flag = true;
                while(start<=end)
                {
                    mid = Math.floor((start+end)/2);
                    if(salons[mid] == data.salonID)
                    {
                        flag = false;
                        break;
                    }
                    else if(salons[mid]>data.salonID)
                    {
                        end = mid - 1;
                    }    
                    else
                    {
                        start = mid + 1;
                    }        
                }
                if(flag == true)
                {
                    salons.push(data.salonID);
                }
            });
            salons.sort();
            //alert(salons);
        });*/

		jQuery.ajax({
			url: "/services/getServiceDetail",
			method: "POST",
			async: false,
			data: {name : serviceName},
			success: function(result) {
				$.each(result,function(index,data){
				    var start=0,end=salons.length,mid=0;
				    var flag = true;
				    while(start<=end)
				    {
				        mid = Math.floor((start+end)/2);
				        if(salons[mid] == data.salonID)
				        {
				            flag = false;
				            break;
				        }
				        else if(salons[mid]>data.salonID)
				        {
				            end = mid - 1;
				        }    
				        else
				        {
				            start = mid + 1;
				        }        
				    }
				    if(flag == true)
				    {
				        salons.push(data.salonID);
				    }
				});
				salons.sort();
			}
		});
    });
    /*if (typeof callback === 'function')
    {
        callback();
    }*/    
}

function printSalonDetails()
{
    //alert(salons);
    var htmlContent = "<h2 class='title text-center'>Salons in <span id='text_value' > </span> </h2>";
    $.each(salons,function(i,salon){
    	//alert(salon);
        $.post("/salons/getSalon",{salonId:salon},function(salonInfo){
            //debugger;
            htmlContent += "";
            alert(salonInfo[0].name);
            //document.getElementById("sname").innerHTML = salonInfo[0].name;
        });
    });    
}

function getSalonByservices()
{	var htmlContent = "";
	jQuery.ajax({
			url: "/services/getSalonByServices",
			method: "POST",
			async: false,
			data: {services : services},
			success: function(result) {
				htmlContent += "<div class='col-sm-4'>
							<div class='product-image-wrapper'>
								<div class='single-products' id='first_image'>
										<div class='productinfo text-center'>
											<img src='images/home/product1.jpg' alt='' />
											<h2><a href='a.html'>";
					htmlContent += "Salon Name";
					htmlContent += "</a></h2><p>";
					htmlContent += "Street and Area of Salon";
					htmlContent += "</p><p>";
					htmlContent += "Additional info";
					htmlContent += "</p><p>";
					htmlContent += "City and State name";
					htmlContent += "</p></div><div class='product-overlay'>
											<div class='overlay-content'></div>
										</div>	
								</div>
								
							</div>
						</div>"
				document.getElementById("demo").innerHTML = htmlContent;
				//alert(JSON.stringify(result));
			}
		});
}

function body_spa_filter (obj) {
		services = [];
		//var services = $.document.getElementById(obj);
		//var services = $(obj).val();
		$("input[name='services[]']:checked").each(function() {
    		services.push($(this).val());   
    	});
		alert(services);
	    //getSalonByservices();
}



function body_treatment_filter (obj) {
    //servicesForBody();
    //setTimeout(printSalonDetails,1000);
    getSalonByservices();
}



function waxing_filter (obj) {
    //servicesForBody();
    //setTimeout(printSalonDetails,1000);
    getSalonByservices();
}



function Laser_Hair_filter (obj) {
    servicesForBody();
    setTimeout(printSalonDetails,1000);
}



function Body_scrub (obj) {
    servicesForBody();
    setTimeout(printSalonDetails,1000);
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
	document.getElementById("disablingDiv").style.display = "hidden";
	document.getElementById("loc_name").innerHTML = textBox.value;
	$("#location_div").remove();
	document.getElementById("text_value").innerHTML = textBox.value;
}


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