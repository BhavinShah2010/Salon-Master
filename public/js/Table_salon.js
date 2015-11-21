$(document).ready(function () {
    //alert("Hello");
    var id = document.getElementById("salonId").value;
    //alert(id);
    //alert(req.body.salonId);
     debugger;
   //  var tech = GetURLParameter(id);
  //   var Id= $.url.attr('id')
   //  console.log(tech);

    $('#tblservices').bootstrapTable({
        url: '/services/getSalonServices',
        method: 'post',
        height: 400,
        striped: true,
        pagination: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 200],
        search: true,
        showRefresh: true,
        minimumCountColumns: 2,
        queryParams: function (p) {
            return { salonId: id }
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
         objectId: id
     },
     function (data) {
            debugger;
         var htmlContent = "";

         htmlContent += "<h2>";
         htmlContent += data[0].name;
         htmlContent += "</h2><br>";
         htmlContent += "<b>Type</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
         htmlContent += data[0].type;
         htmlContent += "<br><b>Address</b>&nbsp;&nbsp;";
         htmlContent += data[0].address.street;
         htmlContent += "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
         htmlContent += data[0].address.area;
         htmlContent += ", ";
         htmlContent += data[0].address.city;
         htmlContent += "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
         htmlContent += data[0].address.state;
         htmlContent += data[0].address.zipcode;
         htmlContent += "<br> <b>Contact No.</b>&nbsp;";
         htmlContent += data[0].phoneNo;
         htmlContent += "<br> <b>Owners </b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
         for(var i=0;i<data[0].owners.length;i++)
         {
            htmlContent += data[0].owners[i];
            if(i < data[0].owners.length-1)
                htmlContent += ", ";
         }
         htmlContent += "<input type='hidden' id='rating' value='";
         htmlContent += data[0].ratings;
         htmlContent += "'><br><div id='fixstardefault'></div>";
         //debugger;
         var rate = data[0].ratings;
         var full = 5;
         htmlContent += "<br><div id='fixstardefault' style='cursor: pointer;'>";
         while(rate > 0)
         {
            htmlContent += "<img ";
            if(rate == 0.5)
                htmlContent += "src='/images/Star/star-half.png'";
            else
                htmlContent += "src='/images/Star/star-on.png'";
            htmlContent += "/>&nbsp;";
            rate = rate - 1;
            full = full - 1;     
         }
         while(full>0)
         {
            htmlContent += "<img alt='5' src='/images/Star/star-off.png' title='gorgeous'>";
            full = full - 1;
         }    

         htmlContent += "<input type='hidden' name='score' value='4'></div>";
         htmlContent += "<br><span><button type='button' class='btn btn-fefault cart'>Book Appointment</button></span></div>";
         debugger;
         document.getElementById('divSalonInfo').innerHTML = htmlContent;

/*
         $("#lbl_shopname").html(data[0].name);
         $("#lblShopMobile").html(data[0].phoneNo[0]);
         $("#lblShopDescription").html(data[0].description);
         //$('#lblShopAddress').html(data[0].address.area);
         //$('#lblShop').html(data[0])
*/
     });
  
    $.post("/reviews/getReviewsBySalon",
    {
        objectId: id
    },
    function(data)
    {
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
