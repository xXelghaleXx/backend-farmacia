const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.usuario = require('./usuario.model')(sequelize, Sequelize);
db.producto = require('./producto.model')(sequelize, Sequelize);

// Relaciones (si hay)
db.usuario.hasMany(db.producto);
db.producto.belongsTo(db.usuario);

module.exports = db;
