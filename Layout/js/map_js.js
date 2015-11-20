

function initialize() {
var coords;
var lat,longt;
//var lat=23.19,longt=72.633;
if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showCurrentLocation);
    } else { 
       alert("Location tracticking is not supported in this browser please use another brouser.");
    }
 //navigator.geolocation.getCurrentPosition(showCurrentLocation);
 function showCurrentLocation(position)
            {
                lat = position.coords.latitude;
                longt= position.coords.longitude;
                //alert(lat+" "+ longt);
      coords = new google.maps.LatLng(lat, longt);  
     // 
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
          center: coords,
          zoom: 16,
          mapTypeControl: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
      //map = new google.maps.Map(mapCanvas, mapOptions);

            //place the initial marker
            var marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: "Current location!"
            });
            }   
 }
google.maps.event.addDomListener(window, 'load', initialize);