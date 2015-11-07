
$(function () {
    $('#driver_for_contractor-table-javascript').bootstrapTable({
        method: 'get',
        height: 400,
        striped: true,
        pagination: true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        search: false,
        showColumns: true,
        showRefresh: true,
        minimumCountColumns: 2,
        columns: [ 
        {
            field: 'name',
            title: 'Name',
            align: 'center',
            valign: 'middle',
            sortable: false
        }, 
        {
            field: 'email',
            title: 'Email',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'contact',
            title: 'Contact',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'operate',
            title: '',
            align: 'center',
            valign: 'middle',
            formatter: deleteFormatter,
            events: driverByContractorEvents
        }]
    });
    $('#driver_app_for_admin-table-javascript').bootstrapTable({
        method: 'get',
        height: 400,
        striped: true,
        pagination: true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        search: false,
        showColumns: true,
        showRefresh: true,
        minimumCountColumns: 2,
        columns: [ 
        {
            field: 'name',
            title: 'Name',
            align: 'center',
            valign: 'middle',
            sortable: false
        }, 
        {
            field: 'email',
            title: 'Email',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'contact',
            title: 'Contact',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'operate',
            title: '',
            align: 'center',
            valign: 'middle',
            formatter: acceptRejectFormatter,
            events: operateEvents
        }]
    });
    $('#driver_nonapp_for_admin-table-javascript').bootstrapTable({
        method: 'get',
        height: 400,
        striped: true,
        pagination: true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        search: false,
        showColumns: true,
        showRefresh: true,
        minimumCountColumns: 2,
        columns: [ 
        {
            field: 'name',
            title: 'Name',
            align: 'center',
            valign: 'middle',
            sortable: false
        }, 
        {
            field: 'email',
            title: 'Email',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'contact',
            title: 'Contact',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'operate',
            title: '',
            align: 'center',
            valign: 'middle',
            formatter: acceptRejectFormatter,
            events: operateEvents
        }]
    });
    $('#contractor_nonapp_for_admin-table-javascript').bootstrapTable({
        method: 'get',
        height: 600,
        striped: true,
        pagination: true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        search: false,
        showColumns: true,
        showRefresh: true,
        minimumCountColumns: 2,
        columns: [ 
        {
            field: 'business_name',
            title: 'Name',
            align: 'center',
            valign: 'middle',
            sortable: false
        }, 
        {
            field: 'email',
            title: 'Email',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'owner_name',
            title: 'Business Owner',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'mobile_no',
            title: 'Mobile Number',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'address[]',
            title: 'Address',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'pan_doc',
            title: 'PAN File',
            align: 'left',
            valign: 'top',
            formatter: linkFormatter,
            sortable: true
        },
        {
            field: 'pan_no',
            title: 'PAN Number',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'business_registration_doc',
            title: 'Business Registration File',
            align: 'left',
            valign: 'top',
            formatter: linkFormatter,
            sortable: true
        },
        {
            field: 'operate',
            title: '',
            align: 'center',
            valign: 'middle',
            formatter: acceptRejectFormatter,
            events: contractorByAdminEvents
        }]
    });

    $('#contractor_app_for_admin-table-javascript').bootstrapTable({
        method: 'get',
        height: 600,
        striped: true,
        pagination: true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        search: false,
        showColumns: true,
        showRefresh: true,
        minimumCountColumns: 2,
        columns: [ 
        {
            field: 'business_name',
            title: 'Name',
            align: 'center',
            valign: 'middle',
            sortable: false
        }, 
        {
            field: 'email',
            title: 'Email',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'owner_name',
            title: 'Business Owner',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'mobile_no',
            title: 'Mobile Number',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'address[]',
            title: 'Address',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'pan_doc',
            title: 'PAN File',
            align: 'left',
            valign: 'top',
            formatter: linkFormatter,
            sortable: true
        },
        {
            field: 'pan_no',
            title: 'PAN Number',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'business_registration_doc',
            title: 'Business Registration File',
            align: 'left',
            valign: 'top',
            formatter: linkFormatter,
            sortable: true
        },
        {
            field: 'operate',
            title: '',
            align: 'center',
            valign: 'middle',
            formatter: acceptRejectFormatter,
            events: contractorByAdminEvents
        }]
    });

    $('#truck_type-table-javascript').bootstrapTable({
        method: 'get',
        height: 400,
        striped: true,
        pagination: true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        search: false,
        showColumns: true,
        showRefresh: true,
        minimumCountColumns: 2,
        columns: [ 
        {
            field: 'type_name',
            title: 'Truck type name',
            align: 'center',
            valign: 'middle',
            sortable: false
        }, 
        {
            field: 'capacity',
            title: 'Capacity of Truck',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'base_fare',
            title: 'Base fare of Truck',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'operate',
            title: 'Modify',
            align: 'center',
            valign: 'middle',
            formatter: deleteFormatter,
            events: operateEvents
        }]
    });

    $('#truck-table-javascript').bootstrapTable({
        method: 'get',
        height: 400,
        striped: true,
        pagination: true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        search: false,
        showColumns: true,
        showRefresh: true,
        minimumCountColumns: 2,
        columns: [ 
        {
            field: 'truck_number',
            title: 'Truck No.',
            align: 'center',
            valign: 'middle',
            sortable: false
        }, 
        {
            field: 'truck_type',
            title: 'Type',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'operate',
            title: 'Modify',
            align: 'center',
            valign: 'middle',
            formatter: operateFormatter,
            events: operateEvents
        }]
    });

    $('#order-table-javascript').bootstrapTable({
        method: 'get',
        height: 400,
        striped: true,
        pagination: true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        search: false,
        showColumns: true,
        showRefresh: true,
        minimumCountColumns: 2,
        columns: [ 
        {
            field: 'order_id',
            title: 'Order No.',
            align: 'center',
            valign: 'middle',
            sortable: false
        }, 
        {
            field: 'order_status',
            title: 'Status',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'operate',
            title: 'Modify',
            align: 'center',
            valign: 'middle',
            formatter: orderFormatter,
            events: operateOrderEvents
        }]
    });
    

});
function operateFormatter(value, row, index) {
    return [
    '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
    '<i class="fa fa-edit"></i>',
    '</a>&nbsp&nbsp',
    '<a class="remove ml10" href="javascript:void(0)" title="Remove">',
    '<i class="fa fa-remove"></i>',
    '</a>&nbsp&nbsp'
    ].join('');
}
function linkFormatter(value, row, index) {
    return [
    '<a class="approve ml10" href="'+value+'" title="Click"',
    '<i>',
    '<button type="button" class="btn btn-primary btn-sm">Show Document</button>',
    '</i>',
    '</a>&nbsp;&nbsp;',
    ].join('');
}
function orderFormatter(value, row, index) {
    return [
    '<a class="edit ml10" href="javascript:void(0)" title="Open Details">',
    '<i class="fa fa-edit"></i>',
    '</a>&nbsp&nbsp',
    '<a class="remove ml10" href="javascript:void(0)" title="Remove">',
    '<i class="fa fa-remove"></i>',
    '</a>&nbsp&nbsp'
    ].join('');
}
function acceptRejectFormatter(value, row, index) {
    return [
    '<span class="pull-right">',
    '<a class="approve ml10" href="javascript:void(0)" title="Approve"',
    '<i>',
    '<button type="button" class="btn btn-success btn-sm">Approve</button>',
    '</i>',
    '</a>&nbsp;&nbsp;',
    '<a class="reject ml10" href="javascript:void(0)" title="Reject"',
    '<i>',
    '<button type="button" class="btn btn-danger btn-sm">Reject</button>',
    '</i>',
    '</a>&nbsp;&nbsp;',
    '</span>'
    ].join('');
}
function deleteFormatter(value, row, index) {
    return [
    '<a class="delete ml10" href="javascript:void(0)" title="Delete"',
    '<i>',
    '<button type="button" class="btn btn-danger">Delete</button>',
    '</i>',
    '</a>&nbsp;&nbsp;'
    ].join('');
}

