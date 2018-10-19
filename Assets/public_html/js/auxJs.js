/*Santiago Rodríguez - Manuel De Armas - Obligatorio programacion 1 2018 - auxJS*/
function isNumber(str) {
    var result = false;
    str = myTrim(str);
    if (!isNaN(str) && str !== "") {
        result = true;
    }
    return result;
}

function makeInt(str) {
    var result = 0;
    str = myTrim(str);
    result = Number.parseInt(str);
    return result;
}

function isSpanishLanguageLetter(pStr) {
    var result = false;
    if (pStr.length === 1) {
        pStr = pStr.toLowerCase();

        var minStart = 97;
        var minEnd = 122;
        var enieMin = 241;

        var code = pStr.charCodeAt(0);
        
        if ((code >= minStart && code <= minEnd) || code === enieMin) {
            result = true;
        }
    }
    return result;
}

function myTrim(pStr) {
    // myTrim(var) elimina espacios vacíos antes y después de un string no vacío
    // ej1: ""          --> ""
    // ej2: "     "     --> ""
    // ej3: "2 55   "   --> "2 55" 
    // ej4: "   2 55"   --> "2 55" 
    // ej5: "  2 55 "   --> "2 55"

    var allSpaces = false;
    var cont = 0;
    var wLooper = 0;
    var auxString = "";

    //check if all spaces
    for (var x = 0; x < pStr.length; x++) {
        if (pStr.charCodeAt(x) === 32) {
            cont++;
        }
    }
    if (cont === pStr.length) {
        allSpaces = true;
        pStr = "";
    }
    cont = 0;

    //if all spaces do nothing
    if (!allSpaces) {
        //==========
        //START TRIM
        //==========
        //check for spaces from start 
        //while (wLooper < pStr.length || pStr.charCodeAt(wLooper) === 32) { // stops looping at string end or at non space character
        auxString = "";
        wLooper = 0;
        cont = 0;
        while (pStr.charCodeAt(wLooper) === 32) { // stops looping at non space character
            cont++;
            wLooper++;
        }

        // if there are any space characters at start copy all space characters from the first non space character till the end
        if (cont > 0) {
            //copy the existing string starting at the first non space character
            for (var z = cont; z < pStr.length; z++) {
                auxString = auxString + pStr.charAt(z);
            }

            //inputString is now the cut string, reset aux string and counters
            pStr = auxString;
            auxString = "";
        }
        //========
        //END TRIM
        //========
        //check for spaces from end
        auxString = "";
        wLooper = pStr.length - 1;
        cont = 0;
        while (pStr.charCodeAt(wLooper) === 32) { // stops looping at non space character
            cont++;
            wLooper--;
        }

        // if there are any space characters at end copy all space characters up to the last non space character
        if (cont > 0) {
            for (var w = 0; w < pStr.length - cont; w++) {
                auxString = auxString + pStr.charAt(w);
            }
            //inputString is now the cut string, reset aux string and counters
            pStr = auxString;
            auxString = "";
        }
    }
    return pStr;
}


function myRemoveSpacesAndPunctuation(pStr) {
    var result = "";
    for (var i = 0; i < pStr.length; i++) {
        var currChar = pStr.charCodeAt(i);
        if (currChar !== 32 && currChar !== 44 && currChar !== 46 && currChar !== 58 && currChar !== 59) {
            result = result + pStr.charAt(i);
        }
    }
    return result;
}


function myRemoveAccentsLowerCase(pStr) {
    /*
     a 97
     á 225
     ä 228
     
     e 101
     é 233
     ë 235
     
     i 105
     í 237
     ï 239
     
     o 111
     ó 243
     ö 246
     
     u 117
     ú 250
     ü 252
     */

    var result = "";

    for (var i = 0; i < pStr.length; i++) {
        var charCode = pStr.charCodeAt(i);
        var currChar = pStr.charAt(i);

        if (charCode === 225 || charCode === 228) {
            currChar = "a";
        }

        if (charCode === 233 || charCode === 235) {
            currChar = "e";
        }

        if (charCode === 237 || charCode === 239) {
            currChar = "i";
        }

        if (charCode === 243 || charCode === 246) {
            currChar = "o";
        }

        if (charCode === 250 || charCode === 252) {
            currChar = "o";
        }

        result = result + currChar;
    }

    return result;
}