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

function reservaClicked(reservaBtn) {
    var offerId = reservaBtn.getAttribute("data-offerid");
    console.log("usuario clickeo en reservar: " + offerId);

    if (userNav.type === "noReg") {
        logInModeClicked();
    } else {
        // si el usuario es tipo regUser, validar rango de fechas 
        var pickedStartDate = $("#resDateInicio_" + offerId).datepicker("getDate");
        var pickedEndDate = $("#resDateFin_" + offerId).datepicker("getDate");

        if (pickedStartDate > pickedEndDate) {
            var msg = "Fecha de fin no puede ser menor a fecha de inicio, intente nuevamete.";
            $("#paragraphReserva_" + offerId).html(msg);
        } else {
            if (userHasReservedThisOffer(userNav.id, parseInt(offerId))) {
                var msg = "Ya tiene una reserva para esta oferta";
                $("#paragraphReserva_" + offerId).html(msg);
            } else {
                var msg = "Reserva exitosa, pendiente aprobación.";
                $("#paragraphReserva_" + offerId).html(msg);
                agregarReserva(userNav.id, parseInt(offerId), pickedStartDate, pickedEndDate);
            }
        }
    }
}



function agregarReserva(pUserId, pOfferId, pStartDate, pEndDate) {
    //buscamos el index pos de la oferta para obtener el precio por noche y aumentar el contador de reservas
    /*
    var offerFound = false;
    var x = 0;

    while (offerFound === false && x < ofertasPreCargadas.length) {
        if (ofertasPreCargadas[x].id === pOfferId) {
            offerFound = true;
        } else {
            x++;
        }
    }
    */
    var offerIndex = getArrayIndexFromId(pOfferId, ofertasPreCargadas);
    
    ofertasPreCargadas[offerIndex].timesBooked = ofertasPreCargadas[offerIndex].timesBooked++;


    //obtenemos el numero de días que dura la reserva
    var numbersOfNights = Math.round((pEndDate - pStartDate) / (1000 * 60 * 60 * 24));
    console.log("index pos" + offerIndex);
    
    //obtenemos el precio total como producto de los dias de reserva por el precio por dia
    var totalPrice_ = numbersOfNights * ofertasPreCargadas[offerIndex].perNightPrice;

    var reserva = {
        id: nuevoIdUnico(reservasPreCargadas),
        userId: pUserId,
        offerId: pOfferId,
        totalPrice: totalPrice_,
        startDate: pStartDate,
        endDate: pEndDate,
        status: "pendiente"
    };

    reservasPreCargadas.push(reserva);
}



function userHasReservedThisOffer(pUserId, pOfferId) {
    // buscamos el usuario
    var reserveFound = false;
    var x = 0;

    while (reserveFound === false && x < reservasPreCargadas.length) {
        if (reservasPreCargadas[x].userId === pUserId && reservasPreCargadas[x].offerId === pOfferId) {
            reserveFound = true;
        } else {
            x++;
        }
    }
    return reserveFound;
}



function favoritoClicked(favoritoBtn) {
    var offerId = parseInt(favoritoBtn.getAttribute("data-offerid"));
    console.log("usuario clickeo favoritear oferta: " + offerId);
    // si usuario es tipo noReg, mandar a pagina de login
    if (userNav.type === "noReg") {
        logInModeClicked();
    } else {
        // si el usuario es tipo regUser, agregar a su lista de favoritos
        var userId = userNav.id;
        addToUserFavoritesList(userId, offerId);
    }
}

function addToUserFavoritesList(pUserId, pOfferId) {
    // buscamos el usuario
    var userFound = false;
    var x = 0;

    while (userFound === false && x < usuariosPreCargados.length) {
        if (usuariosPreCargados[x].id === pUserId) {
            userFound = true;
        } else {
            x++;
        }
    }
    // checkeo de seguridad
    if (userFound === true) {
        //averiguamos si el usuario ya tiene esa oferta agregada a sus favoritos
        var offerFound = false;
        var z = 0;
        while (offerFound === false && z < usuariosPreCargados[x].favorited.length) {
            if (usuariosPreCargados[x].favorited[z] === pOfferId) {
                offerFound = true;
            }
            z++;
        }

        // si el usuario no tiene la oferta agregada a sus favoritos, la agregamos
        if (offerFound === false) {
            usuariosPreCargados[x].favorited.push(pOfferId);
        }
    } else {
        console.log("Error, user not found at addToUserFavoritesList");
    }
}
