const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');
const Employee = require('./Employee');
const Client = require('./Client');
const SkillSet = require('./SkillSet');

const Requirement = db.define(
    'Requirement',
    {
        requirement_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        emp_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Employee,
                key: 'emp_id',
            },
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        timeline: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        additional_note: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        skill_set: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        number_of_position: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        updated_on: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_on: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Client,
                key: 'client_id',
            },
        },
    },
    {
        tableName: 'infobeans_requirements',
        timestamps: false,
    }
);

//Relations
Requirement.belongsTo(Client, {
    foreignKey: 'client_id',
    sourceKey: 'client_id',
});

module.exports = Requirement;
