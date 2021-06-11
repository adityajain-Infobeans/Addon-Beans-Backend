const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { Op } = require('sequelize');

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
            status: {
                [Op.eq]: 1,
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
            status: {
                [Op.eq]: 2,
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
