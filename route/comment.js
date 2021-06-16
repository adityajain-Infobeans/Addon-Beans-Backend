const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
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

router.get('/:comment_id', function (req, res) {
    if (!req.params.comment_id) {
        res.status(400).json({
            status: 'error',
            message: 'Comment id not provided.',
            data: {},
        });
    } else {
        // supplied data for supplied comment id  code here
        let comment_id = req.params.comment_id;

        if (comment_id[0] === 'T') {
            let requirement_id = comment_id.slice(2);

            Comment.findAll({
                where: { requirement_id: requirement_id },
                order: [['comment_id', 'DESC']],
            })
                .then((comments) => {
                    let commentsValues = [];
                    for (const comment of comments) {
                        commentsValues.push(comment.dataValues);
                    }

                    res.status(200).json({
                        status: 'success',
                        message: 'All comments successfully retrieved',
                        data: commentsValues,
                    });
                    return;
                })
                .catch((err) => {
                    console.log('Error: ', err);
                    res.status(503).json({
                        status: 'error',
                        message: 'Error while querying comments',
                        data: {},
                    });
                    return;
                });

            return;
        } else {
            Comment.findByPk(comment_id)
                .then((comment) => {
                    if (!comment) {
                        res.status(406).json({
                            status: 'error',
                            message: 'Invalid comment id',
                            data: {},
                        });
                        return;
                    }
                    res.status(200).json({
                        status: 'success',
                        message: 'Comment data successfully retrieved',
                        data: comment.dataValues,
                    });
                    return;
                })
                .catch((err) => {
                    console.log('Error: ', err);
                    res.status(503).json({
                        status: 'error',
                        message: 'Error while querying comment',
                        data: {},
                    });
                    return;
                });

            return;
        }
    }
});

router.post('/', function (req, res) {
    // add comment to db code here
    const emp_id = req.body.employee_data.emp_id;
    const emp_name = req.body.employee_data.emp_name;
    const created_on = todays_date() + ' by ' + req.body.employee_data.emp_name;
    const updated_on = `${todays_date()} by ${req.body.employee_data.emp_name}`;
    const requirement_id = req.body.requirement_id;
    const comment = req.body.comment;

    if (!(requirement_id && comment)) {
        res.status(400).json({
            status: 'error',
            message: 'Parameter missing',
            data: {},
        });
        return;
    }

    Comment.create(
        {
            emp_id: emp_id,
            created_on: created_on,
            updated_on: updated_on,
            comment_by: emp_name,
            requirement_id: requirement_id,
            comment: comment,
        },
        {
            fields: [
                'emp_id',
                'created_on',
                'updated_on',
                'comment_by',
                'requirement_id',
                'contact',
                'comment',
            ],
        }
    )
        .then((comment) => {
            res.status(200).json({
                status: 'success',
                message: 'Comment created successfully',
                data: comment.dataValues,
            });
            return;
        })
        .catch((err) => {
            console.log('Error: ', err);
            res.status(503).json({
                status: 'error',
                message: 'Error while querying comment',
                data: {},
            });
            return;
        });
});

router.put('/:comment_id', function (req, res) {
    // update already existing comment code here

    if (!req.params.comment_id) {
        res.status(400).json({
            status: 'error',
            message: 'Comment id is not provided',
            data: {},
        });
        return;
    } else {
        const comment_id = req.params.comment_id;
        const updated_on = `${todays_date()} by ${
            req.body.employee_data.emp_name
        }`;
        const comment_data = req.body.comment;

        Comment.findOne({ where: { comment_id: comment_id } })
            .then((comment) => {
                Comment.update(
                    {
                        updated_on: updated_on,
                        comment: comment_data,
                    },
                    { where: { comment_id: comment_id } }
                )
                    .then((comment) => {
                        res.status(200).json({
                            status: 'success',
                            message: 'Comment successfully updated',
                            data: {},
                        });
                        return;
                    })
                    .catch((err) => {
                        console.log('Error: ', err);
                        res.status(500).json({
                            status: 'error',
                            message: 'Error while updating comment',
                            data: {},
                        });
                        return;
                    });
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.status(404).json({
                    status: 'error',
                    message: 'Invalid comment id',
                    data: {},
                });
                return;
            });
    }
});

router.delete('/:comment_id', function (req, res) {
    // delete comment code here
    if (!req.params.comment_id) {
        res.status(400).json({
            status: 'error',
            message: 'Comment id is not provided',
            data: {},
        });
        return;
    } else {
        const comment_id = req.params.comment_id;

        Comment.destroy({
            where: { comment_id: comment_id },
        })
            .then((data) => {
                if (data) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Comment deleted successfully',
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
