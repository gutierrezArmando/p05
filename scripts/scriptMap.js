var map;
var markersMap=[];
function getMyLocation() {
    if(navigator.geolocation){
        console.log('Soportado');
        navigator.geolocation.getCurrentPosition(displayLocation);
    }else{
        alert('No soportado');
    }
}

function displayLocation(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    /*Se llenan los campos con los valores obtenidos */
    var htmlLat = document.getElementById("txtLatitudeBlock");
    var htmlLng = document.getElementById("txtLongitudeBlock");
    htmlLat.setAttribute("value",lat);
    htmlLng.setAttribute("value",lon);
    /*Se muestra el mapa */
    showMap(position.coords);
}


function showMap(coords) {
    var latLon = new google.maps.LatLng(coords.latitude, coords.longitude);
    
    var mapOptions ={
        zoom: 10,
        center: latLon,
        mapTyepId : google.maps.MapTypeId.ROADMAP
    };

    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv,mapOptions);

    var title = "Your location";
    var content= "Latitude: " + coords.latitude + " Longitude: " + coords.longitude;
    //addMarker(map,latLon,title,content);
    setMarkersOnMapFromServer();
}

/*Agregar un marcador al mapa, de acuerdo a los valores pasados como parametros */
function addMarker(map, latLon, title, content) {
    var markerOptions = {
        map:map,
        position: latLon,
        title:title,
        clickable: true
    };

    var marker = new google.maps.Marker(markerOptions);
    markersMap.push(marker);
    var infoWindowOptions = {
        content:content,
        position:latLon,
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker, "click", function () {
        infoWindow.open(map);
    });
}

function addPins(lat, long,title,content){
    addMarker(map,new google.maps.LatLng(lat,long),title,content);
}

function deletePin(indexPin){
    markersMap[indexPin].setMap(null);
    markersMap.splice(indexPin,1);
}