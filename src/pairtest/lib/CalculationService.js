import { BASE_RESERVATION_OBJECT, } from './Config';
export default class CalculationService {
    getTotalTicketsByType(ticketTypeRequests) {
        const newTicketRequestObject = structuredClone(BASE_RESERVATION_OBJECT);
        ticketTypeRequests.forEach((request) => newTicketRequestObject[request.getTicketType()] += request.getNoOfTickets());
        return newTicketRequestObject;
    };
};
