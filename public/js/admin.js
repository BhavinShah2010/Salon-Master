
$(document).ready(function () {
    // to show Category
    // debugger
    var id;
    BindCategoryTable();
    $("#aCategory").click(function () {
        $("#divCategory").show();
        $("#divSalon").hide();
        $("#divUser").hide();
        $("#liCategory").addClass("active");
        $("#liSalon").removeClass("active");
        $("#liUser").removeClass("active");
        BindCategoryTable();


    });
    // to show Salon
    $("#aSalon").click(function () {
        // debugger;
        $("#divCategory").hide();
        $("#divSalon").show();
        $("#divUser").hide();
        $("#liCategory").removeClass("active");
        $("#liSalon").addClass("active");
        $("#liUser").removeClass("active");
        $("#divSalonMsg").css("display", "none");
        BindSalonTable();
    });

    $("#aUser").click(function () {
        //  debugger;
        $("#divCategory").hide();
        $("#divSalon").hide();
        $("#divUser").show();
        $("#liCategory").removeClass("active");
        $("#liSalon").removeClass("active");
        $("#liUser").addClass("active");
        BindUser();
    });
    $("#aNavigationCategory").click(function () {
        //debugger;
        // alert(1);
        //$("#divCategoryList").hide();

        $("#divCategoryresult").hide();
        $("#lblCategoryResult").val("");
        if ($("#divCategoryList").is(":visible")) {
            //alert("List True");
            $("#lblaNavigationCategory").html("View Category");
            $("#divCategoryAdd").show();
            $("#divCategoryList").hide();
            $("#btnUpdateCategory").hide();
            $("#btnAddCategory").show();
        }
        else {
            $("#lblaNavigationCategory").html("Add Category");
            $("#divCategoryAdd").hide();
            $("#divCategoryList").show();
            cleareCategory();

        }

    });

    $("#btnCancelCategory").click(function () {

        //$("#divCategoryList").hide();
        cleareCategory();
        $("#aNavigationCategory").click();

    });


    $(".checkbox").change(function () {
        var numberOfChecked = $('input:checkbox:checked').length;
        var isVal = true;
        if (numberOfChecked <= 0) {

            $("#lblCategoryError").html("Please Select Atleast One Category.");
            $("#divCategoryMsg").css("display", "block");
            isVal = false;
        }
        return isVal;
    });

    $("#btnAddSubCategory").click(function () {
        // alert(1111);
        var $current = $("#txtSubServiceName");
        var isVal = true;
        if ($("#txtSubServiceName").val() == '') {
            // alert(1);
            $("#lblCategoryError").html("Please Enter Service.");
            $("#divCategoryMsg").css("display", "block");
            return false;
        }

        else {

            $('input[name^="chkSubCategory"]').each(function () {
                if ($(this).val().toLowerCase() == $current.val().toLowerCase()) {
                    $("#lblCategoryError").html("Service is alrady exists.");
                    $("#divCategoryMsg").css("display", "block");
                    isVal = false;
                }
            });
            if (isVal) {
                $("#divSubCategory").append('<br/><label><input type="checkbox" class="checkbox" name="chkSubCategory" checked="true" value="' + $("#txtSubServiceName").val() + '">' + $("#txtSubServiceName").val() + '</label>');
                $("#txtSubServiceName").val("");
                $("#divCategoryMsg").css("display", "none");
                return true;
            }
            else {
                return false;
            }

        }
    });

    $("#btnUpdateCategory").click(function () {

        $(".alert").hide();
        $(".alert-danger").hide();
        var isVal = true;
        //debugger;
        if ($("#txtCategoryName").val() == '') {
            // alert(1);
            $("#lblCategoryError").html("Please Enter Category.");
            $("#divCategoryMsg").css("display", "block");
            isVal = false;
            return false;
        }
        if ($("#txtDescription").val() == '') {
            // alert(1);
            $("#lblCategoryError").html("Please Enter Description.");
            $("#divCategoryMsg").css("display", "block");
            isVal = false;
            return false;
        }
        var numberOfChecked = $('input:checkbox:checked').length;
        var totalCheckboxes = $('input:checkbox').length;
        var numberNotChecked = totalCheckboxes - numberOfChecked;

        if (totalCheckboxes <= 0) {
            // alert(1);
            $("#lblCategoryError").html("Please Add Atleast One Category.");
            $("#divCategoryMsg").css("display", "block");
            isVal = false;
            return false;
        }

        if (isVal) {

            // debugger;
            var i = 0;
            var arr = [];
            $('.checkbox:checked').each(function () {
                arr[i++] = $(this).val();
            });
            console.log[arr];


            $.post("/categories/updateCategory",
             {
                 objectId: $("#lblId").val(),
                 name: $("#txtCategoryName").val(),
                 sub_cat: arr,
                 description: $("#txtDescription").val()
             },
             function (data) {
                 debugger;
                 if (data == "successful") {
                     cleareCategory();
                     $("#aNavigationCategory").click();
                     BindCategoryTable();
                     $('[name="refresh"]').click();
                 }
             })
        }

    });


    $("#btnAddCategory").click(function () {

        $(".alert").hide();
        $(".alert-danger").hide();
        var isVal = true;
        debugger;
        if ($("#txtCategoryName").val() == '') {
            // alert(1);
            $("#lblCategoryError").html("Please Enter Category.");
            $("#divCategoryMsg").css("display", "block");
            isVal = false;
            return false;
        }
        if ($("#txtDescription").val() == '') {
            // alert(1);
            $("#lblCategoryError").html("Please Enter Description.");
            $("#divCategoryMsg").css("display", "block");
            isVal = false;
            return false;
        }
        var numberOfChecked = $('input:checkbox:checked').length;
        var totalCheckboxes = $('input:checkbox').length;
        var numberNotChecked = totalCheckboxes - numberOfChecked;

        if (totalCheckboxes <= 0) {
            // alert(1);
            $("#lblCategoryError").html("Please Add Atleast One Category.");
            $("#divCategoryMsg").css("display", "block");
            isVal = false;
            return false;
        }

        if (isVal) {

            // debugger;
            var i = 0;
            var arr = [];
            $('.checkbox:checked').each(function () {
                arr[i++] = $(this).val();
            });
            console.log[arr];


            $.post("/categories/add",
         {
             name: $("#txtCategoryName").val(),
             sub_cat: arr,
             description: $("#txtDescription").val()
         },
         function (data) {
             debugger;
             if (data == "successful") {
                 cleareCategory();
                 $("#aNavigationCategory").click();
                 BindCategoryTable();
                 $('[name="refresh"]').click();
             }
         })
        }


    });


    function cleareCategory() {
        $("#txtCategoryName").val("");
        $("#txtDescription").val("");
        $("#txtSubServiceName").val("");
        $("#divSubCategory").empty();
        $("#lblCategoryError").html("");
        $("#divCategoryMsg").css("display", "block");
        $("#divCategoryMsg").hide();
    }

    function BindCategoryTable() {
        // debugger;
        $('#tblCategory').bootstrapTable({

            url: '/categories/getAllCategories',
            method: 'get',
            height: 400,
            striped: true,
            pagination: true,
            pageSize: 6,
            pageList: [10, 25, 50, 100, 200],

            showRefresh: true,
            search: true,
            minimumCountColumns: 2,
            columns: [
            {
                field: 'name',
                title: 'Category Name',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'description',
                title: 'Description',
                align: 'left',
                valign: 'top',
                sortable: true
            },
            {
                field: 'sub_cat',
                title: 'Services Name',
                align: 'sleft',
                valign: 'top',
                sortable: true
            },
            {
                field: 'operate',
                title: 'Edit',
                align: 'center',
                valign: 'middle',
                formatter: editFormatter

            }
            ]

        });
    }

    function BindSalonTable() {
        //debugger;
        $('#tblSalon').bootstrapTable({

            url: '/salons/getSalons',
            method: 'get',
            height: 400,
            striped: true,
            pagination: true,
            pageSize: 6,
            pageList: [10, 25, 50, 100, 200],

            showRefresh: true,
            search: true,
            minimumCountColumns: 2,
            columns: [
            {
                field: 'name',
                title: 'Salon Name',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'owners',
                title: 'Owners',
                align: 'left',
                valign: 'top',
                sortable: true
            },
            {
                field: 'phoneNo',
                title: 'Phone Number',
                align: 'sleft',
                valign: 'top'
            },
            {
                field: 'address.area',
                title: 'Area',
                align: 'sleft',
                valign: 'top',
                sortable: true,


            },
            {
                field: 'address.city',
                title: 'City',
                align: 'sleft',
                valign: 'top',
                sortable: true,
            },
             {
                 field: 'address.state',
                 title: 'State',
                 align: 'sleft',
                 valign: 'top',
                 sortable: true,
             },
            {
                field: 'operate',
                title: 'Delete',
                align: 'center',
                valign: 'middle',
                formatter: deleteFormatter,
                events: deleteSalonEvent
            }
            ]


        });
    }

    function BindUser() {
        //   alert("bind");
        //debugger;
        $('#tblUser').bootstrapTable({

            url: '/users/getAllUser',
            method: 'get',
            height: 400,
            striped: true,
            pagination: true,
            pageSize: 6,
            pageList: [10, 25, 50, 100, 200],

            showRefresh: true,
            search: true,
            minimumCountColumns: 2,
            columns: [
            {
                field: 'name',
                title: 'Name',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'username',
                title: 'User Name',
                align: 'left',
                valign: 'top',
                sortable: true
            },
            {
                field: 'gender',
                title: 'Gender',
                align: 'sleft',
                valign: 'top'
            },
            {
                field: 'email',
                title: 'Email',
                align: 'sleft',
                valign: 'top'
            },
            {
                field: 'address.area',
                title: 'Area',
                align: 'sleft',
                valign: 'top',
                sortable: true,


            },
            {
                field: 'address.city',
                title: 'City',
                align: 'sleft',
                valign: 'top',
                sortable: true,
            },
             {
                 field: 'address.state',
                 title: 'State',
                 align: 'sleft',
                 valign: 'top',
                 sortable: true,
             },
            {
                field: 'operate',
                title: 'status',
                align: 'center',
                valign: 'middle',
                formatter: linkFormatter,
                events: statuschangeEvent
            }
            ]
        });
    }

    //edit link
    function deleteFormatter(value, row, index) {
        return [
        '<a class="delete ml10" href="javascript:void(0)" title="Delete"',
        '<i>',
        '<button type="button" class="btn btn-danger">Delete</button>',
        '</i>',
        '</a>&nbsp;&nbsp;'
        ].join('');
    }
    function linkFormatter(value, row, index) {
        // debugger;
        var status;
        //console.log(value);
        if (row.active) {
            status = "Active";
        }
        else {
            status = "Deactivated";
        }
        return [
        '<a class="status ml10" title="Click"',
        '<i>',
        '<lable>' + status + '</lable>',
        '</i>',
        '</a>&nbsp;&nbsp;',
        ].join('');
    }

    //edit button for category 
    function editFormatter(value, row, index) {
        // debugger;
        return [
        '<a class="delete ml10" href="javascript:void(0)" title="Delete"',
        '<i>',
        '<button type="button" class="btn btn-primary">Edit </button>',
        '</i>',
        '</a>&nbsp;&nbsp;'
        ].join('');
    }

    $('#tblCategory').on('click-row.bs.table', function (e, row, $element) {
        // console.log(row, $element);
        //alert("in");;
        // debugger;
        var status;

        $("#aNavigationCategory").click();
        $("#btnUpdateCategory").show();
        $("#btnAddCategory").hide();
        $("#lblId").val(row._id);
        //console.log(value);
        debugger;
        $("#txtCategoryName").val(row.name);
        $("#txtDescription").val(row.name);
        for (var i = 0; i < row.sub_cat.length; i++) {
            $("#divSubCategory").append('<br/><label><input type="checkbox" class="checkbox" name="chkSubCategory" checked="true" value="' + row.sub_cat[i] + '">' + row.sub_cat[i] + '</label>');
        }
    })
    window.statuschangeEvent = {
        'click .status': function (e, value, row, index) {

            var data = JSON.stringify(row);
            //alert("Are you sure you want delete  " + row.name);

            var status;
            //console.log(value);
            if (row.active) {
                $.post("/users/deactivateUser?", { objectId: row._id }, function (data) {
                    //   debugger;
                    if (data == "Deactivated") {
                        row.active = false;
                        BindUser();
                        //linkFormatter("", row, $element);
                        // changstatus("", row, $element);
                        //  formatter: linkFormatter(" ",row,"");
                        $('[name="refresh"]').click();
                    }
                });
            }
            else {
                ;
                $.get("/users/activateUser?", { objectId: row._id }, function (data) {
                    //debugger;
                    if (data == "Activated") {
                        row.active = true;
                        BindUser();
                        //linkFormatter("", row, $element);
                        $('[name="refresh"]').click();
                        //formatter: linkFormatter(" ", row, " ");
                    }

                });
            }

        }
    };

    window.deleteSalonEvent = {
        'click .delete': function (e, value, row, index) {

            var data = JSON.stringify(row);
            //alert("Are you sure you want delete  " + row.name);
            if (confirm("Are you sure you want delete  " + row.name + "?")) {
                // your deletion code
                $.post("/salons/delete",
                {
                    username: row.name
                },
                function (data) {
                    debugger;
                    $("#lblSalonMsg").html(data);
                    $("#divSalonMsg").css("display", "block");
                    $('[name="refresh"]').click();
                })
            }
        }
    };

    $("#txtCategoryName").focusout(function () {
        // alert('working');
        //alert($("#txtUserName").val());

        // alert('working');
        //alert($("#txtUserName").val());
        $.get("/categories/checkCategory?", { name: $("#txtCategoryName").val() }, function (data) {
            if (data != "0") {



                $("#lblCategoryError").html(data);
                $("#divCategoryMsg").css("display", "block");
                $("#btnAddCategory").attr('disabled', 'disabled');

                return false;
            }
            else {
                //alert('not working');
                $("#btnAddCategory").attr('disabled', false);
                $("#divCategoryMsg").css("display", "none");
            }

        });
    }); 
});
