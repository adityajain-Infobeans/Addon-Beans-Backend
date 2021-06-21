const express = require('express');
var cors = require('cors');
const db = require('./database');
const jwt = require('jsonwebtoken');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swagger.json');

const app = express();
const port = 3000;

require('dotenv').config();

const Employee = require('./route/employee');
const Requirement = require('./route/requirement');
const Comment = require('./route/comment');
const Client = require('./route/client');
const Summary = require('./route/summary');
const SkillSets = require('./route/skillSet');

app.use(cors());
app.use(express.json());

const options = {
    swaggerDefinition,
    apis: ['./route/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

/* 

API :
Requirement CRUD 
Comments CRUD 
Skill Set CRUD 
POST: Login Employee
GET: requirements summary
GET: allRequirements
GET: clients list

*/
app.use('/employee', db_connect, Employee);
app.use('/requirement', checkAuth, db_connect, Requirement);
app.use('/comment', checkAuth, db_connect, Comment);
app.use('/skillset', checkAuth, db_connect, SkillSets);
app.use('/client', checkAuth, db_connect, Client);
app.use('/summary', checkAuth, db_connect, Summary);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
            res.status(503).json({
                status: 'error',
                message: 'error occurred while connecting with database',
                data: {},
            });
        });
}

function checkAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (authHeader && token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                console.log(err);
                res.status(401).json({
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
        res.status(400).json({
            status: 'error',
            message: 'JWT not provided',
            data: {},
        });
        return;
    }
}
