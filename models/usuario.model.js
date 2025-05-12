const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('usuario', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('admin', 'moderador', 'usuario'),
      defaultValue: 'usuario'
    }
  });

  // Encriptar contraseña antes de guardar
  Usuario.beforeCreate(async (usuario, options) => {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
  });

  return Usuario;
};
