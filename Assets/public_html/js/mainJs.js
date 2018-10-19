/*Santiago Rodríguez - Manuel De Armas - Obligatorio programacion 1 2018 - mainJS*/
$(document).ready(inicialSetUp);

function inicialSetUp() {
    console.log("inicializando js");

    $("#validar_1").click(validate_1);
    $("#limpiar_1").click(clean_1);

}


function validate_1() {
    console.log("function validate_1 es llamada");
    var input_1 = $("#inputField_1_a").val();
    msg = "";
    
    if(isNumber(input_1)){
      input_1 = makeInt(input_1);
      msg = logic_1(input_1);                
    }else{
        msg = "Valor inválido, ingrese solo números.";
    }
    $("#parrafo_1").html(msg);
}

function logic_1(pNum) {
    console.log("function logic_1 es llamada");
    result = pNum + " no es múltiplo de tres.";
    
    if(pNum % 3 === 0){
        result  =  pNum + " es múltiplo de tres.";        
    }
    return result;
}

function clean_1() {
    console.log("function clean_01 es llamada");   
    $("#inputField_1_a").val("");  
    $("#parrafo_1").html("");  
}



