const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
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

router.get('/:ticket_id?', function (req, res) {
    if (!req.params.ticket_id) {
        // send all tickets for dashboard  code here

        if (!req.body.employee_data.is_hr) {
            Ticket.findAll({ where: { emp_id: req.body.employee_data.emp_id } })
                .then((tickets) => {
                    let ticketsList = [];
                    for (const ticket of tickets) {
                        ticketsList.push(ticket.dataValues);
                    }

                    if (ticketsList.length === 0) {
                        res.status(404).json({
                            status: 'success',
                            message: 'No ticket found in database',
                            data: { ticketsList },
                        });
                        return;
                    }

                    res.status(200).json({
                        status: 'success',
                        message: 'Tickets successfully retrieved from database',
                        data: { ticketsList },
                    });
                    return;
                })
                .catch((err) => {
                    console.log('Error: ', err);
                    res.status(503).json({
                        status: 'error',
                        message: 'Error while querying tickets',
                        data: {},
                    });
                    return;
                });
        } else {
            Ticket.findAll()
                .then((tickets) => {
                    let ticketsList = [];
                    for (const ticket of tickets) {
                        ticketsList.push(ticket.dataValues);
                    }

                    if (ticketsList.length === 0) {
                        res.status(404).json({
                            status: 'success',
                            message: 'No ticket found in database',
                            data: { ticketsList },
                        });
                        return;
                    }

                    res.status(200).json({
                        status: 'success',
                        message: 'Tickets successfully retrieved from database',
                        data: { ticketsList },
                    });
                    return;
                })
                .catch((err) => {
                    console.log('Error: ', err);
                    res.status(503).json({
                        status: 'error',
                        message: 'Error while querying tickets',
                        data: {},
                    });
                    return;
                });
        }
    } else {
        // supplied data for supplied ticket id  code here
        let ticket_id = req.params.ticket_id;

        Ticket.findByPk(ticket_id)
            .then((ticket) => {
                if (!ticket) {
                    res.status(200).json({
                        status: 'error',
                        message: 'Invalid ticket id',
                        data: {},
                    });
                    return;
                }
                res.status(200).json({
                    status: 'success',
                    message: 'Ticket data successfully retrieved',
                    data: ticket.dataValues,
                });
                return;
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.status(200).json({
                    status: 'error',
                    message: 'Error while querying ticket',
                    data: {},
                });
                return;
            });
    }
});

router.post('/', function (req, res) {
    // add ticket to db code here

    const emp_id = req.body.employee_data.emp_id;
    const created_on = todays_date() + ' by ' + req.body.employee_data.emp_name;
    const updated_on = `${todays_date()} by ${req.body.employee_data.emp_name}`;
    const status = 1;
    const priority = req.body.priority;
    const contact = req.body.contact ? req.body.contact : null;
    const subject = req.body.subject;
    const description = req.body.description;
    const client_id = req.body.client_id;

    if (!(priority && subject && client_id && description)) {
        res.status(400).json({
            status: 'error',
            message: 'Parameter missing',
            data: {},
        });
        return;
    }

    Ticket.create(
        {
            emp_id: emp_id,
            created_on: created_on,
            updated_on: updated_on,
            status: status,
            priority: priority,
            contact: contact,
            subject: subject,
            description: description,
            client_id: client_id,
        },
        {
            fields: [
                'emp_id',
                'created_on',
                'updated_on',
                'status',
                'priority',
                'contact',
                'subject',
                'description',
                'client_id',
            ],
        }
    )
        .then((ticket) => {
            res.status(200).json({
                status: 'success',
                message: 'Ticket created successfully',
                data: ticket.dataValues,
            });
            return;
        })
        .catch((err) => {
            console.log('Error: ', err);
            res.status(503).json({
                status: 'error',
                message: 'Error while querying ticket',
                data: {},
            });
            return;
        });
});

router.put('/:ticket_id', function (req, res) {
    // update already existing ticket code here

    if (!req.params.ticket_id) {
        res.status(400).json({
            status: 'error',
            message: 'Ticket id is not provided',
            data: {},
        });
        return;
    } else {
        const ticket_id = req.params.ticket_id;
        const updated_on = `${todays_date()} by ${
            req.body.employee_data.emp_name
        }`;
        const status = req.body.status;
        const priority = req.body.priority;
        const contact = req.body.contact;
        const subject = req.body.subject;
        const description = req.body.description;
        const client_id = req.body.client_id;

        Ticket.findOne({ where: { ticket_id: ticket_id } })
            .then((ticket) => {
                Ticket.update(
                    {
                        updated_on: updated_on,
                        status: status,
                        priority: priority,
                        contact: contact,
                        subject: subject,
                        description: description,
                        client_id: client_id,
                    },
                    { where: { ticket_id: ticket_id } }
                )
                    .then((ticket) => {
                        res.status(200).json({
                            status: 'success',
                            message: 'Ticket successfully updated',
                            data: {},
                        });
                        return;
                    })
                    .catch((err) => {
                        console.log('Error: ', err);
                        res.status(500).json({
                            status: 'error',
                            message: 'Error while updating ticket',
                            data: {},
                        });
                        return;
                    });
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.status(404).json({
                    status: 'error',
                    message: 'Invalid ticket id',
                    data: {},
                });
                return;
            });
    }
});

router.delete('/:ticket_id', function (req, res) {
    // delete ticket code here

    if (!req.params.ticket_id) {
        res.status(400).json({
            status: 'error',
            message: 'Ticket id is not provided',
            data: {},
        });
        return;
    } else {
        const ticket_id = req.params.ticket_id;

        Ticket.destroy({
            where: { ticket_id: ticket_id },
        })
            .then((data) => {
                if (data) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Ticket deleted successfully',
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
