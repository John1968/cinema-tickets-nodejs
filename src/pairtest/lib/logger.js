import dwpNodeLogger from '@dwp/node-logger';
import { LOGGING_LEVEL } from './Config.js';

const logger = dwpNodeLogger('api', { logLevel: LOGGING_LEVEL.toLowerCase() });

export default logger;
