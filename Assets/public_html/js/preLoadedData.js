

function construirYAgregarOfertasPreCargadas() {

    var startEndAddedDates1 = randomStartEndAddedDates(5, 18, 5); // pMaxStartDelay, pMaxDifference, pMaxDaysSinceItWasAdded
    var oferta1 = {
        id: nuevoIdUnico(ofertasPreCargadas), // id único generado para cada oferta
        featured: -1, // -1 no esta destacado, numero positivo el orden en la lista de destacados       
        active: false, // verdadero la oferta está visible en la página actualmente
        timesBooked: 0, // cantidad de veces reservada
        displayName: "Balmoral Plaza", // nombre del hospedaje u oferta
        geoLocation: "Plaza Cagancha 1126", // direccion geografica de el hospedaje
        imageUrl: "media/pictures/01-Balmoral_Plaza-Plaza_Cagancha-1126.jpeg", // url de la imagen relativa al proyecto
        housingType: "Hotel", // puede ser hotel, hostel, casa, apartamento
        perNightPrice: 10, // el precio por noche, por defecto se muestra en dolares
        startDate: startEndAddedDates1[0], // fecha de inicio del periodo valido cuando se puede reservar para obtener el beneficio de la oferta
        endDate: startEndAddedDates1[1], // fecha de fin del periodo valido cuando se puede reservar para obtener el beneficio de la oferta                
        addedDate: startEndAddedDates1[2]}; // fecha en que la oferta fue agregada a la lista de ofertas, para ordenamiento de ofertas no destacadas

    var startEndAddedDates2 = randomStartEndAddedDates(18, 3, 14);
    var oferta2 = {
        id: nuevoIdUnico(ofertasPreCargadas),
        featured: -1,
        active: false,
        timesBooked: 0,
        displayName: "Alvear Hotel",
        geoLocation: "Yi 1372",
        imageUrl: "media/pictures/02-Alvear_Hotel-YI-1372.jpeg",
        housingType: "Hotel",
        perNightPrice: 13,
        startDate: startEndAddedDates2[0],
        endDate: startEndAddedDates2[1],     
        addedDate: startEndAddedDates2[2]};

    var startEndAddedDates3 = randomStartEndAddedDates(3, 12, 6);
    var oferta3 = {
        id: nuevoIdUnico(ofertasPreCargadas),
        featured: -1,
        active: false,
        timesBooked: 0,
        displayName: "Belmont House",
        geoLocation: "Avenida Rivera 6512",
        imageUrl: "media/pictures/03-Belmont_House-Avenida_Rivera-6512.jpeg",
        housingType: "Hotel",
        perNightPrice: 17,
        startDate: startEndAddedDates3[0],
        endDate: startEndAddedDates3[1],     
        addedDate: startEndAddedDates3[2]};
    
    var startEndAddedDates4 = randomStartEndAddedDates(5, 15, 1);
    var oferta4 = {
        id: nuevoIdUnico(ofertasPreCargadas),
        featured: -1,
        active: false,
        timesBooked: 0,
        displayName: "Dazzler Montevideo",
        geoLocation: "21 De Setiembre 2752",
        imageUrl: "media/pictures/04-Dazzler_Montevideo-21_De_Setiembre-2752.jpeg",
        housingType: "Hotel",
        perNightPrice: 11,
        startDate: startEndAddedDates4[0],
        endDate: startEndAddedDates4[1],     
        addedDate: startEndAddedDates4[2]};

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
        type: "regUser",
        status: "habilitado",
        name: "Mariana",
        lastName: "Romero",
        email: "m@",
        dateOfBirth: _dateOfBirth,
        password: "1234",
        favorited: _favorited};
    
    usuariosPreCargados.push(usuario1, usuario2, usuario3, usuario4, usuario5);
}

    // modo de generacion de reservas: 
    // 1- recorremos el array de usuarios pre-cargados 
    // 2- para cada usuario recorremos el array de ofertas pre-cargadas
    // 3- para cada oferta el usuario "decide" basado en un numero random si reserva la oferta o no
    // 4- si reserva la oferta, lo hace por un numero de dias aleatorio con piso en 1 y maximo en el numero de días maximo que dura la oferta
    // 5- se genera un nuevo objeto reserva con todos los datos que se desprenden de la informacion hasta este punto
    // 6- si no reserva la oferta, pasa a evaluar la siguiente, hasta recorrer todo el array de ofertas
