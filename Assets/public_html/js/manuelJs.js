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

}

function favoritoClicked(favoritoBtn) {    
    var offerId = favoritoBtn.getAttribute("data-offerid");
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
    }else{
        console.log("Error, user not found at addToUserFavoritesList");
    }
}
