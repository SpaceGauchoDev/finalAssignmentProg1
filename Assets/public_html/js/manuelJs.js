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
    fixDestacadosOrder();
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
    if (currentMode === 'editar') {
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


//========================
// EDITAR ORDEN DESTACADOS
//VVVVVVVVVVVVVVVVVVVVVVVV
function construirEditarOrdenDestacados() {


    fixDestacadosOrder();
    var htmlDestacados = cargarDestacados();
    var tituloDestacadas = "<h3>Destacadas<h3>";


    $("#mainDiv").html(tituloDestacadas + htmlDestacados);
}


function fixDestacadosOrder() {
    var arrayDestacados = getDestacados();
    arrayDestacados = sortDestacados(arrayDestacados);


    for (var i = 0; i < arrayDestacados.length; i++) {
        var ordenOriginal = arrayDestacados[i].featured;
        arrayDestacados[i].featured = i;
        console.log("Array destacado orden original: " + ordenOriginal + ", array destacado orden arreglado: " + arrayDestacados[i].featured);
    }


}

function destacadoSube(btn) {
    // si vemos el array de destacadas como ofertas A, B, C, y D con sus respectivos valores de featured despues de pasar por fixDestacadosOrder();
    // arrayFeatured(A0, B1, C2, D3);
    // usuario presiona flecha arriba en oferta C
    // arrayFeatured(A0, C1, B2, D3);

    // consigo la posicion de C en el array destacados ordenado
    var offerId = parseInt(btn.getAttribute("data-offerid"));
    var arrayDestacados = getDestacados();
    arrayDestacados = sortDestacados(arrayDestacados);
    var offerIndexC = getArrayIndexFromId(offerId, arrayDestacados);


    // si el la oferta que se quiere subir esta primera, no hacemos nada
    if (offerIndexC !== 0) {
        var offerIndexB = offerIndexC - 1;

        arrayDestacados[offerIndexC].featured = arrayDestacados[offerIndexC].featured - 1;
        arrayDestacados[offerIndexB].featured = arrayDestacados[offerIndexB].featured + 1;
        updateDisplay('full');
    } else {
        console.log("error: usuario quiere subir la primer oferta mas arriba del primer lugar");
    }
}

function destacadoBaja(btn) {
    // si vemos el array de destacadas como ofertas A, B, C, y D con sus respectivos valores de featured despues de pasar por fixDestacadosOrder();
    // arrayFeatured(A0, B1, C2, D3);
    // usuario presiona flecha abajo en oferta B
    // arrayFeatured(A0, C1, B2, D3);

    // consigo la posicion de B en el array destacados ordenado
    var offerId = parseInt(btn.getAttribute("data-offerid"));
    var arrayDestacados = getDestacados();
    arrayDestacados = sortDestacados(arrayDestacados);
    var offerIndexB = getArrayIndexFromId(offerId, arrayDestacados);

    // si el la oferta que se quiere bajar esta ultima, no hacemos nada
    if (offerIndexB !== arrayDestacados.length - 1) {
        var offerIndexC = offerIndexB + 1;

        arrayDestacados[offerIndexB].featured = arrayDestacados[offerIndexB].featured + 1;
        arrayDestacados[offerIndexC].featured = arrayDestacados[offerIndexC].featured - 1;
        updateDisplay('full');

    } else {
        console.log("error: usuario quiere bajar la ultima oferta mas abajo del ultimo lugar");
    }
}

function destacadoToTop(btn) {
    // si vemos el array de destacadas como ofertas A, B, C, y D con sus respectivos valores de featured despues de pasar por fixDestacadosOrder();
    // arrayFeatured(A0, B1, C2, D3);
    // usuario presiona flecha doble arriba en oferta C
    // arrayFeatured(C0, A1, B2, D3);  

    // consigo la posicion de C en el array destacados ordenado
    var offerId = parseInt(btn.getAttribute("data-offerid"));
    var arrayDestacados = getDestacados();
    arrayDestacados = sortDestacados(arrayDestacados);
    var offerIndexC = getArrayIndexFromId(offerId, arrayDestacados);

    // si el la oferta que se quiere subir al principio es la primera, no hacemos nada
    if (offerIndexC !== 0) {
        // aumento el indice de destacados de todas las ofertas en 1
        for (var i = 0; i < arrayDestacados.length; i++) {
            arrayDestacados[i].featured = arrayDestacados[i].featured + 1;
        }
        // cambio el indice de destacado de la oferta seleccionada a 0
        arrayDestacados[offerIndexC].featured = 0;

        //arreglo el array de destacados
        arrayDestacados = sortDestacados(arrayDestacados);
        updateDisplay('full');
    } else {
        console.log("error: usuario quiere subir primer oferta al principio");
    }
}

function destacadoToBot(btn) {
    // si vemos el array de destacadas como ofertas A, B, C, y D con sus respectivos valores de featured despues de pasar por fixDestacadosOrder();
    // arrayFeatured(A0, B1, C2, D3);
    // usuario presiona flecha doble abajo en oferta B
    // arrayFeatured(A0, C1, D2, B3);  

    // consigo la posicion de B en el array destacados ordenado
    var offerId = parseInt(btn.getAttribute("data-offerid"));
    var arrayDestacados = getDestacados();
    arrayDestacados = sortDestacados(arrayDestacados);
    var offerIndexB = getArrayIndexFromId(offerId, arrayDestacados);

    // si el la oferta que se quiere bajar al final es la ultima, no hacemos nada
    if (offerIndexB !== arrayDestacados.length - 1) {
        // aumento el indice de destacado de la oferta seleccionada, a el indice de destacado de la ultima mas uno
        arrayDestacados[offerIndexB].featured = arrayDestacados[arrayDestacados.length - 1].featured + 1;

        //arreglo el array de destacados
        arrayDestacados = sortDestacados(arrayDestacados);
        updateDisplay('full');
    } else {
        console.log("error: usuario quiere subir primer oferta al principio");
    }
}

// ^^^^^^^^^^^^^^^^^^^^^^^
// EDITAR ORDEN DESTACADOS
//========================

//=============================
// AUTO ADMINISTRACION DE DATOS
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVV

function construirAdministracion() {
    var htmlBody = "";
    var htmlCeldaRegister = "";

    htmlCeldaRegister += '<label for="nameModifyField" >Nombre: </label><input id="nameModifyField" type="text"/>' + "<br>";
    htmlCeldaRegister += '<p></p>';
    htmlCeldaRegister += '<label for="lastNameModifyField" >Apellido: </label><input id="lastNameModifyField" type="text"/>' + "<br>";
    htmlCeldaRegister += '<p></p>';
    htmlCeldaRegister += '<label for="edadModifyField" >Edad: </label><input id="edadModifyField" type="text"/>' + "<br>";
    htmlCeldaRegister += '<p></p>';
    htmlCeldaRegister += '<label for="emailModifyField" >Email: </label><input id="emailModifyField" type="text"/>' + "<br>";
    ;
    htmlCeldaRegister += '<p></p>';
    htmlCeldaRegister += '<hr>';
    htmlCeldaRegister += '<label for="oldPasswordModifyField" >Contraseña Anterior: </label><input id="oldPasswordModifyField" type="password"/>' + "<br>";
    htmlCeldaRegister += '<p></p>';
    htmlCeldaRegister += '<label for="newPasswordModifyField" >Contraseña Nueva: </label><input id="newPasswordModifyField" type="password"/>' + "<br>";
    htmlCeldaRegister += '<p></p>';
    htmlCeldaRegister += '<label for="newPasswordCheckModifyField" >Repetir Contraseña: </label><input id="newPasswordCheckModifyField" type="password"/>' + "<br>";
    htmlCeldaRegister += '<p></p>';
    htmlCeldaRegister += '<hr>';
    htmlCeldaRegister += '<button onclick="updateUserDataClicked()">Aplicar</button>';
    htmlCeldaRegister += '<p></p>';
    htmlCeldaRegister += '<div id="messageToUserModifyData"></div>';


    htmlBody += "<table><tr><th>Datos de Usuario</th></th>";
    htmlBody += "<tr><td>" + htmlCeldaRegister + "</td></tr></table>";

    $("#mainDiv").html(htmlBody);
    cargarDatosExitentes();
}


function cargarDatosExitentes() {
    var userId = userNav.id;
    var userIdIndex = getArrayIndexFromId(userId, usuariosPreCargados);

    $("#nameModifyField").val(usuariosPreCargados[userIdIndex].name);
    $("#lastNameModifyField").val(usuariosPreCargados[userIdIndex].lastName);
    $("#edadModifyField").val(usuariosPreCargados[userIdIndex].edad);
    $("#emailModifyField").val(usuariosPreCargados[userIdIndex].email);
    $("#oldPasswordModifyField").val("");
    $("#newPasswordModifyField").val("");
    $("#newPasswordCheckModifyField").val("");
}


function updateUserDataClicked() {
    console.log("i get clicked");

    var inputName = $("#nameModifyField").val();
    var inputLastName = $("#lastNameModifyField").val();
    var inputEmail = $("#emailModifyField").val();
    var inputEdad = $("#edadModifyField").val();

    var inputOldPass = $("#oldPasswordModifyField").val();
    var inputNewPass = $("#newPasswordModifyField").val();
    var inputNewPassRep = $("#newPasswordCheckModifyField").val();

    var userArrayIndex = getArrayIndexFromId(userNav.id, usuariosPreCargados);

    var fullMsg = "";

    var msgN = "";
    var msgL = "";
    var msgE = "";
    var msgD = "";
    var msgPv = "";
    var msgPn = "";
    var msgPnr = "";

    var validationSuccess = 0;

    // verificamos que el nombre ingresado no sea vacio
    if (notEmptyString(inputName)) {
        //EXITO
        validationSuccess++;
    } else {
        fullMsg += "<p>- Error en <b>Nombre</b>, el nombre no puede estar vacío. </p>";
    }

    // verificamos que el apellido ingresado no sea vacio
    if (notEmptyString(inputLastName)) {
        //EXITO
        validationSuccess++;
    } else {
        fullMsg += "<p>- Error en <b>Apellido</b>, el apellido no puede estar vacío.</p>";
    }

    // verificamos que el email sea valido y no esté previamente ingresado en el sistema
    if (notEmptyString(inputEmail)) {
        inputEmail = myTrim(inputEmail);
        if (isValidEmailFormat(inputEmail)) {
            var cont = 0;
            var emailFound = false;
            while (cont < usuariosPreCargados.length && emailFound === false) {
                // checkeamos que el email no exista en la base de datos, a menos que sea el del mismo usuario que esta editando sus datos
                if (usuariosPreCargados[cont].email === inputEmail && usuariosPreCargados[cont].id !== userNav.id) {
                    emailFound = true;
                }
                cont++;
            }
            if (emailFound) {
                //- Error en <b>Apellido</b>, el apellido no puede estar vacío.
                fullMsg += "<p>- Error en <b>Email</b>, la direccion de email ingresada ya existe en el sistema.</p>";
            } else {
                //EXITO
                validationSuccess++;
            }
        } else {
            fullMsg += "<p>- Error en <b>Email</b>, las direcciones de email no pueden contener espacios y tienen que tener al menos un @.</p>";
        }
    } else {
        fullMsg += "<p>- Error en <b>Email</b>, email no puede estar vacío.</p>";
    }


    // verificamos de la fecha de nacimiento
    inputEdad = myTrim(inputEdad);
    if (notEmptyString(inputEdad)) {
        if (isNumber(inputEdad)) {
            inputEdad = makeInt(inputEdad);
            if (inputEdad >= 0 && inputEdad < 130) {
                //EXITO
                validationSuccess++;
            } else {
                fullMsg += "<p>- Error en <b>Edad</b>, la edad solo puede ser un valor entre 0 y 130.</p>";
            }
        } else {
            fullMsg += "<p>- Error en <b>Edad</b>, la edad solo puede ser numerica.</p>";
        }
    } else {
        fullMsg += "<p>- Error en <b>Edad</b>, la edad no puede estar vacía, intente nuevamente.</p>";
    }


    // verificamos que la contraseña vieja no este vacía
    if (notEmptyString(inputOldPass)) {


        if (inputOldPass === usuariosPreCargados[userArrayIndex].password) {
            //EXITO
            validationSuccess++;
        } else {
            fullMsg += "<p>- Error en <b>Contraseña anterior</b>, la contraseña anterior no coincide con la contraseña en archivo.</p>";
        }

    } else {
        fullMsg += "<p>- Error en <b>Contraseña anterior</b>, la contraseña anterior no puede estar vacía.</p>";
    }


    // verificamos que la contrasena nueva no sea vacia
    inputNewPass = myTrim(inputNewPass);
    if (notEmptyString(inputNewPass)) {
        //EXITO
        validationSuccess++;
    } else {
        fullMsg += "<p>- Error en <b>Contraseña nueva</b>, la nueva contraseña no puede estar vacía.</p>";
    }

    // verificamos que la confirmacion de la contraseña nueva sea igual a la contraseña nueva
    if (inputNewPass === inputNewPassRep) {
        //EXITO
        validationSuccess++;
    } else {
        fullMsg += "<p>- Error en <b>Repetir Contraseña</b>, La repeticion de la nueva contraseña no coincide con la nueva contraseña ingresada.</p>";
    }

    if (validationSuccess === 7) {
        usuariosPreCargados[userArrayIndex].name = inputName;
        usuariosPreCargados[userArrayIndex].lastName = inputLastName;
        usuariosPreCargados[userArrayIndex].edad = inputEdad;
        usuariosPreCargados[userArrayIndex].password = inputNewPass;

        cargarDatosExitentes();
        fullMsg = "<p>Datos actualizados con exito.</p>" + fullMsg;
    } else {
        fullMsg = "<p>Solucionar los siguientes errores e intentar de nuevo: </p>" + fullMsg;
    }
    $("#messageToUserModifyData").html(fullMsg);
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// AUTO ADMINISTRACION DE DATOS
//=============================


//==============================
// INFO DE RESERVAS PARA USUARIO
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
function construirReservasReg() {
    // este array contiene OFERTAS para las cuales la reserva esta en estado pendiente, aprobada, o rechazada
    var todasLasReservas = "";

    var arrayReservas = getReservadas("todas");
    todasLasReservas = cargarOfertasReservadas(arrayReservas);

    $("#mainDiv").html(construirSelectDeFiltro() + todasLasReservas);
    $("#selectModoDeFiltro").change(updateReservasReg);
}

function updateReservasReg() {
    var selectorVal = $("#selectModoDeFiltro").val();

    var reservasPendientes = "";
    var reservasAprobadas = "";
    var reservasRechazadas = "";
    var todasLasReservas = "";

    switch (selectorVal) {
        case "aprobada":
            var arrayReservasAprobadas = getReservadas("aprobada");
            reservasAprobadas = cargarOfertasReservadas(arrayReservasAprobadas);
            break;
        case "pendiente":
            var arrayReservasPendientes = getReservadas("pendiente");
            reservasPendientes = cargarOfertasReservadas(arrayReservasPendientes);
            break;
        case "desaprobada":
            var arrayReservasRechazadas = getReservadas("desaprobada");
            reservasRechazadas = cargarOfertasReservadas(arrayReservasRechazadas);
            break;
        case "todas":
            var arrayReservas = getReservadas("todas");
            todasLasReservas = cargarOfertasReservadas(arrayReservas);
            break;
        default:
    }

    $("#mainDiv").html(construirSelectDeFiltro() + reservasAprobadas + reservasPendientes + reservasRechazadas + todasLasReservas);
    $("#selectModoDeFiltro").val(selectorVal);
    $("#selectModoDeFiltro").change(updateReservasReg);
}


function construirSelectDeFiltro() {
    var selectModoDeFiltro = "";

    selectModoDeFiltro += '<select id="selectModoDeFiltro">'; // puede ser pendiente, aprobada, desaprobada, todas
    selectModoDeFiltro += '<option value="todas">Todas</option>';
    selectModoDeFiltro += '<option value="aprobada">Aprobadas</option>';
    selectModoDeFiltro += '<option value="pendiente">Pendientes</option>';
    selectModoDeFiltro += '<option value="desaprobada">Rechazadas</option>';
    selectModoDeFiltro += '</select>';

    return selectModoDeFiltro;
}

function cargarOfertasReservadas(pArrayOfertas) {
    var txtOfertas = "<div class='contenedorReservadas'>";
    for (var i = 0; i < pArrayOfertas.length; i++) {
        txtOfertas += "<div class='oferta'>";
        txtOfertas += "<div class='imagenOferta'>";
        txtOfertas += "<img style='width:100px; height:100px;' src='" + pArrayOfertas[i].imageUrl + "' >";
        txtOfertas += "</div>";

        txtOfertas += "<div class='ofertaInfo'>";
        txtOfertas += "<h4>" + pArrayOfertas[i].displayName + "<h4>";
        txtOfertas += "<p>Tipo: " + pArrayOfertas[i].housingType + "<p>";
        txtOfertas += "<p>Dirección: " + pArrayOfertas[i].geoLocation + "<p>";

        var botonVerOferta = '<br><button onclick="verOferta(this)" data-offerid="' + pArrayOfertas[i].id + '">Ver oferta</button>';
        txtOfertas += botonVerOferta;
        txtOfertas += "</div>";
        txtOfertas += "</div>";
    }

    txtOfertas += "</div>";

    return txtOfertas;
}





function getReservadas(pStatus) {
	console.log(getReservadas);
	console.log(userNav);
    // creamos un array donde guardaremos los objetos ofertas reservadas del usuario actual
    var arrayOfertasReservadas = new Array();
    var userId = userNav.id;

    for (var i = 0; i < reservasPreCargadas.length; i++) {
        // encontramos las reservas hechas por el usuario
		console.log("USU ID: ");
		console.log(reservasPreCargadas[i].userId);
        if (reservasPreCargadas[i].userId === userId) {
            if (pStatus === "todas") {
                // guardamos todas las ofertas reservadas por el usuario
                var offerIndexPos = getArrayIndexFromId(reservasPreCargadas[i].offerId, ofertasPreCargadas);
                arrayOfertasReservadas.push(ofertasPreCargadas[offerIndexPos]);
            } else {
                if (reservasPreCargadas[i].status === pStatus) {
                    // solo guardamos las ofertas cuya reserva esta en un status igual a pStatus
                    var offerIndexPos = getArrayIndexFromId(reservasPreCargadas[i].offerId, ofertasPreCargadas);
                    arrayOfertasReservadas.push(ofertasPreCargadas[offerIndexPos]);
                }

            }
        }
    }
	console.log("arrayOfertasReservadas");
	console.log(arrayOfertasReservadas);
    // devolvemos el array con objetos de ofertas reservadas
    return arrayOfertasReservadas;
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// iNFO DE RESERVAS PARA USUARIO
//==============================


//====================================
// ADMINISTRACION DE ESTADO DE OFERTAS 
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
function construirAdministracionDeEstadoDeOfertas() {
    // este array contiene OFERTAS para las cuales la reserva esta en estado pendiente, aprobada, o rechazada
    var todasLasOfertas = "";

    var arrayOfertas = getOfertasParaHabilitacion("todas");
    todasLasOfertas = cargarOfertasParaHabilitacion(arrayOfertas);

    $("#mainDiv").html(selectHabilitadasDeshabilitadas() +  todasLasOfertas);
    $("#selectHabDes").change(updateOfertasAdmin);
}

function selectHabilitadasDeshabilitadas() {
    var selectModoDeFiltro = "";

    selectModoDeFiltro += '<select id="selectHabDes">'; // puede ser pendiente, aprobada, desaprobada, todas
    selectModoDeFiltro += '<option value="todas">Todas</option>';
    selectModoDeFiltro += '<option value="habilitada">Habilitadas</option>';
    selectModoDeFiltro += '<option value="deshabilitada">Deshabilitadas</option>';
    selectModoDeFiltro += '</select>';

    return selectModoDeFiltro;
}

function updateOfertasAdmin(){
    var selectorVal = $("#selectHabDes").val();

    var ofertasHabilitadas = "";
    var ofertasDeshabilitadas = "";
    var todasLasOfertas = "";

    switch (selectorVal) {
        case "habilitada":
            var arrayOfertasHabilitadas = getOfertasParaHabilitacion(true);
            ofertasHabilitadas = cargarOfertasParaHabilitacion(arrayOfertasHabilitadas);
            break;
        case "deshabilitada":
            var arrayReservasDeshabilitadas = getOfertasParaHabilitacion(false);
            ofertasDeshabilitadas = cargarOfertasParaHabilitacion(arrayReservasDeshabilitadas);
            break;
        case "todas":
            var arrayOfertas = getOfertasParaHabilitacion("todas");
            todasLasOfertas = cargarOfertasParaHabilitacion(arrayOfertas);
            break;
        default:
    }

    $("#mainDiv").html(selectHabilitadasDeshabilitadas() + ofertasHabilitadas + ofertasDeshabilitadas + todasLasOfertas);
    $("#selectHabDes").val(selectorVal);
    $("#selectHabDes").change(updateOfertasAdmin);
}


function cargarOfertasParaHabilitacion(pArrayOfertas) {
    var txtOfertas = "<div class='contenedorOfertasParaHabilitar'>";
    for (var i = 0; i < pArrayOfertas.length; i++) {
        txtOfertas += "<div class='oferta'>";
        txtOfertas += "<div class='imagenOferta'>";
        txtOfertas += "<img style='width:100px; height:100px;' src='" + pArrayOfertas[i].imageUrl + "' >";
        txtOfertas += "</div>";

        txtOfertas += "<div class='ofertaInfo'>";
        txtOfertas += "<h4>" + pArrayOfertas[i].displayName + "<h4>";
        txtOfertas += "<p>Tipo: " + pArrayOfertas[i].housingType + "<p>";
        txtOfertas += "<p>Dirección: " + pArrayOfertas[i].geoLocation + "<p>";

        var botonHabilitar = '';
        if(pArrayOfertas[i].active === false){
            botonHabilitar = '<br><button onclick="habilitarOfertaClicked(this)" data-offerid="' + pArrayOfertas[i].id + '">Habilitar Oferta</button>';
        }
        
        var botonDeshabilitar = '';
        if(pArrayOfertas[i].active === true){
            botonDeshabilitar = '<br><button onclick="desabilitarOfertaClicked(this)" data-offerid="' + pArrayOfertas[i].id + '">Deshabilitar Oferta</button>';
        }

        txtOfertas += botonHabilitar + botonDeshabilitar;
        txtOfertas += "</div>";
        txtOfertas += "</div>";
    }

    txtOfertas += "</div>";
    return txtOfertas;
}

function habilitarOfertaClicked(btn) {
    var offerId = parseInt(btn.getAttribute("data-offerid"));
    console.log('usuario habilita oferta: ' + offerId);
    var offerIndex = getArrayIndexFromId(offerId, ofertasPreCargadas);
    ofertasPreCargadas[offerIndex].active = true;
    updateOfertasAdmin();
}

function desabilitarOfertaClicked(btn) {
    var offerId = parseInt(btn.getAttribute("data-offerid"));
    console.log('usuario deshabilita oferta: ' + offerId);
    var offerIndex = getArrayIndexFromId(offerId, ofertasPreCargadas);
    ofertasPreCargadas[offerIndex].active = false;
    updateOfertasAdmin();
}


function getOfertasParaHabilitacion(pStatus) {
    // creamos un array donde guardaremos los objetos ofertas reservadas del usuario actual
    var arrayOfertas = new Array();

    for (var i = 0; i < ofertasPreCargadas.length; i++) {
        if (pStatus === "todas") {
            // guardamos todas las ofertas
            arrayOfertas.push(ofertasPreCargadas[i]);
        } else {
            if (ofertasPreCargadas[i].active === pStatus) {
                // solo guardamos las ofertas cuya active sea igual a pStatus
                arrayOfertas.push(ofertasPreCargadas[i]);
            }
        }
    }
    // devolvemos el array con objetos de ofertas reservadas
    return arrayOfertas;
}



// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ADMINISTRACION DE ESTADO DE OFERTAS 
//====================================



