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

        Ticket.findAll()
            .then((tickets) => {
                let ticketsList = [];
                for (const ticket of tickets) {
                    ticketsList.push(ticket.dataValues);
                }

                if (ticketsList.length === 0) {
                    res.json({
                        status: 'success',
                        message: 'No ticket found in database',
                        data: { ticketsList },
                    });
                    return;
                }

                res.json({
                    status: 'success',
                    message: 'Tickets successfully retrieved from database',
                    data: { ticketsList },
                });
                return;
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.json({
                    status: 'error',
                    message: 'Error while querying tickets',
                    data: {},
                });
                return;
            });
    } else {
        // supplied data for supplied ticket id  code here
        let ticket_id = req.params.ticket_id;

        Ticket.findByPk(ticket_id)
            .then((ticket) => {
                if (!ticket) {
                    res.json({
                        status: 'error',
                        message: 'Invalid ticket id',
                        data: {},
                    });
                    return;
                }
                res.json({
                    status: 'success',
                    message: 'Ticket data successfully retrieved',
                    data: ticket.dataValues,
                });
                return;
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.json({
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
    const status = req.body.status;
    const priority = req.body.priority;
    const contact = req.body.contact ? req.body.contact : null;
    const subject = req.body.subject;
    const client_id = req.body.client_id;

    if (!(status && priority && subject && client_id)) {
        res.json({
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
                'client_id',
            ],
        }
    )
        .then((ticket) => {
            res.json({
                status: 'success',
                message: 'Ticket created successfully',
                data: ticket.dataValues,
            });
            return;
        })
        .catch((err) => {
            console.log('Error: ', err);
            res.json({
                status: 'error',
                message: 'Error while querying ticket',
                data: {},
            });
            return;
        });
});

router.put('/', function (req, res) {
    // update already existing ticket code here
    res.end('');
});

router.delete('/:ticket_id', function (req, res) {
    // delete ticket code here

    if (!req.params.ticket_id) {
        res.json({
            status: 'error',
            message: 'Ticket id is not provided',
            data: {},
        });
        return;
    } else {
        let ticket_id = req.params.ticket_id;

        Ticket.destroy({
            where: { ticket_id: ticket_id },
        })
            .then((data) => {
                if (data) {
                    res.json({
                        status: 'success',
                        message: 'Ticket deleted successfully',
                        data: {},
                    });
                    return;
                }
                res.json({
                    status: 'error',
                    message: 'Invalid id',
                    data: {},
                });
                return;
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    status: 'error',
                    message: 'Error while querying data',
                    data: {},
                });
            });
    }
});

// tickets summary for dashboard
router.get('/summary', (req, res) => {
    const totalTickets = Ticket.count({})
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });

    const openTicket = Ticket.count({
        where: {
            ticket_id: {
                [Op.eq]: 'open',
            },
        },
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });

    const resolvedTicket = Ticket.count({
        where: {
            ticket_id: {
                [Op.eq]: 'closed',
            },
        },
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });

    Promise.all([totalTickets, openTicket, resolvedTicket])
        .then((response) => {
            res.json({
                status: 'success',
                message: 'Data retrieved successfully',
                data: {
                    totalTickets: response[0],
                    openTicket: response[1],
                    resolvedTicket: response[2],
                },
            });
            res.end();
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: 'error',
                message: 'error occurred with promise',
                data: {},
            });
            res.end();
        });
});

module.exports = router;
