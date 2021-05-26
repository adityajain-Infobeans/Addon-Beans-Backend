const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({
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
                    is_hr: data.dataValues.emp_role,
                    emp_email: data.dataValues.emp_email,
                };

                jwt.sign(
                    employee_data,
                    process.env.JWT_SECRET,
                    (err, JWT_data) => {
                        if (err) {
                            console.log('JWT Error: ', err);
                            res.json({
                                status: 'error',
                                message: 'Error while signing JWT.',
                                data: {},
                            });
                            res.end();
                            return;
                        }
                        console.log('JWT data: ', JWT_data);
                        employee_data.token = JWT_data;

                        res.json({
                            status: 'success',
                            message: 'Employee Found',
                            data: employee_data,
                        });
                        res.end();
                    }
                );
            } else {
                res.json({
                    status: 'error',
                    message: 'No Employee Found',
                    data: {},
                });
                res.end();
            }
        })
        .catch((err) => {
            console.log('error: ', err);

            res.json({
                status: 'error',
                message: 'error occurred while querying',
                data: {},
            });
            res.end();
        });
});

module.exports = router;
