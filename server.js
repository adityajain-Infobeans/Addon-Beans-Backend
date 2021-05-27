const express = require('express');
var cors = require('cors');
const db = require('./database');
const jwt = require('jsonwebtoken');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

require('dotenv').config();

const Employee = require('./route/employee');
const Ticket = require('./route/ticket');
const Comment = require('./route/comment');
const Client = require('./route/client');

app.use(cors());
app.use(express.json());

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Support Ticket System ',
        version: '1.0.0',
        description:
            'A simple web application where [Frontend](https://github.com/adityajain-Infobeans/Support-Ticket-System-Frontend) is created using Vue and [Backend](https://github.com/adityajain-Infobeans/Support-Ticket-System-Backend) is created on node using express. Frontend will communicate with Backend via REST APIs for authentication and database operations',

        contact: {
            name: 'Aditya Jain',
            url: 'https://aadityajain.dev',
            email: 'adityan.jain@infobeans.com',
        },
    },
    tags: [
        {
            name: 'Client',
            description: 'Client list API',
        },
        {
            name: 'Comment',
            description: 'Comments CRUD API',
        },
        {
            name: 'Employee',
            description: 'Employee login API',
        },
        {
            name: 'Ticket',
            description: 'Tickets CRUD API',
        },
    ],

    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
        {
            url: 'https://infobeans-support.herokuapp.com/',
            description: 'Production server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./route/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

/* 

API :
Ticket CRUD 
Comments CRUD 
POST: Login Employee
GET: tickets summary
GET: allTickets
GET: clients list

*/
app.use('/employee', db_connect, Employee);
app.use('/ticket', checkAuth, db_connect, Ticket);
app.use('/comment', checkAuth, db_connect, Comment);
app.use('/client', checkAuth, db_connect, Client);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('*', (req, res) => {
    res.status(404).send('Invalid path or method,, please read the document');
});

app.post('*', (req, res) => {
    res.status(404).send('Invalid path or method,, please read the document');
});

app.put('*', (req, res) => {
    res.status(404).send('Invalid path or method, please read the document');
});

app.delete('*', (req, res) => {
    res.status(404).send('Invalid path or method,, please read the document');
});

app.listen(process.env.PORT || port);

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
