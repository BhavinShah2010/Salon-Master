
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

        $('#tblCategory').bootstrapTable({
              url: '/categories/getAllCategories',
              method: 'get',
              height: 400,
              striped: true,
              pagination: true,
              pageSize: 10,
              pageList: [10, 25, 50, 100, 200],
              search: true,
              //  showColumns: true,
              showRefresh: true,
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
              }]
  
      });
    });
    // to show Salon
    $("#aSalon").click(function () {
        $("#divCategory").hide();
        $("#divSalon").show();
        $("#divUser").hide();
        $("#liCategory").removeClass("active");
        $("#liSalon").addClass("active");
        $("#liUser").removeClass("active");
    });

    $("#aUser").click(function () {
        $("#divCategory").hide();
        $("#divSalon").hide();
        $("#divUser").show();
        $("#liCategory").removeClass("active");
        $("#liSalon").removeClass("active");
        $("#liUser").addClass("active");
    });
    $("#aNavigationCategory").click(function () {
        debugger;
        alert(1);
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
        }

    });

    /*
    divresult.Visible = false;
                lblResult.Text = String.Empty;
                if (divList.Visible)
                {
                    aNavigation.Text = List;
                    divAdd.Visible = true;
                    divList.Visible = false;
                    btnUpdate.Visible = false;
                    btnSave.Visible = true;
                }
                else
                {
                    aNavigation.Text = InsertUpdate;
                    divAdd.Visible = false;
                    divList.Visible = true;
                    txtSearchCategory.Text = string.Empty;
                    txtCategoryName.Text = string.Empty;
                    BindCategory();
                }
    */

});
