export interface ValidationResult {
  valid: boolean;
  error?: string;
  cleanedValue?: string;
}

/**
 * Validates Indian 10-digit mobile numbers (starting with 6, 7, 8, 9)
 * Supports optional +91 prefix and space/hyphen formatting.
 */
export function validateIndianMobile(raw: string): ValidationResult {
  if (!raw || typeof raw !== 'string') {
    return { valid: false, error: 'Mobile number is required.' };
  }

  const cleaned = raw.replace(/[^0-9]/g, '');
  // If user entered with 91 prefix (12 digits), strip it
  const tenDigit = cleaned.length === 12 && cleaned.startsWith('91') ? cleaned.slice(2) : cleaned;

  if (tenDigit.length === 0) {
    return { valid: false, error: 'Mobile number cannot be empty.' };
  }

  if (tenDigit.length !== 10) {
    return {
      valid: false,
      error: `Mobile number must be exactly 10 digits (currently ${tenDigit.length}).`,
      cleanedValue: tenDigit,
    };
  }

  if (!/^[6-9]/.test(tenDigit)) {
    return {
      valid: false,
      error: 'Indian mobile numbers must start with 6, 7, 8, or 9.',
      cleanedValue: tenDigit,
    };
  }

  return { valid: true, cleanedValue: tenDigit };
}

/**
 * Validates numeric OTP code of length 4 or 6.
 */
export function validateOtp(otp: string, expectedLength: 4 | 6 = 4): ValidationResult {
  if (!otp || typeof otp !== 'string') {
    return { valid: false, error: 'Verification code is required.' };
  }

  const cleaned = otp.replace(/[^0-9]/g, '');

  if (cleaned.length !== expectedLength) {
    return {
      valid: false,
      error: `Verification code must be ${expectedLength} digits.`,
      cleanedValue: cleaned,
    };
  }

  return { valid: true, cleanedValue: cleaned };
}

/**
 * Validates Indian 6-digit postal PIN codes.
 */
export function validatePincode(pincode: string): ValidationResult {
  if (!pincode || typeof pincode !== 'string') {
    return { valid: false, error: 'PIN code is required.' };
  }

  const cleaned = pincode.replace(/[^0-9]/g, '');

  if (cleaned.length !== 6) {
    return {
      valid: false,
      error: 'Indian postal PIN codes must be exactly 6 digits.',
      cleanedValue: cleaned,
    };
  }

  if (cleaned.startsWith('0')) {
    return {
      valid: false,
      error: 'Postal PIN code cannot begin with 0.',
      cleanedValue: cleaned,
    };
  }

  return { valid: true, cleanedValue: cleaned };
}

/**
 * Validates alphanumeric Smart Bag seal tag code (e.g. RS-48721 or RS-A109).
 */
export function validateSealCode(code: string): ValidationResult {
  if (!code || typeof code !== 'string') {
    return { valid: false, error: 'Seal code is required.' };
  }

  const cleaned = code.trim().toUpperCase();

  if (!/^RS-[A-Z0-9]{4,7}$/.test(cleaned)) {
    return {
      valid: false,
      error: 'Seal code must match format RS-XXXXX (e.g. RS-48721).',
      cleanedValue: cleaned,
    };
  }

  return { valid: true, cleanedValue: cleaned };
}

/**
 * Validates optional email address format.
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim().length === 0) {
    return { valid: true, cleanedValue: '' }; // Optional
  }

  const cleaned = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cleaned)) {
    return { valid: false, error: 'Please enter a valid email address.', cleanedValue: cleaned };
  }

  return { valid: true, cleanedValue: cleaned };
}
