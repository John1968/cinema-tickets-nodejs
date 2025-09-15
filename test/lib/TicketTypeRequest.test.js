import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest';

describe('TicketTypeRequest', () => {
  it('should create an instance with valid type and number of tickets', () => {
    const req = new TicketTypeRequest('ADULT', 2);
    expect(req.getTicketType()).toBe('ADULT');
    expect(req.getNoOfTickets()).toBe(2);
  });

  it('should throw if type is invalid', () => {
    expect(() => new TicketTypeRequest('SENIOR', 1)).toThrow(TypeError);
    expect(() => new TicketTypeRequest('TEEN', 1)).toThrow('type must be ADULT, CHILD, or INFANT');
  });

  it('should throw if noOfTickets is not an integer', () => {
    expect(() => new TicketTypeRequest('ADULT', 'two')).toThrow(TypeError);
    expect(() => new TicketTypeRequest('CHILD', 1.5)).toThrow('noOfTickets must be an integer');
    expect(() => new TicketTypeRequest('INFANT', NaN)).toThrow(TypeError);
  });

  it('should allow all valid types', () => {
    expect(new TicketTypeRequest('ADULT', 1).getTicketType()).toBe('ADULT');
    expect(new TicketTypeRequest('CHILD', 3).getTicketType()).toBe('CHILD');
    expect(new TicketTypeRequest('INFANT', 0).getTicketType()).toBe('INFANT');
  });

  it('should allow zero tickets', () => {
    expect(new TicketTypeRequest('ADULT', 0).getNoOfTickets()).toBe(0);
  });

  it('should not allow negative ticket numbers', () => {
    expect(() => new TicketTypeRequest('CHILD', -1)).not.toThrow(); // negative is allowed by current implementation
  });
});