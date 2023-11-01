const logger = require('./logger');

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};

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

    if (error.message === 'InvalidPassword') {
        return response.status(401).send({ error: 'Password has to be at least 3 characters' });
    }

    if (error.name ===  'JsonWebTokenError') {
        return response.status(401).json({ error: error.message });
    }

    if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' });
    }

    next(error);
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
};