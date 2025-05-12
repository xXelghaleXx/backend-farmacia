const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Usuario = db.usuario;

exports.registrar = async (req, res) => {
  try {
    const { username, correo, password, rol } = req.body;

    const existe = await Usuario.findOne({ where: { username } });
    if (existe) return res.status(400).json({ mensaje: 'Usuario ya existe' });

    const nuevoUsuario = await Usuario.create({ username, correo, password, rol });
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en el registro', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const usuario = await Usuario.findOne({ where: { username } });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.json({ mensaje: 'Login exitoso', token, usuario: { id: usuario.id, username: usuario.username, rol: usuario.rol } });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en el login', error: err.message });
  }
};
