
$(document).ready(function () {

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
		$( '#btnBook' ).click(function() {

			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
    			dd='0'+dd
				} 

			if(mm<10) {
    			mm='0'+mm
				} 

				today = mm+'/'+dd+'/'+yyyy;

				today += ' 12:30 AM';

				
				

					var user_date = $('#datetimepicker').val();
				//	alert(user_date); 

					//if( )


			/*var card_type;
			var datetimereg=/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
			if($('#datetimepicker').val()=='')
			{
				$('#errmsg').text('Please Enter Date');
				$('#errortr').css('display','table-row');
				return false;
			}
			else if(datetimereg.test($('#datetimepicker').val()))
			{
				$('#errmsg').text('Please Enter Valid date & Time');
				$('#errortr').css('display','table-row');
				return false;
			}*/
			
		  if($('#salonList').val()=='0')
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
					//$('#errortr').css('background','#32CD32');
					$('#errortr').css('color','#32CD32');
					$("#errortr").fadeOut(3000);
					return false;


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

});
    
