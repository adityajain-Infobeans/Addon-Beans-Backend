const express = require('express');
const router = express.Router();
const Requirement = require('../models/Requirement');
const { Op } = require('sequelize');

// requirements summary for dashboard
router.get('/', (req, res) => {
    const totalRequirements = Requirement.count({})
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });

    const openRequirement = Requirement.count({
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

    const resolvedRequirement = Requirement.count({
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

    Promise.all([totalRequirements, openRequirement, resolvedRequirement])
        .then((response) => {
            res.status(200).json({
                status: 'success',
                message: 'Data retrieved successfully',
                data: {
                    totalRequirements: response[0],
                    openRequirement: response[1],
                    resolvedRequirement: response[2],
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
