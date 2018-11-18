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


//===================
// EDITAR OFERTAS
//VVVVVVVVVVVVVVVVVVV
function construirEditarOfertas() {
    var divModeSelect = "";
    var divInputData = "";
    var divDisplayWorkingOffer = "";
    var divInputDataButtons = "";
    var divInstructions = "";
    divDisplayWorkingOffer += '<div id="workingOffer">' + construirTemplateDeOferta() + '</div>';

    
    var tableInputData ="";
    
    divInputData += '<div id="inputData"><form id="newOfferInputForm"><fieldset>';
    divInputData += '<legend>Datos: </legend>';
    divInputData += '<div><label for="offerDisplayName">Nombre de la oferta</label><input id="offerDisplayName" name="offerDisplayName" title=""></div>';
    divInputData += '<div><label for="firstname">Ubicación geográfica</label><input id="offerGeoLocation" name="offerGeoLocation" title=""></div>';
    divInputData += '<div><label for="firstname">Fecha de inicio de oferta</label><input id="offerStartDate" name="offerStartDate" title=""></div>';
    divInputData += '<div><label for="firstname">Fecha de fin de oferta</label><input id="offerEndDate" name="offerEndDate" title=""></div>';
    divInputData += '<div><label for="firstname">Precio por noche</label><input id="offerPricePerNight" name="offerPricePerNight" title=""></div>';
    
    var selectTipoDeHospedaje = "";  
    selectTipoDeHospedaje += '<select id="selectTipoDeHospedaje">'; // puede ser Hotel, Hostel, Casa, Apartamento
    selectTipoDeHospedaje += '<option value="Hotel">Hotel</option>';
    selectTipoDeHospedaje += '<option value="Hostel">Hostel</option>';
    selectTipoDeHospedaje += '<option value="Casa">Casa</option>';
    selectTipoDeHospedaje += '<option value="Apartamento">Apartamento</option>';
    selectTipoDeHospedaje += '</select>';      
    
    divInputData += '<div><label for="selectTipoDeHospedaje">Tipo de hospedaje</label>'+ selectTipoDeHospedaje +'</div>';
    divInputData += '</fieldset></form></div>';
    
    divInputDataButtons += '<div id="inputDataButtons" class="widget"><fieldset>';
    divInputDataButtons += '<legend>Control: </legend>';
    divInputDataButtons += '<div><label for="checkbox-1">Destacada</label><input type="checkbox" name="checkbox-1" id="checkbox-1"></div>';
    divInputDataButtons += '<div><label for="checkbox-2">Habilitada</label><input type="checkbox" name="checkbox-2" id="checkbox-2"></div>';
    divInputDataButtons += '<div><button onclick="cargarDatosClicked()">Cargar datos</button></div>';
    divInputDataButtons += '<div><button onclick="aplicarDatosClicked()">Aplicar datos</button></div>';
    divInputDataButtons += '</fieldset>';
    divInputDataButtons += '</div>';
    
    divInstructions += '<div id="inputDataExplanation" class="widget"><fieldset>';
    divInstructions += '<legend>Instrucciones: </legend>';
    divInstructions += '<div><p>1 - Seleccionar modo, <b>Crear oferta</b> o <b>Editar oferta</b>.</p></div>';
    divInstructions += '<div><p>2 - Ingresar información en los campos de la sección <b>Datos</b>.</p></div>';
    divInstructions += '<div><p>3 - Indicar si la oferta es <b>Destacada</b>.</p></div>';
    divInstructions += '<div><p>4 - Indicar si la oferta está <b>Habilitada</b>, ofertas no habilitadas no se cargarán en la página.</p></div>';
    divInstructions += '<div><p>5 - <b>Cargar datos</b>, actualiza la oferta como está definida actualmente en modo previsualización.</p></div>';
    divInstructions += '<div><p>6 - <b>Aplicar datos</b>, agrega los datos a la base de datos de la página haciendo efectivos los cambios.</p></div>';
    divInstructions += '</fieldset>';
    divInstructions += '</div>';   
    
    
    
   
    tableInputData = "<table><tr><td>" + divInstructions  + "</td><td>" + divInputData  + "</td><td>" +  divInputDataButtons + "</td></tr></table>";
    
    
    
/*    
<form>
  <fieldset>
    <div>
      <label for="firstname">Firstname</label>
      <input id="firstname" name="firstname" title="Please provide your firstname.">
    </div>
    <div>
      <label for="lastname">Lastname</label>
      <input id="lastname" name="lastname" title="Please provide also your lastname.">
    </div>
    <div>
      <label for="address">Address</label>
      <input id="address" name="address" title="Your home or work address.">
    </div>
  </fieldset>
</form>
*/
 
 
/*
<h2>Checkbox</h2>
  <fieldset>
    <legend>Hotel Ratings: </legend>
    <label for="checkbox-1">2 Star</label>
    <input type="checkbox" name="checkbox-1" id="checkbox-1">
    <label for="checkbox-2">3 Star</label>
    <input type="checkbox" name="checkbox-2" id="checkbox-2">
    <label for="checkbox-3">4 Star</label>
    <input type="checkbox" name="checkbox-3" id="checkbox-3">
    <label for="checkbox-4">5 Star</label>
    <input type="checkbox" name="checkbox-4" id="checkbox-4">
  </fieldset>
*/

    $("#mainDiv").html(divModeSelect + tableInputData + divDisplayWorkingOffer);
    $("input[type='checkbox']").checkboxradio();
    $( ".widget button" ).button();
}


function construirTemplateDeOferta(){
    var result = "";
    var addedDate_ = new Date();

    var oferta = {
        id: nuevoIdUnico(ofertasPreCargadas),
        featured: -1,
        active: false,
        timesBooked: 0,
        displayName: "",
        geoLocation: "",
        imageUrl: "media/pictures/00-noImage.jpg",
        housingType: "Hotel",
        perNightPrice: 0,
        startDate: addedDate_,
        endDate: addedDate_,     
        addedDate: addedDate_
    };

    result = buildHtmlOfferFullSize(oferta);
    return result;
}













// ^^^^^^^^^^^^^^^^^^
// EDITAR OFERTAS
//===================
