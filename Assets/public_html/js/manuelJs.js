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

//===================
// EDITAR OFERTAS
//VVVVVVVVVVVVVVVVVVV
function construirEditarOfertas() {
    // Construyo los formularios html de los elementos en pantalla
    var divInstructions = construirInstruccionesEO();
    var divModeSelect = construirModeSelectEO();
    ;
    var divInputData = construirInputDataEO();
    var divDisplayWorkingOffer = '<div id="workingOffer"></div>';

    // agrego los elementos html
    $("#mainDiv").html(divInstructions + divModeSelect + '<p id="messagesToUser"></p>' + divInputData + divDisplayWorkingOffer);
    messageToUser("Estado inactivo: Seleccionar modo <b>Crear Oferta</b> o <b>Ediar Oferta</b>.");

    // inicializo elementos interactuables
    $('input[type=radio][name=radioGroupModeSelector]').change(cambioDeModoDetectadoEditarOferta);

    enableDataInputFields(false);
    //enableControlButtons(false);

    // seteamos todos los botones de modo a desactivado hasta que el usuario elija un editar oferta o crear oferta
    enableModeButtons("no");
}

function enableModeButtons(pValue) {
    switch (pValue) {
        case 'no':
            $("#nuevaOfertaButton").prop("disabled", true);
            $("#buscarOfertaInput").prop("disabled", true);
            $("#buscarOfertaButton").prop("disabled", true);
            break;
        case 'crear':
            $("#nuevaOfertaButton").prop("disabled", false);
            $("#buscarOfertaInput").prop("disabled", true);
            $("#buscarOfertaButton").prop("disabled", true);
            break;
        case 'editar':
            $("#nuevaOfertaButton").prop("disabled", true);
            $("#buscarOfertaInput").prop("disabled", false);
            $("#buscarOfertaButton").prop("disabled", false);
            break;
        default:
            console.log("Error");
    }
}

function enableDataInputFields(pValue) {
    if (pValue) {
        // Habilitamos los campos de ingreso de datos
        $("#offerDisplayName").prop("disabled", false);
        $("#offerGeoLocation").prop("disabled", false);
        $("#offerStartDate").prop("disabled", false);
        $("#offerEndDate").prop("disabled", false);
        $("#offerPricePerNight").prop("disabled", false);
        $("#offerImageURL").prop("disabled", false);
        $("#selectTipoDeHospedaje").prop("disabled", false);

        // Si detectamos cambios en los campos de ingreso de datos de oferta, actualizamos la previsualizacion 
        $('#offerDisplayName').change(updateWorkingOfferAndPreview);
        $('#offerGeoLocation').change(updateWorkingOfferAndPreview);
        $('#offerStartDate').change(updateWorkingOfferAndPreview);
        $('#offerEndDate').change(updateWorkingOfferAndPreview);
        $('#offerPricePerNight').change(updateWorkingOfferAndPreview);
        $('#offerImageURL').change(updateWorkingOfferAndPreview);
        $("#selectTipoDeHospedaje").change(updateWorkingOfferAndPreview);

    } else {
        // Deshabilitamos los campos de ingreso de datos
        $("#offerDisplayName").prop("disabled", true);
        $("#offerGeoLocation").prop("disabled", true);
        $("#offerStartDate").prop("disabled", true);
        $("#offerEndDate").prop("disabled", true);
        $("#offerPricePerNight").prop("disabled", true);
        $("#offerImageURL").prop("disabled", true);
        $("#selectTipoDeHospedaje").prop("disabled", true);
    }
}


function cambioDeModoDetectadoEditarOferta() {
    var newValue = $(this).val();

    console.log("Mode selector in editar oferta changed to: " + newValue);

    switch (newValue) {
        case 'crear':
            //si el usuario elije el modo crear, los elementos de busqueda para edicion se desactivan
            console.log("Mode selector changed to: crear");
            messageToUser("Estado activo: <b>Modo Crear</b> seleccionado, presione botón <b>Nueva Oferta</b> para empezar.");

            break;
        case 'editar':
            //si el usuario elije el modo editar, los elementos de crear nueva oferta se desactivan
            console.log("Mode selector changed to: editar");
            messageToUser("Estado activo: <b>Modo Editar</b> seleccionado, ingrese id de oferta y presione botón <b>Buscar Oferta</b>.");

            break;
        default:
            console.log("Error");
    }

    // borramos informacion de wipOffer previamente cargada
    deleteCurrentOfferWip();
    enableModeButtons(newValue);
}

