const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

function checkAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (authHeader && token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                console.log(err);
                res.status(401).json({
                    status: 'error',
                    message: 'JWT auth failed',
                    data: {},
                });
                return;
            }
            req.body.employee_data = data;
            next();
        });
    } else {
        res.status(400).json({
            status: 'error',
            message: 'JWT not provided',
            data: {},
        });
        return;
    }
}

router.post('/', function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            status: 'error',
            message: 'Some Parameter missing',
            data: {},
        });
        return;
    }
    const emp_email = req.body.email;
    const emp_password = req.body.password;

    Employee.findOne({
        where: { emp_email: emp_email },
    })
        .then((data) => {
            if (data !== null) {
                if (!data.dataValues.is_active) {
                    res.status(401).json({
                        status: 'error',
                        message:
                            'Your account is deactivated, please contact IT team.',
                        data: {},
                    });
                    return;
                } else if (
                    !bcrypt.compareSync(
                        emp_password,
                        data.dataValues.emp_password
                    )
                ) {
                    res.status(401).json({
                        status: 'error',
                        message: 'wrong username or password',
                        data: {},
                    });
                    return;
                }

                let employee_data = {
                    emp_id: data.dataValues.emp_id,
                    emp_name: data.dataValues.emp_name,
                    is_hr: data.dataValues.is_hr,
                    emp_email: data.dataValues.emp_email,
                };

                jwt.sign(
                    employee_data,
                    process.env.JWT_SECRET,
                    (err, JWT_data) => {
                        if (err) {
                            console.log('JWT Error: ', err);
                            res.status(503).json({
                                status: 'error',
                                message: 'Error while signing JWT.',
                                data: {},
                            });
                            return;
                        }
                        console.log('JWT data: ', JWT_data);
                        employee_data.token = JWT_data;

                        res.status(200).json({
                            status: 'success',
                            message: 'Employee Found',
                            data: employee_data,
                        });
                    }
                );
            } else {
                res.status(406).json({
                    status: 'error',
                    message: 'No Employee Found',
                    data: {},
                });
            }
        })
        .catch((err) => {
            console.log('error: ', err);

            res.status(500).json({
                status: 'error',
                message: 'error occurred while querying',
                data: {},
            });
        });
});

router.get('/', checkAuth, function (req, res) {
    Employee.findAll({ attributes: ['emp_id', 'emp_name'] })
        .then((employees) => {
            let employeeList = [];
            for (const employee of employees) {
                employeeList.push(employee.dataValues);
            }

            if (employeeList.length === 0) {
                res.status(404).json({
                    status: 'success',
                    message: 'No requirement found in database',
                    data: { employeeList },
                });
                return;
            }

            res.status(200).json({
                status: 'success',
                message: 'Requirements successfully retrieved from database',
                data: { employeeList },
            });
            return;
        })
        .catch((err) => {
            console.log('Error: ', err);
            res.status(503).json({
                status: 'error',
                message: 'Error while querying employees data',
                data: {},
            });
            return;
        });
});

router.put('/', checkAuth, function (req, res) {
    if (!req.body.newPassword) {
        res.status(400).json({
            status: 'error',
            message: 'Some Parameter missing',
            data: {},
        });
        return;
    }
    const emp_email = req.body.employee_data.emp_email;
    const emp_newPassword = req.body.newPassword;

    Employee.findOne({
        where: { emp_email: emp_email },
    })
        .then((data) => {
            if (data !== null) {
                const hash = bcrypt.hashSync(emp_newPassword, 10);

                Employee.update(
                    {
                        emp_password: hash,
                    },
                    { where: { emp_email: emp_email } }
                )
                    .then((employee) => {
                        res.status(200).json({
                            status: 'success',
                            message: 'Password successfully updated',
                            data: {},
                        });
                        return;
                    })
                    .catch((err) => {
                        console.log('Error: ', err);
                        res.status(500).json({
                            status: 'error',
                            message: 'Error while updating password',
                            data: {},
                        });
                        return;
                    });
            }
        })

        .catch((err) => {
            console.log('error: ', err);

            res.status(500).json({
                status: 'error',
                message: 'error occurred while querying',
                data: {},
            });
        });
});

module.exports = router;
