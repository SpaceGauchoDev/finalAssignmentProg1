/*Santiago Rodríguez - Manuel De Armas - Obligatorio programacion 1 2018 - mainJS*/
$(document).ready(inicialSetUp);

var ofertas;
var ofertaEditable;
var ofertasPreCargadas;
var usuariosPreCargados;
var reservasPreCargadas;
var userNav;
var ofertaEditadaExitosamente;



function inicialSetUp() {
    ofertas = new Array();
    ofertaEditable = new Array();
    ofertasPreCargadas = new Array();
    usuariosPreCargados = new Array();
    reservasPreCargadas = new Array();
    userNav = new Array();
    ofertaEditadaExitosamente = false;

    construirYAgregarUsuariosPreCargados();
    construirYAgregarOfertasPreCargadas();
    construirYAgregarReservasPreCargadas(65); // el parametro es la probabilidad de reserva que tiene cada usuario pre cargado, -1 para ninguna reserva autogenerada
    mostrarTop5();
    construirUsuarioParaNavegacion(0, "ofertas");
    updateDisplay();
}

function construirUsuarioParaNavegacion(pSetting, pMode) {
    switch (pSetting) {
        case 0:
            // for live version
            userNav = {
                type: "noReg", // puede ser: "noReg", "regUser", "admin"
                currentMode: "ofertas", // para regUser puede ser: "ofertas", "favoritos", "estadoDeCuenta", "reservasReg", "administracion"
                // para admin puede ser: "ofertas", "editarOfertas", "solicitudesUsuario", "reservasAdmin", "stats", "administracion"
                // para noReg puede ser: "ofertas", "login"
                id: -1 // -1 es el id de usuarios no registrados
            };
            break;
        case 1:
            // for testing purposes
            userNav = {
                type: "admin",
                currentMode: pMode,
                id: 1};
            break;
        case 2:
            // for testing purposes
            userNav = {
                type: "regUser",
                currentMode: pMode,
                id: 2};
            break;            
        default : 
        console.log("Wrong switch input at construirUsuarioParaNavegacion"); 
    }
}

function updateDisplay() {
    switch (userNav.currentMode) {
        case "login":
            console.log("display: login");
            construirNavBar();
            construirLogInMode();
            break;
        case "ofertas":
            console.log("display: ofertas");
            construirNavBar();
            mostrarOfertasPrecargadas();
            break;
		case "detalleOferta":
			console.log("detalle oferta");
			construirNavBar();
			mostrarDetalleOferta();
			break;
        case "favoritos":
            console.log("display: favoritos");
            break;
        case "estadoDeCuenta":
            console.log("display: estadoDeCuenta");
            break;
        case "reservasReg":
            console.log("display: reservasReg");
            break;
        case "administracion":
            console.log("display: administracion");
            break;
        case "editarOfertas":
            console.log("display: editarOfertas");
            construirNavBar();
            construirEditarOfertas();
            break;         
        case "solicitudesUsuario":
            console.log("display: solicitudesUsuario");
            construirNavBar();
            construirSolicitudesDeUsuario();
            break;
        case "reservasAdmin":
            console.log("display: reservasAdmin");
            construirNavBar();
            construirReservasAdminMode();
            break;
        case "stats":
            console.log("display: stats");
            break;
        default :
            console.log("currentMode para updateDisplay incorrecto");
    }

    // inicializacion y settings de jquery-ui
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    
    $(".accordionDiv").accordion({
        collapsible: true,
        active: false
    });
	$(".inputDate").datepicker({
        dateFormat: 'dd/mm/yy'
    });

    $("input[type='radio']").checkboxradio({icon: false});
    $("input[type='checkbox']").checkboxradio();    
    
    $( ".widget button" ).button();
    
    if (userNav.currentMode !== "editarOfertas") {
        restringirFechasSeleccionables();
    }else{
        soloFechasFuturas();
    }
    
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // inicializacion y settings de jquery-ui
    
}

// ======================================
// CONFIGURACION DE jQuery-UI datepickers
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

