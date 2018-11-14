/*Santiago Rodríguez - Manuel De Armas - Obligatorio programacion 1 2018 - santiagoJS*/



function mostrarTop5(){
	console.log("mostrarOfertas");
	console.log(ofertasPreCargadas);
	console.log(ofertasPreCargadas.length);
	
	var txtOferta = "<ul>";
	
    for (var i=0; i<ofertasPreCargadas.length; i++){
		console.log("ITEM: ");
		console.log(ofertasPreCargadas[i].imageUrl);
		
        txtOferta += "<li>";
        txtOferta += "<img style='width:150px; height:150px;' src='" + ofertasPreCargadas[i].imageUrl + "' >";
		
		//txtOferta += "<img src='foto.jpg'>";
        
        txtOferta += "</li>";
	
    }
	
	txtOferta += "</ul>";
	$("#contenedorTop5").html(txtOferta);
}

function cargarDestacados(objOfertas){
	console.log(ofertasPreCargadas);
    for (var i=0; i<objOfertas.length; i++){
        var txtOferta = "<div class='oferta'>";
        txtOferta += "<h1>" + objOfertas['Hospedaje'] + '</h1>';
        
        txtOferta += "</div>";
        
        $("#contenedorTop5").append(txtOferta);
    }  
    
}


