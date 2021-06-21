const express = require('express');
const router = express.Router();
const Requirement = require('../models/Requirement');
const Client = require('../models/Client');
const { Op } = require('sequelize');

let todays_date = () => {
    today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = `0${dd}`;
    }

    if (mm < 10) {
        mm = `0${mm}`;
    }

    return `${dd}-${mm}-${yyyy}`;
};

router.get('/:requirement_id?', function (req, res) {
    if (!req.params.requirement_id) {
        // send all requirements for dashboard  code here

        const query = req.body.employee_data.is_hr
            ? {}
            : {
                  where: { emp_id: req.body.employee_data.emp_id },
                  include: [
                      {
                          model: Client,
                      },
                  ],
              };

        Requirement.findAll(query)
            .then((requirements) => {
                let requirementsList = [];

                for (const requirement of requirements) {
                    requirementsList.push(requirement.dataValues);
                }
                console.log();

                if (requirementsList.length === 0) {
                    res.status(404).json({
                        status: 'success',
                        message: 'No requirement found in database',
                        data: { requirementsList },
                    });
                    return;
                }

                res.status(200).json({
                    status: 'success',
                    message:
                        'Requirements successfully retrieved from database',
                    data: { requirementsList },
                });
                return;
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.status(503).json({
                    status: 'error',
                    message: 'Error while querying requirements',
                    data: {},
                });
                return;
            });
    } else {
        // supplied data for supplied requirement id  code here
        let requirement_id = req.params.requirement_id;

        Requirement.findByPk(requirement_id)
            .then((requirement) => {
                if (!requirement) {
                    res.status(200).json({
                        status: 'error',
                        message: 'Invalid requirement id',
                        data: {},
                    });
                    return;
                }
                res.status(200).json({
                    status: 'success',
                    message: 'Requirement data successfully retrieved',
                    data: requirement.dataValues,
                });
                return;
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.status(200).json({
                    status: 'error',
                    message: 'Error while querying requirement',
                    data: {},
                });
                return;
            });
    }
});

router.post('/', function (req, res) {
    // add requirement to db code here

    const emp_id = req.body.employee_data.emp_id;
    const created_on = todays_date() + ' by ' + req.body.employee_data.emp_name;
    const updated_on = `${todays_date()} by ${req.body.employee_data.emp_name}`;
    const status = 1;
    const timeline = req.body.timeline;
    const number_of_position = req.body.number_of_position;
    const skill_set = JSON.stringify(req.body.skill_set);
    const additional_note = req.body.additional_note
        ? req.body.additional_note
        : null;
    const experience = req.body.experience;
    const client_id = req.body.client_id;

    if (
        !(
            timeline &&
            number_of_position &&
            skill_set &&
            experience &&
            client_id
        )
    ) {
        res.status(400).json({
            status: 'error',
            message: 'Parameter missing',
            data: {},
        });
        return;
    }

    Requirement.create(
        {
            emp_id: emp_id,
            created_on: created_on,
            updated_on: updated_on,
            status: status,
            timeline: timeline,
            number_of_position: number_of_position,
            skill_set: skill_set,
            additional_note: additional_note,
            experience: experience,
            client_id: client_id,
        },
        {
            fields: [
                'emp_id',
                'created_on',
                'updated_on',
                'status',
                'timeline',
                'number_of_position',
                'skill_set',
                'additional_note',
                'experience',
                'client_id',
            ],
        }
    )
        .then((requirement) => {
            res.status(200).json({
                status: 'success',
                message: 'Requirement created successfully',
                data: requirement.dataValues,
            });
            return;
        })
        .catch((err) => {
            console.log('Error: ', err);
            res.status(503).json({
                status: 'error',
                message: 'Error while querying requirement',
                data: {},
            });
            return;
        });
});

router.put('/:requirement_id', function (req, res) {
    // update already existing requirement code here

    if (!req.params.requirement_id) {
        res.status(400).json({
            status: 'error',
            message: 'Requirement id is not provided',
            data: {},
        });
        return;
    } else {
        const requirement_id = req.params.requirement_id;
        const updated_on = `${todays_date()} by ${
            req.body.employee_data.emp_name
        }`;
        const status = req.body.status;
        const timeline = req.body.timeline;
        const number_of_position = req.body.number_of_position;
        const skill_set = JSON.stringify(req.body.skill_set);
        const experience = req.body.experience;
        const client_id = req.body.client_id;

        Requirement.findOne({ where: { requirement_id: requirement_id } })
            .then((requirement) => {
                Requirement.update(
                    {
                        updated_on: updated_on,
                        status: status,
                        timeline: timeline,
                        number_of_position: number_of_position,
                        skill_set: skill_set,
                        experience: experience,
                        client_id: client_id,
                    },
                    { where: { requirement_id: requirement_id } }
                )
                    .then((requirement) => {
                        res.status(200).json({
                            status: 'success',
                            message: 'Requirement successfully updated',
                            data: {},
                        });
                        return;
                    })
                    .catch((err) => {
                        console.log('Error: ', err);
                        res.status(500).json({
                            status: 'error',
                            message: 'Error while updating requirement',
                            data: {},
                        });
                        return;
                    });
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.status(404).json({
                    status: 'error',
                    message: 'Invalid requirement id',
                    data: {},
                });
                return;
            });
    }
});

router.delete('/:requirement_id', function (req, res) {
    // delete requirement code here

    if (!req.params.requirement_id) {
        res.status(400).json({
            status: 'error',
            message: 'Requirement id is not provided',
            data: {},
        });
        return;
    } else {
        const requirement_id = req.params.requirement_id;

        Requirement.destroy({
            where: { requirement_id: requirement_id },
        })
            .then((data) => {
                if (data) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Requirement deleted successfully',
                        data: {},
                    });
                    return;
                }
                res.status(404).json({
                    status: 'error',
                    message: 'Invalid id',
                    data: {},
                });
                return;
            })
            .catch((err) => {
                console.log(err);
                res.status(503).json({
                    status: 'error',
                    message: 'Error while querying data',
                    data: {},
                });
            });
    }
});

module.exports = router;
