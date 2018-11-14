var ofertasPreCargadas = new Array();
var usuariosPreCargados = new Array();

function construirYAgregarOfertasPreCargadas() {
    var _startDate = new Date();
    var _endDate = new Date();
    var _addedDate = new Date();

    var oferta1 = {
        id: nuevoIdUnico(ofertasPreCargadas), // id único generado para cada oferta
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


    var oferta2 = {
        id: nuevoIdUnico(ofertasPreCargadas),
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
    
    var oferta3 = {
        id: nuevoIdUnico(ofertasPreCargadas),
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
    
    var oferta4 = {
        id: nuevoIdUnico(ofertasPreCargadas),
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


function construirYAgregarUsuariosPreCargados() {
    var _dateOfBirth = new Date();
    var _favorited = new Array();
    
    var usuario1 = {
        id: nuevoIdUnico(usuariosPreCargados), //id unico generado para cada usuario
        type: "admin", // tipo de usuario puede ser "admin", "regUser" 
        status: "habilitado", // rechazado, pendiente, habilitado
        name: "Sebastián", // nombre que el usuario ingresa
        lastName: "Pérez", // apellido que el usuario ingresa
        email: "SebastiánPerez@proveedorDeEmail.com", // email que el usuario ingresa
        dateOfBirth: _dateOfBirth, // fecha de nacimiento que el usuario ingresa
        password: "1111", // contraseña que el usuario ingresa
        favorited: _favorited}; // array con los id's de las ofertas que el usuario ha marcado como favoritas
    
    var usuario2 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "pendiente",
        name: "Diego",
        lastName: "Gómez",
        email: "DiegoGomez@proveedorDeEmail.com",
        dateOfBirth: _dateOfBirth,
        password: "2222",
        favorited: _favorited};
    
    
    var usuario3 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "rechazado",
        name: "Gabriel",
        lastName: "Sosa",
        email: "GabrielSosa@proveedorDeEmail.com",
        dateOfBirth: _dateOfBirth,
        password: "2222",
        favorited: _favorited};
    
    
    var usuario4 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "habilitado",
        name: "Mariana",
        lastName: "Romero",
        email: "MarianaRomero@proveedorDeEmail.com",
        dateOfBirth: _dateOfBirth,
        password: "2222",
        favorited: _favorited};
    
    var usuario5 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "admin",
        status: "habilitado",
        name: "Mariana",
        lastName: "Romero",
        email: "m@",
        dateOfBirth: _dateOfBirth,
        password: "1234",
        favorited: _favorited};
    

    usuariosPreCargados.push(usuario1, usuario2, usuario3, usuario4, usuario5);

}


function construirReserva() {
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

//pide nuevos id's hasta obtener uno que no exista en el array recibido
//requiere que los objetos del array parametro tenga una clave numerica "id"
function nuevoIdUnico(pArray) {
    var newId = 0;
    newId = generarNuevoId(pArray);
    while (newId === -1) {
        newId = generarNuevoId(pArray);
    }
    return newId;
}

//genera nuevos id's aleatorios, si el nuevo numero generado ya existe, devuelve -1
//requiere que los objetos del array parametro tenga una clave numerica "id"
function generarNuevoId(pArray) {
    var result = -1;
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
    return result;
}