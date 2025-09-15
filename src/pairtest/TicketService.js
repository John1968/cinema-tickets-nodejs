import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import logger from '../pairtest/lib/logger';
import CalculationService from './lib/CalculationService';
import RequestValidationService from './lib/RequestValidationService';


export default class TicketService {
	#calculationService;
	#ticketsByType;
	#requestValidationService

	constructor() {
    this.#calculationService = new CalculationService();
		this.#requestValidationService = new RequestValidationService();
  }
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
		// build ticket request object
		this.#ticketsByType = this.#calculationService.getTotalTicketsByType(ticketTypeRequests);
    logger.info(`About to validate ticket request for Account: ${accountId}. Booking comprises ${this.#ticketsByType.ADULT} adult(s), ${this.#ticketsByType.CHILD} child(ren) and ${this.#ticketsByType.INFANT} infant(s)`)
		try {
			// validate the input parameters
		this.#requestValidationService.requestIdValidator(accountId);
		this.#requestValidationService.ticketTypeRequestValidator(ticketTypeRequests);

		} catch(err) {
      logger.error(err.message);
      throw new InvalidPurchaseException(err.message)
		}
		
    // throws InvalidPurchaseException
  }
}