function deleteCurrentOfferWip() {
    ofertaEditable.length = 0;
    $("#workingOffer").html("");
    deleteContentsOfInputDataFields();
    enableDataInputFields(false);
    //enableControlButtons(false);

    //setear checkboxes a su estado inicial
    $("#checkbox-1").prop("checked", false);
    $("#checkbox-2").prop("checked", false);

    $("#checkbox-1").checkboxradio("refresh");
    $("#checkbox-2").checkboxradio("refresh");
}

function nuevaOfertaClicked() {
    console.log("Nueva Oferta clicked");
    messageToUser("Estado activo: template de oferta cargado, ingrese nuevos valores en los campos de <b>Datos</b>.");
    instanciarNuevoObjetoOferta(-1);
    updateInputDataFieldsToWorkingOfferCurrentData('crear');
    $("#workingOffer").html(buildHtmlOfferFullSize(ofertaEditable[0]));
    enableDataInputFields(true);
    //enableControlButtons(true);
}

function instanciarNuevoObjetoOferta(pIndexPos) {
    if (pIndexPos === -1) {
        var addedDate_ = new Date();
        var oferta = {
            id: nuevoIdUnico(ofertasPreCargadas),
            featured: -1,
            active: false,
            timesBooked: 0,
            displayName: "No display name",
            geoLocation: "No location",
            imageUrl: "media/pictures/00-noImage.jpg",
            housingType: "Hotel",
            perNightPrice: 0,
            startDate: addedDate_,
            endDate: addedDate_,
            addedDate: addedDate_
        };
        ofertaEditable[0] = oferta;
    } else {
        // para editar, cargamos la informacion de la oferta selecionada en la oferta editable
        var oferta = {
            id: ofertasPreCargadas[pIndexPos].id,
            featured: ofertasPreCargadas[pIndexPos].featured,
            active: ofertasPreCargadas[pIndexPos].active,
            timesBooked: ofertasPreCargadas[pIndexPos].timesBooked,
            displayName: ofertasPreCargadas[pIndexPos].displayName,
            geoLocation: ofertasPreCargadas[pIndexPos].geoLocation,
            imageUrl: ofertasPreCargadas[pIndexPos].imageUrl,
            housingType: ofertasPreCargadas[pIndexPos].housingType,
            perNightPrice: ofertasPreCargadas[pIndexPos].perNightPrice,
            startDate: ofertasPreCargadas[pIndexPos].startDate,
            endDate: ofertasPreCargadas[pIndexPos].endDate,
            addedDate: ofertasPreCargadas[pIndexPos].addedDate
        };
        ofertaEditable[0] = oferta;
    }
    ofertaEditadaExitosamente = false;
}

function updateInputDataFieldsToWorkingOfferCurrentData(pValor) {

    // para crear ofertas nuevas
    $("#offerDisplayName").val(ofertaEditable[0].displayName);
    $("#offerGeoLocation").val(ofertaEditable[0].geoLocation);
    //var startDateReadable = ofertaEditable[0].startDate.toDateString();
    var mesStart = parseInt(ofertaEditable[0].startDate.getMonth()) + 1;
    var startDateReadable = ofertaEditable[0].startDate.getDate() + "/" + mesStart + "/" + ofertaEditable[0].startDate.getFullYear();
    $("#offerStartDate").val(startDateReadable);
    var mesEnd = parseInt(ofertaEditable[0].endDate.getMonth()) + 1;
    var endDateReadable = ofertaEditable[0].endDate.getDate() + "/" + mesEnd + "/" + ofertaEditable[0].endDate.getFullYear();
    $("#offerEndDate").val(endDateReadable);
    $("#selectTipoDeHospedaje").val(ofertaEditable[0].housingType);
    $("#offerPricePerNight").val(ofertaEditable[0].perNightPrice);

    if (pValor === 'crear') {
        //setear checkboxes a su estado inicial
        $("#checkbox-1").prop("checked", false);
        $("#checkbox-2").prop("checked", false);

        $("#checkbox-1").checkboxradio("refresh");
        $("#checkbox-2").checkboxradio("refresh");
    }
    if (pValor === 'editar') {
        //ajustamos el checkbox de destacada en funcion a la informacion de la oferta
        if (ofertaEditable[0].featured > -1) {
            $("#checkbox-1").prop("checked", true);
        } else {
            $("#checkbox-1").prop("checked", false);
        }
        //ajustamos el checkbox de habilitada en funcion a la informacion de la oferta
        if (ofertaEditable[0].active) {
            $("#checkbox-2").prop("checked", true);
        } else {
            $("#checkbox-2").prop("checked", false);
        }
        $("#checkbox-1").checkboxradio("refresh");
        $("#checkbox-2").checkboxradio("refresh");
    }
}


