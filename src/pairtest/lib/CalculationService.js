import { BASE_RESERVATION_OBJECT, TICKET_COST_BY_TYPE } from './Config';
import logger from '../lib/logger'
export default class CalculationService {

    getTotalTicketsByType(ticketTypeRequests) {
        logger.info('CalculationService class loaded');
    };
};