function restringirFechasSeleccionables() {
    // itero a traves de todos los elementos de la clase .inputDate
    $(".inputDate").each(
            function () {
                //obtengo el id del input de fecha, un string de formato resDateInicio_#### o resDateFin_####
                var dateInputId = $(this).attr("id");
                var offerId = getOfferIdFromDateInputId(dateInputId);
                var minDate = getOfferStartDate(offerId);
                var maxDate = getOfferEndDate(offerId);
                var currentSelector = "#" + dateInputId;

                $(currentSelector).datepicker("option", "minDate", minDate);
                $(currentSelector).datepicker("option", "maxDate", maxDate);

            }
    );
}

function soloFechasFuturas() {
    // itero a traves de todos los elementos de la clase .inputDate
    $(".inputDate").each(
            function () {
                
                var dateInputId = $(this).attr("id");
             
                var minDate = new Date();
                var currentSelector = "#" + dateInputId;

                $(currentSelector).datepicker("option", "minDate", minDate);
            }
    );
}

function getOfferIdFromDateInputId(pDateInputId) {
    var result = "";
    var dashFound = false;
    var x = 0;
    while (dashFound === false && x < pDateInputId.length) {
        if (pDateInputId.charAt(x) === "_") {
            dashFound = true;
        } else {
            x++;
        }
    }

    for (var i = x + 1; i < pDateInputId.length; i++) {
        result += pDateInputId.charAt(i);
    }

    result = parseInt(result);

    return result;
}

function getOfferStartDate(pIdOferta) {
    //console.log(pIdOferta);
    var result = "error";
    var offerFound = false;
    var x = 0;
    while (offerFound === false && x < ofertasPreCargadas.length) {
        if (ofertasPreCargadas[x].id === pIdOferta) {
            offerFound = true;
            result = ofertasPreCargadas[x].startDate;
        }
        x++;
    }
    return result;
}

function getOfferEndDate(pIdOferta) {
    //console.log(pIdOferta);
    var result = "error";
    var offerFound = false;
    var x = 0;
    while (offerFound === false && x < ofertasPreCargadas.length) {
        if (ofertasPreCargadas[x].id === pIdOferta) {
            offerFound = true;
            result = ofertasPreCargadas[x].endDate;
        }
        x++;
    }
    return result;
}


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// CONFIGURACION DE jQuery-UI datepickers
// ======================================



// Esta funcion construye y muestra todo el contenido de la nav bar
function construirNavBar() {
    var htmlSelector = "";
    var loginLogoutButton = "";
    var asignarBotonLogOut = false;

    var homeButton = "<button id='homeBtn'>Home</button>";

    // Si el usuario es noReg la navBar solo muestra el boton de para acceder a la pagina
    if (userNav.type === "noReg") {
        loginLogoutButton = "<button id='logInModeBtn'>Log in</button>";
        // Si el usuario es regUser o admin se asume que el usuario a ingresado a la pagina y se muestra la opcion para salir de la misma y el selector de modos de acuerdo a el tipo de usuario
    } else {
        asignarBotonLogOut = true;
        loginLogoutButton = "<button id='logOutBtn'>Log out</button>";

        htmlSelector += "<select id='modeSelector'>";
        if (userNav.type === "regUser") {
            htmlSelector += '<option value="ofertas">Ofertas</option>';
            htmlSelector += '<option value="favoritos">Favoritos</option>';
            htmlSelector += '<option value="estadoDeCuenta">Estado de cuenta</option>';
            htmlSelector += '<option value="reservasReg">Reservas</option>';
            htmlSelector += '<option value="administracion">Administracion</option>';
        }
        if (userNav.type === "admin") {
            htmlSelector += '<option value="ofertas">Ofertas</option>';
            htmlSelector += '<option value="editarOfertas">Editar Ofertas</option>';
            htmlSelector += '<option value="solicitudesUsuario">Solicitudes de usuario</option>';
            htmlSelector += '<option value="reservasAdmin">Confirmar reservas</option>';
            htmlSelector += '<option value="stats">Estadisticas</option>';
            htmlSelector += '<option value="administracion">Administracion</option>';
        }
        htmlSelector += "</select>";
    }

    $("#navBar").html(homeButton + loginLogoutButton + htmlSelector + "<br><hr>");
    $("#modeSelector").val(userNav.currentMode);
    $("#modeSelector").change(modeSelectorChanged);
    if (asignarBotonLogOut === true) {
        asignarBotones("logOutBtn");
    } else {
        asignarBotones("logInModeBtn");
    }
    asignarBotones("homeBtn");




}

