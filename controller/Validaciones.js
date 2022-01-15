/**
 * Clase Validaciones mediante expresiones regulares, 
 * @param  Variable variable de tipo string || number.
 * Nota. No Js permite forzar el tipado. 
 */

class Validaciones{

    // Validacion  de un numero 
    numero(numero){
        let match = /^\d+/;
        return match.exec(numero)!=null && match.exec(numero).length>0;
    }
//Validacion de un numero telefonico a 10 digitos
    telefono(numero){
        let match = /^\d{10}/;
        return match.exec(numero)!=null && match.exec(numero).length>0;
    }
    // Validacion de Un Correo Electronico estandard
    email(mail){
        let match = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}/;
        return match.exec(mail)!=null && match.exec(mail).length>0;
    }
    //Validacion de un domicilio limitado a 300 carácteres
    domicilio(text){
        let match = /[A-Za-z0-9'\\.\\-\\s\\,\#]{1,300}/;
        return match.exec(text)!=null && match.exec(text).length>0;
    }
    // Validacion generica de Texto limitado a 100 carácteres
    nombres(text){
        let match = /(.*){1,100}/;
        return match.exec(text)!=null && match.exec(text).length>0;
    }
}
module.exports = Validaciones;