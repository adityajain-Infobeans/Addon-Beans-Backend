require('dotenv').config();

const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    process.env.SQL_Database,
    process.env.SQL_Username,
    process.env.SQL_Password,
    {
        host: process.env.SQL_Server,
        dialect: 'mysql',
    }
);