function deleteContentsOfInputDataFields() {
    $("#offerDisplayName").val("");
    $("#offerGeoLocation").val("");
    $("#offerStartDate").val("");
    $("#offerEndDate").val("");
    $("#selectTipoDeHospedaje").val("Hotel");
    $("#offerPricePerNight").val("");
    $("#offerImageURL").val("");
}

// esto solo funciona para archivos de imagen imagenes ubicados en Assets\public_html\media\pictures
function getCorrectImageFileURL(pStr) {
    var result = "media/pictures/00-error.jpg";


    // busco la posicion de la ultima \ en el pStr
    var x = pStr.length;
    var backslashFound = false;
    while (backslashFound === false && x > 0) {
        if (pStr.charAt(x) === "\\" || pStr.charAt(x) === "/") {
            backslashFound = true;
        } else {
            x--;
        }
    }

    if (backslashFound) {
        result = "media/pictures/";
        for (var i = x + 1; i < pStr.length; i++) {
            result += pStr.charAt(i);
        }
    }

    return result;
}

function updateWorkingOfferAndPreview() {
    var addedDate_ = new Date();
    var msg = "Estado activo: errores de datos detectados: <br>";

    // validacion de nombre de la oferta
    var pickedName = $("#offerDisplayName").val();
    if (myTrim(pickedName) === "") {
        msg += " - error en <b>Nombre de la oferta</b>, este campo no puede estar vacío <br>";
    }
    if (myTrim(pickedName) === "No display name") {
        msg += " - advertencia en <b>Nombre de la oferta</b>, cambiar valor por defecto <br>";
    }

    // validacion de ubicacion de la oferta
    var pickedLocation = $("#offerGeoLocation").val();
    if (myTrim(pickedLocation) === "") {
        msg += " - error en <b>Ubicación geográfica</b>, este campo no puede estar vacío <br>";
    }
    if (myTrim(pickedLocation) === "No location") {
        msg += " - advertencia en <b>Ubicación geográfica</b>, cambiar valor por defecto <br>";
    }

    // validacion de imagen de la oferta
    var imageUrl = getCorrectImageFileURL($("#offerImageURL").val());
    if (imageUrl === "media/pictures/00-error.jpg") {
        msg += "- error en <b>Imagen</b>, intentar nuevamente <br>";
    }
    if (imageUrl === "media/pictures/00-noImage.jpg") {
        msg += " - advertencia en <b>Imagen</b>, cambiar valor por defecto <br>";
    }

    // validacion de fechas
    var startDateInput = $("#offerStartDate").val();
    var endDateInput = $("#offerEndDate").val();
    var pickedStartDate_2 = "";
    var pickedEndDate_2 = "";

    // si ambos datos leidos del imput son validos
    if (isValidDateInput(startDateInput) && isValidDateInput(endDateInput)) {
        var pickedStartDate_1 = $("#offerStartDate").datepicker("getDate");
        var allGood = true;
        if (pickedStartDate_1 === null) {
            msg += "- advertencia en <b>Fecha de Inicio</b>, cambiar valor por defecto <br>";
            allGood = false;
        }

        var pickedEndDate_1 = $("#offerEndDate").datepicker("getDate");
        if (pickedEndDate_1 === null) {
            msg += "- advertencia en <b>Fecha de fin</b>, cambiar valor por defecto <br>";
            allGood = false;
        }

        if ((pickedEndDate_1 <= pickedStartDate_1) && (pickedEndDate_1 !== null && pickedStartDate_1 !== null)) {
            msg += "- error en rango de fechas, fecha de fin no puede ser mayor o igual a fecha de inicio <br>";
            allGood = false;
        }
        if (allGood) {
            pickedStartDate_2 = pickedStartDate_1;
            pickedEndDate_2 = pickedEndDate_1;
        }

    } else {
        msg += "- error en rango de fechas, las fechas solo admiten valores numericos y '/' <br>";
    }

    // validacion del precio por noche de la oferta
    var pickedPrice = $("#offerPricePerNight").val();
    if (isNumber(pickedPrice)) {
        pickedPrice = makeInt(pickedPrice);
        if (pickedPrice < 0) {
            msg += "- error en <b>Precio por noche</b>, debe ser un número positivo <br>";
        }
        if (pickedPrice === 0) {
            msg += "- advertencia en <b>Precio por noche</b>, cambiar valor por defecto <br>";
        }

    } else {
        msg += " - error en <b>Precio por noche</b>, debe ser un número <br>";
    }

    var habilitadaChecked = $('#checkbox-1').prop('checked');
    var destacadaChecked;
    var featuredNumber;
    var id;

    //checkeo en que modo estamos, si en crear oferta o editar oferta
    var currentMode = $("input[name=radioGroupModeSelector]:checked").val();
    //si estamos en modo crear oferta, algunos valores tienen que ser creados
    if (currentMode === "crear") {
        id = nuevoIdUnico(ofertasPreCargadas);


        destacadaChecked = $('#checkbox-2').prop('checked');

        featuredNumber = -1;
        if (destacadaChecked) {
            featuredNumber = getNumberOfFeaturedOffers();
        }
    }
    //si estamos en modo editar oferta, algunos valores deben ser leidos 
    if (currentMode === "editar") {
        id = ofertaEditable[0].id;

        // hay cuatro casos posibles como resultado del potencial cambio de valor de destacada
        // 1- antes: destacada, ahora: no destacada, se asigna featured a -1
        // 2- antes: no destacada, ahora: no destacada, se asigna featured a -1
        // 3- antes: no destacada, ahora: destacada, se genera un nuevo numero para featured
        // 4- antes: destacada, ahora: destacada, se copia el numero viejo de featured
        featuredNumber = -1;
        destacadaChecked = $('#checkbox-2').prop('checked');
        //3 
        if (ofertaEditable[0].featured === -1 && destacadaChecked) {
            featuredNumber = getNumberOfFeaturedOffers();
        }
        //4
        if (ofertaEditable[0].featured > -1 && destacadaChecked) {
            featuredNumber = ofertaEditable[0].featured;
        }
    }

    // si msg esta incambiado, se asume que todas las validaciones fueron exitosas y se aplican los cambios
    if (msg === "Estado activo: errores de datos detectados: <br>") {
        msg = "Estado activo: ingeso de <b>Datos</b> exitoso, revise valores de <b>Control</b> y presione botón <b>Aplicar Datos</b> para terminar.";
        var oferta = {
            id: id,
            featured: featuredNumber,
            active: habilitadaChecked,
            timesBooked: 0,
            displayName: pickedName,
            geoLocation: pickedLocation,
            imageUrl: imageUrl,
            housingType: $("#selectTipoDeHospedaje").val(), // no necesita validacion
            perNightPrice: pickedPrice,
            startDate: pickedStartDate_2,
            endDate: pickedEndDate_2,
            addedDate: addedDate_
        };

        ofertaEditable[0] = oferta;

        ofertaEditadaExitosamente = true;
        var wipOffer = buildHtmlOfferFullSize(ofertaEditable[0]);
        $("#workingOffer").html(wipOffer);
    }

    messageToUser(msg);
}

