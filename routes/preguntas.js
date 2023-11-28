const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Ruta GET para obtener todas las preguntas
router.get('/api/preguntas', async (req, res) => {
    try {
      // Consulta a la base de datos para obtener todas las preguntas
      const preguntas = await db.Pregunta.findAll();
  
      // Envía la respuesta con las preguntas obtenidas
      res.json({ preguntas });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener las preguntas' });
    }
});

// Ruta GET para obtener una pregunta por su ID
router.get('/api/preguntas/:id', async (req, res) => {
    const preguntaID = req.params.id;
  
    try {
      // Consulta a la base de datos para encontrar una pregunta por su ID
      const pregunta = await db.Pregunta.findByPk(preguntaID);
  
      if (!pregunta) {
        return res.status(404).json({ error: 'No se encontró la pregunta con el ID proporcionado' });
      }
  
      // Envía la respuesta con la pregunta encontrada
      res.json({ pregunta });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener la pregunta' });
    }
});


module.exports = router;