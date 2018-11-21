

function construirYAgregarOfertasPreCargadas() {
	
    // de oferta 1 a 10 son todas HOTELES destacadas, algunas estan habilitadas y otras no
    var startEndAddedDates1 = randomStartEndAddedDates(5, 18, 5); // pMaxStartDelay, pMaxDifference, pMaxDaysSinceItWasAdded
    var oferta1 = {
        id: nuevoIdUnico(ofertasPreCargadas), // id único generado para cada oferta
        featured: 0, // -1 no esta destacado, numero positivo el orden en la lista de destacados       
        active: true, // verdadero la oferta está visible en la página actualmente
        timesBooked: 0, // cantidad de veces reservada
        displayName: "Balmoral Plaza", // nombre del hospedaje u oferta
        geoLocation: "Plaza Cagancha 1126", // direccion geografica de el hospedaje
        imageUrl: "media/pictures/01-Balmoral_Plaza-Plaza_Cagancha-1126-Hotel.jpeg", // url de la imagen relativa al proyecto
        housingType: "Hotel", // puede ser Hotel, Hostel, Casa, Apartamento
        perNightPrice: 10, // el precio por noche, por defecto se muestra en dolares
        startDate: startEndAddedDates1[0], // fecha de inicio del periodo valido cuando se puede reservar para obtener el beneficio de la oferta
        endDate: startEndAddedDates1[1], // fecha de fin del periodo valido cuando se puede reservar para obtener el beneficio de la oferta                
        addedDate: startEndAddedDates1[2]}; // fecha en que la oferta fue agregada a la lista de ofertas, para ordenamiento de ofertas no destacadas


    var startEndAddedDates2 = randomStartEndAddedDates(18, 3, 14);
    var oferta2 = {
        id: nuevoIdUnico(ofertasPreCargadas),
        featured: 1,
        active: false,
        timesBooked: 0,
        displayName: "Alvear Hotel",
        geoLocation: "Yi 1372",
        imageUrl: "media/pictures/02-Alvear_Hotel-YI-1372-Hotel.jpeg",
        housingType: "Hotel",
        perNightPrice: 13,
        startDate: startEndAddedDates2[0],
        endDate: startEndAddedDates2[1],     
        addedDate: startEndAddedDates2[2]};

    // OFERTA VENCIDA PARA PRUEBAS
    var addedDate_3 = new Date(2018, 9, 25);
    var startDate_3 = new Date(2018, 10, 1);
    var endDate_3 = new Date(2018, 10, 15);
    
    var oferta3 = {
        id: 3,
        featured: 2,
        active: true,
        timesBooked: 0,
        displayName: "Belmont House",
        geoLocation: "Avenida Rivera 6512",
        imageUrl: "media/pictures/03-Belmont_House-Avenida_Rivera-6512-Hotel.jpeg",
        housingType: "Hotel",
        perNightPrice: 17,
        startDate: startDate_3,
        endDate: endDate_3,     
        addedDate: addedDate_3};
    
    var startEndAddedDates4 = randomStartEndAddedDates(5, 15, 1);
    var oferta4 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: 3,
        active: true,
        timesBooked: 0,
        displayName: "Dazzler Montevideo",
        geoLocation: "21 De Setiembre 2752",
        imageUrl: "media/pictures/04-Dazzler_Montevideo-21_De_Setiembre-2752-Hotel.jpeg",
        housingType: "Hotel",
        perNightPrice: 11,
        startDate: startEndAddedDates4[0],
        endDate: startEndAddedDates4[1],     
        addedDate: startEndAddedDates4[2]};
    
    var startEndAddedDates5 = randomStartEndAddedDates(3, 28, 5);
    var oferta5 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: 4,
        active: false,
        timesBooked: 0,
        displayName: "Hotel Presidente",
        geoLocation: "18 De Julio 1038",
        imageUrl: "media/pictures/05-Hotel_Presidente-18_de_Julio-1038-Hotel.jpeg",
        housingType: "Hotel",
        perNightPrice: 15,
        startDate: startEndAddedDates5[0],
        endDate: startEndAddedDates5[1],     
        addedDate: startEndAddedDates5[2]};    
    
    
    // OFERTA VENCIDA PARA PRUEBAS
    var addedDate_6 = new Date(2018, 8, 15);
    var startDate_6 = new Date(2018, 9, 15);
    var endDate_6 = new Date(2018, 9, 25);
    
    var startEndAddedDates6 = randomStartEndAddedDates(1, 15, 7);
    var oferta6 = {
        id: 6,
	featured: 5,
        active: true,
        timesBooked: 0,
        displayName: "Hotel Richmond",
        geoLocation: "San Jose 1034",
        imageUrl: "media/pictures/06-Hotel_Richmond-San_Jose-1034-Hotel.jpeg",
        housingType: "Hotel",
        perNightPrice: 23,
        startDate: startDate_6,
        endDate: endDate_6,     
        addedDate: addedDate_6};    

    var startEndAddedDates7 = randomStartEndAddedDates(5, 20, 2);
    var oferta7 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: 6,
        active: false,
        timesBooked: 0,
        displayName: "Hotel Lafayette",
        geoLocation: "Soriano 1170",
        imageUrl: "media/pictures/07-Hotel_Lafayette-Soriano-1170-Hotel.jpeg",
        housingType: "Hotel",
        perNightPrice: 7,
        startDate: startEndAddedDates7[0],
        endDate: startEndAddedDates7[1],     
        addedDate: startEndAddedDates7[2]}; 
    
    var startEndAddedDates8 = randomStartEndAddedDates(5, 20, 2);
    var oferta8 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: 7,
        active: true,
        timesBooked: 0,
        displayName: "Hotel California",
        geoLocation: "San Jose 1237",
        imageUrl: "media/pictures/08-Hotel_California-San_Jose-1237-Hotel.jpeg",
        housingType: "Hotel",
        perNightPrice: 11,
        startDate: startEndAddedDates8[0],
        endDate: startEndAddedDates8[1],     
        addedDate: startEndAddedDates8[2]};

    var startEndAddedDates9 = randomStartEndAddedDates(5, 20, 2);
    var oferta9 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: 8,
        active: true,
        timesBooked: 0,
        displayName: "Hotel Hilton Garden Inn Montevideo",
        geoLocation: "Avenida Dr. Luis Bonavita 11300",
        imageUrl: "media/pictures/09-Hotel_Hilton_Garden_Inn_Montevideo-Avenida_Dr_Luis_Bonavita-11300-Hotel.jpeg",
        housingType: "Hotel",
        perNightPrice: 32,
        startDate: startEndAddedDates9[0],
        endDate: startEndAddedDates9[1],     
        addedDate: startEndAddedDates9[2]};  
    
    var startEndAddedDates10 = randomStartEndAddedDates(2, 5, 7);
    var oferta10 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: 9,
        active: true,
        timesBooked: 0,
        displayName: "Palladium Business Hotel",
        geoLocation: "Tomas de Tezanos 1146",
        imageUrl: "media/pictures/10-Palladium_Business_Hotel-Tomas_de_Tezanos-1146-Hotel.jpeg",
        housingType: "Hotel",
        perNightPrice: 45,
        startDate: startEndAddedDates10[0],
        endDate: startEndAddedDates10[1],     
        addedDate: startEndAddedDates10[2]};
    
    // de oferta 11 a 14 son todas HOTELES NO destacadas, algunas estan habilitadas y otras no        
    var startEndAddedDates11 = randomStartEndAddedDates(2, 30, 2);
    var oferta11 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: -1,
        active: true,
        timesBooked: 0,
        displayName: "Los Angeles",
        geoLocation: "18 de Julio 974",
        imageUrl: "media/pictures/11-Los_Angeles-18_de_Julio-974-Hotel.jpeg",
        housingType: "Hotel",
        perNightPrice: 5,
        startDate: startEndAddedDates11[0],
        endDate: startEndAddedDates11[1],     
        addedDate: startEndAddedDates11[2]};
    
    var startEndAddedDates12 = randomStartEndAddedDates(2, 30, 2);
    var oferta12 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: -1,
        active: false,
        timesBooked: 0,
        displayName: "Viewport Montevideo",
        geoLocation: "Avenida Uruguay 825",
        imageUrl: "media/pictures/12-Viewport_Montevideo-Avenida_Uruguay-825-Hotel.jpeg",
        housingType: "Hotel",
        perNightPrice: 25,
        startDate: startEndAddedDates12[0],
        endDate: startEndAddedDates12[1],     
        addedDate: startEndAddedDates12[2]};
    
    var startEndAddedDates13 = randomStartEndAddedDates(5, 15, 7);
    var oferta13 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: -1,
        active: true,
        timesBooked: 0,
        displayName: "Crystal Tower",
        geoLocation: "Aquiles Lanza 1323",
        imageUrl: "media/pictures/13-Crystal_Tower-Aquiles_Lanza-1323-Hotel.jpeg",
        housingType: "Hotel",
        perNightPrice: 17,
        startDate: startEndAddedDates13[0],
        endDate: startEndAddedDates13[1],     
        addedDate: startEndAddedDates13[2]}; 
    
    var startEndAddedDates14 = randomStartEndAddedDates(3, 5, 2);
    var oferta14 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: -1,
        active: false,
        timesBooked: 0,
        displayName: "Hotel America",
        geoLocation: "Rio Negro 1330",
        imageUrl: "media/pictures/14-Hotel_America-Rio_Negro-1330-Hotel.jpeg",
        housingType: "Hotel",
        perNightPrice: 20,
        startDate: startEndAddedDates14[0],
        endDate: startEndAddedDates14[1],     
        addedDate: startEndAddedDates14[2]};  
    
    // de oferta 15 a 19 son todas HOSTELES, algunos son destacados, otros no, algunos estan habilitados, otros no
    var startEndAddedDates15 = randomStartEndAddedDates(2, 25, 7);
    var oferta15 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: 10,
        active: false,
        timesBooked: 0,
        displayName: "Luz In You",
        geoLocation: "Rio Negro 2866",
        imageUrl: "media/pictures/15-Luz_In_You-Jaime_Zudañez-2866-Hostel.jpg",
        housingType: "Hostel",
        perNightPrice: 11,
        startDate: startEndAddedDates15[0],
        endDate: startEndAddedDates15[1],     
        addedDate: startEndAddedDates15[2]};
    
    var startEndAddedDates16 = randomStartEndAddedDates(5, 15, 4);
    var oferta16 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: -1,
        active: true,
        timesBooked: 0,
        displayName: "Caballo Loco",
        geoLocation: "Gutierrez Ruiz 1287",
        imageUrl: "media/pictures/16-Caballo_Loco-Gutierrez_Ruiz-1287-Hostel.jpg",
        housingType: "Hostel",
        perNightPrice: 14,
        startDate: startEndAddedDates16[0],
        endDate: startEndAddedDates16[1],     
        addedDate: startEndAddedDates16[2]};    
    
    var startEndAddedDates17 = randomStartEndAddedDates(2, 35, 7);
    var oferta17 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: -1,
        active: false,
        timesBooked: 0,
        displayName: "Viajero Montevideo Hostel",
        geoLocation: "Soriano 1073",
        imageUrl: "media/pictures/17-Viajero_Montevideo_Hostel-Soriano-1073-Hostel.jpg",
        housingType: "Hostel",
        perNightPrice: 7,
        startDate: startEndAddedDates17[0],
        endDate: startEndAddedDates17[1],     
        addedDate: startEndAddedDates17[2]};

    var startEndAddedDates18 = randomStartEndAddedDates(3, 12, 2);
    var oferta18 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: 11,
        active: true,
        timesBooked: 0,
        displayName: "Habemus Hostel",
        geoLocation: "Maldonado 1175",
        imageUrl: "media/pictures/18-Habemus_Hostel-Maldonado-1775-Hostel.jpg",
        housingType: "Hostel",
        perNightPrice: 12,
        startDate: startEndAddedDates18[0],
        endDate: startEndAddedDates18[1],     
        addedDate: startEndAddedDates18[2]};
    
    var startEndAddedDates19 = randomStartEndAddedDates(1, 20, 1);
    var oferta19 = {
        id: nuevoIdUnico(ofertasPreCargadas),
	featured: -1,
        active: true,
        timesBooked: 0,
        displayName: "Ukulele Hostel",
        geoLocation: "Maldonado 1183",
        imageUrl: "media/pictures/19-Ukulele_Hostel-Maldonado-1183-Hostel.jpg",
        housingType: "Hostel",
        perNightPrice: 10,
        startDate: startEndAddedDates19[0],
        endDate: startEndAddedDates19[1],     
        addedDate: startEndAddedDates19[2]}; 

    ofertasPreCargadas.push(oferta1, oferta2, oferta3, oferta4, oferta5,
                            oferta6, oferta7, oferta8, oferta9, oferta10,
                            oferta11, oferta12, oferta13, oferta14, oferta15,
                            oferta16, oferta17, oferta18, oferta19);
}