function getNumberOfFeaturedOffers() {
    var cont = 0;
    for (var i = 0; i < ofertasPreCargadas.length; i++) {
        if (ofertasPreCargadas[i].featured !== -1) {
            cont++;
        }
    }
    return cont;
}

function aplicarDatosClicked() {
    var currentMode = $("input[name=radioGroupModeSelector]:checked").val();
    if (currentMode === 'crear') {
        if (ofertaEditable.length > 0) {
            var searchForOffer = getArrayIndexFromId(ofertaEditable[0].id, ofertasPreCargadas);
            if (searchForOffer === -1) {
                if (ofertaEditadaExitosamente) {
                    ofertasPreCargadas.push(ofertaEditable[0]);
                    console.log("Ingreso exitoso");
                    messageToUser("Estado inactivo: oferta id " + ofertaEditable[0].id + " agregada con exito, para crear una nueva oferta presionar botón <b>Nueva Oferta</b>.");
                    enableDataInputFields(false);
                } else {
                    console.log("La edicion de oferta no ha pasado todas las validaciones");
                }
            } else {
                console.log("Intenta agregar la misma oferta mas de una vez");
            }
        }
    }
    if (currentMode === 'editar'){
        if (ofertaEditable.length > 0) {
            if (ofertaEditadaExitosamente) {
                var searchForOffer = getArrayIndexFromId(ofertaEditable[0].id, ofertasPreCargadas);
                ofertasPreCargadas[searchForOffer] = ofertaEditable[0];
                /*
                ofertasPreCargadas[searchForOffer].id = ofertaEditable[0].id;
                ofertasPreCargadas[searchForOffer].featured = ofertaEditable[0].featured;
                ofertasPreCargadas[searchForOffer].active = ofertaEditable[0].active;
                ofertasPreCargadas[searchForOffer].timesBooked = ofertaEditable[0].timesBooked;
                ofertasPreCargadas[searchForOffer].displayName = ofertaEditable[0].displayName;
                ofertasPreCargadas[searchForOffer].geoLocation = ofertaEditable[0].geoLocation;
                ofertasPreCargadas[searchForOffer].imageUrl = ofertaEditable[0].imageUrl;
                ofertasPreCargadas[searchForOffer].housingType = ofertaEditable[0].housingType;
                ofertasPreCargadas[searchForOffer].perNightPrice = ofertaEditable[0].perNightPrice;
                ofertasPreCargadas[searchForOffer].startDate = ofertaEditable[0].startDate;
                ofertasPreCargadas[searchForOffer].endDate = ofertaEditable[0].endDate;
                ofertasPreCargadas[searchForOffer].addedDate = ofertaEditable[0].addedDate;
                */
                messageToUser("Estado inactivo: oferta id " + ofertaEditable[0].id + " modificada con exito, para crear una nueva oferta presionar botón <b>Nueva Oferta</b>.");
                enableDataInputFields(false);
            }
        }
    }
}

