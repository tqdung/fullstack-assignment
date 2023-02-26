'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');

const { Sequelize, Model, DataTypes } = require('sequelize');
const mysql = require('mysql2');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const connection = mysql.createConnection({ host: config.host, user: config.username, password: config.password });
connection.connect(err => {
  if (err) {
    throw err;
  }
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);
  connection.end();
})

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
