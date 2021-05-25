const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

router.get('/', function (req, res) {
    // show all clients code here

    Client.findAll({
        attributes: ['client_id', 'client_name'],
    })
        .then((clients) => {
            let clientsList = [];
            for (const client of clients) {
                clientsList.push(client.dataValues);
            }

            if (clientsList.length === 0) {
                res.json({
                    status: 'success',
                    message: 'No client found in database',
                    data: { clientsList },
                });
                return;
            }

            res.json({
                status: 'success',
                message: 'Clients successfully retrieved from database',
                data: { clientsList },
            });
            return;
        })
        .catch((err) => {
            console.log('Error: ', err);
            res.json({
                status: 'error',
                message: 'Error while querying clients',
                data: {},
            });
            return;
        });
});

module.exports = router;
