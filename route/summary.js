const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { Op } = require('sequelize');

/**
 * @swagger
 * /ticket/summary:
 *   get:
 *     summary: Fetch summary of statistics.
 *     tags:
 *        - Ticket
 *     description: Fetch count of open tickets,closed ticket & total tickets JWT,else send error message
 */

// tickets summary for dashboard
router.get('/', (req, res) => {
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
            res.status(200).json({
                status: 'success',
                message: 'Data retrieved successfully',
                data: {
                    totalTickets: response[0],
                    openTicket: response[1],
                    resolvedTicket: response[2],
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'error occurred with promise',
                data: {},
            });
        });
});

module.exports = router;