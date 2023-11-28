// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/base.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;


  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'CambioEstado'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE IF NOT EXISTS CambioEstado (
        idCambioEstado INTEGER PRIMARY KEY,
        fechaHoraInicio TEXT,
        fechaHoraFin TEXT,
        idEstado INTEGER,
        idLlamada INTEGER,
        FOREIGN KEY (idEstado) REFERENCES Estado (idEstado),
        FOREIGN KEY (idLlamada) REFERENCES Llamada (idLlamada)
    );`
    );
    console.log("tabla CambioEstado creada!");

    await db.run(
      `insert into CambioEstado values
      (1, '23-05-29 10:12:21', '23-05-29 10:26:07', 1, 1),
      (2, '23-05-29 10:26:07', null, 2, 1),
      (3, '23-06-02 05:21:32', '23-06-02 05:28:04', 1, 2),
      (4, '23-06-02 05:28:04', null, 2, 2),
      (5, '23-11-29 13:30:49', '23-11-29 13:40:16', 1, 3),
      (6, '23-11-29 13:40:16', null, 2, 3), 
      (7, '23-12-25 03:38:10', '23-12-25 04:04:51', 1, 4),
      (8, '23-12-25 04:04:51', null, 2, 4),
      (9, '23-08-19 12:11:38', '23-08-19 12:36:10', 1, 5),
      (10, '23-08-19 12:36:10', null, 3, 5),
      (11, '23-09-03 18:19:14', '23-09-03 18:54:41', 1, 6),
      (12, '23-09-03 18:54:41', null, 2, 6),
      (13, '23-04-21 04:24:03', '23-04-21 04:37:41', 1, 7),
      (14, '23-04-21 04:37:41', '23-04-21 04:52:57', 4, 7),
      (15, '23-04-21 04:52:57', null, 2, 7),
      (16, '23-07-17 20:08:50', '23-07-17 20:10:41', 1, 8),
      (17, '23-07-17 20:10:41', '23-07-17 20:18:33', 4, 8),
      (18, '23-07-17 20:18:33', null, 2, 8),
      (19, '23-04-24 05:57:53', '23-04-24 06:41:55', 1, 9),
      (20, '23-04-24 06:41:55', null, 2, 9),
      (21, '23-01-09 16:20:55', '23-01-09 16:25:49', 1, 10),
      (22, '23-01-09 16:25:49', '23-01-09 16:48:22', 4, 10),
      (23, '23-01-09 16:48:22', null, 3, 10),
      (24, '23-09-23 22:23:50', '23-09-23 22:43:30', 1, 11),
      (25, '23-09-23 22:43:30', null, 2, 11)
      `

    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Cliente'", []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE IF NOT EXISTS Cliente (
        idCliente INTEGER PRIMARY KEY,
        dni INTEGER,
        nombreCompleto TEXT,
        nroCelular INTEGER
    );`
    );
    console.log("tabla Cliente creada!");


    await db.run(
      `insert into Cliente values
      (1, 46359699, 'Sofia Ortega', 5146974),
      (2, 1947152, 'Miguel Vega', 9906081),
      (3, 5070659, 'David Silva', 8505006),
      (4, 17746956, 'Laura Díaz', 6819145),
      (5, 35033022, 'Isabel Castro', 2867424),
      (6, 735921, 'Carmen González', 8440246),
      (7, 22054294, 'Antonio Delgado', 4890760),
      (8, 12958378, 'Manuel González', 4834999),
      (9, 32435393, 'Carmen Jiménez', 8521191),
      (10, 1683526, 'Manuel Ramírez', 8352336)

      `
    );
}

  existe = false;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Encuesta'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE IF NOT EXISTS Encuesta (
        idEncuesta INTEGER PRIMARY KEY,
        descripcion TEXT,
        fechaFinVigencia TEXT,
        idPregunta1 INTEGER,
        idPregunta2 INTEGER,
        idPregunta3 INTEGER,
        FOREIGN KEY (idPregunta1) REFERENCES Pregunta (idPregunta)
        FOREIGN KEY (idPregunta2) REFERENCES Pregunta (idPregunta)
        FOREIGN KEY (idPregunta3) REFERENCES Pregunta (idPregunta)
    );`
    );
    console.log("tabla Encuesta creada!");

    await db.run(
    `insert into Encuesta values
    (1, 'Encuesta de atención del operario', '2023-12-31 09:00:00', 4, 14, 13),
    (2, 'Encuesta de calidad del servicio', '2023-12-31 09:00:00', 7, 8, null),
    (3, 'Encuesta de calidad del servicio', '2023-12-31 09:00:00', 10, 8, null),
    (4, 'Encuesta de atención del operario','2023-12-31 09:00:00', 12, 14, null),
    (5, 'Encuesta de atención del operario', '2023-12-31 09:00:00', 12, 3, null),
    (6, 'Encuesta de satisfacción', '2023-12-31 09:00:00', 10, 13, 7),
    (7, 'Encuesta de calidad del servicio', '2023-12-31 09:00:00', 5, 3, null),
    (8, 'Encuesta de satisfacción', '2023-12-31 09:00:00', 8, 14, null),
    (9, 'Encuesta de calidad del servicio', '2023-12-31 09:00:00', 14, 10, 9)
    `
      );

  }

  existe = false;

  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Estado'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE IF NOT EXISTS Estado (
        idEstado INTEGER PRIMARY KEY,
        nombre TEXT
    );`
    );
    console.log("tabla Estado creada!");

    await db.run(
      `insert into Estado values
      (1, 'Iniciada'),
      (2, 'Finalizada'),
      (3, 'Cancelada'),
      (4, 'En Curso')
      ;`
    );

    console.log("tabla Estado inicializada!");
  }

  existe = false;

  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Llamada'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE IF NOT EXISTS Llamada (
        idLlamada INTEGER PRIMARY KEY,
        descripcionOperador TEXT,
        detalleAccionRequerida TEXT,
        duracion TEXT,
        encuestaEnviada TEXT,
        observacionAuditor TEXT,
        idCliente INTEGER,
        FOREIGN KEY (idCliente) REFERENCES Cliente (idCliente)
    );`
    );
    console.log("tabla Llamada creada!");

    await db.run(
      `insert into Llamada values
      (1, 'IVR', null, '00:13:46', true, null, 1),
      (2, 'IVR', null, '00:06:32', true, null, 2),
      (3, 'IVR', null, '00:09:27', true, null, 3),
      (4, 'IVR', null, '00:26:41', true, null, 4),
      (5, 'IVR', null, '00:24:32', false, null, 5),
      (6, 'IVR', null, '00:35:27', true, null, 6),
      (7, 'Operador N°2', '8. Resolver problemas con la emisión o activación de una nueva tarjeta.', '00:28:54', true, '3. El operador demostró un excelente conocimiento de los procedimientos y políticas de la compañía al abordar la consulta del cliente.', 7),
      (8, 'Operador N°16', '10. Obtener asesoramiento sobre el uso seguro de la tarjeta en línea o en el extranjero.', '00:09:43', true, '2. Se observó una demora significativa en el tiempo de espera antes de que el cliente fuera atendido, lo que podría afectar la satisfacción del cliente.', 2),
      (9, 'IVR', null, '00:44:02', true, null, 8),
      (10, 'Operador N°19', '7. Consultar el estado de una solicitud de aumento de límite de crédito.', '00:27:27', false, '1. La respuesta proporcionada por el operador fue clara y precisa, brindando al cliente la información necesaria de manera efectiva.', 9),
      (11, 'IVR', null, '00:19:40', true, null, 10)
      `
      );
  }

existe = false;

sql =
  "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Pregunta'";
res = await db.get(sql, []);
if (res.contar > 0) existe = true;
if (!existe) {
  await db.run(
    `CREATE TABLE IF NOT EXISTS Pregunta (
      idPregunta INTEGER PRIMARY KEY,
      descripcion TEXT
  );`
  );
  console.log("tabla Pregunta creada!");

  await db.run(
    `insert into Pregunta values
      (1, "¿Qué tan fácil fue navegar por el sistema de atención al cliente? (Siendo 1=Muy Dificil y 10=Muy Facil)"),
      (2, "¿Fue fácil navegar por el sistema de atención al cliente? (Siendo 1=Si, fue facil y 2=No, fue dificil)"),
      (3, "¿Qué tan rápido recibió una respuesta a su pregunta? (Siendo 1=Muy Lento y 10=Muy Rapido)"),
      (4, "¿Recibió una respuesta rápida a su pregunta? (Siendo 1=Si, fue rapido y 2=No, fue lento)"),
      (5, "¿Qué tan útil fue la información proporcionada? (Siendo 1=Para nada útil y 10=Indispensable)"),
      (6, "¿Considera que la información proporcionada fue útil? (Siendo 1=Si, fue util y 2=No, no es util)"),
      (7, "¿Qué tan satisfecho está con la calidad del servicio de atención al cliente? (Siendo 1=Muy insatisfecho y 10=Muy satisfecho)"),
      (8, "¿Está satisfecho con la calidad del servicio de atención al cliente? (Siendo 1=Si, estoy satisfecho/a y 2=No, no estoy satisfecho/a)"),
      (9, "¿Qué tan amable fue la persona que lo atendió? (Siendo 1=Muy desagradable y 10=Muy amable)"),
      (10, "¿Fue atendido por alguien amable? (Siendo 1=Si, muy amable y 2=No,fue poco amable)"),
      (11, "¿Qué tan claro fue su entendimiento de las opciones disponibles para usted? (Siendo 1=Pésimo y 10=Excepcional)"),
      (12, "¿Comprendió claramente las opciones disponibles para usted? (Siendo 1=Si, fue muy claro y 2=No, fue ambiguo)"),
      (13, "¿Qué tan probable es que recomiende este servicio de atención al cliente a otros? (Siendo 1=Imposible y 10=Totalmente)"),
      (14, "¿Recomendaría este servicio de atención al cliente a otros? (Siendo 1=Si, lo recomendaria y 2=No, no lo recomendaria)")
    ;`
  );
  
  console.log("tabla Pregunta inicializada!");
}


  existe = false;
  sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'RespuestaPosible'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
  await db.run(`
  CREATE TABLE IF NOT EXISTS RespuestaPosible (
    idRespuestaPosible INTEGER PRIMARY KEY,
    descripcion TEXT,
    valor INTEGER,
    idPregunta INTEGER,
    FOREIGN KEY (idPregunta) REFERENCES Pregunta (idPregunta)
    );
