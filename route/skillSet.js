const express = require('express');
const router = express.Router();
const SkillSet = require('../models/SkillSet.js');
const { Op } = require('sequelize');

router.get('/:skill_set?', function (req, res) {
    if (!req.params.skill_set) {
        SkillSet.findAll({})
            .then((SkillSets) => {
                let SkillSetsValues = [];
                for (const SkillSet of SkillSets) {
                    SkillSetsValues.push(SkillSet.dataValues);
                }

                res.status(200).json({
                    status: 'success',
                    message: 'All SkillSets successfully retrieved',
                    data: SkillSetsValues,
                });
                return;
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.status(503).json({
                    status: 'error',
                    message: 'Error while querying SkillSets',
                    data: {},
                });
                return;
            });
    } else {
        // supplied data for supplied SkillSet id  code here
        let skill_name = req.params.skill_set;

        SkillSet.findByPk(skill_name)
            .then((SkillSet) => {
                if (!SkillSet) {
                    res.status(200).json({
                        status: 'error',
                        message: 'Invalid SkillSet id',
                        data: {},
                    });
                    return;
                }
                res.status(200).json({
                    status: 'success',
                    message: 'SkillSet data successfully retrieved',
                    data: SkillSet.dataValues,
                });
                return;
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.status(200).json({
                    status: 'error',
                    message: 'Error while querying SkillSet',
                    data: {},
                });
                return;
            });

        return;
    }
});

router.post('/', function (req, res) {
    // add SkillSet to db code here

    const skill_name = req.body.skill_name;

    if (!skill_name) {
        res.status(400).json({
            status: 'error',
            message: 'Parameter missing',
            data: {},
        });
        return;
    }

    SkillSet.create(
        {
            skill_name: skill_name,
        },
        {
            fields: ['skill_name'],
        }
    )
        .then((SkillSet) => {
            res.status(200).json({
                status: 'success',
                message: 'SkillSet created successfully',
                data: SkillSet.dataValues,
            });
            return;
        })
        .catch((err) => {
            console.log('Error: ', err);
            res.status(503).json({
                status: 'error',
                message: 'Error while querying SkillSet',
                data: {},
            });
            return;
        });
});

router.put('/:skill_set', function (req, res) {
    // update already existing SkillSet code here

    if (!req.params.skill_set) {
        res.status(400).json({
            status: 'error',
            message: 'SkillSet id is not provided',
            data: {},
        });
        return;
    } else {
        const skill_set = req.params.skill_set;

        const skill_name = req.body.skill_name;

        SkillSet.findOne({ where: { skill_id: skill_set } })
            .then((SkillSet) => {
                SkillSet.update(
                    {
                        skill_name: skill_name,
                    },
                    { where: { skill_id: skill_set } }
                )
                    .then((SkillSet) => {
                        res.status(200).json({
                            status: 'success',
                            message: 'SkillSet successfully updated',
                            data: {},
                        });
                        return;
                    })
                    .catch((err) => {
                        console.log('Error: ', err);
                        res.status(500).json({
                            status: 'error',
                            message: 'Error while updating SkillSet',
                            data: {},
                        });
                        return;
                    });
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.status(404).json({
                    status: 'error',
                    message: 'Invalid SkillSet id',
                    data: {},
                });
                return;
            });
    }
});

router.delete('/:skill_set', function (req, res) {
    // delete SkillSet code here
    if (!req.params.skill_set) {
        res.status(400).json({
            status: 'error',
            message: 'SkillSet id is not provided',
            data: {},
        });
        return;
    } else {
        const skill_set = req.params.skill_set;

        SkillSet.destroy({
            where: { skill_id: skill_set },
        })
            .then((data) => {
                if (data) {
                    res.status(200).json({
                        status: 'success',
                        message: 'SkillSet deleted successfully',
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
                res.status(500).json({
                    status: 'error',
                    message: 'Error while querying data',
                    data: {},
                });
            });
    }
});

module.exports = router;