function construirYAgregarUsuariosPreCargados() {

    var favorited_1 = new Array();
    var usuario1 = {
        id: nuevoIdUnico(usuariosPreCargados), //id unico generado para cada usuario
        type: "admin", // tipo de usuario puede ser "admin", "regUser" 
        status: "habilitado", // rechazado, pendiente, habilitado
        name: "Sebastián", // nombre que el usuario ingresa
        lastName: "Pérez", // apellido que el usuario ingresa
        email: "SebastiánPerez@proveedorDeEmail.com", // email que el usuario ingresa
        edad: randomAgeBetweenParamenters(18,130), // fecha de nacimiento que el usuario ingresa
        password: "1111", // contraseña que el usuario ingresa
        favorited: favorited_1}; // array con los id's de las ofertas que el usuario ha marcado como favoritas
    
    var favorited_2 = new Array();
    var usuario2 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "pendiente",
        name: "Diego",
        lastName: "Gómez",
        email: "DiegoGomez@proveedorDeEmail.com",
        edad: randomAgeBetweenParamenters(18,130),
        password: "2222",
        favorited: favorited_2};
    
    var favorited_3 = new Array();
    var usuario3 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "rechazado",
        name: "Gabriel",
        lastName: "Sosa",
        email: "GabrielSosa@proveedorDeEmail.com",
        edad: randomAgeBetweenParamenters(18,130),
        password: "2222",
        favorited: favorited_3};
    
    var favorited_4 = new Array();
    var usuario4 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "habilitado",
        name: "Mariana",
        lastName: "Romero",
        email: "MarianaRomero@proveedorDeEmail.com",
        edad: randomAgeBetweenParamenters(18,130),
        password: "2222",
        favorited: favorited_4};
    
    var favorited_5 = new Array();
    var usuario5 = {
        id: 1,
        type: "admin",
        status: "habilitado",
        name: "testAdminName",
        lastName: "testAdminLastName",
        email: "a@",
        edad: randomAgeBetweenParamenters(18,130),
        password: "1234",
        favorited: favorited_5};
    
    var favorited_6 = new Array();
    var usuario6 = {
        id: 2,
        type: "regUser",
        status: "habilitado",
        name: "testName_b",
        lastName: "testLastName_b",
        email: "b@",
        edad: randomAgeBetweenParamenters(18,130),
        password: "b",
        favorited: favorited_6};
        var favorited_6 = new Array();
    
    var favorited_7 = new Array();        
    var usuario7 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "pendiente",
        name: "testName_c",
        lastName: "testLastName_c",
        email: "c@",
        edad: randomAgeBetweenParamenters(18,130),
        password: "c",
        favorited: favorited_7};
    
    var favorited_8 = new Array();
    var usuario8 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "pendiente",
        name: "testName_d",
        lastName: "testLastName_d",
        email: "d@",
        edad: randomAgeBetweenParamenters(18,130),
        password: "d",
        favorited: favorited_8};
    
    var favorited_9 = new Array();
    var usuario9 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "habilitado",
        name: "testName_e",
        lastName: "testLastName_e",
        email: "e@",
        edad: randomAgeBetweenParamenters(18,130),
        password: "e",
        favorited: favorited_9};
    
    var favorited_10 = new Array();
    var usuario10 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "habilitado",
        name: "testName_f",
        lastName: "testLastName_f",
        email: "f@",
        edad: randomAgeBetweenParamenters(18,130),
        password: "f",
        favorited: favorited_10};
    
    var favorited_11 = new Array();
    var usuario11 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "rechazado",
        name: "testName_g",
        lastName: "testLastName_g",
        email: "g@",
        edad: randomAgeBetweenParamenters(18,130),
        password: "g",
        favorited: favorited_11};
    
    var favorited_12 = new Array();
    var usuario12 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "rechazado",
        name: "testName_h",
        lastName: "testLastName_h",
        email: "h@",
        edad: randomAgeBetweenParamenters(18,130),
        password: "h",
        favorited: favorited_12};
    
    var favorited_13 = new Array();
    var usuario13 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "habilitado",
        name: "testName_i",
        lastName: "testLastName_i",
        email: "i@",
        edad: randomAgeBetweenParamenters(18,130),
        password: "i",
        favorited: favorited_13};
    
    var favorited_14 = new Array();
    var usuario14 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "habilitado",
        name: "testName_j",
        lastName: "testLastName_j",
        email: "j@",
        edad: randomAgeBetweenParamenters(18,130),
        password: "j",
        favorited: favorited_14};

    var favorited_15 = new Array();
    var usuario15 = {
        id: nuevoIdUnico(usuariosPreCargados),
        type: "regUser",
        status: "pendiente",
        name: "testName_k",
        lastName: "testLastName_k",
        email: "k@",
        edad: randomAgeBetweenParamenters(18,130),
        password: "k",
        favorited: favorited_15};    
    
    
    usuariosPreCargados.push(   usuario1, usuario2, usuario3, usuario4, usuario5,
                                usuario6, usuario7, usuario8, usuario9, usuario10,
                                usuario11, usuario12, usuario13, usuario14, usuario15);
                                

}


