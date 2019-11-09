const express = require('express');
const helmet = require('helmet');

const projectRouter = require('./router/project-route')
const resourceRouter = require('./router/resource-route')
const taskRouter = require('./router/task-route')
const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/', projectRouter)
server.use('/api/', resourceRouter)
server.use('/api/', taskRouter)

module.exports = server;
