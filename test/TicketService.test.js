// noinspection JSCheckFunctionSignatures

import TicketService from '../src/pairtest/TicketService';
import CalculationService from '../src/pairtest/lib/CalculationService';
import logger from '../src/pairtest/lib/logger'
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest';


jest.mock('../src/pairtest/lib/logger');
jest.mock('../src/pairtest/lib/CalculationService');
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
});
