import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import logger from '../pairtest/lib/logger'

export default class TicketService {

  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
		 logger.info('TicketService class loaded');
    // throws InvalidPurchaseException
  }
}