function asignarBotones(pString) {
    switch (pString) {
        case "logOutBtn":
            $("#logOutBtn").click(logOutClicked);
            break;
        case "logInModeBtn":
            $("#logInModeBtn").click(logInModeClicked);
            break;
        case "logInBtn":
            $("#logInBtn").click(logInClicked);
            break;
        case "registerBtn":
            $("#registerBtn").click(registerClicked);
            break;
        case "homeBtn":
            $("#homeBtn").click(homeClicked);
            break;



        default:
            console.log("pString en asignarBotones incorrecto");
    }
}

function modeSelectorChanged() {
    console.log("interaccion con selector de modo detectada");
    var currentSelectorValue = $("#modeSelector").val();
    userNav.currentMode = currentSelectorValue;
    updateDisplay();
}

function homeClicked() {
    userNav.currentMode = "ofertas";
    updateDisplay();
}

// ======================
// SOLICITUDES DE USUARIO
// vvvvvvvvvvvvvvvvvvvvvv
function construirSolicitudesDeUsuario() {
    console.log("Administrador trata de ver solicitudes de usuario");
    var htmlBody = "";
    htmlBody += "<h1>Solicitudes De Usuario</h1>";

    htmlBody += "<table><tr><th>Nombre</th><th>Apellido</th><th>Email</th><th>Fecha de nacimiento</th><th>Estado</th><th>Aprobar</th><th>Rechazar</th></tr>";
    var botonAprobar = "";
    var botonRechazar = "";
    var htmlTableCells = "";
    for (var i = 0; i < usuariosPreCargados.length; i++) {
        botonAprobar = crearBotonAprobar(i);
        botonRechazar = crearBotonRechazar(i);
        htmlTableCells += "<tr><td>" + usuariosPreCargados[i].name + "</td><td>" + usuariosPreCargados[i].lastName + "</td><td>" + usuariosPreCargados[i].email + "</td><td>" + usuariosPreCargados[i].dateOfBirth.toDateString() + "</td><td>" + usuariosPreCargados[i].status + "</td><td>" + botonAprobar + "</td><td>" + botonRechazar + "</td></tr>";
    }
    htmlBody = htmlBody + htmlTableCells + "</table>";

    $("#mainDiv").html(htmlBody);


    //asigno los botones de aprobar y rechazar
    for (var x = 0; x < usuariosPreCargados.length; x++) {
        var botonAprobarId = "#aprobarBtn_" + x;
        var botonRechazarId = "#rechazarBtn_" + x;
        $(botonAprobarId).click({param1: x}, clickBotonAprobar);
        $(botonRechazarId).click({param1: x}, clickBotonRechazar);
    }
}

function crearBotonAprobar(pIndex) {
    var buttonId = "aprobarBtn_" + pIndex;
    var htmlButton = '<button id="' + buttonId + '">Aprobar</button>';
    return htmlButton;
}
function crearBotonRechazar(pIndex) {
    var buttonId = "rechazarBtn_" + pIndex;
    var htmlButton = '<button id="' + buttonId + '">Rechazar</button>';
    return htmlButton;
}

function clickBotonAprobar(event) {
    var posEnElArray = event.data.param1;
    console.log("Usuario hace click en aprobar a un objeto de la lista de usuarios en la posicion " + posEnElArray);
    usuariosPreCargados[posEnElArray].status = "habilitado";
    updateDisplay();
}

