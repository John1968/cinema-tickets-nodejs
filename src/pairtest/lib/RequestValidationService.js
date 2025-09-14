import InvalidPurchaseException from '../lib/InvalidPurchaseException';
import CalculationService from './CalculationService';
import { MAX_TICKETS, MIN_TICKETS, ERROR_MAP } from './Config';

export default class RequestValidationService {
    requestIdValidator(accountId) {
        let message
        if (!Number.isInteger(accountId)) {
            message = ERROR_MAP.ACCOUNT_ID_IS_NOT_A_NUMBER;
        }
        if(accountId < 1) {
            message = ERROR_MAP.ACCOUNT_ID_LESS_THAN_ONE;
        }
        if(accountId === undefined) {
            message = ERROR_MAP.ACCOUNT_ID_UNDEFINED;
        }
        if(accountId === null) {
            message = ERROR_MAP.ACCOUNT_ID_NOT_PROVIDED;
        }
        if(message) {
            throw new InvalidPurchaseException(message);
        }
    };
    ticketTypeRequestValidator(ticketTypeRequests) {
        const calculationService = new CalculationService();
        let message;
        let ticketsByType;
        let totalTicketsRequired;
        this.calculationService = new CalculationService();
        if(ticketTypeRequests == null || ticketTypeRequests.length === 0) {
            message = ERROR_MAP.NO_TICKETS_IN_BOOKING;
        }
        if(message) {
            throw new InvalidPurchaseException(message);
        }
        return ticketsByType;
    }
};
