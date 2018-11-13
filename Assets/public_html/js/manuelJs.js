/*Santiago Rodríguez - Manuel De Armas - Obligatorio programacion 1 2018 - manuelJS*/

/*
function sortArray_sortTest() {
    ofertas.sort(sortingCriteria_sortTest);
}

function sortingCriteria_sortTest(pA, pB) {
    var order = 0;
    if (pA.displayName > pB.displayName) {
        order = 1;
    }
    if (pA.displayName < pB.displayName) {
        order = -1;
    }
    return order;
}
*/

function construirUsuario(){
    var _dateOfBirth = new Date();
    var _favorited = new Array();
   
    var usuario = {
        id: 1234, // id unico generado para cada usuario
        type: "admin", // tipo de usuario puede ser "admin", "regUser" 
        status: 0, // -1 rechazado, 0 pendiente, 1 habilitado
        name: "Nombre del usuario", // nombre que el usuario ingresa
        lastName: "apellido del usuario", // apellido que el usuario ingresa
        email: "direccion@proveedorDeEmail.com", // email que el usuario ingresa
        dateOfBirth: _dateOfBirth, // fecha de nacimiento que el usuario ingresa
        password: "contraseña", // contraseña que el usuario ingresa
        favorited: _favorited // array con los id's de las ofertas que el usuario ha marcado como favoritas
    };
}

function construirReserva(){
    var _startDate = new Date();
    var _endDate = new Date();
    
    var reserva = {
        userId: 1234,
        ofertaId: 1234,
        startDate: _startDate,
        endDate: _endDate,
        status: 0 // -1 desaprobada, 0 pendiente, 1 aprobada
    };
}


function mostrarOfertasPrecargadas(){
    construirYAgregarOfertasPreCargadas();
    var allOffers = "";
    for (var i = 0; i<ofertasPreCargadas.length; i++ ){
        allOffers += buildHtmlOfferFullSize(ofertasPreCargadas[i]) + "<p></p>";
    }   
    $("#mainDiv").html(allOffers);
}


function buildHtmlOfferFullSize(pOferta){
	console.log(pOferta);
    //la oferta es una tabla de 1 fila con 3 columnas 
    //en la columna 1 se mostrará la imagen asociada a la oferta
    //en la columna 2 hay una tabla anidada con 5 filas y 1 columna, se agrega en cada sub fila la informacion de texto 
    //en la columna 3 hay una tabla anidada con 2 filas y 1 columna, se agrega en cada subfila botones de reservar y favoritear
    
    var col_1 = '<img class="offerFullSizePicture" src="'+pOferta.imageUrl+'" height="200" width="200"/>';      
    
    var displayName = pOferta.displayName;
    var displayLocation = pOferta.geoLocation;
    var displayDate = "Fecha oferta";
    var displayPrice = "$" + pOferta.priceDollars;
    var displayType = pOferta.housingType;
    
    var col_2 = '<table class="offerFullSizeInfo" width="200"><tr><td>'+displayName+"</td></tr><tr><td>"+displayLocation+"</td></tr><tr><td>"+displayDate+"</td></tr><tr><td>"+displayPrice+"</td></tr><tr><td>"+displayType+"</td></tr></table>";
    
    var resButton = "<button>Reserva</button>";
    var favButton = "<button>Marcar Favorito</button>";
    var col_3 = '<table class="offerFullSizeButtons" width="200"><tr><td>'+resButton+"</td></tr><tr><td>"+favButton+"</td></tr></table>";

    var offerFullSize = "<div><table class='offerFullSize'><tr><td>"+col_1+"</td><td>"+col_2+"</td><td>"+col_3+"</td></tr></table></div>";
        
    //$("#mainDiv").html(completeTable);
    return offerFullSize;
}