function clickBotonRechazar(event) {
    var posEnElArray = event.data.param1;
    console.log("Usuario hace click en rechazar a un objeto de la lista de usuarios en la posicion " + posEnElArray);
    usuariosPreCargados[posEnElArray].status = "rechazado";
    updateDisplay();
}

// ^^^^^^^^^^^^^^^^^^^^^^
// SOLICITUDES DE USUARIO
// ======================


// ======================
// RESERVAS ADMIN MODE
// vvvvvvvvvvvvvvvvvvvvvv

function construirReservasAdminMode() {
    console.log("Administrador trata de ver solicitudes de reserva");
    var htmlBody = "";
    htmlBody += "<h1>Solicitudes De Reserva</h1>";

    htmlBody += "<table><tr><th>Email</th><th>userId</th><th>Nombre de oferta</th><th>offerId</th><th>Estado</th><th>Aprobar</th><th>Rechazar</th></tr>";
    var botonAprobar = "";
    var botonRechazar = "";
    var htmlTableCells = "";
    for (var i = 0; i < reservasPreCargadas.length; i++) {
        var userEmail = usuariosPreCargados[getArrayIndexFromId(reservasPreCargadas[i].userId, usuariosPreCargados)].email;
        var offerDisplayName = ofertasPreCargadas[getArrayIndexFromId(reservasPreCargadas[i].offerId, ofertasPreCargadas)].displayName;

        botonAprobar = '<button onclick="aprobarReservaClicked(this)" data-reserveid="' + reservasPreCargadas[i].id + '">Aprobar</button>';
        botonRechazar = '<button onclick="rechazarReservaClicked(this)" data-reserveid="' + reservasPreCargadas[i].id + '">Rechazar</button>';
        htmlTableCells += "<tr><td>" + userEmail + "</td><td>" + reservasPreCargadas[i].userId + "</td><td>" + offerDisplayName + "</td><td>" + reservasPreCargadas[i].offerId + "</td><td>" + reservasPreCargadas[i].status + "</td><td>" + botonAprobar + "</td><td>" + botonRechazar + "</td></tr>";
    }
    htmlBody = htmlBody + htmlTableCells + "</table>";

    $("#mainDiv").html(htmlBody);
}

function aprobarReservaClicked(aprobarBtn) {
    var reserveId = parseInt(aprobarBtn.getAttribute("data-reserveid"));
    console.log("usuario administrador clickeo aprobar reserva: " + reserveId);

    var i = getArrayIndexFromId(reserveId, reservasPreCargadas);
    reservasPreCargadas[i].status = "aprobada";

    updateDisplay();
}

function rechazarReservaClicked(rechazarBtn) {
    var reserveId = parseInt(rechazarBtn.getAttribute("data-reserveid"));
    console.log("usuario administrador clickeo aprobar reserva: " + reserveId);

    var i = getArrayIndexFromId(reserveId, reservasPreCargadas);
    reservasPreCargadas[i].status = "desaprobada";

    updateDisplay();
}





// ^^^^^^^^^^^^^^^^^^^^^^
// RESERVAS ADMIN MODE
// ======================




// ======================
// LOG IN / OUT
// vvvvvvvvvvvvvvvvvvvvvv


function logInModeClicked() {
    console.log("User tried to log in");
    userNav.currentMode = "login";
    updateDisplay();
}


function logOutClicked() {
    console.log("User tried to log out");
    userNav.currentMode = "ofertas";
    userNav.type = "noReg";
    userNav.id = -1;
    updateDisplay();
}

