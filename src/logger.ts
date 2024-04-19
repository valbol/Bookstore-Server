const log = require('pino')({ level: process.env.LOG_LEVEL || 'info' });

export default log;
