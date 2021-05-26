const express = require('express');
var cors = require('cors');
const db = require('./database');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

require('dotenv').config();

const Employee = require('./route/employee');
const Ticket = require('./route/ticket');
const Comment = require('./route/comment');
const Client = require('./route/client');

app.use(cors());
app.use(express.json());
app.use(db_connect); // Custom middleware to check if DB is available of not

/* 

API :
Ticket CRUD 
Comments CRUD 
POST: Login Employee
GET: tickets summary
GET: allTickets
GET: clients list

*/
app.use('/employee', Employee);
app.use('/ticket', checkAuth, Ticket);
app.use('/comment', checkAuth, Comment);
app.use('/client', checkAuth, Client);

app.get('/', (req, res) => {
    res.send('Imagine api doc here');
});

app.get('*', (req, res) => {
    res.send('Invalid path, please read the document').status(400);
});

app.post('*', (req, res) => {
    res.send('Invalid path, please read the document').status(400);
});

app.put('*', (req, res) => {
    res.send('Invalid path, please read the document').status(400);
});

app.delete('*', (req, res) => {
    res.send('Invalid path, please read the document').status(400);
});

app.listen(port);

function db_connect(req, res, next) {
    db.authenticate()
        .then(() => {
            console.log('Database Connected');
            next();
            return;
        })
        .catch((err) => {
            console.log('Error ', err);
            res.json({
                status: 'error',
                message: 'error occurred while connecting with database',
                data: {},
            });
            res.end();
        });
}

function checkAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (authHeader && token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                console.log(err);
                res.json({
                    status: 'error',
                    message: 'JWT auth failed',
                    data: {},
                });
                return;
            }
            req.body.employee_data = data;
            next();
        });
    } else {
        res.json({
            status: 'error',
            message: 'JWT not provided',
            data: {},
        });
        return;
    }
}
