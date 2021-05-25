const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

const Client = db.define(
    'Client',
    {
        client_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        client_name: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'infobeans_clients',
        timestamps: false,
    }
);

module.exports = Client;
