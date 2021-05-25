const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { Op } = require('sequelize');

router.get('/:comment_id?', function (req, res) {
    if (!req.params.comment_id) {
        // send all comments for dashboard  code here

        res.send('');
    } else {
        // supplied data for supplied comment id  code here
        res.send('');
    }
});

router.post('/', function (req, res) {
    // add comment to db code here
    res.end('');
});

router.put('/', function (req, res) {
    // update already existing comment code here
    res.end('');
});

router.delete('/', function (req, res) {
    // delete comment code here
    res.end('');
});

module.exports = router;
