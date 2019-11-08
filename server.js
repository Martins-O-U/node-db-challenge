const express = require('express');
const helmet = require('helmet');

const foodRouter = require('./router/project-route')
const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/', foodRouter)

module.exports = server;
