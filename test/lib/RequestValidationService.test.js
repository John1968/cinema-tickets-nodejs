import { expect } from'@jest/globals';
import RequestValidationService from '../../src/pairtest/lib/RequestValidationService';
import InvalidPurchaseException from '../../src/pairtest/lib/InvalidPurchaseException';
import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest.js';
import { ERROR_MAP } from '../../src/pairtest/lib/Config';

describe('#RequestValidationService', () => {
	let requestValidationService = new RequestValidationService();
		describe('when the account ID is valid', () => {
			it('does not throw an error', () => {
				expect(() => requestValidationService.requestIdValidator(54321))
					.not.toThrow();
			});
		});
});
