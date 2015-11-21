$(document).ready(function () {
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
	/*window.starEvents = {
	    'click .cancel': function (e, value, row, index) {
	        alert('You click cancel link, row: ');
	        console.log(value, row, index);
	    },
	    'click .delay': function (e, value, row, index) {
	        alert('You click edit link, row: ');
	        console.log(value, row, index);
	    }
    };*/
    bind_data+="<div id='cancel_delay_box'><a id='aCancel"+row._id;
            bind_data+=" style='cursor:pointer;' class='cancel' > Cancel</a> / <a id='adelay"+row._id;
            bind_data+="+style='cursor:pointer;' class='delay'>Delay</a></div>";