import InvalidPurchaseException from '../../src/pairtest/lib/InvalidPurchaseException';

describe('InvalidPurchaseException', () => {
  it('should be an instance of Error', () => {
    const err = new InvalidPurchaseException('Test error');
    expect(err).toBeInstanceOf(Error);
  });

  it('should be an instance of InvalidPurchaseException', () => {
    const err = new InvalidPurchaseException('Test error');
    expect(err).toBeInstanceOf(InvalidPurchaseException);
  });

  it('should set the name property correctly', () => {
    const err = new InvalidPurchaseException('Test error');
    expect(err.name).toBe('InvalidPurchaseException');
  });

  it('should set the message property correctly', () => {
    const err = new InvalidPurchaseException('Custom message');
    expect(err.message).toBe('Custom message');
  });

  it('should have a stack trace', () => {
    const err = new InvalidPurchaseException('Test error');
    expect(err.stack).toBeDefined();
    expect(typeof err.stack).toBe('string');
  });
});