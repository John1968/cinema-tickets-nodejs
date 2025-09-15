import InvalidPurchaseException from '../lib/InvalidPurchaseException.js';
import CalculationService from './CalculationService.js';
import { MAX_TICKETS, MIN_TICKETS, ERROR_MAP } from './Config.js';

export default class RequestValidationService {
    requestIdValidator(accountId) {
        let message
        if (!Number.isInteger(accountId)) {
            message = ERROR_MAP.ACCOUNT_ID_IS_NOT_A_NUMBER;
        };
        if (accountId < 1) {
            message = ERROR_MAP.ACCOUNT_ID_LESS_THAN_ONE;
        };
        if (accountId === undefined) {
            message = ERROR_MAP.ACCOUNT_ID_UNDEFINED;
        };
        if (accountId === null) {
            message = ERROR_MAP.ACCOUNT_ID_NOT_PROVIDED;
        };
        if (message) {
            throw new InvalidPurchaseException(message);
        }
    };
    ticketTypeRequestValidator(ticketTypeRequests) {
        const calculationService = new CalculationService();
        let message;
        let ticketsByType;
        let totalTicketsRequired;
        this.calculationService = new CalculationService();
        
        if (ticketTypeRequests == null || ticketTypeRequests.length === 0 || !Array.isArray(ticketTypeRequests)) {
            message = ERROR_MAP.INVALID_PARAMETERS;
        } else {
            ticketsByType = calculationService.getTotalTicketsByType(ticketTypeRequests);
            totalTicketsRequired = calculationService.getTotalTicketCount(ticketsByType);
            if (totalTicketsRequired < MIN_TICKETS) {
                message = ERROR_MAP.NO_TICKETS_IN_BOOKING;
            };
            if (totalTicketsRequired > MAX_TICKETS) {
                message = ERROR_MAP.MAX_TICKETS_EXCEEDED;
            };
            if (ticketsByType.ADULT < 1) {
                message = ERROR_MAP.ADULT_TICKET_REQUIRED;
            };
            if (ticketsByType.INFANT > ticketsByType.ADULT) {
                message = ERROR_MAP.INFANT_WITHOUT_ADULT;
            };
            if (ticketsByType) {
                for (const [key, value] of Object.entries(ticketsByType)) {
                    if (value < 0) {
                        message = ERROR_MAP.NEGATIVE_TICKET_COUNT_DETECTED;
                    };
                };
            };
        };

        if (message) {
            throw new InvalidPurchaseException(message);
        };
        return ticketsByType;
    };
};
