'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const config = require('../config/config')
const db = {};



let sequelize;

if (process.env.NODE_ENV === 'development') {
	// code for development environment
	sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
		host: config.development.host,
		dialect: config.development.dialect,
		port: config.development.port
	  });
  } else if (process.env.NODE_ENV === 'test') {
	// code for test environment
	 sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: path.join('mydatabase.sqlite'),
		logging:false
	  });
	
  } else if (process.env.NODE_ENV === 'production') {
	// code for production environment
	sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
		host: config.development.host,
		dialect: config.development.dialect,
		port: config.development.port
	  });
  } else {
	console.error('Unknown environment:', process.env.NODE_ENV);
	process.exit(1);
  }


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
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
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
