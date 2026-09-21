import {
  validateIndianMobile,
  validateOtp,
  validatePincode,
  validateSealCode,
  validateEmail,
} from '../src/domain/validators';

describe('Domain Validators', () => {
  it('validates 10-digit Indian mobile numbers with varied formats', () => {
    expect(validateIndianMobile('9876543210').valid).toBe(true);
    expect(validateIndianMobile('+91 98765 43210').valid).toBe(true);
    expect(validateIndianMobile('09876543210').valid).toBe(true);

    // Invalid numbers
    expect(validateIndianMobile('1234567890').valid).toBe(false);
    expect(validateIndianMobile('98765').valid).toBe(false);
    expect(validateIndianMobile('').valid).toBe(false);
  });

  it('validates 4-digit and 6-digit OTP codes', () => {
    expect(validateOtp('1234', 4).valid).toBe(true);
    expect(validateOtp('123456', 6).valid).toBe(true);
    expect(validateOtp('123', 4).valid).toBe(false);
    expect(validateOtp('12345', 6).valid).toBe(false);
    expect(validateOtp('abcd', 4).valid).toBe(false);
  });

  it('validates 6-digit Indian postal pincodes', () => {
    expect(validatePincode('560038').valid).toBe(true); // Indiranagar, Bangalore
    expect(validatePincode('012345').valid).toBe(false);
    expect(validatePincode('5600').valid).toBe(false);
  });

  it('validates tamper-evident seal codes', () => {
    expect(validateSealCode('RS-48721').valid).toBe(true);
    expect(validateSealCode('RS-1029').valid).toBe(true);
    expect(validateSealCode('INVALID').valid).toBe(false);
  });

  it('validates optional email addresses', () => {
    expect(validateEmail('devendra@rehaboth.com').valid).toBe(true);
    expect(validateEmail('').valid).toBe(true); // optional
    expect(validateEmail('not-an-email').valid).toBe(false);
  });
});
