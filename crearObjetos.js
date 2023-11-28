const Fecha = require("../Utilities/Fechas.js");




//===CREAR CAMBIOS DE ESTADO===//

// Función para guardar un nuevo elemento en la tabla
const guardarCambioEstado = async (datos) => {
    try {
  
      // Crea un nuevo elemento en la tabla
      const nuevoElemento = await db.CambioEstado.create(datos);
  
      console.log('Elemento creado:', nuevoElemento.toJSON());
    } catch (error) {
      console.error('Error al crear el elemento:', error);
    }
  };


function crearEstadosLlamada(duration, encuestaOk, operarioOk) {
    //Inicializo una variable que especificara la cantidad de estados
    //Esto se calcula en base a si la llamada pasa a ser atendida por un operario o no
    let iteraciones
    let estadosLlamada = [];
    let fechaEnMs = 0;
    let intervalos = [];
    let fechaInicio = null;
    let fechaFin = null;
    operarioOk === "IVR" ? iteraciones = 2 : iteraciones = 3;
    for (let i = 0; i < iteraciones; i++) {
        //ahora chequeamos la cantidad de iteraciones (dado que si solo tiene dos estados, toda la duracion de la llamada se contendra en el estado Iniciada)
        if (iteraciones === 2){
            //Chequeamos si la llamada se encuentra en su primer iteracion para fijar la fecha de inicio
            //A partir de aqui la duracion de la llamada se calcula en base a la duracion de los estados anteriores
            if (i === 0){
                //Genero una fecha aleatoria entre un periodo de tiempo. La misma se guardara en segundos milisegundos para poder poder operar con ella
                fechaEnMs = Fecha.generarFechaAleatoria(new Date(2023, 0, 1), new Date(2023, 11, 31), "ms");
                //Formateo la fecha aleatoria para que quede en el formato que necesito
                fechaInicio = Fecha.formatearFecha(new Date(fechaEnMs));
                //Genero una fecha de fin en base a la fecha de inicio y la duracion de la llamada
                fechaFin = Fecha.generarFechaEnBaseaDuracion(fechaEnMs, duration);
                //Formateo la fecha de fin para que quede en el formato que necesito
                fechaFin = Fecha.formatearFecha(new Date(fechaFin));
                //Creo el estado
                guardarCambioEstado({fechaHoraInicio: fechaInicio, fechaHoraFin: fechaFin, idEstado: 1});
            } else {
                //Genero una fecha de inicio en base a la fecha de fin del estado anterior
                let fechaInicio = estadosLlamada[i-1].getFechaHoraFin();
                //seteamos la fecha fin a null
                let fechaFin = null;
                //creamos el estado
                if (encuestaOk) {
                    guardarCambioEstado({fechaHoraInicio: fechaInicio, fechaHoraFin: fechaFin, idEstado: 2});
                } else {
                    guardarCambioEstado({fechaHoraInicio: fechaInicio, fechaHoraFin: fechaFin, idEstado: 3});
                }
            }
        } else {
            //Si entra aqui es porque son 3 los estados de la llamada
            //Por tanto, deberemos guardar un registro de los intervalos de duracion de cada estado
            if (i === 0){
                //creamos los intervalos de duracion por los que pasara la llamada
                intervalos = Fecha.generarTiemposAleatorios(duration, iteraciones - 1);
                //Genero una fecha aleatoria entre un periodo de tiempo. La misma se guardara en segundos milisegundos para poder poder operar con ella
                fechaEnMs = Fecha.generarFechaAleatoria(new Date(2023, 0, 1), new Date(2023, 11, 31), "ms");
                //Formateo la fecha aleatoria para que quede en el formato que necesito
                fechaInicio = Fecha.formatearFecha(new Date(fechaEnMs)); 
                //Genero una fecha de fin en base a la fecha de inicio y un punto medio de la duracion de la llamada
                fechaEnMs = Fecha.generarFechaEnBaseaDuracion(fechaEnMs, intervalos[i]);
                //Formateo la fecha de fin para que quede en el formato que necesito
                fechaFin = Fecha.formatearFecha(new Date(fechaEnMs));
                //Creo el estado
                guardarCambioEstado({fechaHoraInicio: fechaInicio, fechaHoraFin: fechaFin, idEstado: 1});
            } else {
                //Genero una fecha de inicio en base a la fecha de fin del estado anterior
                let fechaInicio = estadosLlamada[i-1].getFechaHoraFin();
                //Genero una fecha de fin en base a la fecha de inicio y un punto medio de la duracion de la llamada siempre que no sera el ultimo estado
                if (i === iteraciones - 1) {
                    let fechaFin = null;
                    //creamos el estado
                    if (encuestaOk) {
                        let estado = new CambioEstado(fechaInicio, fechaFin, estados[1]);
                        //Lo agrego al array de estados
                        estadosLlamada.push(estado);
                    } else {
                        let estado = new CambioEstado(fechaInicio, fechaFin, estados[2]);
                        //Lo agrego al array de estados
                        estadosLlamada.push(estado);
                    }
                } else {
                    let fechaFin = Fecha.generarFechaEnBaseaDuracion(fechaEnMs, intervalos[i]);
                    //Formateo la fecha de fin para que quede en el formato que necesito
                    fechaFin = Fecha.formatearFecha(new Date(fechaFin));
                    //creamos el estado
                    let estado = new CambioEstado(fechaInicio, fechaFin, estados[3]);
                    //Lo agrego al array de estados
                    estadosLlamada.push(estado);
                }
            }
        }    
    }
    return estadosLlamada;
}


