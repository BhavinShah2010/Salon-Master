 
 $(document).ready(function () {
$("#divConatactusError").css("display", "none");
 $("#btnsubmit").click(function () {
   // alert("hhh");addClass
   var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    $("#divConatactusError").addClass("alert-danger");
        $("#divConatactusError").removeClass("alert-success");
        var isval=true;
        if ($("#txtUserName").val() == '') {
            $("#errmsg").html("Please Enter Name");
            $("#divConatactusError").css("display", "block");
            isval=false;
            return false;
        }
         if ($("#txtUserEmail").val() == '') {
            // alert(1);
            $("#errmsg").html("Please Enter EmailId");
            $("#divConatactusError").css("display", "block");
            isval=false;
            return false;
        }
         
             if (!filter.test(($("#txtUserEmail").val()))) {
                $("#errmsg").html("Please Enter Valid Emailid");
                $("#divConatactusError").css("display", "block");
                isval=false;
                return false;
            }
         if ($("#txtUserSubject").val() == '') {
            $("#errmsg").html("Please Enter Subject");
            $("#divConatactusError").css("display", "block");
            isval=false;
            return false;
        }
         if ($("#txtMessage").val() == '') {
            $("#errmsg").html("Please Enter Message");
            $("#divConatactusError").css("display", "block");
            isval=false;
            return false;
        }
        if(isval)
        {
         $("#divConatactusError").removeClass("alert-danger");
        $("#divConatactusError").addClass("alert-success");
        $("#errmsg").html("Your Message Send Successfully");
        $("#divConatactusError").css("display", "block");
        $("#txtUserName").val("");   
        $("#txtUserEmail").val("");
        $("#txtUserSubject").val("");
        $("#txtMessage").val("");
    }
    });
 });
   