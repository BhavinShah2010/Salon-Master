$(document).ready(function () {
    //alert(0);
    debugger;
    //aa
    var d = jQuery.parseJSON($("#txtData").text());
    // console.log($("#txtData").text());
    $("#lblUserName").html(d.name);
    $("#lblUserProfileName").html(d.name);
    $("#lblUserEmail").html(d.email);
    $("#lblUserContact").html(d.phno);
    $("#lblUserGender").html(d.gender);
    $("#lblChangePwdEmail").html(d.email);
    // alert($("#txtData").value());
    //var tname= !{{user.name}};
    //console.log({user.name});
    //$("#user_name").html(user.username);
    $("#change_det").click(function () {
        alert(1);
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
            alert(2);
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

    $("#current_pass").focusout(function () {
        // alert('working');
        //alert($("#txtUserName").val());
        $.post("/users/checkOldPassword",
        {
            objectId: d._id,
            oldpassword: $("#current_pass").val(),

        },
        function (data) {
            // alert(2);
            //debugger;
            console.log(data);

            if (data == "false") {
                $("#lblError").html("Password does not match!");
                $("#divResult").css("display", "block");
                $("#change_pass").attr('disabled', 'disabled');
                return false;
            }
            else {
                //alert('not working');
                $("#change_pass").attr('disabled', false);
                $("#divResult").css("display", "none");
            }
            //var y=JSON.stringify(data)
            //var x = JSON.parse(y);  
            // $("#lbl_shopname").html(data[0].name);
            // $("#lblShopEmail").html(data[0].name);
            //$("#lblShopMobile").html(data[0].phoneNo[0]);
            //$("#lblShopAddress").html(data[0].name); 
            //$("#lblShopDescription").html(data[0].description);

        });

    });
});
