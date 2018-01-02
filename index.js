require('dotenv').config()
const Emma = require('emma-sdk');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Configure application routes
var routes = require('./controllers/router');
var webhookRouter = express.Router();

routes.webhookRoutes(webhookRouter);

app.use(webhookRouter);

var server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log("Express server running on port " + process.env.PORT);
});