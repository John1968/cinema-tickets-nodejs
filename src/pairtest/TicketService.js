import TicketTypeRequest from './lib/TicketTypeRequest.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import logger from '../pairtest/lib/logger';
import CalculationService from './lib/CalculationService';
import RequestValidationService from './lib/RequestValidationService';


export default class TicketService {
	#calculationService;
	#ticketsByType;
	#requestValidationService
	#seatsRequired
	#seatReservationService
	#totalTicketsToPurchase
	#totalAmountToPay



	constructor() {
		this.#calculationService = new CalculationService();
		this.#requestValidationService = new RequestValidationService();
		this.#seatReservationService = new SeatReservationService();
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
		// reserve the seats
		this.#seatsRequired = this.#calculationService.getTotalSeats(this.#ticketsByType);
		logger.info(`About to reserve ${this.#seatsRequired} seat(s) for account ${accountId}`);
		this.#seatReservationService.reserveSeat(accountId, this.#seatsRequired);
		logger.info(`Successfully reserved ${this.#seatsRequired} seat(s) for account ${accountId}`);
		// calculate the total cost
		this.#totalTicketsToPurchase = this.#calculationService.getTotalTicketCount(this.#ticketsByType);
		logger.info(`About to purchase ${this.#totalTicketsToPurchase} tickets`);
		this.#totalAmountToPay = this.#calculationService.getTotalBookingCost(this.#ticketsByType);
		logger.info(`Successfully purchased ${this.#totalTicketsToPurchase} tickets for a total cost of £${this.#totalAmountToPay}`);

		} catch(err) {
      logger.error(err.message);
      throw new InvalidPurchaseException(err.message)
		}
		
    // throws InvalidPurchaseException
  }
}
