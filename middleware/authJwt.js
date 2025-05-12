const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) return res.status(403).json({ mensaje: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    req.usuarioRol = decoded.rol;
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};

const esAdmin = (req, res, next) => {
  if (req.usuarioRol === 'admin') return next();
  return res.status(403).json({ mensaje: 'Se requiere rol de administrador' });
};

const esModerador = (req, res, next) => {
  if (req.usuarioRol === 'moderador' || req.usuarioRol === 'admin') return next();
  return res.status(403).json({ mensaje: 'Se requiere rol de moderador' });
};

module.exports = {
  verificarToken,
  esAdmin,
  esModerador
};
