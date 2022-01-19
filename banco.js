//Declaración de variables

var nombreUsuario = "Constanza Paliza";
var pin = 1234;
var saldoCuenta = 50000;
var limiteExtraccion = 5000;
var monto;
var valor;

//Servicios disponibles para pagar
var s1 = ["Agua", 500];
var s2 = ["Luz", 925];
var s3 = ["Internet", 510];
var s4 = ["Telefono", 600];

//Cuentas amigas para transferir
var c1 = ["Cuenta amiga 1", 1234567];
var c2 = ["Cuenta amiga 2", 7654321];

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.

window.onload = function() {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones de validación (se utilizan dentro de las funciones posteriores)

//Validación multiplo de 100
function validacionMultiploDe100(monto) {
    if (monto%100 == 0) {
        return true;
    } else {
        alert("Solo es posible retirar de a multiplos de $100");
        return false;
    }
}

//Validación limite de extraccion
function validacionLimiteExtraccion(monto) {
    if (monto <= limiteExtraccion) {
        return true;
    } else {
        alert("La operacion supera tu limite de extraccion");
        return false;
    }
}

//Validación saldo disponible
function validacionSaldoCuenta(monto) {
    if (monto <= saldoCuenta) {
        return true;
        } else {
            alert("Tu saldo es insuficiente");
            return false;
        }
    }

//Validacion valor valido (Obliga al usuario a ingresar un numero en el campo del prompt)
function valorValido(monto) {
    if (isNaN(monto)) {
        alert("Por favor reintente ingresando un importe válido");
        return false;
    } else {
        return true;
    }
}

//Funciones de operaciones bancarias
function cambiarLimiteDeExtraccion() {

    var nuevoLimite = parseInt(prompt("Ingresa tu nuevo limite de extraccion"));

    if (valorValido(nuevoLimite)) {
        limiteExtraccion = nuevoLimite;
        alert("Tu nuevo limite de extraccion es: $"+limiteExtraccion);
        actualizarLimiteEnPantalla();
    }

}

function extraerDinero() {

    var monto = parseInt(prompt("Cuanto dinero deseas extraer?"));

    //Valido que se cumplan las cuatro condiciones, llamando a funciones anteriores
    if (    valorValido(monto) &&
            validacionMultiploDe100(monto) &&
            validacionLimiteExtraccion(monto) &&
            validacionSaldoCuenta(monto)    ) {

        var saldoAnterior = saldoCuenta;
        saldoCuenta = saldoCuenta - monto;
        actualizarSaldoEnPantalla();

        alert("Has extraido: $"+monto+'\n'+
        "Saldo anterior: $"+(saldoAnterior)+'\n'+
        "Saldo actual: $"+saldoCuenta);
        } 
}

function depositarDinero() {

    var monto = parseInt(prompt("Cuanto dinero deseas depositar?"));
    
    if (valorValido(monto)) {

    var saldoAnterior = saldoCuenta;
    saldoCuenta = saldoCuenta + monto;
    actualizarSaldoEnPantalla();
    alert("Has depositado: $"+monto+'\n'+
         "Saldo anterior: $"+(saldoAnterior)+'\n'+
         "Saldo actual: $"+saldoCuenta);
    }
}

function pagarServicio() {
    
    //Los servicios disponibles para pagar fueron declarados en la declaracion de variables
    
    //Consulta de servicio a pagar
    var servicio = prompt("Que servicio desea abonar?"+'\n'+
                                    "1. "+s1[0]+": $"+s1[1]+'\n'+
                                    "2. "+s2[0]+": $"+s2[1]+'\n'+
                                    "3. "+s3[0]+": $"+s3[1]+'\n'+
                                    "4. "+s4[0]+": $"+s4[1]+'\n'+
                                    "Ingrese el numero correspondiente al servicio que desea abonar");
    
    //Traduccion de respuesta del usuario a la variable correspondiente al servicio seleccionado
    switch (servicio) {
        case "1":
            servicio = s1;
            break;
        case "2":
            servicio = s2;
            break;
        case "3":
            servicio = s3;
            break;
        case "4":
            servicio = s4;
            break ; 
        default:
            alert("Intente con un servicio valido");
            return false;
    }
    
    
    //Validacion de saldo disponible en cuenta
    monto = servicio[1];
    if (validacionSaldoCuenta(monto)) {
        
        var saldoAnterior = saldoCuenta; 
        saldoCuenta = saldoCuenta - monto;
        actualizarSaldoEnPantalla();
        alert("Has pagado el servicio de "+servicio[0]+'\n'+
              "Saldo anterior: $"+(saldoAnterior)+'\n'+
              "Dinero descontado: $"+monto+'\n'+
              "Saldo actual: $"+saldoCuenta);
        
    }
    
}

function transferirDinero() {
    
    monto = parseInt(prompt("Indique el monto a transferir"));
    
    if (validacionSaldoCuenta(monto)) {
        
    var destinoTransferencia = parseInt(prompt("Ingrese el numero de cuenta amiga a la cual desea transferir"));
        
        if (destinoTransferencia == c1[1] || destinoTransferencia == c2[1]) {
            
            var saldoAnterior = saldoCuenta; 
            saldoCuenta = saldoCuenta - monto;
            actualizarSaldoEnPantalla();
            alert("Has transferido $ "+monto+'\n'+
                  "Cuenta de destino: "+destinoTransferencia);
            
        } else {
            alert("La cuenta ingresada no es valida");
            return false;
        }
    
    }
    
}
    

function iniciarSesion() {
    
   if (parseInt(prompt("Ingrese su PIN:")) == pin) {
       alert("Bienvenido "+nombreUsuario+". Ya puedes operar en nuestro Home Banking");
       //El sitio carga correctamente. 
       
    } else {
    saldoCuenta = 0;
    alert("El PIN es incorrecto. Recargue el sitio e inicie sesión nuevamente."+'\n'+
          "Por cuestiones de seguridad, su saldo ha sido bloqueado");
    return false;
    }
    
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}