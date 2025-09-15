import * as Config from '../../src/pairtest/lib/Config';

describe('Config.js', () => {
  it('LOGGING_LEVEL should be "info"', () => {
    expect(Config.LOGGING_LEVEL).toBe('info');
  });

  it('BASE_RESERVATION_OBJECT should have correct initial values', () => {
    expect(Config.BASE_RESERVATION_OBJECT).toEqual({ ADULT: 0, CHILD: 0, INFANT: 0 });
  });

  it('TICKET_BOOKING_CONSTANTS should have correct structure and values', () => {
    expect(Config.TICKET_BOOKING_CONSTANTS.ADULT).toEqual({ type: 'ADULT', cost: 25 });
    expect(Config.TICKET_BOOKING_CONSTANTS.CHILD).toEqual({ type: 'CHILD', cost: 15 });
    expect(Config.TICKET_BOOKING_CONSTANTS.INFANT).toEqual({ type: 'INFANT', cost: 0 });
  });

  it('MAX_TICKETS should be 25', () => {
    expect(Config.MAX_TICKETS).toBe(25);
  });

  it('MIN_TICKETS should be 1', () => {
    expect(Config.MIN_TICKETS).toBe(1);
  });

  it('ERROR_MAP should contain all expected error messages', () => {
    expect(Config.ERROR_MAP.ACCOUNT_ID_LESS_THAN_ONE).toBe('The account ID must be greater than 0');
    expect(Config.ERROR_MAP.ACCOUNT_ID_IS_NOT_A_NUMBER).toBe('The account ID must be an integer');
    expect(Config.ERROR_MAP.ACCOUNT_ID_NOT_PROVIDED).toBe('An account ID must be provided');
    expect(Config.ERROR_MAP.ACCOUNT_ID_UNDEFINED).toBe('Account ID cannot be undefined');
    expect(Config.ERROR_MAP.INVALID_PARAMETERS).toBe('Invalid parameters passed to the service');
    expect(Config.ERROR_MAP.NO_TICKETS_IN_BOOKING).toBe('There must be a minimum of 1 ticket per booking');
    expect(Config.ERROR_MAP.NO_OF_SEATS_IS_NOT_AN_INTEGER).toBe('totalSeatsToAllocate must be an integer');
    expect(Config.ERROR_MAP.MAX_TICKETS_EXCEEDED).toBe('The maximum number of tickets per booking is 25');
    expect(Config.ERROR_MAP.ADULT_TICKET_REQUIRED).toBe('At least one adult ticket must be purchased');
    expect(Config.ERROR_MAP.INFANT_WITHOUT_ADULT).toBe('Each infant must be accompanied by an adult');
    expect(Config.ERROR_MAP.INVALID_TICKET_TYPE).toBe('Ticket type must be one of the following: ADULT, CHILD, INFANT');
    expect(Config.ERROR_MAP.NEGATIVE_TICKET_COUNT_DETECTED).toBe('Negative values detected in ticket request');
  });

  it('TICKET_COST_BY_TYPE should have correct costs', () => {
    expect(Config.TICKET_COST_BY_TYPE.ADULT).toBe(25);
    expect(Config.TICKET_COST_BY_TYPE.CHILD).toBe(15);
    expect(Config.TICKET_COST_BY_TYPE.INFANT).toBe(0);
  });
});