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
		         objectId: $('#salonList').val()
		     },
		     function (servicelist) {
		         debugger;
		         //alert(JSON.stringify(servicelist));
		         var servicelistcontent = "";
		         if (servicelist.length==0) {
		         	servicelistcontent+="<tr><td>No Services Available</td></tr>";
		         }
		         else{
			         for (var i = 0; i <servicelist.length; i++) {
			         	if(i%3==0)
			         	{
			         		servicelistcontent+="<tr>";
			         	};
			         	servicelistcontent+="<td><span>"+servicelist[0].name+"</span>";
			         	//if (servicelist[0].offer!=null) {
			         	//servicelistcontent+="<td><span>"+servicelist[0].offer+"</span>";
			         	//};
			         	servicelistcontent+="<td><span>temp offer</span>";
			         	servicelistcontent+="<td><span>"+servicelist[0].price+"</span>";
			         	servicelistcontent+="<input type='checkbox' name='services' value="+servicelist[0].price+" class='insameline'>"
			         	servicelistcontent+="</td>";
			         	if (i-1%3==0) {
			         		servicelistcontent+="</tr>";
			         	};
			         };
			         if(servicelist.length%3!=0)
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
});