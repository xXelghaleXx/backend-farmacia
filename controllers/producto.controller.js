const db = require('../models');
const Producto = db.producto;

exports.crearProducto = async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;
    const nuevo = await Producto.create({
      nombre,
      precio,
      stock,
      usuarioId: req.usuarioId
    });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear producto', error: err.message });
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: err.message });
  }
};

exports.obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener producto', error: err.message });
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    await producto.update({ nombre, precio, stock });
    res.json({ mensaje: 'Producto actualizado correctamente', producto });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar producto', error: err.message });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error: err.message });
  }
};