window.operateEvents = {
    'click .like': function (e, value, row, index) {
        alert('You click like icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    },
    'click .edit': function (e, value, row, index) {
        alert('You click edit icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    },
    'click .remove': function (e, value, row, index) {
        alert('You click remove icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    },
    'click .approve': function (e, value, row, index) {
        alert('You click approve button, row: ' + JSON.stringify(row));
    },
    'click .reject': function (e, value, row, index) {
        alert('You click reject button, row: ' + JSON.stringify(row));
    },
    'click .delete': function (e, value, row, index) {
        alert('You click delete button, row: ' + JSON.stringify(row));
    }
};

window.operateOrderEvents = {
    'click .like': function (e, value, row, index) {
        alert('You click like icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    },
    'click .edit': function (e, value, row, index) {
        var order_data = JSON.stringify(row); 
        //alert(row._id);
        window.open('/contractor/get_order_detail/'+row._id,'_self');
        console.log(value, row, index);
    },
    'click .remove': function (e, value, row, index) {
        alert('You click remove icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    }
};

window.contractorByAdminEvents = {
    'click .approve': function (e, value, row, index) {
        alert('You click approve button, row: ' + JSON.stringify(row));
    },
    'click .reject': function (e, value, row, index) {
        alert('You click reject button, row: ' + JSON.stringify(row));
    }
};

window.driverByContractorEvents= {
    'click .delete': function (e, value, row, index) {
        
        var data  = JSON.stringify(row);
        alert("You are about to Delete Driver");
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        if (xhttp.responseText == "success") {
                            window.open("/contractor/manage_driver","_self")
                        }
                        else {
                            alert(xhttp.responseText);
                        }
                    }
                }   
                xhttp.open("POST", "/contractor/delete_driver_contractor", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send(data);
    }
};