//crea la pantalla para logearse o registrar un usuario nuevo
function construirLogInMode() {
    var htmlBody = "";
    var htmlCeldaLogIn = "";
    var htmlCeldaRegister = "";

    htmlCeldaLogIn += '<label>Email: </label><input id="emailLogInField" type="text"/>' + "<br>";
    htmlCeldaLogIn += '<label>Contraseña: </label><input id="passLogInField" type="password"/>' + "<br>";
    htmlCeldaLogIn += '<p id="logInParagraph"></p>';
    htmlCeldaLogIn += '<button id="logInBtn">Ingresar</button>';

    htmlCeldaRegister += '<label>Nombre: </label><input id="nameRegisterField" type="text"/>' + "<br>";
    htmlCeldaRegister += '<p id="registerParagraphName"></p>';
    htmlCeldaRegister += '<label>Apellido: </label><input id="lastNameRegisterField" type="text"/>' + "<br>";
    htmlCeldaRegister += '<p id="registerParagraphLastName"></p>';
    htmlCeldaRegister += '<label>Fecha De Nacimiento: </label><input id="dateOfBirthRegisterField" type="text"/>' + "<br>";
    htmlCeldaRegister += '<p id="registerParagraphFecha"></p>';
    htmlCeldaRegister += '<label>Email: </label><input id="emailRegisterField" type="text"/>' + "<br>";
    htmlCeldaRegister += '<p id="registerParagraphEmail"></p>';
    htmlCeldaRegister += '<label>Contraseña: </label><input id="passwordRegisterField" type="password"/>' + "<br>";
    htmlCeldaRegister += '<p id="registerParagraphContraseña"></p>';
    htmlCeldaRegister += '<label>Repetir Contraseña: </label><input id="passwordCheckRegisterField" type="password"/>' + "<br>";
    htmlCeldaRegister += '<p id="registerParagraphContraseñaRep"></p>';
    htmlCeldaRegister += '<button id="registerBtn">Registrarse</button>';

    htmlBody += "<table><tr><th>Ingresar</th><th>Registrarse</th></th>";
    htmlBody += "<tr><td>" + htmlCeldaLogIn + "</td><td>" + htmlCeldaRegister + "</td></tr></table>";

    $("#mainDiv").html(htmlBody);
    asignarBotones("logInBtn");
    asignarBotones("registerBtn");
}

// usuario ingresa nombre de usuario e contraseña y clickea en el boton de ingresar
// primero validamos que los datos ingresados cumplan los formatos apropiados (no textos vacíos, email de formato apropiado)
// si no pasa esas validaciones informamos al usuario
// si pasa esas validaciones checkeamos que el usuario esta en la "base de datos" y habilitado
// si no informamos al usuario
// si pasa este checkeo el usuario ingresa a la página
function logInClicked() {
    console.log("Validate login attempt");
    var inputEmail = $("#emailLogInField").val();
    var inputPass = $("#passLogInField").val();
    var msg = "";

    if (isValidEmailFormat(inputEmail)) {
        if (notEmptyString(inputPass)) {
            console.log("Validation successful");
            //msg = "Datos válidos.";
            // en este punto podemos checkear si el usuario está ingresado en el sistema
            var searchResult = userPassPairStatus(inputEmail, inputPass);
            switch (searchResult[0]) {
                case "habilitado":
                    console.log("Login successful");
                    logInReg(searchResult[1], searchResult[2]);
                    break;
                case "pendiente":
                    console.log("Login unsuccessful, user not yet enabled by admin");
                    msg = "Habilitación pendiente, espere unos minutos o contacte al administrador e intente nuevamente.";
                    break;
                case "rechazado":
                    console.log("Login unsuccessful, user has been rejected by admin");
                    msg = "Su petición de usuario ha sido rechazada por el administrador.";
                    break;
                case "userNotFound":
                    console.log("Login unsuccessful, user not registered");
                    msg = "Nombre de usuario (email) no encontrado, intente nuevamente.";
                    break;
                case "passwordIncorrect":
                    console.log("Login unsuccessful, incorrect password");
                    msg = "Contraseña incorrecta, intente nuevamente.";
                    break;
                default:
                    console.log("parametro de switch incorrecto en logInClicked");
            }
        } else {
            msg = "Contraseña inválida, el campo de contraseña no puede estar vacío, intente nuevamente.";
        }
    } else {
        msg = "Email inválido, las direcciones de email no pueden contener espacios y tienen que tener al menos un @, intente nuevamente.";
    }
    $("#logInParagraph").html(msg);
}

