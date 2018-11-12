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


var userNav;
function construirUsuarioParaNavegacion() {
    userNav = {
        type: "noReg", // puede ser: "noReg", "regUser", "admin"
        currentMode: "ofertas" // para regUser puede ser: "ofertas", "favoritos", "estadoDeCuenta", "reservasReg", "administracion"
                // para admin puede ser: "ofertas", "editarOfertas", "solicitudesUsuario", "reservasAdmin", "stats", "administracion"
                // para noReg puede ser: "ofertas", "login"
    };
}



function updateDisplay() {
    switch (userNav.currentMode) {
        case "login":
            console.log("display: login");
            construirNavBar();
            construirLogIn();
            break;
        case "ofertas":
            console.log("display: ofertas");
            construirNavBar();
            mostrarOfertasPrecargadas();
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
            break;
        case "solicitudesUsuario":
            console.log("display: solicitudesUsuario");
            construirNavBar();
            construirSolicitudesDeUsuario();
            break;
        case "reservasAdmin":
            console.log("display: reservasAdmin");
            break;
        case "stats":
            console.log("display: stats");
            break;
        default :
            console.log("currentMode para updateDisplay incorrecto");
    }
}

// Esta funcion construye y muestra todo el contenido de la nav bar
function construirNavBar() {
    var htmlSelector = "";
    var loginLogoutButton = "";
    var asignarBotonLogOut = false;

    var homeButton = "<button id='homeBtn'>Home</button>";

    // Si el usuario es noReg la navBar solo muestra el boton de para acceder a la pagina
    if (userNav.type === "noReg") {
        loginLogoutButton = "<button id='logInBtn'>Log in</button>";
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
        asignarBotones("logInBtn");
    }
    asignarBotones("homeBtn");
}

function asignarBotones(pString) {
    switch (pString) {
        case "logOutBtn":
            $("#logOutBtn").click(logOutClicked);
            break;
        case "logInBtn":
            $("#logInBtn").click(logInClicked);
            break;
        case "fakeLoginReg":
            $("#fakeLoginReg").click(logInReg);
            break;
        case "fakeLoginAdmin":
            $("#fakeLoginAdmin").click(logInAdmin);
            break;
        case "homeBtn":
            $("#homeBtn").click(homeClicked);
            break;

        default:
            console.log("pString en asignarBotones incorrecto");
    }
}

function modeSelectorChanged(){
    console.log("interaccion con selector de modo detectada");
    var currentSelectorValue = $("#modeSelector").val();
     userNav.currentMode = currentSelectorValue;
     updateDisplay();
}

function homeClicked() {
    userNav.currentMode = "ofertas";
    updateDisplay();
}

function logInClicked() {
    console.log("User tried to log in");
    userNav.currentMode = "login";
    updateDisplay();
}

function logOutClicked() {
    console.log("User tried to log out");
    userNav.currentMode = "ofertas";
    userNav.type = "noReg";
    updateDisplay();
}

function construirSolicitudesDeUsuario() {
    console.log("Administrador trata de ver solicitudes de usuario");
    var htmlBody = "";
    htmlBody += "<h1>Solicitudes De Usuario</h1>";
    
    htmlBody += "<table><tr><th>Nombre</th><th>Apellido</th><th>Email</th><th>Fecha de nacimiento</th><th>Estado</th><th>Aprobar</th><th>Rechazar</th></tr>";
    //htmlBody += "<table><tr><th>Nombre</th><th>Apellido</th><th>Email</th><th>Fecha de nacimiento</th></tr>";
    var botonAprobar = "<button>Aprobar</button>";
    var botonRechazar = "<button>Rechazar</button>";
    var htmlTableCells = "";
    //el for empieza en 1 para evitar mostrar el usuario admin
    for (var i = 1; i < usuariosPreCargados.length; i++){
        htmlTableCells += "<tr><td>"+usuariosPreCargados[i].name+"</td><td>"+usuariosPreCargados[i].lastName+"</td><td>"+usuariosPreCargados[i].email+"</td><td>"+usuariosPreCargados[i].dateOfBirth.toDateString()+"</td><td>"+ usuariosPreCargados[i].status+"</td><td>"+botonAprobar+"</td><td>"+botonRechazar+"</td></tr>";
        //htmlTableCells += "<tr><td>"+usuariosPreCargados[i].name+"</td><td>"+usuariosPreCargados[i].lastName+"</td><td>"+usuariosPreCargados[i].email+"</td><td>"+usuariosPreCargados[i].dateOfBirth.toDateString()+"</td></tr>";
    }
    htmlBody = htmlBody +  htmlTableCells + "</table>";
    
    $("#mainDiv").html(htmlBody);
}

function construirLogIn() {
    var htmlBody = "";
    htmlBody += "<button id='fakeLoginReg'>Reg user log in</button>";
    htmlBody += "<button id='fakeLoginAdmin'>Admin user log in</button>";
    $("#mainDiv").html(htmlBody);
    asignarBotones("fakeLoginReg");
    asignarBotones("fakeLoginAdmin");
}

function logInReg() {
    console.log("Registered user login");
    userNav.currentMode = "ofertas";
    userNav.type = "regUser";
    updateDisplay();
}

function logInAdmin() {
    console.log("Admin user login");
    userNav.currentMode = "ofertas";
    userNav.type = "admin";
    updateDisplay();
}




function mostrarOfertasPrecargadas() {
    //si es la primera vez que se muestra la pagina de ofertas, hay que cargar el array
    if (ofertasPreCargadas.length === 0) {
        construirYAgregarOfertasPreCargadas();
    }
    var allOffers = "";
    for (var i = 0; i < ofertasPreCargadas.length; i++) {
        allOffers += buildHtmlOfferFullSize(ofertasPreCargadas[i]) + "<p></p>";
    }
    $("#mainDiv").html(allOffers);
}


function buildHtmlOfferFullSize(pOferta) {
    //la oferta es una tabla de 1 fila con 3 columnas 
    //en la columna 1 se mostrará la imagen asociada a la oferta
    //en la columna 2 hay una tabla anidada con 5 filas y 1 columna, se agrega en cada sub fila la informacion de texto 
    //en la columna 3 hay una tabla anidada con 2 filas y 1 columna, se agrega en cada subfila botones de reservar y favoritear

    var col_1 = '<img class="offerFullSizePicture" src="' + pOferta.imageUrl + '" height="200" width="200"/>';

    var displayName = pOferta.displayName;
    var displayLocation = pOferta.geoLocation;
    var displayDate = "Fecha oferta";
    var displayPrice = "$" + pOferta.priceDollars;
    var displayType = pOferta.housingType;

    var col_2 = '<table class="offerFullSizeInfo" width="200"><tr><td>' + displayName + "</td></tr><tr><td>" + displayLocation + "</td></tr><tr><td>" + displayDate + "</td></tr><tr><td>" + displayPrice + "</td></tr><tr><td>" + displayType + "</td></tr></table>";

    var resButton = "<button>Reserva</button>";
    var favButton = "<button>Marcar Favorito</button>";
    var col_3 = '<table class="offerFullSizeButtons" width="200"><tr><td>' + resButton + "</td></tr><tr><td>" + favButton + "</td></tr></table>";

    var offerFullSize = "<div><table class='offerFullSize'><tr><td>" + col_1 + "</td><td>" + col_2 + "</td><td>" + col_3 + "</td></tr></table></div>";

    //$("#mainDiv").html(completeTable);
    return offerFullSize;
}