function construirYAgregarReservasPreCargadas(pChanceDeReserva) {
    // 1- recorremos el array de usuarios pre-cargados 
    for (var i = 0; i < usuariosPreCargados.length; i++){ 
        // 2- para cada usuario recorremos el array de ofertas pre-cargadas
        for(var j = 0; j< ofertasPreCargadas.length; j++){
            // 3- el usuario "decide" basado en un numero random  si reserva la oferta o no
            // en este caso tiene pChanceDeReserva% de probabilidad de reservar
            if(decideReservar(pChanceDeReserva)){              
                //4- si reserva la oferta, lo hace por un numero de dias aleatorio con piso en 1 y maximo en el numero de días maximo que dura la oferta
                var newStatus = desaprobadaPendienteAprobada();                     
                if(newStatus === "aprobada"){
                    ofertasPreCargadas[j].timesBooked = ofertasPreCargadas[j].timesBooked +1;
                }
                
                var startDate_ = randomDateBetweenTwoDates(ofertasPreCargadas[j].startDate, ofertasPreCargadas[j].endDate);
                var endDate_ = randomDateBetweenTwoDates(startDate_, ofertasPreCargadas[j].endDate);
                
                var numbersOfNights = Math.round((endDate_-startDate_)/(1000*60*60*24));
                var totalPrice_ = numbersOfNights * ofertasPreCargadas[j].priceDollars;
                
                
                // 5- se genera un nuevo objeto reserva
                var reserva = {
                  id: nuevoIdUnico(reservasPreCargadas),
                  userId: usuariosPreCargados[i].id,
                  ofertaId: ofertasPreCargadas[j].id,
                  totalPrice: totalPrice_, // resultado de la cantidad de noches por el precio por noche de la oferta
                  startDate: startDate_, // debe ser mayor o igual a la fecha minima de disponibilidad de la oferta y menor que la fecha maxima de disponibilidad de la oferta
                  endDate: endDate_, // debe ser mayor que startDate y menor o igual a la fecha maxima de disponibilidad de la oferta
                  status: newStatus // desaprobada, pendiente, aprobada
              };
              //console.log("Nombre: " + ofertasPreCargadas[j].displayName + " Ini res: " + startDate_.toDateString() + " Fin res: " + endDate_.toDateString());
              reservasPreCargadas.push(reserva);              
            }
            
        // 6- si no reserva la oferta, pasa a evaluar la siguiente
        }
    }
}



function randomDateBetweenTwoDates(pFloorDate, pRoofDate){
    var result = new Date();
    
    // resta de las dos fechas, devuelve los dias de diferencia en milisegundos
    // dividimos la diferencia entre la cantidad de milisegundos en un dia para obtener la cantidad de dias
    var daysOfDifference = Math.round((pRoofDate-pFloorDate)/(1000*60*60*24));  
    
    var min = 1;
    var max = daysOfDifference;
    var randomNumber = Math.floor(Math.random() * (max - min)) + min;
    
    result = sumarDias(pFloorDate, randomNumber);

    return result;
}


function addTimesBookedToThisOffer(pOfferId){
    var x = 0;
    var offerFound = false;
    
    while(x < ofertasPreCargadas.length && offerFound === false){
        if(pOfferId === ofertasPreCargadas[x].id){
            ofertasPreCargadas[x].timesBooked = ofertasPreCargadas[x].timesBooked +1;
            offerFound = true;
        }
        x++;
    } 
}

function desaprobadaPendienteAprobada(){
    var result = "";    
    var min = 1;
    var max = 300;
    
    var randomNumber = Math.floor(Math.random() * (max - min)) + min;
    
    if(randomNumber > 0 && randomNumber <= 100 ){
        result = "pendiente";
    }

    if(randomNumber > 100 && randomNumber <= 200 ){
        result = "aprobada";
    }
    
    if(randomNumber > 200 && randomNumber <= 300 ){
        result = "desaprobada";
    }
    
    return result;
}

function decideReservar(pPorcentaje){
    var result = false;
    // si el valor recibido no es valido se ajusta a un 50/50
    if(pPorcentaje > 100 || pPorcentaje<=0){
        pPorcentaje = 50;
    }
    if (Math.random() * 100 <= pPorcentaje) {
        result = true;
    }
    return result;
}

function randomStartEndAddedDates(pMaxStartDelay, pMaxDifference, pMaxDaysSinceItWasAdded){
    var result = new Array();
    var currentDate = new Date();
    
    // defino fecha de inicio para la oferta
    var startDateMin = sumarDias(currentDate, 1);
    var startDateMax = sumarDias(startDateMin, pMaxStartDelay);
    var startDate = randomDateBetweenTwoDates(startDateMin, startDateMax);    
    
    // defino fecha de fin para la oferta
    var endDateMax = sumarDias(startDate, pMaxDifference);
    var endDate = randomDateBetweenTwoDates(startDate, endDateMax);
       
    // defino fecha en que la oferta "fue agregada" al sistema
    var addedDateMin = restarDias(currentDate, pMaxDaysSinceItWasAdded);
    var addedDateMax = restarDias(currentDate, 1);
    var addedDate = randomDateBetweenTwoDates(addedDateMin, addedDateMax);
    
    result.push(startDate,endDate,addedDate);
    
    //console.log("Fecha inicio: ", startDate.toDateString() + " Fecha fin: " + endDate.toDateString() + " Fecha agregada: " + addedDate.toDateString());
    return result;
}

function sumarDias(pDate, pDias) {
  var result = new Date(pDate);
  result.setDate(result.getDate() + pDias);
  return result;
}

function restarDias (pDate, pDias){
  var result = new Date(pDate);
  result.setDate(result.getDate() - pDias);
  return result;
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