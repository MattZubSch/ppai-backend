const express = require("express");
const cors = require("cors");

// crear servidor
const app = express();

app.use(express.json()); // para poder leer json en el body

// Configuración de CORS
app.use(cors()); // Básicamente, habilita las solicitudes desde otros dominios o servidores.

require("./base-orm/sqlite-init");  // crear base si no existe

// controlar ruta
app.get("/", (req, res) => {
  res.send("Consultar Encuesta - DB");
});

const encuestasrouter = require("./routes/encuestas"); // se utiliza para declarar constantes que apuntan a los enrutadores definidos en archivos separados
app.use(encuestasrouter); // se usa para montar el enrutador

const clientesrouter = require("./routes/clientes");
app.use(clientesrouter);

const estadosrouter = require("./routes/estados");
app.use(estadosrouter);

const cambioEstadorouter = require("./routes/cambiosEstados");
app.use(cambioEstadorouter);

const llamadasRouter = require("./routes/llamadas");
app.use(llamadasRouter);

const preguntasRouter = require("./routes/preguntas");
app.use(preguntasRouter);

const respuestasClientesRouter = require("./routes/respuestasClientes");
app.use(respuestasClientesRouter);

const respuestasPosiblesRouter = require("./routes/respuestasPosibles");
app.use(respuestasPosiblesRouter);

// levantar servidor
if (!module.parent) {// si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
  const port = process.env.PORT || 4000;   // en produccion se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}
module.exports = app;