function initialize() {
var coords,coords2;
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
      coords2 = new google.maps.LatLng(lat+0.0015, longt+0.0015);   
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
            var marker = new google.maps.Marker({
            position: coords2,
            map: map,
            title: "xyz salon"
            });
            }   
 }
google.maps.event.addDomListener(window, 'load', initialize);