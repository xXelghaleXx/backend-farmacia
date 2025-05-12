const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const { verificarToken, esAdmin, esModerador } = require('../middleware/authJwt');

// Rutas protegidas
router.get('/', verificarToken, productoController.obtenerProductos);
router.get('/:id', verificarToken, productoController.obtenerProductoPorId);
router.post('/', verificarToken, esModerador, productoController.crearProducto);
router.put('/:id', verificarToken, esModerador, productoController.actualizarProducto);
router.delete('/:id', verificarToken, esAdmin, productoController.eliminarProducto);

module.exports = router;
