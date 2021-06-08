const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * @swagger
 * /:
 *   post:
 *     summary: .
 *     tags:
 *        - Employee
 *     description:
 */

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
        where: { emp_email: emp_email, emp_password: emp_password },
    })
        .then((data) => {
            if (data !== null) {
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

module.exports = router;
