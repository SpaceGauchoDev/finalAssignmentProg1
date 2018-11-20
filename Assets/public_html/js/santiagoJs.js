/*Santiago Rodríguez - Manuel De Armas - Obligatorio programacion 1 2018 - santiagoJS*/



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

        var botonVerOferta = '<br><button onclick="verOferta(this)" data-offerid="' + value.id + '">Ver oferta</button>';
        //txtOferta += "<h4><a href='javascript;' onclick='verOferta(this)' data-reserveid='4'>" + oferta.displayName + "</a></h4>";
        txtOferta += botonVerOferta;
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
 