const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Ruta GET para obtener todas los estados
router.get('/api/estados', async (req, res) => {
    try {
      // Consulta a la base de datos para obtener todas los estados
      const estados = await db.Estado.findAll();
  
      // Envía la respuesta con los estados obtenidos
      res.json({ estados });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener los estados' });
    }
});

// Ruta GET para obtener un estado por su ID
router.get('/api/estados/:id', async (req, res) => {
    const estadoId = req.params.id;
    try {
      // Consulta a la base de datos para encontrar un estado por su ID
      const estado = await db.Estado.findByPk(estadoId);
  
      if (!estado) {
        return res.status(404).json({ error: 'No se encontró el estado con el ID proporcionado' });
      }
  
      // Envía la respuesta con el estado encontrado
      res.json({ estado });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener el estado' });
    }
});


module.exports = router;