$(document).ready(function () {
    //alert(0);
    //debugger;
    //aa
    
    $("#btnCancelChangePassword").click(function () {

        $("#txtChangePwdUser").val("");
        $("#txtChangePwdNewPassword").val("");
        $("#txtChangePwdConfirmPassword").val("");
        $("#divChangePwdResult").css("display", "none");
    });
    var d = jQuery.parseJSON($("#txtData").text());
    // console.log($("#txtData").text());
    $("#lblUserName").html(d.name);
    $("#lblUserEmail").html(d.email);
    $("#lblUserContact").html(d.phno);
    $("#lblUserGender").html(d.gender);
    $("#lblChangePwdUserEmail").html(d.email);
    // alert($("#txtData").value());
    //var tname= !{{user.name}};
    //console.log({user.name});
    //$("#user_name").html(user.username);

    
    $("#cancel_det").click(function () {

        $("#user_name_val").val(d.name);
        $("#user_email_val").val(d.email);
        $("#user_contact_val").val(d.phno);
        //$("#lblUserGender").html(d.gender);
        //lblChangePwdUserEmail").html(d.email);
        user_det_save()
    });
    $("#change_det").click(function () {
        debugger;
        //  alert(1);
        //console.log($("#user_name_val").val());
        $.post("/users/updateProfile",
        {
            objectId: d._id,
            username: d.username,
            name: $("#user_name_val").val(),
            gender: d.gender,
            email: $("#user_email_val").val(),
            phno: $("#user_contact_val").val(),
            address: d.address
        },
        function (data) {
            //alert(2);
           debugger;
            console.log(data);
            //var y=JSON.stringify(data)
            //var x = JSON.parse(y);  
            // $("#lbl_shopname").html(data[0].name);
            // $("#lblShopEmail").html(data[0].name);
            //$("#lblShopMobile").html(data[0].phoneNo[0]);
            //$("#lblShopAddress").html(data[0].name); 
            //$("#lblShopDescription").html(data[0].description);

        });
    });
    $("#txtChangePwdUser").focusout(function () {
      
        $.post("/users/checkOldPassword",
        {
            objectId: d._id,
            oldpassword: $("#txtChangePwdUser").val(),

        },
        function (data) {
            // alert(2);
            // debugger;
            console.log(data);

            if (data == "false") {
                $("#lblChangePwdError").html("Password does not match!");
                $("#divChangePwdResult").css("display", "block");
                $("#btnChangePwd").attr('disabled', 'disabled');
                return false;
            }
            else {
                //alert('not working');
                $("#btnChangePwd").attr('disabled', false);
                $("#divChangePwdResult").css("display", "none");
            }
            //var y=JSON.stringify(data)
            //var x = JSON.parse(y);  
            // $("#lbl_shopname").html(data[0].name);
            // $("#lblShopEmail").html(data[0].name);
            //$("#lblShopMobile").html(data[0].phoneNo[0]);
            //$("#lblShopAddress").html(data[0].name); 
            //$(" #lblShopDescription").html(data[0].description);

        });

    });
    $("#change_det").click(function () {
        //alert(11);
        $(".alert").hide();
        $(".alert-danger").hide();
        var isWll = true;
        if ($("#user_name_val").val() == '') {
            // alert("USer Name");
            $("#lblError").html("Please Enter Name");
            $("#divResult").css("display", "block");
            // $("#change_det").c

            isWll = false;
            return false;
        }

        if ($("#user_email_val").val() == '') {
            // alert("USer email");
            $("#lblError").html("Please Enter EmailId");
            $("#divResult").css("display", "block");
            isWll = false;
            return false;
        }

        if ($("#user_email_val").val() != '') {
            // alert("USer email vslid");
            var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!filter.test(($("#user_email_val").val()))) {
                $("#lblError").html("Please Enter Valid EmailId");
                $("#divResult").css("display", "block");
                isWll = false;
                return false;
            }
        }

        if ($("#user_contact_val").val() == '') {
            // alert(1);
            // alert("USer Contack");
            $("#lblError").html("Please Phone Number");
            $("#divResult").css("display", "block");
            isWll = false;
            return false;
        }

        if ($("#user_contact_val").val() != '') {
            //   alert("USer Contack VALID");
            var num = /^[-+]?[0-9]+$/;
            if (!($("#user_contact_val").val().match(num))) {
                $("#lblError").html("Invalid Mobile Number");
                $("#divResult").css("display", "block");
                isWll = false;
                return false;
            }
        }

        if (isWll == true) {
                  
            $(this).click(user_det_save());
        }
    });


    $("#btnChangePwd").click(function () {
        $("#divChangePwdResult").removeClass("alert-success");
        $("#divChangePwdResult").addClass("alert-danger");
        //  $("#lblChangePwdError").html("Password does not match!");
        // $("#divChangePwdResult").css("display", "block");
        var isWll = true;
        if ($("#txtChangePwdUser").val() == '') {
            $("#lblChangePwdError").html("Please enter your Current Password");
            $("#divChangePwdResult").css("display", "block");
            // $("#change_det").c
            isWll = false;
            return false;
        }
        if ($("#txtChangePwdNewPassword").val() == '') {
            $("#lblChangePwdError").html("Please enter New Password");
            $("#divChangePwdResult").css("display", "block");
            // $("#change_det").c
            isWll = false;
            return false;
        }
        if ($("#txtChangePwdConfirmPassword").val() == '') {
            $("#lblChangePwdError").html("Please your Confirm Password");
            $("#divChangePwdResult").css("display", "block");
            // $("#change_det").c
            isWll = false;
            return false;
        }
         if ($("#txtChangePwdConfirmPassword").val().length < 8) {
            $("#lblChangePwdError").html("Password required atleast 8 characters");
            $("#divChangePwdResult").css("display", "block");
            isWll = false;
            return false;
        }
        if ($("#txtChangePwdConfirmPassword").val() != $("#txtChangePwdNewPassword").val()) {
            $("#lblChangePwdError").html("New password does not match!");
            $("#divChangePwdResult").css("display", "block");
            // $("#change_det").c
            isWll = false;
            return false;
        }

        if (isWll == true) {
            alert("Fine");
            $.post("/users/changePassword",
        {
            objectId: d._id,
            oldpassword: $("#txtChangePwdUser").val(),
            newpassword: $("#txtChangePwdNewPassword").val()

        },
        function (data) {
            // alert(2);
           // debugger;
            if (data == "true") {
                $("#lblChangePwdError").html("Password changed successfully!");
                $("#divChangePwdResult").css("display", "block");
                $("#divChangePwdResult").removeClass("alert-danger");
                $("#divChangePwdResult").addClass("alert-success");
                $("#txtChangePwdUser").val("");
                $("#txtChangePwdNewPassword").val("");
                $("#txtChangePwdConfirmPassword").val("");
            }
            //var y=JSON.stringify(data)
            //var x = JSON.parse(y);  
            // $("#lbl_shopname").html(data[0].name);
            // $("#lblShopEmail").html(data[0].name);
            //$("#lblShopMobile").html(data[0].phoneNo[0]);
            //$("#lblShopAddress").html(data[0].name); 
            //$("#lblShopDescription").html(data[0].description);

        });
        }

    });
});

function user_det_save() {


    document.getElementById("user_name").innerHTML = document.getElementById("user_name_val").value;
    document.getElementById("user_email").innerHTML = document.getElementById("user_email_val").value;
    document.getElementById("user_contact").innerHTML = document.getElementById("user_contact_val").value;

    document.getElementById("user_name").style.display = "block";
    document.getElementById("user_email").style.display = "block";
    document.getElementById("user_contact").style.display = "block";
    document.getElementById("user_name_text").style.display = "none";
    document.getElementById("user_email_text").style.display = "none";
    document.getElementById("user_contact_text").style.display = "none";
    document.getElementById("user_det_change_btn").style.display = "none";



}