//===CREAR LLAMADAS===//



//creamos el array de llamadas para exportarlas
const array_llamadas = [];
//funcion que generará todos los componentes de la llamada
function generarLlamada() {
    //funcion para elegir los parametros de forma aleatoria segun cierta proporcion
    function elegirParam(num) {
        const aleatorio = Math.random();
        if (aleatorio < num) {
            return "Opcion 1";
        } else {
            return "Opcion 2";
        }
    }
    //Definimos el valor del operador de la llamada
    let descripcionOperador = elegirParam(0.75);
    //seteamos el Detalle de la accion requerida y la observacion del auditor
    let detalleAccionRequerida = null;
    let observacionAuditor = null;
    //seteamos el operador de la llamada
    if (descripcionOperador === "Opcion 1") {
        descripcionOperador = "IVR";
    } else {
        descripcionOperador = "Operador N°" + Math.ceil(Math.random() * 20) + "";
        //array de posibles acciones de soporte tecnico
        const acciones_soporte_tecnico = [
            "1. Verificar el saldo de la tarjeta de crédito.",
            "2. Reportar una transacción no reconocida en el estado de cuenta.",
            "3. Solicitar información sobre las tasas de interés y cargos asociados.",
            "4. Actualizar la información personal vinculada a la tarjeta (dirección, número de teléfono, etc.).",
            "5. Bloquear la tarjeta en caso de pérdida o robo.",
            "6. Obtener asistencia para realizar pagos o establecer un plan de pago.",
            "7. Consultar el estado de una solicitud de aumento de límite de crédito.",
            "8. Resolver problemas con la emisión o activación de una nueva tarjeta.",
            "9. Obtener información sobre los beneficios y recompensas asociados a la tarjeta.",
            "10. Obtener asesoramiento sobre el uso seguro de la tarjeta en línea o en el extranjero."
        ];
        //si ademas, el operador es una persona, seteamos el detalle de la accion requerida
        detalleAccionRequerida = acciones_soporte_tecnico[Math.floor(Math.random() * acciones_soporte_tecnico.length)];
        observacionAuditor = elegirParam(0.5);
        if (observacionAuditor === "Opcion 1") {
            //array de posibles observaciones del auditor
            const observaciones_auditor = [
                "1. La respuesta proporcionada por el operador fue clara y precisa, brindando al cliente la información necesaria de manera efectiva.",
                "2. Se observó una demora significativa en el tiempo de espera antes de que el cliente fuera atendido, lo que podría afectar la satisfacción del cliente.",
                "3. El operador demostró un excelente conocimiento de los procedimientos y políticas de la compañía al abordar la consulta del cliente.",
                "4. La interacción careció de empatía; el operador podría mejorar la conexión emocional con el cliente al mostrar más comprensión y empatía.",
                "5. Se identificó un malentendido en la resolución del problema del cliente; sería beneficioso revisar la capacitación del operador en este aspecto específico."
            ];
        observacionAuditor = observaciones_auditor[Math.floor(Math.random() * observaciones_auditor.length)];
        } else {
            observacionAuditor = null;
        }
    }
    //definimos la duracion de la llamada
    let duracion = Fecha.generarDuracion(5, 60);
    
    //definimos si la llamada tiene encuesta o no
    let encuestaEnviada = elegirParam(0.8);
    if (encuestaEnviada === "Opcion 1") {
        encuestaEnviada = true;
    } else {
        encuestaEnviada = false;
    }

    //aqui se llamaran a los demas objetos de la llamada
    let cambioEstado = crearEstadosLlamada(duracion, encuestaEnviada, descripcionOperador);
    
    //seteamos las respuestas del cliente -si la llamada tiene encuesta. Si no, la cargamos a null
    let respuestaCliente = null;
    if (encuestaEnviada) {
        respuestaCliente = responderEncuestas("2023-12-31 09:00:00", cambioEstado[cambioEstado.length - 1].getFechaHoraInicio()); 
    }

    //para finalizar, creamos el cliente de la llamada
    let cliente = crearCliente();

    //creamos la llamada
    const llamada = new Llamada(descripcionOperador, detalleAccionRequerida, duracion, encuestaEnviada, observacionAuditor, cliente, cambioEstado, respuestaCliente);
    //agregamos la llamada al array de llamadas
    array_llamadas.push(llamada);
}

for (let i = 0; i < 20; i++) {
    generarLlamada();
}
