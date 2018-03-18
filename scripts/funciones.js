var markers=[];
$(document).ready(function(){
    getMyLocation();

    // Este es pata el clik del boton de la pantalla principal
    $("#btnAddMarker").click(function(){
        $("#myModal").modal();
    });

    // Este es para el click del boton de la ventana modal
    $("#btnAddMarkerModal").click(function(){
        var lat = $("#txtLatitude").val();
        var lng = $("#txtLongitude").val();
        var title = $("#txtTitle").val();
        var content = $("#txtContent").val();
        addToArray(lat, lng, title,content);
        addMarker(map,new google.maps.LatLng(lat,lng),title,content);
        // clearModalTextBox();
        $("#myModal").modal('hide');
        printTable();
    });

    // Este es para el click para eliminar un marcador
    $("#IDtbody").on('click','button',function(){
        var cadenaId = $(this).parent().parent().attr('id');
        deletePin(cadenaId.substring(4,cadenaId.length));
        eliminarFila(cadenaId.substring(4, cadenaId.length));
    });
});

function clearModalTextBox() {
    $("#txtLatitude").val('').end();
    $("#txtLongitude").val('').end();
    $("#txtTitle").val('').end();
    $("#txtContent").val('').end();    
}

function addToArray(lat, lng, title, content) {
    var marker = {
        lat: lat,
        lng:lng,
        title:title,
        content,content
    }
    markers.push(marker);
}

function printTable(){
    var cadena='';
    for(var i=0;i<markers.length;i++){
        cadena += '<tr id="fila'+ i +'">' + 
    '<td>' + markers[i].title+ '</td>' +
    '<td>' + markers[i].lat + '</td>' +
    '<td>' + markers[i].lng +'</td>' +
    '<td>' + markers[i].content + '</td>' +
    '<td>' +
        '<button class="btn btn-primary">' +
            '<span class="glyphicon glyphicon-trash">Delete</span>' +
        '</button>' +
    '</td>' +
    '</tr>';
    }
    
    document.getElementById('IDtbody').innerHTML = cadena;
}

function eliminarFila(indice) {
    markers.splice(indice,1);
    printTable();
}