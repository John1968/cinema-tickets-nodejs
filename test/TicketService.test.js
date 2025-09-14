// noinspection JSCheckFunctionSignatures

import TicketService from '../src/pairtest/TicketService';
import logger from '../src/pairtest/lib/logger'
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest';


jest.mock('../src/pairtest/lib/logger');
describe('#TicketService', () => {
    let ticketService;
    describe('building the ticket request object', () => {
        let fakeTicketTypeRequest;
        beforeAll(() => {
            jest.clearAllMocks();
            ticketService = new TicketService();
            const accountId = 12345
            const fakeAdultTicketRequest = new TicketTypeRequest('ADULT', 1);
            const fakeChildTicketRequest = new TicketTypeRequest('CHILD', 1);
            const fakeInfantTicketRequest = new TicketTypeRequest('INFANT', 1);
            fakeTicketTypeRequest = [fakeAdultTicketRequest, fakeChildTicketRequest, fakeInfantTicketRequest]
            ticketService.purchaseTickets(accountId, fakeAdultTicketRequest, fakeChildTicketRequest, fakeInfantTicketRequest);
        });
        afterAll(() => {
            jest.resetAllMocks()
        })
        it('logs the call', () => {
           expect(logger.info).toHaveBeenCalledWith('TicketService class loaded')
        });
    });
});
