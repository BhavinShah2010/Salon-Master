
//global variables 
var services = [];
var salons = [];

//UpdateSalons() function retrieve all selected services, and then it will check services
//if services array is null, getAllSalons() will be called to display all salons on home-page 
//else getSalonByServices() will be called to display salons, which provide selected services
function updateSalons(obj) {
		//alert("home");
		services = [];
		//var services = $.document.getElementById(obj);
		//var services = $(obj).val();
		$("input[name='services[]']:checked").each(function() {
    		services.push($(this).val());   
    	});
		if (services.length > 0)
		//alert(services);
	    	getSalonByservices();
	    else
	    	getAllSalons();	
}

//getSalonByservices() function retrieve salons information from database, and display those salons on home-page.
function getSalonByservices()
{	var htmlContent = "<div class='features_items'><h2 class='title text-center'>Salons in <span id='text_value' > </span> </h2>";
	jQuery.ajax({
			url: "/services/getSalonByServices",
			method: "POST",
			async: false,
			data: {services : services},
			success: function(result) {
				if(result.length > 0)
					$.each(result,function(i,salon){
		    			//alert(salon);
					    htmlContent += "<div class='col-sm-4' id="
					    htmlContent += salon._id
					    htmlContent += "><a href='salons/getSalonById?id="
					    htmlContent += salon._id
					    htmlContent += "'><div class='product-image-wrapper'><div class='single-products' id='first_image'><div class='productinfo text-center'>"
						htmlContent += "<img src='images/home/product1.jpg' alt='' /><h2><a href='a.html'>"
						htmlContent += salon.name
						htmlContent += "</a></h2><p>"
						htmlContent += salon.type
						htmlContent += " salons </p><p>"
						//htmlContent += "Street name and number of Salon"
						//htmlContent += "</p><p>"
						htmlContent += salon.address.area
						htmlContent += ", "
						htmlContent += salon.address.city
						htmlContent += "</p><p>"
						htmlContent += salon.address.state
						htmlContent += ", "
						htmlContent += salon.address.zipcode
						htmlContent += "</p><p>"
						htmlContent += salon.phoneNo
						htmlContent +="</p></div><div class='product-overlay'><div class='overlay-content'></div></div></div></div></a></div>"
		    		});				
				else
					htmlContent += "<h2>Sorry, Currently no salon is providing selected service(s).</h2>"	
				//htmlContent += JSON.stringify(result);
				htmlContent += "</div>"
				document.getElementById("divSalons").innerHTML = htmlContent;
				//alert(JSON.stringify(result));
			}
		});
}

//getAllSalons() retrieve all salons information, and display salons info on home-page.
function getAllSalons()
{
	var htmlContent = "<div class='features_items'><h2 class='title text-center'>Salons in <span id='text_value' > </span> </h2>";
	jQuery.ajax({
			url: "/salons/getSalons",
			method: "GET",
			async: false,
			success: function(result) {

			$.each(result,function(i,salon){
    			//alert(salon);
			    htmlContent += "<div class='col-sm-4' id="
			    htmlContent += salon._id
			    htmlContent += "><div class='product-image-wrapper'><div class='single-products' id='first_image'><div class='productinfo text-center'>"
				htmlContent += "<img src='images/home/product1.jpg' alt='' /><h2><a href='a.html'>"
				htmlContent += salon.name
				htmlContent += "</a></h2><p>"
				htmlContent += salon.type
				htmlContent += " salons </p><p>"
				//htmlContent += "Street name and number of Salon"
				//htmlContent += "</p><p>"
				htmlContent += salon.address.area
				htmlContent += ", "
				htmlContent += salon.address.city
				htmlContent += "</p><p>"
				htmlContent += salon.address.state
				htmlContent += ", "
				htmlContent += salon.address.zipcode
				htmlContent += "</p><p>"
				htmlContent += salon.phoneNo
				htmlContent +="</p></div><div class='product-overlay'><div class='overlay-content'></div></div></div></div></div>"
    		});				
				//htmlContent += JSON.stringify(result);
				document.getElementById("divSalons").innerHTML = htmlContent;
				//alert(JSON.stringify(result));
			}
		});	
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