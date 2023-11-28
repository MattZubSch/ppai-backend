const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Ruta GET para obtener todos los cambios de estado
router.get('/api/cambiosEstados', async (req, res) => {
    try {
      // Consulta a la base de datos para obtener todos los cambios de estado
      const cambioEstado = await db.CambioEstado.findAll();
  
      // Envía la respuesta con los cambios de estado obtenidos
      res.json({ cambioEstado });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener los cambios de estado' });
    }
});

// Ruta GET para obtener un cambio de estado por su ID
router.get('/api/cambiosEstados/:id', async (req, res) => {
    const cambioEstadoID = req.params.id;
  
    try {
      // Consulta a la base de datos para encontrar un cambio de estado por su ID
      const cambioEstado = await db.CambioEstado.findByPk(cambioEstadoID);
  
      if (!cambioEstado) {
        return res.status(404).json({ error: 'No se encontró un cambio de estado con el ID proporcionado' });
      }
  
      // Envía la respuesta con el cambio de estado encontrado
      res.json({ cambioEstado });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener un cambio estado' });
    }
});


module.exports = router;