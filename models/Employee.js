const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

const Employee = db.define(
    'Employee',
    {
        emp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        emp_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emp_role: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        emp_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emp_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'infobeans_employee_details',
        timestamps: false,
    }
);

module.exports = Employee;