function construirYAgregarReservasPreCargadas(pChanceDeReserva, pChanceDeFavoriteo) {
    // 1- recorremos el array de usuarios pre-cargados 
    for (var i = 0; i < usuariosPreCargados.length; i++){
        // 2- si el usuario es admin, o no esta habilitado lo salteamos
        if(usuariosPreCargados[i].type !== "admin" && usuariosPreCargados[i].status === "habilitado"){
           // 3- para cada usuario recorremos el array de ofertas pre-cargadas
          for(var j = 0; j< ofertasPreCargadas.length; j++){
              // 4- si la oferta esta habilitada, el usuario "decide" basado en un numero random si la reserva o no
              // en este caso tiene pChanceDeReserva% de probabilidad de reservar
              if(decideReservar(pChanceDeReserva) && ofertasPreCargadas[j].active === true){              
                  // 5- si reserva la oferta, lo hace por un numero de dias aleatorio con piso en 1 y maximo en el numero de días maximo que dura la oferta
                  var newStatus = desaprobadaPendienteAprobada();                     
                  if(newStatus === "aprobada"){
                      ofertasPreCargadas[j].timesBooked = ofertasPreCargadas[j].timesBooked +1;
                  }

                  var startDate_ = randomDateBetweenTwoDates(ofertasPreCargadas[j].startDate, ofertasPreCargadas[j].endDate);
                  var endDate_ = randomDateBetweenTwoDates(startDate_, ofertasPreCargadas[j].endDate);

                  var numbersOfNights = Math.round((endDate_-startDate_)/(1000*60*60*24));
                  var totalPrice_ = numbersOfNights * ofertasPreCargadas[j].perNightPrice;


                  // 6- se genera un nuevo objeto reserva
                  var reserva = {
                    id: nuevoIdUnico(reservasPreCargadas),
                    userId: usuariosPreCargados[i].id,
                    offerId: ofertasPreCargadas[j].id,
                    totalPrice: totalPrice_, // resultado de la cantidad de noches por el precio por noche de la oferta
                    startDate: startDate_, // debe ser mayor o igual a la fecha minima de disponibilidad de la oferta y menor que la fecha maxima de disponibilidad de la oferta
                    endDate: endDate_, // debe ser mayor que startDate y menor o igual a la fecha maxima de disponibilidad de la oferta
                    status: newStatus // desaprobada, pendiente, aprobada
                };
                //console.log("Nombre: " + ofertasPreCargadas[j].displayName + " Ini res: " + startDate_.toDateString() + " Fin res: " + endDate_.toDateString());
                //console.log('usuario: ' + usuariosPreCargados[i].id +  ' reserva: ' + ofertasPreCargadas[j].id);
                reservasPreCargadas.push(reserva);              
                }else{
                    // si el usuario no hace una reserva, se considera si la agrega a su lista de favoritos
                    if(decideFavoritear(pChanceDeFavoriteo)){
                        usuariosPreCargados[i].favorited.push(ofertasPreCargadas[j].id);
                        //console.log('usuario: ' + usuariosPreCargados[i].id +  ' favoritea: ' + ofertasPreCargadas[j].id +' nombre: ' + ofertasPreCargadas[j].displayName);
                    }
                }
            // 7- si no reserva la oferta, pasa a evaluar la siguiente
            }          
        }
    }
}


function randomAgeBetweenParamenters(pMin, pMax){
   var age = 0;
   
    var min = pMin;
    var max = pMax;
    age = Math.floor(Math.random() * (max - min)) + min;
    
   return age;
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
    if(pPorcentaje !== -1){
        if (Math.random() * 100 <= pPorcentaje) {
        result = true;
        }
    }
    return result;
}

function decideFavoritear(pPorcentaje){
    var result = false;
    if(pPorcentaje !== -1){
        if (Math.random() * 100 <= pPorcentaje) {
        result = true;
        }
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