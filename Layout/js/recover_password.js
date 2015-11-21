function funxy()
{
		var change_pass = $("#change_pass").val();
		var confirm_pass = $("#confirm_pass").val();

		var change_pass_len = change_pass.length;
		//alert(change_pass_len);
	//	alert (change_pass);
//		alert (confirm_pass);
			var err_flag = false;
			var err_msg = "";
			

			if( change_pass != confirm_pass)
			{
				err_msg = "Password and Confirm Password Should Match.";
			}
			else
			{
				err_flag = true;
				err_msg = "Password Changed Success";
			}
				$('#get_pass_errmsg').text(err_msg);
				$('#get_pass_err').css('display','none');
				return err_flag;

}





/*(function getURLValue()
{

	    var vars = [], hash;
    	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    	for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
 //   request.body.parameter
    //$("#obj_id").val(vars[0]);
   // return vars;
}*/

function getURLValue() {
var query, parms, i, pos, key, val, qsp;
qsp = {};
query = location.search.substring(1);
parms = query.split('&');
for (i=parms.length-1; i>=0; i--) {
   pos = parms[i].indexOf('=');
   if (pos > 0) {
      key = parms[i].substring(0,pos);
      val = parms[i].substring(pos+1);
      qsp[key] = val;
      }
   }
$("#obj_id").val(qsp["obj"]);
$("#key").val(qsp["key"]);
}