function userPassPairStatus(pEmail, pPass) {
    var result = ["userNotFound", -1, "regUser"];
    var userFound = false;

    // Primero buscamos si el usuario existe en la "base de datos"
    var arrayPos = 0;
    while (arrayPos < usuariosPreCargados.length && userFound === false) {
        if (usuariosPreCargados[arrayPos].email === pEmail) {
            userFound = true;
        } else {
            arrayPos++;
        }
    }

    // Si el usuario existe, checkeamos que la contraseña coincida
    if (userFound) {
        if (usuariosPreCargados[arrayPos].password === pPass) {
            // Si el usuario existe y la contraseña coincide, checkeamos cual es el estado del usuario
            switch (usuariosPreCargados[arrayPos].status) {
                case "habilitado":
                    result = ["habilitado", usuariosPreCargados[arrayPos].id, usuariosPreCargados[arrayPos].type]; // este es el unico resultado que permite al usuario logearse
                    break;
                case "pendiente":
                    result = ["pendiente", -1];
                    break;
                case "rechazado":
                    result = ["rechazado", -1];
                    break;
                default:
                    console.log("parametro de switch incorrecto en userPassPairStatus");
            }
        } else {
            result = ["passwordIncorrect", -1];
        }
    }
    return result;
}

function logInReg(pUserId, pUserType) {
    console.log("Registered user login");
    userNav.currentMode = "ofertas";
    userNav.type = pUserType;
    userNav.id = pUserId;
    updateDisplay();
}

// ^^^^^^^^^^^^^^^^^^^^^^
// LOG IN / OUT
// ======================


// ======================
// REGISTER
// vvvvvvvvvvvvvvvvvvvvvv

// para manejar todas estas validaciones independientes vamos a evaluarlas por separado, cada validacion 
// exitosa aumenta un contador, para considerar el ingreso aceptable el contador tiene que llegar a un numero minimo
	