function messageToUser(pString) {
    //console.log('Message to user: ' + pString);
    $("#messagesToUser").html(pString);
}

function buscarOfertaClicked() {
    var ofertaIdInput = $("#buscarOfertaInput").val();

    if (notEmptyString(ofertaIdInput)) {
        if (isNumber(ofertaIdInput)) {
            ofertaIdInput = makeInt(ofertaIdInput);
            if (ofertaIdInput > 0) {
                var offerIndexPos = getArrayIndexFromId(ofertaIdInput, ofertasPreCargadas);
                if (offerIndexPos === -1) {
                    messageToUser("Estado activo: busqueda sin exito, revise el id de oferta e intente nuevamente.");
                    //console.log("Oferta no encontrada.");
                } else {
                    messageToUser("Estado activo: busqueda exitosa, oferta encontrada.");
                    instanciarNuevoObjetoOferta(offerIndexPos);
                    updateInputDataFieldsToWorkingOfferCurrentData('editar');
                    $("#workingOffer").html(buildHtmlOfferFullSize(ofertaEditable[0]));
                    enableDataInputFields(true);
                    //console.log("Oferta encontrada.");
                }
            } else {
                messageToUser("Estado activo: busqueda sin exito, los id de oferta son valores numericos positivos.");
                //console.log("Es un numero negativo.");
            }
        } else {
            messageToUser("Estado activo: busqueda sin exito, los id de oferta son valores numericos positivos.");
            //console.log("No es un numero.");
        }
    } else {
        messageToUser("Estado activo: busqueda sin exito, el campo de id de oferta no puede estar vacío.");
        //console.log("Esta vacio.");
    }
}





function construirInstruccionesEO() {
    var result = "";

    result += '<div id="inputDataExplanation" class="widget"><fieldset>';
    result += '<legend>Instrucciones: </legend>';
    result += '<div><p>1 - Seleccionar modo, <b>Crear oferta</b> o <b>Editar oferta</b>.</p></div>';
    result += '<div><p>2 - Ingresar información en los campos de la sección <b>Datos</b>.</p></div>';
    result += '<div><p>3 - Indicar si la oferta es <b>Destacada</b>.</p></div>';
    result += '<div><p>4 - Indicar si la oferta está <b>Habilitada</b>, ofertas no habilitadas no se cargarán en la página.</p></div>';
    //result += '<div><p>5 - <b>Cargar datos</b>, actualiza la oferta como está definida actualmente en modo previsualización.</p></div>';
    result += '<div><p>5 - <b>Aplicar datos</b>, agrega los datos a la base de datos de la página haciendo efectivos los cambios.</p></div>';
    result += '</fieldset>';
    result += '</div>';

    return result;
}


