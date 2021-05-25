const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');
const Employee = require('./Employee');
const Ticket = require('./Ticket');

const Comment = db.define(
    'Comment',
    {
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ticket_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Ticket,
                key: 'ticket_id',
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
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_on: {
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
