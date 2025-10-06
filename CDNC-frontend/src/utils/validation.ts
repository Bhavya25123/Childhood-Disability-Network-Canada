const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CANADIAN_POSTAL_CODE_REGEX = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const CITY_REGEX = /^[A-Za-z\d'\-\s,.]+$/;

export function validateRequired(value: string, fieldLabel: string): string {
  if (!value.trim()) {
    return `${fieldLabel} is required.`;
  }
  return "";
}

export function validateEmail(value: string, fieldLabel = "Email"): string {
  const requiredMessage = validateRequired(value, fieldLabel);
  if (requiredMessage) {
    return requiredMessage;
  }
  if (!EMAIL_REGEX.test(value.trim())) {
    return "Enter a valid email address (example: name@example.com).";
  }
  return "";
}

export function validatePassword(value: string, fieldLabel = "Password"): string {
  const requiredMessage = validateRequired(value, fieldLabel);
  if (requiredMessage) {
    return requiredMessage;
  }
  if (!PASSWORD_REGEX.test(value)) {
    return "Use at least 8 characters with at least one letter and one number.";
  }
  return "";
}

export function validatePostalCode(value: string, fieldLabel = "Postal code"): string {
  const requiredMessage = validateRequired(value, fieldLabel);
  if (requiredMessage) {
    return requiredMessage;
  }
  if (!CANADIAN_POSTAL_CODE_REGEX.test(value.trim())) {
    return "Enter a valid Canadian postal code (e.g., A1A 1A1).";
  }
  return "";
}

export function validateCityOrConstituency(value: string, fieldLabel = "City or constituency"): string {
  const requiredMessage = validateRequired(value, fieldLabel);
  if (requiredMessage) {
    return requiredMessage;
  }
  if (value.trim().length < 2) {
    return `${fieldLabel} must be at least 2 characters long.`;
  }
  if (!CITY_REGEX.test(value.trim())) {
    return `${fieldLabel} can include letters, numbers, apostrophes, hyphens, commas, and periods only.`;
  }
  return "";
}

export function validateMinLength(value: string, min: number, fieldLabel: string): string {
  const requiredMessage = validateRequired(value, fieldLabel);
  if (requiredMessage) {
    return requiredMessage;
  }
  if (value.trim().length < min) {
    return `${fieldLabel} must be at least ${min} characters long.`;
  }
  return "";
}
