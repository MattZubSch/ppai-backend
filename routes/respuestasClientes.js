const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Ruta GET para obtener todas las respuestas de clientes
router.get('/api/respuestasClientes', async (req, res) => {
    try {
      // Consulta a la base de datos para obtener todas las respuestas de clientes
      const respuestasClientes = await db.RespuestaCliente.findAll();
  
      // Envía la respuesta con las respuestas de clientes
      res.json({ respuestasClientes });
    } catch (error) {
      console.log(error)
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener las respuestas de clientes' });
    }
});

// Ruta GET para obtener una respuesta de cliente por su ID
router.get('/api/respuestasClientes/:id', async (req, res) => {
    const respuestaClienteID = req.params.id;
  
    try {
      // Consulta a la base de datos para encontrar una respuesta de cliente por su ID
      const respuestaCliente = await db.RespuestaCliente.findByPk(respuestaClienteID);
  
      if (!respuestaCliente) {
        return res.status(404).json({ error: 'No se encontró la respuesta de cliente con el ID proporcionado' });
      }
  
      // Envía la respuesta con la respuesta de cliente encontrada
      res.json({ respuestaCliente });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al obtener la respuesta de cliente' });
    }
});


module.exports = router;