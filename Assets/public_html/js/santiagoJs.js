/*Santiago Rodríguez - Manuel De Armas - Obligatorio programacion 1 2018 - santiagoJS*/



function mostrarTop5() {
    console.log("mostrarTop5");
	var arrayTop5 = getTop5();
	var txtOferta = "<ul>";
	
	$.each(arrayTop5, function( index, value ) {
		var oferta = getOferta(value);
		txtOferta += "<li>";
        txtOferta += "<img style='width:150px; height:150px;' src='" + oferta.imageUrl + "' >";
        txtOferta += "</li>";
	});
    txtOferta += "</ul>";
    $("#contenedorTop5").html(txtOferta);
}

function getTop5(){
	var arrayIndexTop5 = {};
	var arrayTop5byNumber = new Array();
	
	for (var i = 0; i < reservasPreCargadas.length; i++) {
		var oferta = Number(reservasPreCargadas[i].offerId);
		if (arrayIndexTop5[String(oferta)] == undefined) {
			arrayIndexTop5[String(oferta)] = 1;
		} else {
			arrayIndexTop5[String(oferta)] = arrayIndexTop5[oferta] + 1;
		}
    }
	for (var i = 0; i < 5; i++) {
        var aux = getHighestFromArray(arrayIndexTop5);
		arrayTop5byNumber.push(aux);
		delete arrayIndexTop5[aux];
    }	
	return arrayTop5byNumber;
}

function getHighestFromArray(arr){
	var highest = -1;
	var highestPosition = -1;
	
	$.each(arr, function( index, value ) {
		if (value > highest){
			highest = value;
			highestPosition = index;
		}
	});
	return highestPosition;
}

function getOferta(idOferta){
	var oferta = {};
	
	$.each(ofertasPreCargadas, function( index, value ) {
		
		if (value.id == idOferta){
			oferta = value;
			//console.log(value.id);
		}
	});
	return oferta;
}

function cargarDestacados(objOfertas) {
    //console.log(ofertasPreCargadas);
    for (var i = 0; i < objOfertas.length; i++) {
        var txtOferta = "<div class='oferta'>";
        txtOferta += "<h1>" + objOfertas['Hospedaje'] + '</h1>';

        txtOferta += "</div>";

        $("#contenedorTop5").append(txtOferta);
    }

}


