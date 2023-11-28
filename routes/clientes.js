const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Ruta GET para obtener todas los clientes
router.get("/api/clientes", async function (req, res) {
  try {
    // Consulta a la base de datos para obtener todas los clientes
    const clientes = await db.Cliente.findAll();

    // Envía la respuesta con los clientes obtenidos
    res.json({ clientes });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al obtener los clientes' });
  }
});

// Ruta GET para obtener un cliente por su ID
router.get("/api/clientes/:id", async function (req, res) {
  const clienteID = req.params.id;
  try {
    // Consulta a la base de datos para encontrar un cliente por su ID
    const cliente = await db.Cliente.findByPk(clienteID);
  
    if (!cliente) {
      return res.status(404).json({ error: 'No se encontró el cliente con el ID proporcionado' });
    }
  
    // Envía la respuesta con el cliente encontrado
    res.json({ cliente });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al obtener el cliente' });
  }

});

module.exports = router;