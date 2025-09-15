import { BASE_RESERVATION_OBJECT, } from './Config';
export default class CalculationService {
	getTotalTicketsByType(ticketTypeRequests) {
		const newTicketRequestObject = structuredClone(BASE_RESERVATION_OBJECT);
		ticketTypeRequests.forEach((request) => newTicketRequestObject[request.getTicketType()] += request.getNoOfTickets());
		return newTicketRequestObject;
	};
	getTotalTicketCount(ticketsByType) {
		return Object.values(ticketsByType).reduce((total, value) => total + value, 0);
	};
	getTotalSeats(ticketsByType) {
		return ticketsByType.ADULT + ticketsByType.CHILD;
	};
};