`);
  console.log("tabla RespuestaPosible creada!");

  await db.run(`
    insert into RespuestaPosible values
      (1, "Muy difícil", 1, 1),
      (2, "Difícil", 2, 1),
      (3, "Moderadamente difícil", 3, 1),
      (4, "Algo difícil", 4, 1),
      (5, "Ni difícil ni fácil", 5, 1),
      (6, "Algo fácil", 6, 1),
      (7, "Moderadamente fácil", 7, 1),
      (8, "Fácil", 8, 1),
      (9, "Bastante fácil", 9, 1),
      (10, "Muy fácil", 10, 1),

      (11, "Si, fue facil", 1, 2),
      (12, "No, fue dificil", 2, 2),

      (13, "Muy lento", 1, 3),
      (14, "Lento", 2, 3),
      (15, "Moderadamente lento", 3, 3),
      (16, "Algo lento", 4, 3),
      (17, "Normal", 5, 3),
      (18, "Algo rápido", 6, 3),
      (19, "Moderadamente rápido", 7, 3),
      (20, "Rápido", 8, 3),
      (21, "Bastante rápido", 9, 3),
      (22, "Muy rápido", 10, 3),

      (23, "Si, fue rapido", 1, 4),
      (24, "No, fue lento", 2, 4),

      (25, "Para nada útil", 1, 5),
      (26, "Poco útil", 2, 5),
      (27, "Ligeramente útil", 3, 5),
      (28, "Algo útil", 4, 5),
      (29, "Moderadamente útil", 5, 5),
      (30, "Bastante útil", 6, 5),
      (31, "Muy útil", 7, 5),
      (32, "Sumamente útil", 8, 5),
      (33, "Extremadamente útil", 9, 5),
      (34, "Indispensable", 10, 5),

      (35, "Si, fue util", 1, 6),
      (36, "No, no es util", 2, 6),

      (37, "Muy insatisfecho", 1, 7),
      (38, "Insatisfecho", 2, 7),
      (39, "Moderadamente insatisfecho", 3, 7),
      (40, "Algo insatisfecho", 4, 7),
      (41, "Neutro", 5, 7),
      (42, "Algo satisfecho", 6, 7),
      (43, "Moderadamente satisfecho", 7, 7),
      (44, "Satisfecho", 8, 7),
      (45, "Bastante satisfecho", 9, 7),
      (46, "Muy satisfecho", 10, 7),

      (47, "Si, estoy satisfecho/a", 1, 8),
      (48, "No, no estoy satisfecho/a", 2, 8),

      (49, "Muy desagradable", 1, 9),
      (50, "Desagradable", 2, 9),
      (51, "Moderadamente desagradable", 3, 9),
      (52, "Algo desagradable", 4, 9),
      (53, "Neutro", 5, 9),
      (54, "Algo amable", 6, 9),
      (55, "Moderadamente amable", 7, 9),
      (56, "Amable", 8, 9),
      (57, "Bastante amable", 9, 9),
      (58, "Muy amable", 10, 9),

      (59, "Si, muy amable", 1, 10),
      (60, "No, fue poco amable", 2, 10),

      (61, "Pésimo", 1, 11),
      (62, "Muy malo", 2, 11),
      (63, "Deficiente", 3, 11),
      (64, "Malo", 4, 11),
      (65, "Regular", 5, 11),
      (66, "Bueno", 6, 11),
      (67, "Muy bueno", 7, 11),
      (68, "Excelente", 8, 11),
      (69, "Sobresaliente", 9, 11),
      (70, "Excepcional", 10, 11),

      (71, "Si, fue muy claro", 1, 12),
      (72, "No, fue ambiguo", 2, 12),

      (73, "Imposible", 1, 13),
      (74, "Muy improbable", 2, 13),
      (75, "Altamente improbable", 3, 13),
      (76, "Poco probable", 4, 13),
      (77, "Neutro", 5, 13),
      (78, "Algo probable", 6, 13),
      (79, "Probable", 7, 13),
      (80, "Muy probable", 8, 13),
      (81, "Altamente probable", 9, 13),
      (82, "Totalmente", 10, 13),

      (83, "Si, lo recomendaria", 1, 14),
      (84, "No, no lo recomendaria", 2, 14)
      `
);

  console.log("tabla RespuestaPosible inicializada!");

  }

  existe = false;
  sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'RespuestaCliente'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
  await db.run(`
  CREATE TABLE IF NOT EXISTS RespuestaCliente (
    idRespuestaCliente INTEGER PRIMARY KEY,
    fechaEncuesta TEXT,
    idRespuesta INTEGER,
    idLlamada INTEGER,
    FOREIGN KEY (idLlamada) REFERENCES Llamada (idLlamada),
    FOREIGN KEY (idRespuesta) REFERENCES RespuestaPosible (idRespuestaPosible)
    );
  `)

  console.log("tabla RespuestaCliente creada!");

  await db.run(`
  insert into RespuestaCliente values
    (1, '23-05-29 10:26:07', 24, 1),
    (2, '23-05-29 10:26:07', 83, 1),
    (3, '23-05-29 10:26:07', 73, 1),
    (4, '23-06-02 05:28:04', 48, 2),
    (5, '23-06-02 05:28:04', 39, 2),
    (6, '23-11-29 13:40:16', 59, 3),
    (7, '23-11-29 13:40:16', 48, 3),
    (8, '23-12-25 04:04:51', 71, 4),
    (9, '23-12-25 04:04:51', 83, 4),
    (10, '23-09-03 18:54:41', 71, 6),
    (11, '23-09-03 18:54:41', 17, 6),
    (12, '23-04-21 04:52:57', 60, 7),
    (13, '23-04-21 04:52:57', 76, 7),
    (14, '23-04-21 04:52:57', 43, 7),
    (15, '23-07-17 20:18:33', 26, 8),
    (16, '23-07-17 20:18:33', 13, 8),
    (17, '23-04-24 06:41:55', 47, 9),
    (18, '23-04-24 06:41:55', 83, 9),
    (19, '23-09-23 22:43:30', 84, 11),
    (20, '23-09-23 22:43:30', 59, 11),
    (21, '23-09-23 22:43:30', 55, 11)
    `
    );

  // cerrar la base
  db.close();
  }
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;


