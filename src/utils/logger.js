const winston = require('winston');

const { NODE_ENV } = process.env;
const expressWinston = require('express-winston');
const packageName = require('../../package.json');

// log formatter
const logFormatter = winston.format.printf((info) => {
    const { timestamp, level, stack, message } = info;
    const errorMessage = stack || message;
    const symbols = Object.getOwnPropertySymbols(info);

    if (info[symbols[0]] !== 'error') {
        return `${timestamp} ${level}: ${message}`;
    }

    return `${timestamp} ${level}: ${errorMessage}`;
});

// create the base logger config
const baseLoggerConfig = {
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: `${packageName.name.toLocaleLowerCase()}-service` },
};

// create the console transport configuration
const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), logFormatter),
});

// create the logger with the console transport
const logger = winston.createLogger({
    ...baseLoggerConfig,
    transports: [consoleTransport],
});

// add file transport if in production environment
if (NODE_ENV === 'production') {
    logger.add(
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        })
    );
    logger.add(
        new winston.transports.File({
            filename: 'logs/combined.log',
            level: 'debug',
        })
    );
}

// export the logger
module.exports = logger;

// export the request logger middleware
module.exports.requestLogger = expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
    /**
     * a function which always returns 'false'
     * @param {object} _req - the request object
     * @param {object} _res - the response object
     * @returns {boolean} - always returns 'false'
     */
    ignoreRoute(_req, _res) {
        return false;
    },
});
