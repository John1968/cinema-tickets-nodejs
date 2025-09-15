import dwpNodeLogger from '@dwp/node-logger';
import { LOGGING_LEVEL } from '../../src/pairtest/lib/Config';
import logger from '../../src/pairtest/lib/logger';
const reloadedLogger = require('../../src/pairtest/lib/logger');

jest.mock('@dwp/node-logger');
jest.mock('../../src/pairtest/lib/Config', () => ({
  LOGGING_LEVEL: 'INFO'
}));

describe('logger', () => {
  it('should call dwpNodeLogger with correct arguments', () => {
    expect(dwpNodeLogger).toHaveBeenCalledWith('api', { logLevel: 'info' });
  });
});