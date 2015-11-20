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
	