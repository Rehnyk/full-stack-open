const logger = require('./logger');
const morgan = require('morgan');

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};
morgan.token('postData', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    } else {
        return '';
    }
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' });
    }

    if (error.name === 'ValidationError') {
        return response.status(403).send({ error: error.message });
    }
    next(error);
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    morgan
};