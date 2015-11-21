
$(document).ready(function () {

//	$('#datetimepicker').val() = "MM/DD/YYYY HH:MM AM/PM ";

	//alert($('#status').text());
				if($('#status').text() == "DDDDD")
				{
					
					$('#divDefault').css('display' , 'none');
					$('#cancel_delay_box').css('display' , 'block');

				}

				else if($('#status').text() == "Completed")
				{
					//alert("BCD");
					$('#divDefault').css('display' , 'block');
					$('#cancel_delay_box').css('display' , 'none');


				}



		$('#cancel').click(function () {
				$('#status').text("Cancelled");

					$('#divDefault').css('display' , 'none');
					$('#cancel_delay_box').css('display' , 'none');
		});


		$('#delay').click(function () {
			
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
			
		$('#salonList').change(function(){
			if($('#salonList').val()=='0')
			{
				$('#servicelbltr').css('display','none');
				$('#servicelisttr').css('display','none');
			}
			else
			{
				$('#servicelbltr').css('display','table-row');
				$('#servicelisttr').css('display','table');
			}
		});
		$('input[name="event"]').change(function ()
		{
			
			if($('input[name="event"]:checked').val()=='yes')
			{
				$('#Eventtr').css('display','table-row');
			}
			else
			{
				$('#Eventtr').css('display','none');
			}
		});


		$('#btnBook').click(function() {
				
			var today = new Date(); // current date with time
			var dateval=$('#datetimepicker').val().split(" ");

			var date = dateval[0]; // user entered date
			var time = dateval[1] + " " + dateval[2]; // user entered time

		//	var cur_hour = today.getHours();
		//	var cur_min = today.getMinutes();

		//	var cur_time = cur_hour + ":" cur_min;

			//alert(date);
			//alert(time);

			var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
			var re = /^\d{1,2}:\d{2}([ap]m)?$/;
            var Val_date= date;
             if(Val_date.match(dateformat)){
                 var seperator1 = Val_date.split('/');
                 var seperator2 = Val_date.split('-');
 
                 if (seperator1.length>1)
                 {
                     var splitdate = Val_date.split('/');
                 }
                 else if (seperator2.length>1)
                 {
                     var splitdate = Val_date.split('-');
                 }
                 var mm  = parseInt(splitdate[0]);
                 var dd = parseInt(splitdate[1]);
                 var yy = parseInt(splitdate[2]);
                 var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
                 if (mm==1 || mm>2)
                 {
                     if (dd>ListofDays[mm-1])
                     {
                       $('#errmsg').text('Please Enter Valid  Date & Time');	
					   $('#errortr').css('display','table-row');
                         return false;
                     }
                 }
                 if (mm==2)
                 {
                     var lyear = false;
                     if ( (!(yy % 4) && yy % 100) || !(yy % 400))
                     {
                         lyear = true;
                     }
                     if ((lyear==false) && (dd>=29))
                     {
                          $('#errmsg').text('Please Enter Valid  Date & Time');	
					      $('#errortr').css('display','table-row');
                         return false;
                     }
                     if ((lyear==true) && (dd>29))
                     {
                          $('#errmsg').text('Please Enter Valid  Date & Time');	
					      $('#errortr').css('display','table-row');
                         return false;
                     }
                 }
             }
             else 
             {
                  $('#errmsg').text('Please Enter Valid Date & Time');	
				  $('#errortr').css('display','table-row');
 
                 return false;
             }

			var user_date = new Date($('#datetimepicker').val());
			
		/*	var yyyy = today.getFullYear();
			var hour = today.getHours();
			var min = today.getMinutes();
			
			

			var mm = user_date.getMonth()+1; //January is 0!


			//var dd = user_date.getDate();
			//alert(user_date);*/
			var com= user_date - today;


			 if (user_date == '')
				{
					   $('#errmsg').text('Please Enter  Date & Time');	
					   $('#errortr').css('display','table-row');				
				}
				else if(user_date=='Invalid Date')

				{
						
							$('#errmsg').text('Please Enter Valid date & Time');	
					  		 $('#errortr').css('display','table-row');
						
					   
				}
				else if(com < 0 )
					{

					   $('#errmsg').text('Please Enter Valid date & Time');	
					   $('#errortr').css('display','table-row');				
					}



				

   				else if(time == '' && time.match(re))
   				 {
     				 $('#errmsg').text('Please Enter Valid date & Time');	
					   $('#errortr').css('display','table-row');
      					//form.starttime.focus();
      					return false;
    			}	
			

		  else if($('#salonList').val()=='0')
			{
				$('#errmsg').text('Please Select Salon');
				$('#errortr').css('display','table-row');
				return false;
			}
			else if($('input[type=checkbox]:checked').length == 0)
			{
				$('#errmsg').text('Please Select Atleast One Service');
				$('#errortr').css('display','table-row');
				return false;
			}
			else if($('input[name="event"]:checked').val()=='yes')
			{
				 var filter = /^[a-zA-Z\s]+$/;
				 if($('#txteventname').val()=='')
				{
					$('#errmsg').text('Please Enter Event Name');
					$('#errortr').css('display','table-row');
					return false;
				}
				else if (!filter.test(($("#txteventname").val()))) {
					$('#errmsg').text('Event Name Allows Only Alphabet');
					$('#errortr').css('display','table-row');
					return false;
				}
				else if($('#txteventtype').val()=='')
				{
					$('#errmsg').text('Please Enter Event Type');
					$('#errortr').css('display','table-row');
					return false;
				}
				else if (!filter.test(($("#txteventtype").val()))) {
					$('#errmsg').text('Event Type Allows Only Alphabet');
					$('#errortr').css('display','table-row');
					return false;
				}

			}

				else
				{
					$('#errmsg').text('Appointment SuccessFully Booked');
					$('#errortr').css('display','table-row');
					$('#errortr').css('background','#32CD32');
					$("#errortr").fadeOut(3000);
					$('#errortr').css('display','table-row');

					return true;


				}
		});
			
		$('input[type=checkbox]').change(function () {
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


$('#btnDelaySave').click(function() {
				//alert("dsf");
			var today1 = new Date(); // current date with time
			var dateval1=$('#new_date_time').val().split(" ");

			var date1 = dateval1[0]; // user entered date
			var time1 = dateval1[1] + " " + dateval1[2]; // user entered time

		//	var cur_hour = today.getHours();
		//	var cur_min = today.getMinutes();

		//	var cur_time = cur_hour + ":" cur_min;

			//alert(date);
			//alert(time);

			var dateformat1 = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
			var re1 = /^\d{1,2}:\d{2}([ap]m)?$/;
            var Val_date1= date1;
             if(Val_date1.match(dateformat1)){
                 var seperator11 = Val_date1.split('/');
                 var seperator21 = Val_date1.split('-');
 
                 if (seperator11.length>1)
                 {
                     var splitdate1 = Val_date1.split('/');
                 }
                 else if (seperator21.length>1)
                 {
                     var splitdate1 = Val_date1.split('-');
                 }
                 var mm1  = parseInt(splitdate1[0]);
                 var dd1 = parseInt(splitdate1[1]);
                 var yy1 = parseInt(splitdate1[2]);
                 var ListofDays1 = [31,28,31,30,31,30,31,31,30,31,30,31];
                 if (mm1==1 || mm1>2)
                 {
                     if (dd1>ListofDays1[mm1-1])
                     {
                       $('#new_date_time_err_msg').text('Please Enter Valid  Date & Time 1 ');	
					   $('#new_date_time_err').css('display','table-row');
                         return false;
                     }
                 }
                 if (mm1==2)
                 {
                     var lyear1 = false;
                     if ( (!(yy1 % 4) && yy1 % 100) || !(yy1 % 400))
                     {
                         lyear1 = true;
                     }
                     if ((lyear1==false) && (dd1>=29))
                     {
                          $('#new_date_time_err_msg').text('Please Enter Valid  Date & Time 2');	
					      $('#new_date_time_err').css('display','table-row');
                         return false;
                     }
                     if ((lyear1==true) && (dd1>29))
                     {
                          $('#new_date_time_err_msg').text('Please Enter Valid  Date & Time 3');	
					      $('#new_date_time_err').css('display','table-row');
                         return false;
                     }
                 }
             }
             else 
             {
                  $('#new_date_time_err_msg').text('Please Enter Valid Date & Time 4');	
				  $('#new_date_time_err').css('display','table-row');
 
                 return false;
             }

			var user_date1 = new Date($('#new_date_time').val());
			var com1= user_date1 - today1;


			 if (user_date1 == '')
				{
					   $('#new_date_time_err_msg').text('Please Enter  Date & Time 5 ');	
					   $('#new_date_time_err').css('display','table-row');				
				}
				else if(user_date1=='Invalid Date')

				{
						
							$('#new_date_time_err_msg').text('Please Enter Valid Date & Time 6');	
					  		 $('#new_date_time_err').css('display','table-row');
				}
				else if(com1 < 0 )
					{

					   $('#new_date_time_err_msg').text('Please Enter Valid Date & Time 7');	
					   $('#new_date_time_err').css('display','table-row');
					  // alert(com1);				
					}

   				else if(time1 == '' && time1.match(re1))
   				 {
     				 $('#new_date_time_err_msg').text('Please Enter Valid Date & Time 8');	
					   $('#new_date_time_err').css('display','table-row');
      					//form.starttime.focus();
      					return false;
    			}	
				else
				{
					//alert("Ds");
					   //$('#new_date_time_err_msg').text('Ho Gaya');	
					   //$('#new_date_time_err').css('display','table-row');
					   $('#main_box').css('display' , 'none');
					   $('#popup_box').reload();
      				

				}
		});


$( document ).on( 'keydown', function ( e ) {
   			 if ( e.keyCode === 27 ) { // ESC
        		$( "#main_box" ).hide();
   		 }

});