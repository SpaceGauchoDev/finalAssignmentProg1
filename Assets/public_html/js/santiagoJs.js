/*Santiago Rodríguez - Manuel De Armas - Obligatorio programacion 1 2018 - santiagoJS*/



$( document ).ready(function() {
    
	console.log("inicio");
	
	arrayOfertas = cargarArrayOfertas();
	
	mostrarOfertas(arrayOfertas);
	
	
    /*
	
	contenedorTop5
	
	
	cargarDestacados();
    var oOfertas = cargarOfertas();
    mostrarOfertas(oOfertas);
	*/
});

//var arrayOfertas = new Array();

var arrayOfertas = new Array();


function mostrarOfertas(objOfertas){
	console.log("mostrarOfertas");
	console.log(objOfertas);
	console.log(objOfertas.length);
	
	var txtOferta = "<ul>";
	
    for (var i=0; i<objOfertas.length; i++){
		console.log("ITEM: ");
		console.log(objOfertas[i].imageUrl);
		
        txtOferta += "<li>";
        txtOferta += "<img style='width:150px; height:150px;' src='" + objOfertas[i].imageUrl + "' >";
		
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

/*
function cargarOfertas(){
    
    for (var i=0; i<10; i++){
        var nombre = "Hotel " + i;
        var precio = 100;
        var arr = {"ID": i, "Hospedaje": nombre, "Precio": precio};
        arrayOfertas.push(arr);
    }   
    return arrayOfertas;
}



*/




function cargarArrayOfertas() {
    var _startDate = new Date();
    var _endDate = new Date();
    var _addedDate = new Date();
    var newId = 0;

    newId = nuevoIdUnico(ofertasPreCargadas);
    var oferta1 = {
        id: newId, // id único generado para cada oferta
        featured: -1, // -1 no esta destacado, numero positivo el orden en la lista de destacados       
        active: false, // verdadero la oferta está visible en la página actualmente
        timesBooked: 0, // cantidad de veces reservada
        displayName: "Balmoral Plaza", // nombre del hospedaje u oferta
        geoLocation: "Plaza Cagancha 1126", // direccion geografica de el hospedaje
        imageUrl: "media/pictures/01-Balmoral_Plaza-Plaza_Cagancha-1126.jpeg", // url de la imagen relativa al proyecto
        housingType: "Hotel", // puede ser hotel, hostel, casa, apartamento
        nightsNumber: 0, // numero de noches que dura la oferta
        priceDollars: 0, // el precio por defecto se muestra en dolares
        startDate: _startDate, // fecha de inicio del periodo valido cuando se puede reservar para obtener el beneficio de la oferta
        endDate: _endDate, // fecha de fin del periodo valido cuando se puede reservar para obtener el beneficio de la oferta                
        addedDate: _addedDate}; // fecha en que la oferta fue agregada a la lista de ofertas, para ordenamiento de ofertas no destacadas


    //newId = nuevoIdUnico(ofertasPreCargadas);
    var oferta2 = {
        id: newId,
        featured: -1,
        active: false,
        timesBooked: 0,
        displayName: "Alvear Hotel",
        geoLocation: "Yi 1372",
        imageUrl: "media/pictures/02-Alvear_Hotel-YI-1372.jpeg",
        housingType: "Hotel",
        nightsNumber: 0,
        priceDollars: 0,
        startDate: _startDate,
        endDate: _endDate,
        addedDate: _addedDate};
    
    //newId = nuevoIdUnico(ofertasPreCargadas);
    var oferta3 = {
        id: newId,
        featured: -1,
        active: false,
        timesBooked: 0,
        displayName: "Belmont House",
        geoLocation: "Avenida Rivera 6512",
        imageUrl: "media/pictures/03-Belmont_House-Avenida_Rivera-6512.jpeg",
        housingType: "Hotel",
        nightsNumber: 0,
        priceDollars: 0,
        startDate: _startDate,
        endDate: _endDate,
        addedDate: _addedDate};
    
    //newId = nuevoIdUnico(ofertasPreCargadas);
    var oferta4 = {
        id: newId,
        featured: -1,
        active: false,
        timesBooked: 0,
        displayName: "Dazzler Montevideo",
        geoLocation: "21 De Setiembre 2752",
        imageUrl: "media/pictures/04-Dazzler_Montevideo-21_De_Setiembre-2752.jpeg",
        housingType: "Hotel",
        nightsNumber: 0,
        priceDollars: 0,
        startDate: _startDate,
        endDate: _endDate,
        addedDate: _addedDate};
	
	
	var ofertas = new Array();
    ofertas.push(oferta1, oferta2, oferta3, oferta4);
	return ofertas;
}