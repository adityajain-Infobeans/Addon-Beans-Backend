const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

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
        },
        emp_id: {
            type: DataTypes.INTEGER,
        },
        comment: {
            type: DataTypes.STRING,
        },
        created_on: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'infobeans_comments',
        timestamps: false,
    }
);

module.exports = Comment;
