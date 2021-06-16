const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');
const Employee = require('./Employee');
const Requirement = require('./Requirement');

const Comment = db.define(
    'Comment',
    {
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        requirement_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Requirement,
                key: 'requirement_id',
            },
        },
        emp_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Employee,
                key: 'emp_id',
            },
        },
        comment_by: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_on: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        updated_on: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'infobeans_comments',
        timestamps: false,
    }
);

module.exports = Comment;
