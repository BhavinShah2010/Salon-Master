$(document).ready(function () {
	
	debugger;

	$.get("/salons/getSalons",
     function (data) {
         debugger;
         //alert(JSON.stringify(data));
         //var y=JSON.stringify(data)
         //var x = JSON.parse(y); 
         var htmlContent = "<option value='0'>-- Select Salon --</option>";
         for (var i = 0; i < data.length; i++) {
         		htmlContent += "<option value='";
         		htmlContent += data[i]._id;
         		htmlContent += "'>";
         		htmlContent += data[i].name;
         		htmlContent += "</option>";         		
         }
         document.getElementById("salonList").innerHTML = htmlContent;
     });
	$('#salonList').change(function(){
		//alert("dd");
		if($('#salonList').val()!='0')
		{
			$.post("/services/getSalonServices",
		     {
		     	 //salonID: '564b062108534b2012ada465'
		         salonId: $('#salonList').val()
		     },
		     function (data) {
		         debugger;

		         alert($('#salonList').val());
		         var servicelistcontent = "";
		         if (data.length==0) {
		         	servicelistcontent+="<tr><td>No Services Available</td></tr>";
		         }
		         else{
			         for (var i = 0; i <data.length; i++) {
			         	if(i%3==0 && i!=0)
			         	{
			         		servicelistcontent+="</tr><tr>";
			         	};
			         	servicelistcontent+="<td><span>"+data[i].name+"</span>";
			         	//if (data[0].offer!=null) {
			         	//servicelistcontent+="<td><span>"+data[0].offer+"</span>";
			         	//};
			         	servicelistcontent+="<span>temp offer</span>";
			         	servicelistcontent+="<span>"+data[i].price+" RS</span>";
			         	servicelistcontent+="<input type='checkbox' name='services' value="+data[i].price+" class='insameline'>"
			         	servicelistcontent+="</td>";
			         	if ((i-1)%3==0) {
			         		servicelistcontent+="</tr>";
			         	};
			         };
			         if(data.length%3!=0)
			         	{
			         		servicelistcontent+="</tr>";
			         	};
			     }
			     document.getElementById("servicelisttr").innerHTML=servicelistcontent;
			    // $('#servicelisttr').innerHTML=servicelistcontent;
			     debugger;
		     });
		}
	});
	$('#cancel').click(function () {
			/*$.post("/services/getSalonServices",
		     {
		         objectId: $('#lbl_appointmentID').val()
		     },
		     function () {

		     });*/
		});
	$('#btndelaydate').click(function () {
			/*$.post("/services/getSalonServices",
		     {
		         objectId: $('#lbl_appointmentID').val()
		     },
		     function () {

		     });*/
		});

});