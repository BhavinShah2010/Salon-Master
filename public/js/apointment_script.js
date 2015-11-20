$(document).ready(function () {
	
	debugger;
	$('#viewAppointment').bootstrapTable({

            url: '/categories/getAllCategories',
            method: 'get',
            height: 400,
            striped: true,
            pagination: true,
            pageSize: 6,
            pageList: [10, 25, 50, 100, 200],

            showRefresh: true,
            search: true,
            minimumCountColumns: 2,
            columns: [
            {
                field: 'name',
                title: 'Category Name',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'description',
                title: 'Description',
                align: 'left',
                valign: 'top',
                sortable: true
            },
            {
                field: 'sub_cat',
                title: 'Services Name',
                align: 'sleft',
                valign: 'top',
                sortable: true
            },
            {
                field: 'operate',
                title: 'Edit',
                align: 'center',
                valign: 'middle',
                formatter: editFormatter,
            }
            ]

        });


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

		         //alert($('#salonList').val());
		         var servicelistcontent = "<tr>";
		         if (data.length==0) {
		         	servicelistcontent+="<td>No Services Available</td></tr>";
		         }
		         else{
		         	 var count=0;
			         for (var i = 0; i <data.length; i++,count++) {
			         	if(count==2)
			         	{
			         		servicelistcontent+="</tr><tr>";
			         	};
			         	servicelistcontent+="<td><span>"+data[i].name+"</span>";
			         	//if (data[0].offer!=null) {
			         	//servicelistcontent+="<td><span>"+data[0].offer+"</span>";
			         	//};
			         	servicelistcontent+="<span>temp offer</span>";
			         	servicelistcontent+="<span>"+data[i].price+" RS</span>";
			         	servicelistcontent+="<input type='checkbox' name='price'";
			         	servicelistcontent+=" value="+data[i].price+" class='insameline'/>";
			         	servicelistcontent+="</td>";
			         	if (count==2) {
			         		count=0;
			         	};
			         };
			         //if(data.length%3!=0)
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

	$('input[type=checkbox]').change(function () {
			alert("hhh");
			var pretotprice=parseInt($("#totalprice").val(),10);
			var checkedboxvalue=parseInt($(this).val(),10);
		    if ($(this).is(":checked")) {
				var val=pretotprice+checkedboxvalue;
		       $('#totalprice').val(val);
		        return;
		    }
			var val=pretotprice-checkedboxvalue;
			$('#totalprice').val(val);
		    //Here do the stuff you want to do when 'unchecked'

	});
	/*$('#cancel').click(function () {
			/*$.post("/services/getSalonServices",
		     {
		         objectId: $('#lbl_appointmentID').val()
		     },
		     function () {

		     });
		});
	$('#btndelaydate').click(function () {
			/*$.post("/services/getSalonServices",
		     {
		         objectId: $('#lbl_appointmentID').val()
		     },
		     function () {

		     });
		});*/

});