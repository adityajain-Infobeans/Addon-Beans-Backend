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

/**
 * @swagger
 * /comment/T_{ticket_id}:
 *   get:
 *     summary: Retrieve all the comments of provided ticket from database.
 *     tags:
 *        - Comment
 *     description: Retrieve a list of the comments of provided ticket from the database. JWT token is required,
 *     operationId: getCommentById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ticket_id
 *         in: path
 *         description: ID of ticket whose comment to return
 *         required: true
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: Comment not found
 */

/**
 * @swagger
 * /comment/C_{comment_id}:
 *   get:
 *     summary: Fetch comment data from database.
 *     tags:
 *        - Comment
 *     description: Fetch all the data of the provided comment id from the database. JWT token is required
 *     operationId: getCommentById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: comment_id
 *         in: path
 *         description: ID of comment to return
 *         required: true
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: Comment not found
 */
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
            let ticket_id = comment_id.slice(2);

            Comment.findAll({ where: { ticket_id: ticket_id } })
                .then((comments) => {
                    let commentsValues = [];
                    for (const comment of comments) {
                        commentsValues.push(comment.dataValues);
                    }

                    res.status(200).json({
                        status: 'success',
                        message: 'Comment data successfully retrieved',
                        data: commentsValues,
                    });
                    return;
                })
                .catch((err) => {
                    console.log('Error: ', err);
                    res.status(200).json({
                        status: 'error',
                        message: 'Error while querying comments',
                        data: {},
                    });
                    return;
                });

            return;
        } else if (comment_id[0] === 'C') {
            comment_id = comment_id.slice(2);
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
        } else {
            res.status(400).json({
                status: 'error',
                message: 'Invalid id',
                data: {},
            });

            return;
        }
    }
});

/**
 * @swagger
 * /comment/:
 *   post:
 *     summary: Write comment data to database.
 *     tags:
 *        - Comment
 *     description: Create a new entry by writing the provided comment data in the database. JWT token is required
 *     operationId: getCommentById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: comment_id
 *         in: path
 *         description: ID of comment to return
 *         required: true
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: Comment not found
 */

router.post('/', function (req, res) {
    // add comment to db code here
    const emp_id = req.body.employee_data.emp_id;
    const emp_name = req.body.employee_data.emp_name;
    const created_on = todays_date() + ' by ' + req.body.employee_data.emp_name;
    const updated_on = `${todays_date()} by ${req.body.employee_data.emp_name}`;
    const ticket_id = req.body.ticket_id;
    const comment = req.body.comment;

    if (!(ticket_id && comment)) {
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
            ticket_id: ticket_id,
            comment: comment,
        },
        {
            fields: [
                'emp_id',
                'created_on',
                'updated_on',
                'comment_by',
                'ticket_id',
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

/**
 * @swagger
 * /comment/{comment_id}:
 *   put:
 *     summary: Update comment data in database.
 *     tags:
 *        - Comment
 *     description: Update the comment entry in our database with the provided data. JWT token is required
 *     operationId: getCommentById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: comment_id
 *         in: path
 *         description: ID of comment to return
 *         required: true
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: Comment not found
 */

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
        const comment = req.body.comment;

        Comment.findOne({ where: { comment_id: comment_id } })
            .then((comment) => {
                Comment.update(
                    {
                        updated_on: updated_on,
                        comment: comment,
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

/**
 * @swagger
 * /comment/{comment_id}:
 *   delete:
 *     summary: Delete comment data from database.
 *     tags:
 *        - Comment
 *     description: Delete the comment with provided id from the database. JWT token is required
 *     operationId: getCommentById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: comment_id
 *         in: path
 *         description: ID of comment to return
 *         required: true
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: Comment not found
 */

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
