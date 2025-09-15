// noinspection JSCheckFunctionSignatures

import TicketService from '../src/pairtest/TicketService';
import InvalidPurchaseException from '../src/pairtest/lib/InvalidPurchaseException';
import { ERROR_MAP, TICKET_COST_BY_TYPE } from '../src/pairtest/lib/Config';
import SeatReservationService from '../src/thirdparty/seatbooking/SeatReservationService';
import TicketPaymentService from '../src/thirdparty/paymentgateway/TicketPaymentService';
import CalculationService from '../src/pairtest/lib/CalculationService';
import RequestValidationService from '../src/pairtest/lib/RequestValidationService';
import logger from '../src/pairtest/lib/logger'
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest';
import { expect } from '@jest/globals';


jest.mock('../src/pairtest/lib/logger');
jest.mock('../src/pairtest/lib/CalculationService');
jest.mock('../src/thirdparty/seatbooking/SeatReservationService');
jest.mock('../src/thirdparty/paymentgateway/TicketPaymentService');
describe('#TicketService', () => {
	let ticketService;
	describe('building the ticket request object', () => {
		let fakeTicketTypeRequest;
		let getTotalTicketsByTypeMock
		beforeAll(() => {
			jest.clearAllMocks();
			ticketService = new TicketService();
			const mockTicketsByType = {"ADULT": 1, "CHILD": 0, "INFANT": 0};
			getTotalTicketsByTypeMock = jest
				.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
				.mockImplementation(() => {
					return mockTicketsByType
				});
			// jest.spyOn(SeatReservationService.prototype, 'reserveSeat')
			// 	.mockImplementation(() => { });
			const accountId = 12345
			const fakeAdultTicketRequest = new TicketTypeRequest('ADULT', 1);
			const fakeChildTicketRequest = new TicketTypeRequest('CHILD', 1);
			const fakeInfantTicketRequest = new TicketTypeRequest('INFANT', 1);
			fakeTicketTypeRequest = [fakeAdultTicketRequest, fakeChildTicketRequest, fakeInfantTicketRequest]
			ticketService.purchaseTickets(accountId, fakeAdultTicketRequest, fakeChildTicketRequest, fakeInfantTicketRequest);
		});
		afterAll(() => {
			jest.resetAllMocks()
		});
		it('should call getTotalTicketsByType to get a ticket request object', () => {
			expect(getTotalTicketsByTypeMock).toHaveBeenCalledWith(fakeTicketTypeRequest)
		});
		it('log the booking details before calling the validation service', () => {
			expect(logger.info).toHaveBeenCalledWith('About to validate ticket request for Account: 12345. Booking comprises 1 adult(s), 0 child(ren) and 0 infant(s)')
		});
	});
	describe('accountIdValidation', () => {
		let fakeTicketTypeRequest;
		let getTotalTicketsByTypeMock
		// let accountId;
		let fakeAdultTicketRequest
		let fakeChildTicketRequest
		let fakeInfantTicketRequest
		beforeEach(() => {
			jest.clearAllMocks();
			ticketService = new TicketService();
			const mockTicketsByType = {"ADULT": 1, "CHILD": 0, "INFANT": 0};
			getTotalTicketsByTypeMock = jest
				.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
				.mockImplementation(() => {
					return mockTicketsByType
				});
				jest.spyOn(RequestValidationService.prototype, 'requestIdValidator');
				fakeAdultTicketRequest = new TicketTypeRequest('ADULT', 1);
				fakeChildTicketRequest = new TicketTypeRequest('CHILD', 1);
				fakeInfantTicketRequest = new TicketTypeRequest('INFANT', 1);
				fakeTicketTypeRequest = [fakeAdultTicketRequest, fakeChildTicketRequest, fakeInfantTicketRequest]
		});
			describe('accountId is a valid number', () => {
				it('should not throw an error if the account ID is a number greater than 0', () => {
					const accountId = 12345;
					ticketService.purchaseTickets(accountId, fakeAdultTicketRequest, fakeChildTicketRequest, fakeInfantTicketRequest);
					expect(() => ticketService.purchaseTickets(accountId, fakeAdultTicketRequest, fakeChildTicketRequest, fakeInfantTicketRequest)).not.toThrow();
					expect(RequestValidationService.prototype.requestIdValidator).toHaveBeenCalledWith(accountId)
					expect(logger.error).not.toHaveBeenCalled();
				});
			});
			describe('accountId is NOT valid', () => {
				it('should throw an InvalidPurchaseException when the accountId < 1', () => {
					const accountId = 0;
					expect(() => ticketService.purchaseTickets(accountId)).toThrow(new InvalidPurchaseException(ERROR_MAP.ACCOUNT_ID_LESS_THAN_ONE));
					expect(RequestValidationService.prototype.requestIdValidator).toHaveBeenCalledWith(accountId);
					expect(logger.error).toHaveBeenCalledWith(ERROR_MAP.ACCOUNT_ID_LESS_THAN_ONE);
				});
				it('should throw an InvalidPurchaseException when the accountId is not a number', () => {
					const mockTicketsByType = {"ADULT": 1, "CHILD": 0, "INFANT": 0};
					jest.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
						.mockImplementation(() => {
							return mockTicketsByType
						});
					const accountId = 'not-a-number';
					const ticketService = new TicketService();
					expect(() => ticketService.purchaseTickets(accountId)).toThrow(new InvalidPurchaseException(ERROR_MAP.ACCOUNT_ID_IS_NOT_A_NUMBER))
					expect(RequestValidationService.prototype.requestIdValidator).toHaveBeenCalledWith(accountId);
					expect(logger.error).toHaveBeenCalledWith(ERROR_MAP.ACCOUNT_ID_IS_NOT_A_NUMBER);
				});
				it('should throw an InvalidPurchaseException when the accountId is not provided', () => {
					const mockTicketsByType = {"ADULT": 1, "CHILD": 0, "INFANT": 0};
					jest.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
						.mockImplementation(() => {
							return mockTicketsByType
						});
					const ticketService = new TicketService()
					expect(() => ticketService.purchaseTickets(null)).toThrow(new InvalidPurchaseException(ERROR_MAP.ACCOUNT_ID_NOT_PROVIDED));
					expect(RequestValidationService.prototype.requestIdValidator).toHaveBeenCalledWith(null);
					expect(logger.error).toHaveBeenCalledWith(ERROR_MAP.ACCOUNT_ID_NOT_PROVIDED);
				});
			});
	});
	describe('ticket type validation', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		afterEach(() => {
			jest.resetAllMocks();
		});
		it('should not throw an InvalidPurchaseException when there are exactly 25 tickets requested', () => {
			const mockTicketsByType = { "ADULT": 25, "CHILD": 0, "INFANT": 0 };
			jest.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
				.mockImplementation(() => {
					return mockTicketsByType
				});
			jest.spyOn(CalculationService.prototype, 'getTotalTicketCount')
				.mockImplementation(() => {
					return 25
				});
			const accountId = 12345;
			const fakeAdultTicketRequest = new TicketTypeRequest('ADULT', 25);
			const ticketService = new TicketService()
			expect(() => ticketService.purchaseTickets(accountId, fakeAdultTicketRequest)).not.toThrow(new InvalidPurchaseException(ERROR_MAP.MAX_TICKETS_EXCEEDED))
			expect(logger.error).not.toHaveBeenCalled();
			expect(logger.info).toHaveBeenNthCalledWith(2, `Successfully validated ticket request for Account: ${accountId}. Booking comprises ${mockTicketsByType.ADULT} adult(s), ${mockTicketsByType.CHILD} child(ren) and ${mockTicketsByType.INFANT} infant(s)`);
			
		});
		it('should throw an InvalidPurchaseException when there are no tickets requested', () => {
			const mockTicketsByType = {"ADULT": 0, "CHILD": 0, "INFANT": 0};
			jest.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
					.mockImplementation(() => {
							return mockTicketsByType
					});
			const accountId = 12345;
			const ticketService = new TicketService()
			expect(() => ticketService.purchaseTickets(accountId, null)).toThrow(new InvalidPurchaseException(ERROR_MAP.ADULT_TICKET_REQUIRED))
			expect(logger.error).toHaveBeenCalledWith(ERROR_MAP.ADULT_TICKET_REQUIRED);
		});
		it('should throw an InvalidPurchaseException when there a no adults in the booking', () => {
			const mockTicketsByType = {"ADULT": 0, "CHILD": 5, "INFANT": 0};
			jest.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
				.mockImplementation(() => {
					return mockTicketsByType
				});
			const accountId = 12345;
			const fakeAdultTicketRequest = new TicketTypeRequest('ADULT', 0);
			const fakeChildTicketRequest = new TicketTypeRequest('CHILD', 5);
			const fakeInfantTicketRequest = new TicketTypeRequest('INFANT', 0);
			const ticketService = new TicketService()
			expect(() => ticketService.purchaseTickets(accountId, fakeAdultTicketRequest, fakeChildTicketRequest, fakeInfantTicketRequest)).toThrow(new InvalidPurchaseException(ERROR_MAP.ADULT_TICKET_REQUIRED))
			expect(logger.error).toHaveBeenCalledWith(ERROR_MAP.ADULT_TICKET_REQUIRED);
		});
		it('should throw an InvalidPurchaseException when there are more than 25 tickets requested', () => {
			const mockTicketsByType = {"ADULT": 26};
			jest.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
				.mockImplementation(() => {
					return mockTicketsByType
				});
			jest.spyOn(CalculationService.prototype, 'getTotalTicketCount')
				.mockImplementation(() => {
					return 26
				});
			const accountId = 12345;
			const fakeAdultTicketRequest = new TicketTypeRequest('ADULT', 26);
			const ticketService = new TicketService()
			expect(() => ticketService.purchaseTickets(accountId, fakeAdultTicketRequest)).toThrow(new InvalidPurchaseException(ERROR_MAP.MAX_TICKETS_EXCEEDED))
			expect(logger.error).toHaveBeenCalledWith(ERROR_MAP.MAX_TICKETS_EXCEEDED);
		});
		it('should throw an InvalidPurchaseException when there are more infants than adults', () => {
			const mockTicketsByType = {"ADULT": 1, "INFANT": 2};
			jest.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
				.mockImplementation(() => {
					return mockTicketsByType
				});
			const accountId = 12345;
			const fakeAdultTicketRequest = new TicketTypeRequest('ADULT', 1);
			const fakeInfantTicketRequest = new TicketTypeRequest('INFANT', 2);
			const ticketService = new TicketService()
			expect(() => ticketService.purchaseTickets(accountId, fakeAdultTicketRequest, fakeInfantTicketRequest)).toThrow(new InvalidPurchaseException(ERROR_MAP.INFANT_WITHOUT_ADULT))
			expect(logger.error).toHaveBeenCalledWith(ERROR_MAP.INFANT_WITHOUT_ADULT);
		});
	});
	describe('seat reservation', () => {
		beforeEach(() => {
			jest.clearAllMocks()
			ticketService = new TicketService();
		});
		afterEach(() => {
			jest.resetAllMocks();
		});
		it('reserves a seat for each adult and child', () => {
			const mockTicketsByType = { "ADULT": 1, "CHILD": 0, "INFANT": 0 };
			jest.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
				.mockImplementation(() => {
					return mockTicketsByType
				});
			const getTotalSeatsMock = jest
				.spyOn(CalculationService.prototype, 'getTotalSeats')
				.mockImplementation(() => {
					return 2;
				});
			const seatReservationServiceMock = jest
				.spyOn(SeatReservationService.prototype, 'reserveSeat')
				.mockImplementation(() => { });
			const accountId = 111;
			const fakeAdultTicketRequest = new TicketTypeRequest('ADULT', 2);
			const expectedSeatReservations = 2
			ticketService.purchaseTickets(accountId, fakeAdultTicketRequest)
			expect(getTotalSeatsMock).toHaveBeenCalledWith(mockTicketsByType);
			expect(logger.info).toHaveBeenNthCalledWith(3, `About to reserve ${expectedSeatReservations} seat(s) for account ${accountId}`);
			expect(seatReservationServiceMock).toHaveBeenCalledWith(accountId, expectedSeatReservations);
			expect(logger.info).toHaveBeenNthCalledWith(4, `Successfully reserved ${expectedSeatReservations} seat(s) for account ${accountId}`);
		});
		it('throws an error if the number of seats is not an integer', () => {
			const mockTicketsByType = { "ADULT": 1, "CHILD": 0, "INFANT": 0 };
			jest.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
				.mockImplementation(() => {
					return mockTicketsByType
				});
			jest.spyOn(CalculationService.prototype, 'getTotalSeats')
				.mockImplementation(() => {
					return 'fake-string';
				});
			jest.spyOn(SeatReservationService.prototype, 'reserveSeat').mockImplementation(() => {
				throw new InvalidPurchaseException(ERROR_MAP.NO_OF_SEATS_IS_NOT_AN_INTEGER)
			});

			const accountId = 12345
			const fakeAdultTicketRequest = new TicketTypeRequest('ADULT', 1);
			expect(() => ticketService.purchaseTickets(accountId, fakeAdultTicketRequest)).toThrow(new InvalidPurchaseException(ERROR_MAP.NO_OF_SEATS_IS_NOT_AN_INTEGER))
			expect(logger.error).toHaveBeenCalledWith(ERROR_MAP.NO_OF_SEATS_IS_NOT_AN_INTEGER);
		});
	});
	describe('calculating the cost of the booking', () => {
		beforeEach(() => {
			jest.clearAllMocks()
			ticketService = new TicketService();
		});
		afterEach(() => {
			jest.resetAllMocks();
		});
		it('calculates the cost of the booking', () => {
			const mockTicketsByType = { "ADULT": 1, "CHILD": 0, "INFANT": 0 };
			jest.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
				.mockImplementation(() => {
					return mockTicketsByType
				});
			jest.spyOn(CalculationService.prototype, 'getTotalSeats')
				.mockImplementation(() => {
					return 2;
				});
			const mockTotalTickets = 2
			const getTotalTicketsTicketCount = jest
				.spyOn(CalculationService.prototype, 'getTotalTicketCount')
				.mockImplementation(() => {
					return mockTotalTickets
				})
			const mockTotalCost = 20
			const getTotalBookingCostMock = jest
				.spyOn(CalculationService.prototype, 'getTotalBookingCost')
				.mockImplementation(() => {
					return mockTotalCost
				})
			jest.spyOn(SeatReservationService.prototype, 'reserveSeat')
				.mockImplementation(() => { });
			const accountId = 111;
			const fakeAdultTicketRequest = new TicketTypeRequest('ADULT', 2);
			ticketService.purchaseTickets(accountId, fakeAdultTicketRequest)
			expect(getTotalTicketsTicketCount).toHaveBeenCalledWith(mockTicketsByType);
			expect(logger.info).toHaveBeenNthCalledWith(5, `About to purchase ${mockTotalTickets} tickets`);
			expect(getTotalBookingCostMock).toHaveBeenCalledWith(mockTicketsByType);
			expect(logger.info).toHaveBeenNthCalledWith(6, `Successfully purchased ${mockTotalTickets} tickets for a total cost of £${mockTotalCost}`);
		});
	});
	describe('paying for a booking', () => {
		beforeEach(() => {
			jest.clearAllMocks()
			ticketService = new TicketService();
		});
		afterEach(() => {
			jest.resetAllMocks();
		});
		it('pays the correct amount for the booking', () => {
			const mockTicketsByType = { "ADULT": 1, "CHILD": 0, "INFANT": 0 };
			jest.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
				.mockImplementation(() => {
					return mockTicketsByType
				});
			jest.spyOn(CalculationService.prototype, 'getTotalSeats')
				.mockImplementation(() => {
					return 2;
				});
			const mockTotalCost = TICKET_COST_BY_TYPE.ADULT * 2;
			jest.spyOn(CalculationService.prototype, 'getTotalBookingCost')
				.mockImplementation(() => {
					return mockTotalCost
				})
			jest.spyOn(SeatReservationService.prototype, 'reserveSeat')
				.mockImplementation(() => { });
			const ticketPaymentServiceMock = jest
				.spyOn(TicketPaymentService.prototype, 'makePayment')
				.mockImplementation(() => { });
			const accountId = 111;
			const fakeAdultTicketRequest = new TicketTypeRequest('ADULT', 2);
			ticketService.purchaseTickets(accountId, fakeAdultTicketRequest)
			expect(logger.info).toHaveBeenNthCalledWith(7, `About to make payment of £${mockTotalCost} for account ${accountId}`);
			expect(ticketPaymentServiceMock).toHaveBeenCalledWith(accountId, mockTotalCost);
			expect(logger.info).toHaveBeenNthCalledWith(8, `Successfully made payment of £${mockTotalCost} for account ${accountId}`);
		});
		it('throws an error if the number of seats is not an integer', () => {
			const mockTicketsByType = { "ADULT": 1, "CHILD": 0, "INFANT": 0 };
			jest.spyOn(CalculationService.prototype, 'getTotalTicketsByType')
				.mockImplementation(() => {
					return mockTicketsByType
				});
			jest.spyOn(CalculationService.prototype, 'getTotalSeats')
				.mockImplementation(() => {
					return 'fake-string';
				});
			jest.spyOn(TicketPaymentService.prototype, 'makePayment').mockImplementation(() => {
				throw new InvalidPurchaseException(ERROR_MAP.NO_OF_SEATS_IS_NOT_AN_INTEGER)
			});

			const accountId = 12345
			const fakeAdultTicketRequest = new TicketTypeRequest('ADULT', 1);
			expect(() => ticketService.purchaseTickets(accountId, fakeAdultTicketRequest)).toThrow(new InvalidPurchaseException(ERROR_MAP.NO_OF_SEATS_IS_NOT_AN_INTEGER))
			expect(logger.error).toHaveBeenCalledWith(ERROR_MAP.NO_OF_SEATS_IS_NOT_AN_INTEGER);
		});
	});
});
