const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Ruta GET para obtener todas las llamadas
router.get('/api/llamadas', async (req, res) => {
    try {
      // Consulta a la base de datos para obtener todas las llamadas
      const llamadas = await db.Llamada.findAll();
  
      // Envía la respuesta con las llamadas obtenidas
      res.json({ llamadas });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener las llamadas' });
    }
});

// Ruta GET para obtener una llamada por su ID
router.get('/api/llamadas/:id', async (req, res) => {
    const llamadaId = req.params.id;
  
    try {
      // Consulta a la base de datos para encontrar una llamada por su ID
      const llamada = await db.Llamada.findByPk(llamadaId);
  
      if (!llamada) {
        return res.status(404).json({ error: 'No se encontró la llamada con el ID proporcionado' });
      }
  
      // Envía la respuesta con la llamada encontrada
      res.json({ llamada });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener la llamada' });
    }
});


module.exports = router;