function construirModeSelectEO() {
    var result = "";
    result += '<div id="modeSelect"><fieldset>';
    result += '<legend>Modo: </legend>';
    result += '<div><label for="crear">Crear Oferta</label><input type="radio" name="radioGroupModeSelector" id="crear" value="crear">';
    result += '<label for="editar">Editar Oferta</label><input type="radio" name="radioGroupModeSelector" id="editar" value="editar"></div>';
    result += '<div><button id="nuevaOfertaButton" onclick="nuevaOfertaClicked()">Nueva Oferta</button></div>';
    result += '<div><input id="buscarOfertaInput" type="text" placeholder="id de oferta">';
    result += '<button id="buscarOfertaButton" onclick="buscarOfertaClicked()">Buscar Oferta</button></div>';
    result += '</fieldset></div>';
    return result;
}

function construirInputDataEO() {
    var tableInputData = "";
    var divInputData = "";
    var selectTipoDeHospedaje = "";
    var divInputDataButtons = "";

    divInputData += '<div id="inputData"><form id="newOfferInputForm"><fieldset>';
    divInputData += '<legend>Datos: </legend>';
    divInputData += '<div><label for="offerDisplayName">Nombre de la oferta</label><input id="offerDisplayName" name="offerDisplayName"></div>';
    divInputData += '<div><label for="offerGeoLocation">Ubicación geográfica</label><input id="offerGeoLocation" name="offerGeoLocation"></div>';
    divInputData += '<div><label for="offerStartDate">Fecha de inicio de oferta</label><input id="offerStartDate" name="offerStartDate" class="inputDate" placeholder="fecha de inicio"></div>';
    divInputData += '<div><label for="offerEndDate">Fecha de fin de oferta</label><input id="offerEndDate" name="offerEndDate" class="inputDate" placeholder="fecha de fin"></div>';
    divInputData += '<div><label for="offerPricePerNight">Precio por noche</label><input id="offerPricePerNight" name="offerPricePerNight"></div>';
    divInputData += '<div><label for="offerImageURL">Imagen: </label><input id="offerImageURL" type="file" name="offerImageURL"></div>';

    selectTipoDeHospedaje += '<select id="selectTipoDeHospedaje">'; // puede ser Hotel, Hostel, Casa, Apartamento
    selectTipoDeHospedaje += '<option value="Hotel">Hotel</option>';
    selectTipoDeHospedaje += '<option value="Hostel">Hostel</option>';
    selectTipoDeHospedaje += '<option value="Casa">Casa</option>';
    selectTipoDeHospedaje += '<option value="Apartamento">Apartamento</option>';
    selectTipoDeHospedaje += '</select>';

    divInputData += '<div><label for="selectTipoDeHospedaje">Tipo de hospedaje</label>' + selectTipoDeHospedaje + '</div>';
    divInputData += '</fieldset></form></div>';

    divInputDataButtons += '<div id="inputDataButtons" class="widget"><fieldset>';
    divInputDataButtons += '<legend>Control: </legend>';
    divInputDataButtons += '<div><label for="checkbox-1">Destacada</label><input id="checkbox-1" type="checkbox" name="checkbox-1" ></div>';
    divInputDataButtons += '<div><label for="checkbox-2">Habilitada</label><input id="checkbox-2" type="checkbox" name="checkbox-2" ></div>';
    //divInputDataButtons += '<div><button onclick="cargarDatosClicked()">Cargar datos</button></div>';
    divInputDataButtons += '<div><button id="aplicarDatosButton" onclick="aplicarDatosClicked()">Aplicar datos</button></div>';
    divInputDataButtons += '</fieldset>';
    divInputDataButtons += '</div>';

    tableInputData = "<table><tr><td>" + divInputData + "</td><td>" + divInputDataButtons + "</td></tr></table>";

    return tableInputData;
}

// ^^^^^^^^^^^^^^^^^^
// EDITAR OFERTAS
//===================
