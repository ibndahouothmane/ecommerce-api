const { Sequelize } = require('sequelize');
require('dotenv').config();

const dialect = process.env.DB_DIALECT || 'sqlite';

const commonOptions = {
  dialect,
  logging: process.env.DB_LOGGING === 'true' ? console.log : false,
};

let sequelize;

if (dialect === 'sqlite') {
  sequelize = new Sequelize({
    ...commonOptions,
    storage: process.env.DB_STORAGE || './database.sqlite',
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'ecommerce',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
      ...commonOptions,
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
    }
  );
}

module.exports = sequelize;
