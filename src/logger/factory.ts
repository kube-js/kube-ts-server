import FactoryConfig from './FactoryConfig';
import winstonFactory from './winston/factory';

export default (config: FactoryConfig) => {
  switch (config.type) {
    default:
    case 'winston':
      return winstonFactory(config.winston);
  }
};

// tslint:disable:jsdoc-format
/**
 * check: https://github.com/fluent/fluent-logger-node
 * var winston = require('winston');
var config = {
  host: 'localhost',
  port: 24224,
  timeout: 3.0,
  requireAckResponse: true // Add this option to wait response from Fluentd certainly
};
var fluentTransport = require('fluent-logger').support.winstonTransport();
var logger = winston.createLogger({
    transports: [new fluentTransport('mytag', config), new (winston.transports.Console)()]
});

logger.on('logging', (transport, level, message, meta) => {
  if (meta.end && transport.sender && transport.sender.end) {
    transport.sender.end();
  }
});

logger.log('info', 'this log record is sent to fluent daemon');
logger.info('this log record is sent to fluent daemon');
logger.info('end of log message', { end: true });
 */
