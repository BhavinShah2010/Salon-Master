$(document).ready(function () {
	
	debugger;
	function demo(){
		alert("HELLO");
	}
$.fn.raty.defaults.path = '/images/Star';
	$('#tblviewappointment').bootstrapTable({

            url: '/appointments/getUserAppointment',
            method: 'post',
	        height: 400,
	        striped: true,
	        pagination: true,
	        pageSize: 10,
	        pageList: [10, 25, 50, 100, 200],
	        search: true,
	        showRefresh: true,
	        minimumCountColumns: 2,
	        queryParams: function (p) {
	            return { userId: '564e3a922b0c3a3c155c864c'}
	        },
            columns: [
            {
                field: 'salon',
                title: 'Salon Name',
                align: 'center',
                valign: 'middle',
                formatter: salonNameFormater,
                sortable: true
            },
            {
                field: 'time',
                title: 'Date and Time',
                align: 'left',
                valign: 'top',
                formatter: dateAndTimeFormater,
                sortable: true
            },
            {
                field: 'serviceslist',
                title: 'Services Name',
                align: 'sleft',
                valign: 'top',
                formatter: slonlistFormater,
                sortable: true
            },
            {
                field: 'totalprice',
                title: 'Price',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'status',
                title: 'Status',
                align: 'center',
                valign: 'right',
                sortable: true
            },
            {
                field: 'rating',
                title: 'Rating',
                align: 'center',
                valign: 'right',
                formatter: starFormatter,
                sortable: true
            }]

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
			         	servicelistcontent+="<input type='checkbox' name='price' onchange='demo()'";
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
function dateAndTimeFormater(value, row, index) {
	var databind="";
	var dateandtime=value;
	var dates=dateandtime.split("T");
	var dateonly=dates[0].split("-");
	databind+=dateonly[1]+"/"+dateonly[2]+"/"+dateonly[0]+" ";
	var timeonly=dates[1].split(":");
	var ampm;
	if(timeonly[0]>12)
	{
		ampm="PM";
		timeonly[0]=-12;
	}
	else
	{
		ampm="AM";
	}
	if (timeonly[0]==0) {
		timeonly[0]==12;
	};
	databind+=timeonly[0]+":"+timeonly[1]+" "+ampm;
		//alert(databind);
	//alert(dates[1]);
	return [databind].join('');
}
function salonNameFormater(value, row, index) {
	var databind="";
	//alert(value);
	debugger;
		$.post("/salons/getDetails",
		     {
		         objectId: value
		     },
		     function (data) {
		     	debugger;
		     	databind+=data[0].name;
		     });	
   return [databind].join('');
}
function slonlistFormater(value, row, index) {
	var databind="";
	//alert(value);
	for (var i = 0; i<value.length; i++) {
		//alert(value[0]);
		$.post("/services/getDetails",
		     {
		         objectId: value[i]
		     },
		     function (data) {
		     	debugger;
		     	databind+=data[0].name;
		     	//alert(databind+" "+i);
		     });
		if(i!=value.length)
			databind+=",";
		//alert(databind+"last");
		};
    return [databind].join('');
}

function starFormatter(value, row, index) {
	//formatter: starFormatter,
    //        	events: changeOrCanelAppointment
	//return ['bind_data'].join('');
	debugger;
	//alert("hh");
       // debugger;
       var bind_data="";
        //console.log(value);
        //alert(row.status);
        if (row.status=="complete" || row.status=="Complete" ) {
        	//alert("stars");
            bind_data+="<div id='star"+row._id+"' class='giveStar'></div>";
           /* $('#'+row._id).raty({
			  half     : true,
			  starHalf : 'star-half.png'
			}*/
        }
        else {
        	//alert("not stars");
            bind_data+="<div id='cancel_delay_box'><a id='cancel"+row._id;
            bind_data+=" style='cursor:pointer;'> Cancel</a> / <a id='delay"+row._id;
            bind_data+="+style='cursor:pointer;'>Delay</a></div>";
        }
        debugger;
        return [bind_data].join('');
    }
    /*window.operateEvents = {
    	debugger;
    //alert("okEvent");
    };*/

});