function registerClicked() {
    console.log("Validate register attempt");
    var inputName = $("#nameRegisterField").val();
    var inputLastName = $("#lastNameRegisterField").val();
    var inputEmail = $("#emailRegisterField").val();
    var inputDateOfBirth = $("#dateOfBirthRegisterField").val();
    var inputPass = $("#passwordRegisterField").val();
    var inputPassRep = $("#passwordCheckRegisterField").val();

    var msgN = "";
    var msgL = "";
    var msgE = "";
    var msgD = "";
    var msgP = "";
    var msgPr = "";

    var validationSuccess = 0;

    // verificamos que el nombre ingresado no sea vacio
    if (notEmptyString(inputName)) {
        //EXITO
        validationSuccess++;
    } else {
        msgN = "Nombre inválido, el nombre no puede estar vacío, intente nuevamente.";
    }

    // verificamos que el apellido ingresado no sea vacio
    if (notEmptyString(inputLastName)) {
        //EXITO
        validationSuccess++;
    } else {
        msgL = "Apellido inválido, el apellido no puede estar vacío, intente nuevamente.";
    }

    // verificamos que el email sea valido y no esté previamente ingresado en el sistema
    if (notEmptyString(inputEmail)) {
        inputEmail = myTrim(inputEmail);
        if (isValidEmailFormat(inputEmail)) {
            var cont = 0;
            var emailFound = false;
            while (cont < usuariosPreCargados.length && emailFound === false) {
                if (usuariosPreCargados[cont].email === inputEmail) {
                    emailFound = true;
                }
                cont++;
            }
            if (emailFound) {
                msgE = "Email inválido, la direccion de email ingresada ya existe en el sistema, intente nuevamente con otra direccion de email.";
            } else {
                //EXITO
                validationSuccess++;
            }
        } else {
            msgE = "Email inválido, las direcciones de email no pueden contener espacios y tienen que tener al menos un @, intente nuevamente.";
        }
    } else {
        msgE = "Email inválido, no puede estar vacío, intente nuevamente.";
    }


    // verificamos que la fecha de nacimiento no sea vacia
    inputDateOfBirth = myTrim(inputDateOfBirth);
    if (notEmptyString(inputDateOfBirth)) {
        //EXITO
        validationSuccess++;
    } else {
        msgD = "Fecha de nacimiento inválida, la fecha de nacimiento no puede estar vacía, intente nuevamente.";
    }

    // verificamos que la contrasena no sea vacia
    inputPass = myTrim(inputPass);
    if (notEmptyString(inputPass)) {
        //EXITO
        validationSuccess++;
    } else {
        msgP = "Contraseña inválida, la contraseña no puede estar vacía, intente nuevamente.";
    }


    // verificamos que la confirmacion de la contraseña sea igual a la contraseña
    if (inputPass === inputPassRep) {
        //EXITO
        validationSuccess++;
    } else {
        msgP = "La repeticion de la contraseña no coincide con la contraseña ingresada, intente nuevamente.";
    }

    $("#registerParagraphName").html(msgN);
    $("#registerParagraphLastName").html(msgL);
    $("#registerParagraphEmail").html(msgE);
    $("#registerParagraphFecha").html(msgD);
    $("#registerParagraphContraseña").html(msgP);
    $("#registerParagraphContraseñaRep").html(msgPr);

    // usuario logra registrarse exitosamente en modo pendiente, se lo lleva a la pagina de inicio
    if (validationSuccess === 6) {
        console.log("New user registration validated");

        var _dateOfBirth = new Date();
        var _favorited = new Array();

        var usuario1 = {
            id: nuevoIdUnico(usuariosPreCargados),
            type: "regUser",
            status: "pendiente",
            name: inputName,
            lastName: inputLastName,
            email: inputEmail,
            dateOfBirth: _dateOfBirth,
            password: inputPass,
            favorited: _favorited};

        usuariosPreCargados.push(usuario1);

        userNav.currentMode = "ofertas";
        updateDisplay();
    }
}
// ^^^^^^^^^^^^^^^^^^^^^^
// REGISTER
// ======================

// ======================
// FAVORITOS
// VVVVVVVVVVVVVVVVVVVVVV
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
// ^^^^^^^^^^^^^^^^^^^^^^
// FAVORITOS
// ======================




// ======================
// RESERVAS
// VVVVVVVVVVVVVVVVVVVVVV

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

// ^^^^^^^^^^^^^^^^^^^^^^
// RESERVAS
// ======================
function mostrarOfertasPrecargadas() {    
    var ofertasNoDestacadas = cargarNoDestacados();
	var ofertasDestacadas = cargarDestacados();
	var tituloDestacadas = "<h3>Destacadas<h3>";
	var tituloNoDestacadas = "<h3>Ofertas<h3>";
    $("#mainDiv").html(tituloDestacadas + ofertasDestacadas + tituloNoDestacadas + ofertasNoDestacadas);
}

function getNoDestacados(){
	var arrayNoDestacados = new Array();
	$.each(ofertasPreCargadas, function( index, value ) {
		
		if (value.featured === -1 ){
			arrayNoDestacados.push(value);
		}
	});
	return arrayNoDestacados;
}

function cargarNoDestacados() {
	var arrayNoDestacados = getNoDestacados();
	var txtOfertas = "<div class='contenedorNoDestacados'>";
	$.each(arrayNoDestacados, function( index, value ) {
		txtOfertas += "<div class='oferta'>";
		txtOfertas += "<div class='imagenOferta'>";
        txtOfertas += "<img style='width:100px; height:100px;' src='" + value.imageUrl + "' >";
		txtOfertas += "</div>";
		
		txtOfertas += "<div class='ofertaInfo'>";
		txtOfertas += "<h4>" + value.displayName + "<h4>";
		txtOfertas += "<p>Tipo: " + value.housingType + "<p>";
		txtOfertas += "<p>Dirección: " + value.geoLocation + "<p>";
		var botonVerOferta = '<br><button onclick="verOferta(this)" data-offerid="' + value.id + '">Ver oferta</button>';
		txtOfertas += botonVerOferta;
		txtOfertas += "</div>";
		txtOfertas += "</div>";
	});
    txtOfertas += "</div>";
    return txtOfertas;
}	


