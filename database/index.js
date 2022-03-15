const Sequelize = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
  config.db.mysql.dbname,
  config.db.mysql.username,
  config.db.mysql.password,
  {
    host: config.db.mysql.host,
    dialect: config.db.mysql.dialect,
    operatorsAliases: 0,
    logging: false,

    pool: {
      max: config.db.mysql.pool.max,
      min: config.db.mysql.pool.min,
      acquire: config.db.mysql.pool.acquire,
      idle: config.db.mysql.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model")(sequelize, Sequelize);
db.stations = require("../models/station.model")(sequelize, Sequelize);

db.users.hasMany(db.stations, { as: "stations" });
db.stations.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;