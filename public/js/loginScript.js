$(document).ready(function () {

    $("#btnLogin").click(function () {

        $(".alert").hide();
        $(".alert-danger").hide();

        if ($("#txtLoginUserName").val() == '') {
            // alert(1);
            $("#lblError").html("Please User Name");
            $("#divResult").css("display", "block");
            return false;
        }

        if ($("#txtLoginPassword").val() == '') {
            $("#lblError").html("Please Enter password");
            $("#divResult").css("display", "block");
            return false;
        }
    });

    $("#btnSingup").click(function () {

        $(".alert").hide();
        $(".alert-danger").hide();
        if ($("#txtName").val() == '') {
            $("#lblSingUpError").html("Please Enter Name");
            $("#divSingup").css("display", "block");
            return false;
        }
        if ($("#txtUserEmailid").val() == '') {
            // alert(1);
            $("#lblSingUpError").html("Please Enter EmailId");
            $("#divSingup").css("display", "block");
            return false;
        }
        if ($("#txtUserEmailid").val() != '') {
            var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!filter.test(($("#txtUserEmailid").val()))) {
                $("#lblSingUpError").html("Please Enter Valid Emailid");
                $("#divSingup").css("display", "block");
                return false;
            }
        }
        if ($("#txtUserName").val() == '') {
            $("#lblSingUpError").html("Please Enter User Name");
            $("#divSingup").css("display", "block");
            return false;
        }
        if ($("#txtUserMobileNum").val() == '') {
            $("#lblSingUpError").html("Please Enter Mobile Number");
            $("#divSingup").css("display", "block");
            return false;
        }
        if ($("#txtUserMobileNum").val() != '') {
            var num = /^[-+]?[0-9]+$/;
            if (!($("#txtUserMobileNum").val().match(num))) {
                $("#lblSingUpError").html("Invalid Mobile Number");
                $("#divSingup").css("display", "block");
                return false;
            }
        }
        if ($("#txtUserMobileNum").val().length < 10) {
            $("#lblSingUpError").html("Invalid Mobile Number");
            $("#divSingup").css("display", "block");
            return false;
        }
        if ($("#txtUserPassword").val() == '') {
            $("#lblSingUpError").html("Please Enter Password");
            $("#divSingup").css("display", "block");
            return false;
        }
        if ($("#txtConifemPwd").val() == '') {
            $("#lblSingUpError").html("Please Enter Confirm Password");
            $("#divSingup").css("display", "block");
            return false;
        }
        if ($("#txtUserPassword").val() != $("#txtConifemPwd").val()) {
            $("#lblSingUpError").html("Passoword does not match!");
            $("#divSingup").css("display", "block");
            return false;
        }
        if ($("#txtArea").val() == '') {
            $("#lblSingUpError").html("Please Enter Area");
            $("#divSingup").css("display", "block");
            return false;
        }
        if ($("#txtCity").val() == '') {
            $("#lblSingUpError").html("Please Enter City");
            $("#divSingup").css("display", "block");
            return false;
        }
        if ($("#txtState").val() == '') {
            $("#lblSingUpError").html("Please Enter State");
            $("#divSingup").css("display", "block");
            return false;
        }
        if ($("#txtZipcode").val() == '') {
            $("#lblSingUpError").html("Please Enter Zipcode");
            $("#divSingup").css("display", "block");
            return false;
        }
        if ($("#txtZipcode").val() != '') {
            var num = /^[-+]?[0-9]+$/;
            if (!($("#txtZipcode").val().match(num))) {
                $("#lblSingUpError").html("Invalid Zipcode");
                $("#divSingup").css("display", "block");
                return false;
            }
        }

    });
    $("#txtUserName").focusout(function () {
        // alert('working');
       //alert($("#txtUserName").val());
        $.get("/users/checkUname?", { username: $("#txtUserName").val() }, function (data) {

            if (data != "0") {
                $("#lblSingUpError").html(data);
                $("#divSingup").css("display", "block");
                $("#btnSingup").attr('disabled', 'disabled');
                return false;
            }
            else {
                //alert('not working');
                $("#btnSingup").attr('disabled', false);
                $("#divSingup").css("display", "none");
            }
        });
    });
});
