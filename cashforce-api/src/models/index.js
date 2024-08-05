const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Buyer = require('./buyer')(sequelize, DataTypes);
db.Provider = require('./provider')(sequelize, DataTypes);
db.Order = require('./order')(sequelize, DataTypes);
db.Cnpj = require('./cnpj')(sequelize, DataTypes);
db.User = require('./user')(sequelize, DataTypes);
db.Sponsor = require('./sponsor')(sequelize, DataTypes);

module.exports = db;
