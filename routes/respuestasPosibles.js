const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Ruta GET para obtener todas las respuestas Posibles
router.get('/api/respuestasPosibles', async (req, res) => {
    try {
      // Consulta a la base de datos para obtener todas las respuestas Posibles
      const respuestasPosibles = await db.RespuestaPosible.findAll();
  
      // Envía la respuesta con las respuestas Posibles obtenidas
      res.json({ respuestasPosibles });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener las respuestas posibles' });
    }
});

// Ruta GET para obtener una respuesta Posible por su ID
router.get('/api/respuestasPosibles/:id', async (req, res) => {
    const respuestaPosibleID = req.params.id;
  
    try {
      // Consulta a la base de datos para encontrar una respuesta Posible por su ID
      const respuestaPosible = await db.RespuestaPosible.findByPk(respuestaPosibleID);
  
      if (!respuestaPosible) {
        return res.status(404).json({ error: 'No se encontró la respuesta Posible con el ID proporcionado' });
      }
  
      // Envía la respuesta con la respuesta Posible encontrada
      res.json({ respuestaPosible });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener la respuesta Posible' });
    }
});


module.exports = router;