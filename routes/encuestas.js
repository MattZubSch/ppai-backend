const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Ruta GET para obtener todas las encuestas
router.get('/api/encuestas', async (req, res) => {
    try {
      // Consulta a la base de datos para obtener todas las encuestas
      const encuestas = await db.Encuesta.findAll();
  
      // Envía la respuesta con las encuestas obtenidas
      res.json({ encuestas });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener las encuestas' });
    }
});

// Ruta GET para obtener una encuesta por su ID
router.get('/api/encuestas/:id', async (req, res) => {
    const encuestaId = req.params.id;
  
    try {
      // Consulta a la base de datos para encontrar una encuesta por su ID
      const encuesta = await db.Encuesta.findByPk(encuestaId);
  
      if (!encuesta) {
        return res.status(404).json({ error: 'No se encontró la encuesta con el ID proporcionado' });
      }
  
      // Envía la respuesta con la encuesta encontrada
      res.json({ encuesta });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener la encuesta' });
    }
});



module.exports = router;