function buildHtmlOfferFullSize(pOferta) {
    //la oferta es una tabla de 1 fila con 3 columnas 
    //en la columna 1 se mostrará la imagen asociada a la oferta
    //en la columna 2 hay una tabla anidada con 5 filas y 1 columna, se agrega en cada sub fila la informacion de texto 
    //en la columna 3 hay una tabla anidada con 2 filas y 1 columna, se agrega en cada subfila botones de reservar y favoritear

    var col_1 = '<img class="offerFullSizePicture" src="' + pOferta.imageUrl + '" height="200" width="200"/>';

    var displayName = pOferta.displayName;
    var displayLocation = pOferta.geoLocation;
    var displayDateStart = "Fecha inicio: " + pOferta.startDate.toDateString();
    var displayDateEnd = "Fecha fin: " + pOferta.endDate.toDateString();
    var displayPrice = "Precio por noche:" + pOferta.perNightPrice;
    var displayType = pOferta.housingType;


    var col_2 = '<table class="offerFullSizeInfo" width="500"><tr><td><h4>' + displayName + "</h4></td></tr><tr><td>" + displayLocation + "</td></tr><tr><td>" + displayDateStart + "</td></tr><tr><td>" + displayDateEnd + "</td></tr><tr><td>" + displayPrice + "</td></tr><tr><td>" + displayType + "</td></tr></table>";

    //si el usuatio es admin, no construir los botones de reserva y favorito
    var resButton = "";
    var favButton = "";
    var reservaAcordeon = "";
    if (userNav.type === "noReg" || userNav.type === "regUser") {
        var offerId = pOferta.id;
        // se agrega el id de oferta como parametro data-offerId al boton reserva y al boton favorito de cada oferta
        var idResDateInicio = "resDateInicio_" + offerId;
        //var valueDateInicioOferta = fechaFormatoDiaMesAnioConBarras(pOferta.startDate);
        var labelDe = "<label>Desde:</label>";
        var inputResInicio = '<input id="' + idResDateInicio + '"type="text" class="inputDate" placeholder="fecha de inicio"/>';
        var labelHasta = "<label>Hasta:</label>";
        var idResDateFin = "resDateFin_" + offerId;
        //var valueDateFinOferta = fechaFormatoDiaMesAnioConBarras(pOferta.endDate);
        var inputResFin = '<input id="' + idResDateFin + '"type="text" class="inputDate" placeholder="fecha de fin"/>';
        resButton = '<button onclick="reservaClicked(this)" data-offerid="' + offerId + '">Reserva</button>';
        var idResP = "paragraphReserva_" + offerId;
        var paragraphReserva = '<p id="' + idResP + '"></p>';
        var reservaAcordeon = '<div class="accordionDiv"><h3>Reservar</h3><div>' + labelDe + inputResInicio + labelHasta + inputResFin + resButton + paragraphReserva + '</div></div>';

        favButton = '<button onclick="favoritoClicked(this)" data-offerid="' + offerId + '">Marcar Favorito</button>';
    }

    //var col_3 = '<table class="offerFullSizeButtons" width="200"><tr><td>' + resButton + "</td></tr><tr><td>" + favButton + "</td></tr></table>";
    var col_3 = '<table class="offerFullSizeButtons" width="200"><tr><td>' + reservaAcordeon + "</td></tr><tr><td>" + favButton + "</td></tr></table>";

    var offerFullSize = "<div class='oferta'><table class='offerFullSize'><tr><td>" + col_1 + "</td><td>" + col_2 + "</td></tr><tr><td colspan=2>" + col_3 + "</td></tr></table></div>";
    return offerFullSize;
}
