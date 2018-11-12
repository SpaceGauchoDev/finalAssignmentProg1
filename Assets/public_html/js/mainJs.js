/*Santiago Rodríguez - Manuel De Armas - Obligatorio programacion 1 2018 - mainJS*/
$(document).ready(inicialSetUp);

var ofertas = new Array();

function inicialSetUp() {
    construirYAgregarUsuariosPreCargados();
    construirUsuarioParaNavegacion();
    updateDisplay();
}
