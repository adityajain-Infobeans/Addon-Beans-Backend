const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

const SkillSet = db.define(
    'SkillSet',
    {
        skill_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        skill_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'infobeans_skill_sets',
        timestamps: false,
    }
);

module.exports = SkillSet;
