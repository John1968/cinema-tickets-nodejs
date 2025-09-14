import { describe, expect } from'@jest/globals';
import RequestValidationService from '../../src/pairtest/lib/RequestValidationService';
import InvalidPurchaseException from '../../src/pairtest/lib/InvalidPurchaseException';
import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest.js';
import { ERROR_MAP } from '../../src/pairtest/lib/Config';
describe('#RequestValidationService', () => {
	let requestValidationService = new RequestValidationService();
	describe('#requestIdValidator', () => {
		describe('when the account ID is valid', () => {
			it('does not throw an error', () => {
				expect(() => requestValidationService.requestIdValidator(54321))
					.not.toThrow();
			});
		});
		describe('when the account ID is missing or invalid', () => {
			it('throws an error if the account ID is a string', () => {
				expect(() => requestValidationService.requestIdValidator('not a number'))
					.toThrow(new InvalidPurchaseException(ERROR_MAP.ACCOUNT_ID_IS_NOT_A_NUMBER));
			});
			it('throws an error if the account ID contains symbols', () => {
				expect(() => requestValidationService.requestIdValidator('!@#$%'))
					.toThrow(new InvalidPurchaseException(ERROR_MAP.ACCOUNT_ID_IS_NOT_A_NUMBER));
			});
			it('throws an error if the account ID is a floating point number', () => {
				expect(() => requestValidationService.requestIdValidator(1.5))
					.toThrow(new InvalidPurchaseException(ERROR_MAP.ACCOUNT_ID_IS_NOT_A_NUMBER));
			});
			it('throws an error if the account ID is 0', () => {
				expect(() => requestValidationService.requestIdValidator(0))
					.toThrow(new InvalidPurchaseException(ERROR_MAP.ACCOUNT_ID_LESS_THAN_ONE));
			});
			it('throws an error if the account ID is a negative number', () => {
				expect(() => requestValidationService.requestIdValidator(-1))
					.toThrow(new InvalidPurchaseException(ERROR_MAP.ACCOUNT_ID_LESS_THAN_ONE));
			});
			it('throws an error if the account ID is undefined', () => {
				expect(() => requestValidationService.requestIdValidator(undefined))
					.toThrow(new InvalidPurchaseException(ERROR_MAP.ACCOUNT_ID_UNDEFINED));
			});
			it('throws an error if an account ID is not provided', () => {
				expect(() => requestValidationService.requestIdValidator(null))
					.toThrow(new InvalidPurchaseException(ERROR_MAP.ACCOUNT_ID_NOT_PROVIDED));
			});
		});
	});
	describe('#ticketTypeRequestValidator', () => {
		describe('when the ticket request is valid', () => {
				it('does not throw an error', () => {
						const adultTicketRequest = new TicketTypeRequest('ADULT', 2);
						expect(() => requestValidationService.ticketTypeRequestValidator([adultTicketRequest]))
							.not.toThrow();
				});
		});
		describe('when the ticket request is missing or invalid', () => {
			it('throws an error if no ticket requests are provided', () => {
				expect(() => requestValidationService.ticketTypeRequestValidator(null))
					.toThrow(new InvalidPurchaseException(ERROR_MAP.NO_TICKETS_IN_BOOKING));
			});
		});
		
	});
});
