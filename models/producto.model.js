module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('producto', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Producto;
};
