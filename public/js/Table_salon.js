$(document).ready(function () {
  //  alert(1);

    $('#tblservices').bootstrapTable({
        url: '/services/getSalonServices',
        method: 'post',
        height: 400,
        striped: true,
        pagination: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 200],
        search: true,
        //  showColumns: true,
        showRefresh: true,
        minimumCountColumns: 2,
        queryParams: function (p) {
            return { salonId: '5640cf93084c1c301bd613d5' }
        },
        columns: [
        {
            field: 'name',
            title: 'Service Name',
            align: 'center',
            valign: 'middle',
            sortable: true
        },
        {
            field: 'price',
            title: 'Price',
            align: 'left',
            valign: 'top',
            sortable: true
        },
        {
            field: 'duration',
            title: 'Duration',
            align: 'sleft',
            valign: 'top',
            sortable: true
        }]

    });
  
    $.post("/salons/getDetails",
     {
         objectId: "5640cf93084c1c301bd613d5"
     },
     function (data) {
         debugger;
         //var y=JSON.stringify(data)
         //var x = JSON.parse(y);  
         $("#lbl_shopname").html(data[0].name);
         // $("#lblShopEmail").html(data[0].name);
         $("#lblShopMobile").html(data[0].phoneNo[0]);
         //$("#lblShopAddress").html(data[0].name); 
         $("#lblShopDescription").html(data[0].description);

     });
    $.post("/reviews/getReviewsBySalon",
    {
        objectId: "5640c75217b0c6f00a9e29ca"
    },
    function(data)
    {
       // debugger;
        for(var i=0;i<data.length;i++){
            var uName;
            var dt = new Date(data[i].timestamp);
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var hours = dt.getHours();
            var minutes = dt.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            var mydate= dt.getDate()+" "+monthNames[dt.getMonth()]+" "+ dt.getFullYear();
            $("#divAddReviews").append('<br/><ul><li><a href="#"><i class="fa fa-user"></i>' + data[i].user.name + '</a></li><li><a href="#"><i class="fa fa-clock-o"></i>' + strTime + '</a></li><li><a href="#"><i class="fa fa-calendar-o"></i>' + mydate + '</a></li></ul>');
            $("#divAddReviews").append('<b>' + data[i].title + '</b><br/>' + data[i].description);
        }
    });
});