export const LOGGING_LEVEL = 'info';

export const BASE_RESERVATION_OBJECT = {
    ADULT: 0,
    CHILD: 0,
    INFANT: 0,
};

export const TICKET_BOOKING_CONSTANTS = {
    ADULT: {type: 'ADULT', cost: 25},
    CHILD: {type: 'CHILD', cost: 15},
    INFANT: {type: 'INFANT', cost: 0},
};

export const MAX_TICKETS = 25;
export const MIN_TICKETS = 1;

export const ERROR_MAP = {
    ACCOUNT_ID_LESS_THAN_ONE: 'The account ID must be greater than 0',
    ACCOUNT_ID_IS_NOT_A_NUMBER: 'The account ID must be an integer',
    ACCOUNT_ID_NOT_PROVIDED: 'An account ID must be provided',
    ACCOUNT_ID_UNDEFINED: 'Account ID cannot be undefined',
    INVALID_PARAMETERS: 'Invalid parameters passed to the service',
    NO_TICKETS_IN_BOOKING: 'There must be a minimum of 1 ticket per booking',
    NO_OF_SEATS_IS_NOT_AN_INTEGER: 'totalSeatsToAllocate must be an integer',
    MAX_TICKETS_EXCEEDED: `The maximum number of tickets per booking is ${MAX_TICKETS}`,
    ADULT_TICKET_REQUIRED: 'At least one adult ticket must be purchased',
    INFANT_WITHOUT_ADULT: 'Each infant must be accompanied by an adult',
    INVALID_TICKET_TYPE: 'Ticket type must be one of the following: ADULT, CHILD, INFANT',
    NEGATIVE_TICKET_COUNT: 'Number of tickets requested cannot be negative',
};
export const TICKET_COST_BY_TYPE = {
    ADULT: 25,
    CHILD: 15,
    INFANT: 0,
};
