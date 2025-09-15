import { expect } from'@jest/globals';
import CalculationService from '../../src/pairtest/lib/CalculationService';
import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest';

describe('#CalculationService', () => {
    let calculationService = new CalculationService();
    describe('#getTotalTicketsByType', () => {
        const childTicketRequest = new TicketTypeRequest('CHILD', 0);
        const infantTicketRequest = new TicketTypeRequest('INFANT', 1);
        const adultTicketRequest = new TicketTypeRequest('ADULT', 2);
        const validRequest = [childTicketRequest, infantTicketRequest, adultTicketRequest];
        const result = calculationService.getTotalTicketsByType(validRequest);
        it('should return a valid ticket request object', () => {
            expect(result).toEqual({"ADULT": 2, "CHILD": 0, "INFANT": 1});
        });
    });
    describe('#getTotalTicketCount', () => {
        const ticketsByType = {"ADULT": 2, "CHILD": 0, "INFANT": 1};
        const result = calculationService.getTotalTicketCount(ticketsByType);
        it('should return the total number of tickets', () => {
            expect(result).toEqual(3);
        });
    });
    describe('getTotalSeats', () => {
        it('books 1 seat for each ADULT', () => {
            const ticketsByType = { "ADULT": 1, "CHILD": 0, "INFANT": 0 };
            const result = calculationService.getTotalSeats(ticketsByType);
            expect(result).toEqual(1);
        });
        it('books 1 seat for each CHILD', () => {
            const ticketsByType = { "ADULT": 0, "CHILD": 1, "INFANT": 0 };
            const result = calculationService.getTotalSeats(ticketsByType);
            expect(result).toEqual(1);
        });
        it('books 0 seats for INFANT', () => {
            const ticketsByType = { "ADULT": 0, "CHILD": 0, "INFANT": 1 };
            const result = calculationService.getTotalSeats(ticketsByType);
            expect(result).toEqual(0);
        });
        it('books the correct seat total for a mixed booking', () => {
            const ticketsByType = { "ADULT": 3, "CHILD": 2, "INFANT": 1 };
            const result = calculationService.getTotalSeats(ticketsByType);
            expect(result).toEqual(5);
        });
    })
});
