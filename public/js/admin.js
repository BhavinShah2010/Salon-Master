
$(document).ready(function () {
    // to show Category
    debugger
    $("#aCategory").click(function () {
        $("#divCategory").show();
        $("#divSalon").hide();
        $("#divUser").hide();
        $("#liCategory").addClass("active");
        $("#liSalon").removeClass("active");
        $("#liUser").removeClass("active");


    });
    // to show Salon
    $("#aSalon").click(function () {
        debugger;
        $("#divCategory").hide();
        $("#divSalon").show();
        $("#divUser").hide();
        $("#liCategory").removeClass("active");
        $("#liSalon").addClass("active");
        $("#liUser").removeClass("active");
        BindSalonTable();
    });

    $("#aUser").click(function () {
        debugger;
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
        if ($("#divCategoryList").is(":visible")) {
            //alert("List True");
            $("#lblaNavigationCategory").html("View Category");
            $("#divCategoryAdd").show();
            $("#divCategoryList").hide();
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
                    $("#lblCategoryError").html("Category is alrady exists.");
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

            debugger;
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
                formatter: editFormatter,
            }
            ]

        });
    }

    function BindSalonTable() {
        debugger;
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
            }
            ]
        });
    }

    //edit link
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
        '<a class="approve ml10" title="Click"',
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
    $('#tblUser').on('click-row.bs.table', function (e, row, $element) {
        // console.log(row, $element);
        //alert("in");;
       // debugger;
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
                    $( '[name="refresh"]').click();
                }
            });
        }
        else {
            $.get("/users/activateUser?", { objectId: row._id }, function (data) {
               // debugger;
                if (data == "Activated") {
                    row.active = true;
                    BindUser();
                    //linkFormatter("", row, $element);
                    $('[name="refresh"]').click();
                    //formatter: linkFormatter(" ", row, " ");
                }

            });
        }

    })
   

});
