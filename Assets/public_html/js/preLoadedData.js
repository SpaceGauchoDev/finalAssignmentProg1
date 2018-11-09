var ofertasPreCargadas = new Array();

function construirYAgregarOfertasPreCargadas() {
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

    ofertasPreCargadas.push(oferta1, oferta2, oferta3, oferta4);
}


//pide nuevos id's hasta obtener uno que no exista en el array recibido
//requiere que los objetos del array parametro tenga una clave numerica "id"
function nuevoIdUnico(pArray) {
    var newId = 0;
    newId = generarNuevoId();
    while (newId === -1) {
        newId = generarNuevoId(pArray);
    }
    return newId;
}


//genera nuevos id's aleatorios, si el nuevo numero generado ya existe, devuelve -1
//requiere que los objetos del array parametro tenga una clave numerica "id"
function generarNuevoId(pArray) {
    var result = -1;
    if(typeof pArray !== 'undefined'){
        var max = 9999;
        var min = 1000;

        result = Math.floor(Math.random() * (max - min)) + min;

        //si no hay ofertas precargadas (porque esta es la primera), este bloque no corre
        if (pArray.length !== 0) {
            var encontroDuplicado = false;
            var i = 0;
            while (encontroDuplicado === false && i < pArray.length) {
                if (pArray[i].id === result) {
                    encontroDuplicado === true;
                    result = -1;
                }
                i++;
            }
        }     

    }else{
        console.log("pArray");
    }
    return result;
}