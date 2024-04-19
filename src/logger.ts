const logger = require('pino')({ level: process.env.LOG_LEVEL || 'info' });

export default logger;
