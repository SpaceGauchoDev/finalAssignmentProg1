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
    // el primer parametro es la probabilidad de reserva que tiene cada usuario pre cargado, -1 para ninguna reserva autogenerada
    // el segundo parametro es la probabilidad de favoriteo para ofertas no reservadas que tiene cada usuario pre cargado, -1 para ninguna favorito autogenerado
    construirYAgregarReservasPreCargadas(80, 60);

    mostrarTop5();
    construirUsuarioParaNavegacion(0, "ofertas");
    updateDisplay('full');
}

function construirUsuarioParaNavegacion(pSetting, pMode) {
    switch (pSetting) {
        case 0:
            // for live version
            userNav = {
                type: "noReg", // puede ser: "noReg", "regUser", "admin"
                currentMode: "ofertas", // para regUser puede ser: "ofertas", "favoritos", "estadoDeCuenta", "reservasReg", "administracion"
                // para admin puede ser: "ofertas", "editarOfertas", "solicitudesUsuario", "reservasAdmin", "stats", "administracion", "ordenDestacados", "ofertasAdmin"
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

function updateDisplay(pString) {
    if (pString === "full") {
        construirNavBar();
        switch (userNav.currentMode) {
            case "login":
                console.log("display: login");
                construirLogInMode();
                break;
            case "ofertas":
                console.log("display: ofertas");
                //construirNavBar();
                mostrarOfertasPrecargadas();
                break;
            case "detalleOferta":
                console.log("detalle oferta");
                //construirNavBar();
                mostrarDetalleOferta();
                break;
            case "favoritos":
                console.log("display: favoritos");
                construirVerFavoritas();
                break;
            case "estadoDeCuenta":
                console.log("display: estadoDeCuenta");
                construirEstadoCuenta();
                break;
            case "reservasReg":
                console.log("display: reservasReg");
                construirReservasReg();
                break;
            case "administracion":
                console.log("display: administracion");
                construirAdministracion();
                break;
            case "editarOfertas":
                console.log("display: editarOfertas");
                //construirNavBar();
                construirEditarOfertas();
                break;
            case "solicitudesUsuario":
                console.log("display: solicitudesUsuario");
                //construirNavBar();
                construirSolicitudesDeUsuario();
                break;
            case "ordenDestacados":
                console.log("display: ordenDestacados");
                //construirNavBar();
                construirEditarOrdenDestacados();
                break;
            case "reservasAdmin":
                console.log("display: reservasAdmin");
                //construirNavBar();
                construirReservasAdminMode();
                break;
            case "ofertasAdmin":
                console.log("display: ofertasAdmin");
                //construirNavBar();
                construirAdministracionDeEstadoDeOfertas(); // habilitada, deshabilitada
                break;
            case "stats":
                console.log("display: stats");
                construirEstadisticas();

                break;
            default :
                console.log("currentMode para updateDisplay incorrecto");
        }
    }

    // inicializacion y settings de jquery-ui
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    if (pString === 'full' || pString === 'ui') {
        $(".accordionDiv").accordion({
            collapsible: true,
            active: false
        });
        $(".inputDate").datepicker({
            dateFormat: 'dd/mm/yy'
        });

        $("input[type='radio']").checkboxradio({icon: false});
        $("input[type='checkbox']").checkboxradio();

        $(".widget button").button();

        if (userNav.currentMode !== "editarOfertas") {
            restringirFechasSeleccionables();
        } else {
            soloFechasFuturas();
        }
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
            htmlSelector += '<option value="ordenDestacados">Editar orden de destacados</option>';
            htmlSelector += '<option value="solicitudesUsuario">Solicitudes de usuario</option>';
            htmlSelector += '<option value="reservasAdmin">Confirmar reservas</option>';
            htmlSelector += '<option value="ofertasAdmin">Confirmar ofertas</option>';
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
    updateDisplay("full");
}

function homeClicked() {
    userNav.currentMode = "ofertas";
    updateDisplay("full");
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
        htmlTableCells += "<tr><td>" + usuariosPreCargados[i].name + "</td><td>" + usuariosPreCargados[i].lastName + "</td><td>" + usuariosPreCargados[i].email + "</td><td>" + usuariosPreCargados[i].edad + "</td><td>" + usuariosPreCargados[i].status + "</td><td>" + botonAprobar + "</td><td>" + botonRechazar + "</td></tr>";
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
    updateDisplay('full');
}

function clickBotonRechazar(event) {
    var posEnElArray = event.data.param1;
    console.log("Usuario hace click en rechazar a un objeto de la lista de usuarios en la posicion " + posEnElArray);
    usuariosPreCargados[posEnElArray].status = "rechazado";
    updateDisplay('full');
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

    updateDisplay('full');
}

function rechazarReservaClicked(rechazarBtn) {
    var reserveId = parseInt(rechazarBtn.getAttribute("data-reserveid"));
    console.log("usuario administrador clickeo aprobar reserva: " + reserveId);

    var i = getArrayIndexFromId(reserveId, reservasPreCargadas);
    reservasPreCargadas[i].status = "desaprobada";

    updateDisplay('full');
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
    updateDisplay('full');
}


function logOutClicked() {
    console.log("User tried to log out");
    userNav.currentMode = "ofertas";
    userNav.type = "noReg";
    userNav.id = -1;
    updateDisplay('full');
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
    htmlCeldaRegister += '<label>Edad: </label><input id="edadRegisterField" type="text"/>' + "<br>";
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
    updateDisplay('full');
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
    var inputEdad = $("#edadRegisterField").val();
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


    // verificamos de la fecha de nacimiento
    inputEdad = myTrim(inputEdad);
    if (notEmptyString(inputEdad)) {
        if (isNumber(inputEdad)) {
            inputEdad = makeInt(inputEdad);
            if (inputEdad >= 0 && inputEdad < 130) {
                //EXITO
                validationSuccess++;
            } else {
                msgD = "Edad, la edad solo puede ser un valor entre 0 y 130.";
            }
        } else {
            msgD = "Edad, la edad solo puede ser numerica.";
        }
    } else {
        msgD = "Edad, la edad no puede estar vacía, intente nuevamente.";
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
        msgPr = "La repeticion de la contraseña no coincide con la contraseña ingresada, intente nuevamente.";
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

        var _edad = new Date();
        var _favorited = new Array();

        var usuario1 = {
            id: nuevoIdUnico(usuariosPreCargados),
            type: "regUser",
            status: "pendiente",
            name: inputName,
            lastName: inputLastName,
            email: inputEmail,
            edad: _edad,
            password: inputPass,
            favorited: _favorited};

        usuariosPreCargados.push(usuario1);

        userNav.currentMode = "ofertas";
        updateDisplay('full');
    }
}
// ^^^^^^^^^^^^^^^^^^^^^^
// REGISTER
// ======================

// ======================
// FAVORITOS
// VVVVVVVVVVVVVVVVVVVVVV
function unFavoriteClicked(favoritoBtn) {
    var offerId = parseInt(favoritoBtn.getAttribute("data-offerid"));
    console.log("usuario clickeo quitar de favoritos oferta: " + offerId);
    removeFromUserFavoritesList(userNav.id, offerId);
    updateDisplay('full');
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

function removeExpiredOffersFromUserFavoritedList(pUserId) {
    var userIndexPos = getArrayIndexFromId(pUserId, usuariosPreCargados);
    var oldUserFavoritedArray = usuariosPreCargados[userIndexPos].favorited;
    var newUserFavoritedArray = new Array();
    var currentDate = new Date();

    for (var i = 0; i < oldUserFavoritedArray.length; i++) {
        //checkeo si las ofertas en el array de favoritos viejos, no estan expiradas
        var offerIndexPos = getArrayIndexFromId(oldUserFavoritedArray[i], ofertasPreCargadas);
        var offerEndDate = ofertasPreCargadas[offerIndexPos].endDate;
        if (currentDate < offerEndDate) {
            newUserFavoritedArray.push(oldUserFavoritedArray[i]);
        } else {
            console.log("oferta retirada por expirada");
        }
    }
    usuariosPreCargados[userIndexPos].favorited = newUserFavoritedArray;
}

function removeFromUserFavoritesList(pUserId, pOfferId) {
    var userIndexPos = getArrayIndexFromId(pUserId, usuariosPreCargados);
    var oldUserFavoritedArray = usuariosPreCargados[userIndexPos].favorited;
    var newUserFavoritedArray = new Array();

    for (var i = 0; i < oldUserFavoritedArray.length; i++) {
        if (oldUserFavoritedArray[i] !== pOfferId) {
            newUserFavoritedArray.push(oldUserFavoritedArray[i]);
        }
    }

    usuariosPreCargados[userIndexPos].favorited = newUserFavoritedArray;
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


function construirVerFavoritas() {
    removeExpiredOffersFromUserFavoritedList(userNav.id);
    var ofertasFavoritas = cargarFavoritas();
    $("#mainDiv").html(ofertasFavoritas);
}

function cargarFavoritas() {
    var arrayFavoritas = getFavoritas();

    var txtOfertas = "<h3>Favoritas<h3><div class='contenedorFavoritas'>";
    $.each(arrayFavoritas, function (index, value) {
        txtOfertas += "<div class='oferta'>";
        txtOfertas += "<div class='imagenOferta'>";
        txtOfertas += "<img style='width:100px; height:100px;' src='" + value.imageUrl + "' >";
        txtOfertas += "</div>";

        txtOfertas += "<div class='ofertaInfo'>";
        txtOfertas += "<h4>" + value.displayName + "<h4>";
        txtOfertas += "<p>Tipo: " + value.housingType + "<p>";
        txtOfertas += "<p>Dirección: " + value.geoLocation + "<p>";

        // muestra el boton de favorito si el usuario no es administrador, puede ser un checkeo redundante
        // ya que administrador y usuarios no registrados no pueden acceder a este modo 
        var botonDesFavoritear = "";
        if (userNav.type !== 'admin') {
            botonDesFavoritear = '<br><button onclick="unFavoriteClicked(this)" data-offerid="' + value.id + '">Quitar De Favoritos</button>';
        }

        var botonVerOferta = '<br><button onclick="verOferta(this)" data-offerid="' + value.id + '">Ver oferta</button>';
        txtOfertas += botonDesFavoritear + botonVerOferta;
        txtOfertas += "</div>";
        txtOfertas += "</div>";
    });
    txtOfertas += "</div>";
    return txtOfertas;
}

function getFavoritas() {
    // creamos un array donde guardaremos los objetos ofertas favoritas del usuario actual
    var arrayOfertasFavoritas = new Array();

    // consegimos el index pos del usuario actual en el array de usuarios
    var userIndexPos = getArrayIndexFromId(userNav.id, usuariosPreCargados);

    // consegimos su array de ids de ofertas favoriteadas
    var userFavoritedOfferIdArray = usuariosPreCargados[userIndexPos].favorited;

    // recorremos todos los ids de ofertas favoriteadas para agregarlas al array de ofertas favoritas
    for (i = 0; i < userFavoritedOfferIdArray.length; i++) {
        var ofertaIndexPos = getArrayIndexFromId(userFavoritedOfferIdArray[i], ofertasPreCargadas);
        arrayOfertasFavoritas.push(ofertasPreCargadas[ofertaIndexPos]);
    }

    // devolvemos el array con objetos de ofertas favoritas
    return arrayOfertasFavoritas;
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

function getNoDestacados() {
    var arrayNoDestacados = new Array();
    $.each(ofertasPreCargadas, function (index, value) {

        if (value.featured === -1) {
            arrayNoDestacados.push(value);
        }
    });
    return arrayNoDestacados;
}

function cargarNoDestacados() {
    var arrayNoDestacados = getNoDestacados();
    var txtOfertas = "<div class='contenedorNoDestacados'>";
    $.each(arrayNoDestacados, function (index, value) {
        txtOfertas += "<div class='oferta'>";
        txtOfertas += "<div class='imagenOferta'>";
        txtOfertas += "<img style='width:100px; height:100px;' src='" + value.imageUrl + "' >";
        txtOfertas += "</div>";

        txtOfertas += "<div class='ofertaInfo'>";
        txtOfertas += "<h4>" + value.displayName + "<h4>";
        txtOfertas += "<p>Tipo: " + value.housingType + "<p>";
        txtOfertas += "<p>Dirección: " + value.geoLocation + "<p>";
        // muestra el id de oferta si el usuario es administrador para ayudar a buscar editar ofertas especificas
        if (userNav.type === 'admin') {
            txtOfertas += "<p>ID: " + value.id + "<p>";
        }

        // muestra el boton de favorito si el usuario no es administrador
        var botonFavoritear = "";
        if (userNav.type !== 'admin') {
            botonFavoritear = '<br><button onclick="favoritoClicked(this)" data-offerid="' + value.id + '">Favorito</button>';
        }
        var botonVerOferta = '<br><button onclick="verOferta(this)" data-offerid="' + value.id + '">Ver oferta</button>';
        txtOfertas += botonFavoritear + botonVerOferta;
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



// ================
// ESTADO DE CUENTA
// vvvvvvvvvvvvvvvv
function construirEstadoCuenta() {
    console.log("Usuario registrado trata de ver su estado de cuenta");
    var arrayDeReservasAprobadas = getReservasDeUsuarioActual("aprobada");

    var totalesAcumulados = 0;

    var title = "<h1>Estado De Cuenta</h1>";
    var tableStart = "<table><tr><th>Nombre De Oferta</th><th>Inicio De Reserva</th><th>Fin De Reserva</th><th>ID de reserva</th><th>Precio</th></tr>";
    var tableBody = "";

    for (var i = 0; i < arrayDeReservasAprobadas.length; i++) {
        var ofertaIndexPos = getArrayIndexFromId(arrayDeReservasAprobadas[i].offerId, ofertasPreCargadas);
        var nombreDeOferta = ofertasPreCargadas[ofertaIndexPos].displayName;

        tableBody += "<tr>";
        tableBody += "<td>" + nombreDeOferta + "</td>";
        tableBody += "<td>" + arrayDeReservasAprobadas[i].startDate.toDateString() + "</td>";
        tableBody += "<td>" + arrayDeReservasAprobadas[i].endDate.toDateString() + "</td>";
        tableBody += "<td>" + arrayDeReservasAprobadas[i].id + "</td>";
        tableBody += "<td>" + arrayDeReservasAprobadas[i].totalPrice + "</td>";
        tableBody += "</tr>";
        totalesAcumulados += arrayDeReservasAprobadas[i].totalPrice;
    }

    var tableEnd = '<tr><td></td><td></td><td></td><td>Total: </td><td>' + totalesAcumulados + '</td></tr></table>';

    var fullHtml = '<div id="divEstadoDeCuenta">' + title + tableStart + tableBody + tableEnd + '</div>';
    $("#mainDiv").html(fullHtml);
}

function getReservasDeUsuarioActual(pStatus) {
    // creamos un array donde guardaremos los objetos reservas del usuario actual
    var arrayDeReservas = new Array();
    var userId = userNav.id;
    for (var i = 0; i < reservasPreCargadas.length; i++) {
        // encontramos las reservas hechas por el usuario
        if (reservasPreCargadas[i].userId === userId) {
            if (pStatus === "todas") {
                // guardamos todas las reservas por el usuario                
                arrayDeReservas.push(reservasPreCargadas[i]);
            } else {
                if (reservasPreCargadas[i].status === pStatus) {
                    // solo guardamos las reservas del usuario cuyo status coincida con pStatus
                    arrayDeReservas.push(reservasPreCargadas[i]);
                }
            }
        }
    }
    // devolvemos el array con objetos reservas
    return arrayDeReservas;
}

// ^^^^^^^^^^^^^^^^
// ESTADO DE CUENTA
// ================


// ================
// ESTADISTICAS
// vvvvvvvvvvvvvvvv
function construirEstadisticas() {
    console.log("Usuario administrador trata de ver estadisticas");
    var estadisticasGeneralesHTML = estadisticasGenerales();


    var fullHtml = '<div id="divEstadisticas"><div id="divGenerales">' + estadisticasGeneralesHTML + '</div> <div id="divParticulares"></div></div>';

    $("#mainDiv").html(fullHtml);
    estadisticasParticulares(-1);
}

function estadisticasGenerales() {
    var titleGen = "<h3>Estadisticas Generales</h3>";

    var tableStartGen = "<table><tr><th>Estado De Reserva</th><th>Cantidad De Reservas</th><th>Monto Total</th></tr>";

    var cantidadReservasAprobadas = 0;
    var cantidadReservasPendientes = 0;
    var cantidadReservasDesaprobadas = 0;

    for (var i = 0; i < reservasPreCargadas.length; i++) {
        switch (reservasPreCargadas[i].status) {
            case "aprobada":
                cantidadReservasAprobadas++;
                break;
            case "pendiente":
                cantidadReservasPendientes++;
                break;
            case "desaprobada":
                cantidadReservasDesaprobadas++;
                break;
            default :
                console.log("error en primer switch de construirEstadisticas()");
        }
    }

    var montoTotalReservasAprobadas = 0;
    var montoTotalReservasPendientes = 0;
    var montoTotalReservasDesaprobadas = 0;

    for (var i = 0; i < reservasPreCargadas.length; i++) {
        switch (reservasPreCargadas[i].status) {
            case "aprobada":
                montoTotalReservasAprobadas += reservasPreCargadas[i].totalPrice;
                break;
            case "pendiente":
                montoTotalReservasPendientes += reservasPreCargadas[i].totalPrice;
                break;
            case "desaprobada":
                montoTotalReservasDesaprobadas += reservasPreCargadas[i].totalPrice;
                break;
            default :
                console.log("error en segundo switch de construirEstadisticas()");
        }
    }

    var filaAprobadas = '<tr><td>Aprobadas</td><td>' + cantidadReservasAprobadas + '</td><td>' + montoTotalReservasAprobadas + '</td></tr>';
    var filaPendientes = '<tr><td>Pendientes</td><td>' + cantidadReservasPendientes + '</td><td>' + montoTotalReservasPendientes + '</td></tr>';
    var filaDesaprobadas = '<tr><td>Rechazadas</td><td>' + cantidadReservasDesaprobadas + '</td><td>' + montoTotalReservasDesaprobadas + '</td></tr>';

    var fullHTML = titleGen + tableStartGen + filaAprobadas + filaPendientes + filaDesaprobadas + '</table>';

    return fullHTML;
}

function estadisticasParticulares(pOfferId) {
    var fullHTML = "";
    var titlePart = "<h3>Estadisticas Particulares</h3>";

    var buscarOfertaBtn = '<button onclick="buscarOfertaParaEstadisticasClicked()">Buscar Oferta</button><br>';
    var buscarOfertaInput = '<label for="buscarOfertaStat" >Ingrese ID de oferta: </label><input id="buscarOfertaStat" type="text"/>' + "<br>";
    ;
    var tableStartPart = "<table><tr><th>ID de Usuario</th><th>Fecha</th></tr>";
    var filas = "<tr><td>0</td><td>0</td></tr>";
    var messageToUserP = '<div id="messageToUserStat"></div>';

    if (pOfferId !== -1) {
        var arrayDeReservasAprobadasPorOferta = getReservasPorOferta(pOfferId, "aprobada");
        // sortArrayHere

        arrayDeReservasAprobadasPorOferta.sort(function (a, b) {
            a = new Date(a.startDate);
            b = new Date(b.startDate);
            return a > b ? 1 : a < b ? -1 : 0;
        });


        filas = "";
        for (var i = 0; i < arrayDeReservasAprobadasPorOferta.length; i++) {
            filas += '<tr><td>' + arrayDeReservasAprobadasPorOferta[i].userId + '</td><td>' + arrayDeReservasAprobadasPorOferta[i].startDate.toDateString() + '</td></tr>';
        }
    }

    var tableEndPart = '</table>';
    fullHTML = titlePart + buscarOfertaInput + buscarOfertaBtn + tableStartPart + filas + tableEndPart + messageToUserP;
    $("#divParticulares").html(fullHTML);
}

function getReservasPorOferta(pOfferId, pStatus) {
    // creamos un array donde guardaremos los objetos reservas del usuario actual
    var arrayDeReservas = new Array();
    for (var i = 0; i < reservasPreCargadas.length; i++) {
        // encontramos las reservas hechas por el usuario
        if (reservasPreCargadas[i].offerId === pOfferId) {
            if (pStatus === "todas") {
                // guardamos todas las reservas por el usuario
                arrayDeReservas.push(reservasPreCargadas[i]);
            } else {
                if (reservasPreCargadas[i].status === pStatus) {
                    // solo guardamos las reservas del usuario cuyo status coincida con pStatus
                    arrayDeReservas.push(reservasPreCargadas[i]);
                }
            }
        }
    }
    // devolvemos el array con objetos reservas
    return arrayDeReservas;
}


function buscarOfertaParaEstadisticasClicked() {
    var searchResult = validarBusquedaIDStats();
    if (searchResult[0] === true) {
        estadisticasParticulares(searchResult[2]);
    } else {
        estadisticasParticulares(-1);
    }
    $("#messageToUserStat").html('<p>' + searchResult[1] + '</p>');
}

function validarBusquedaIDStats() {
    var ofertaIdInput = $("#buscarOfertaStat").val();
    var result = false;
    var msg = "";
    if (notEmptyString(ofertaIdInput)) {
        if (isNumber(ofertaIdInput)) {
            ofertaIdInput = makeInt(ofertaIdInput);
            if (ofertaIdInput > 0) {
                var offerIndexPos = getArrayIndexFromId(ofertaIdInput, ofertasPreCargadas);
                if (offerIndexPos === -1) {
                    msg = "Busqueda sin exito, revise el id de oferta e intente nuevamente.";
                    //console.log("Oferta no encontrada.");
                } else {
                    msg = "Busqueda exitosa, oferta encontrada.";
                    result = true;
                }
            } else {
                msg = "Busqueda sin exito, los id de oferta son valores numericos positivos.";
                //console.log("Es un numero negativo.");
            }
        } else {
            msg = "Busqueda sin exito, los id de oferta son valores numericos positivos.";
            //console.log("No es un numero.");
        }
    } else {
        msg = "Busqueda sin exito, el campo de id de oferta no puede estar vacío.";
        //console.log("Esta vacio.");
    }
    var resultArray = new Array(result, msg, ofertaIdInput);

    return resultArray;
}

// ^^^^^^^^^^^^^^^^
// ESTADISTICAS
// ================




function mostrarTop5() {
    console.log("mostrarTop5");

    console.log(ofertasPreCargadas);
    var arrayTop5 = getTop5();
    var txtOferta = "<ul>";

    $.each(arrayTop5, function (index, value) {
        var oferta = getOferta(value);
        console.log("OFERTA: " + oferta);
        txtOferta += "<li>";
        txtOferta += "<img style='width:150px; height:150px;' src='" + oferta.imageUrl + "' >";

        var botonVerOferta = '<br><button onclick="verOferta(this)" data-offerid="' + oferta.id + '">Ver oferta</button>';

        txtOferta += botonVerOferta;
        txtOferta += "</li>";
    });
    txtOferta += "</ul>";
    $("#contenedorTop5").html(txtOferta);
}

function verOferta(btn) {
    var offerId = parseInt(btn.getAttribute("data-offerid"));
    console.log("OFERTA ID: " + offerId);
    mostrarDetalleOferta(offerId);

}




function mostrarDetalleOferta(id) {
    var oferta = getOferta(id);
    var htmlOferta = buildHtmlOfferFullSize(oferta);
    $("#mainDiv").html(htmlOferta);
    $(".inputDate").datepicker({dateFormat: 'dd/mm/yy'});
    updateDisplay('ui');
}



function getDestacados() {
    console.log("getDestacados");
    var arrayDestacados = new Array();
    $.each(ofertasPreCargadas, function (index, value) {

        if (value.featured > -1) {
            arrayDestacados.push(value);
        }
    });
    console.log("-----> arrayDestacados");
    console.log(arrayDestacados);
    return arrayDestacados;
}

function getTop5() {
    var arrayIndexTop5 = {};
    var arrayTop5byNumber = new Array();

    for (var i = 0; i < reservasPreCargadas.length; i++) {
        var oferta = Number(reservasPreCargadas[i].offerId);
        if (arrayIndexTop5[String(oferta)] == undefined) {
            arrayIndexTop5[String(oferta)] = 1;
        } else {
            arrayIndexTop5[String(oferta)] = arrayIndexTop5[oferta] + 1;
        }
    }
    for (var i = 0; i < 5; i++) {
        var aux = getHighestFromArray(arrayIndexTop5);
        arrayTop5byNumber.push(aux);
        delete arrayIndexTop5[aux];
    }
    return arrayTop5byNumber;
}

function getHighestFromArray(arr) {
    var highest = -1;
    var highestPosition = -1;

    $.each(arr, function (index, value) {
        if (value > highest) {
            highest = value;
            highestPosition = index;
        }
    });
    return highestPosition;
}

function getOferta(idOferta) {
    var oferta = {};

    $.each(ofertasPreCargadas, function (index, value) {

        if (value.id == idOferta) {
            oferta = value;
            //console.log(value.id);
        }
    });
    return oferta;
}

function cargarDestacados() {
    console.log("cargarDestacados");

    console.log(ofertasPreCargadas);
    var arrayDestacados = getDestacados();

    arrayDestacados = sortDestacados(arrayDestacados);

    var txtOferta = "<div class='contenedorDestacados'>";

    $.each(arrayDestacados, function (index, value) {

        txtOferta += "<div class='oferta'>";
        txtOferta += "<div class='imagenOferta'>";
        txtOferta += "<img style='width:100px; height:100px;' src='" + value.imageUrl + "' >";
        txtOferta += "</div>";

        txtOferta += "<div class='ofertaInfo'>";
        txtOferta += "<h4>" + value.displayName + "<h4>";
        txtOferta += "<p>Tipo: " + value.housingType + "<p>";
        txtOferta += "<p>Dirección: " + value.geoLocation + "<p>";
        // muestra el id de oferta si el usuario es administrador para ayudar a buscar editar ofertas especificas
        if (userNav.type === 'admin') {
            txtOferta += "<p>ID: " + value.id + "<p>";
        }
        // muestra el boton de favorito si el usuario no es administrador
        var botonFavoritear = "";
        if(userNav.type !== 'admin'){
            botonFavoritear = '<br><button onclick="favoritoClicked(this)" data-offerid="' + value.id + '">Favorito</button>';
        }
        
        // si estamos en modo ordenar destacados agrega botones de flechas
        var botonesFlechas = "";
        if (userNav.currentMode === 'ordenDestacados') {
            botonesFlechas += '<br><button onclick="destacadoToTop(this)" data-offerid="' + value.id + '">⇈</button>';
            botonesFlechas += '<button onclick="destacadoSube(this)" data-offerid="' + value.id + '">↑</button>';
            botonesFlechas += '<button onclick="destacadoBaja(this)" data-offerid="' + value.id + '">↓</button>';            
            botonesFlechas += '<button onclick="destacadoToBot(this)" data-offerid="' + value.id + '">⇊</button>';
        }
        
        var botonVerOferta = '<br><button onclick="verOferta(this)" data-offerid="' + value.id + '">Ver oferta</button>';
        //txtOferta += "<h4><a href='javascript;' onclick='verOferta(this)' data-reserveid='4'>" + oferta.displayName + "</a></h4>";
        txtOferta += botonFavoritear + botonVerOferta + botonesFlechas;
        txtOferta += "</div>";
        txtOferta += "</div>";
    });
    txtOferta += "</div>";
    return txtOferta;
}




function sortDestacados(arr) {
    arr.sort(sortOfers);
    return arr;
}

// esto devolvia de mayor a menor
/*
function sortOfers(pA, pB) {
    var order = 0;
    if (pA.featured > pB.featured) {
        order = -1;
    }
    if (pA.featured < pB.featured) {
        order = 1;
    }
    return order;
}
*/

// esto devuelve de menor a mayor
function sortOfers(pA, pB) {
    var order = 0;
    if (pA.featured < pB.featured) {
        order = -1;
    }
    if (pA.featured > pB.featured) {
        order = 1;
    }
    return order;
}


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
    // creamos un array donde guardaremos los objetos ofertas reservadas del usuario actual
    var arrayOfertasReservadas = new Array();
    var userId = userNav.id;
    for (var i = 0; i < reservasPreCargadas.length; i++) {
        // encontramos las reservas hechas por el usuario
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
