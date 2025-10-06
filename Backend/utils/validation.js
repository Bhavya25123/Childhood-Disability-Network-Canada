const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CANADIAN_POSTAL_CODE_REGEX = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const CITY_REGEX = /^[A-Za-z\d'\-\s,.]+$/;

function validateRequired(value, label) {
  if (!value || !value.trim()) {
    return `${label} is required.`;
  }
  return "";
}

function validateMinLength(value, min, label) {
  const requiredMessage = validateRequired(value, label);
  if (requiredMessage) {
    return requiredMessage;
  }
  if (value.trim().length < min) {
    return `${label} must be at least ${min} characters long.`;
  }
  return "";
}

function validateEmail(value) {
  const requiredMessage = validateRequired(value, "Email");
  if (requiredMessage) {
    return requiredMessage;
  }
  if (!EMAIL_REGEX.test(value.trim())) {
    return "Enter a valid email address (example: name@example.com).";
  }
  return "";
}

function validatePassword(value) {
  const requiredMessage = validateRequired(value, "Password");
  if (requiredMessage) {
    return requiredMessage;
  }
  if (!PASSWORD_REGEX.test(value)) {
    return "Use at least 8 characters with at least one letter and one number.";
  }
  return "";
}

function validatePostalCode(value) {
  const requiredMessage = validateRequired(value, "Postal code");
  if (requiredMessage) {
    return requiredMessage;
  }
  if (!CANADIAN_POSTAL_CODE_REGEX.test(value.trim())) {
    return "Enter a valid Canadian postal code (e.g., A1A 1A1).";
  }
  return "";
}

function validateCity(value, label = "City") {
  const requiredMessage = validateRequired(value, label);
  if (requiredMessage) {
    return requiredMessage;
  }
  if (value.trim().length < 2) {
    return `${label} must be at least 2 characters long.`;
  }
  if (!CITY_REGEX.test(value.trim())) {
    return `${label} can include letters, numbers, apostrophes, hyphens, commas, and periods only.`;
  }
  return "";
}

function validateDescription(value) {
  return validateMinLength(value, 10, "Description");
}

function validateRegistrationPayload(payload = {}) {
  const errors = {};
  const values = {};

  const fullName = typeof payload.fullName === "string" ? payload.fullName.trim() : "";
  const fullNameError = validateMinLength(fullName, 2, "Full name");
  if (fullNameError) {
    errors.fullName = fullNameError;
  } else {
    values.fullName = fullName;
  }

  const emailRaw = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const emailError = validateEmail(emailRaw);
  if (emailError) {
    errors.email = emailError;
  } else {
    values.email = emailRaw;
  }

  const city = typeof payload.city === "string" ? payload.city.trim() : "";
  const cityError = validateCity(city, "City");
  if (cityError) {
    errors.city = cityError;
  } else {
    values.city = city;
  }

  const province = typeof payload.province === "string" ? payload.province.trim() : "";
  const provinceError = validateMinLength(province, 2, "Province");
  if (provinceError) {
    errors.province = provinceError;
  } else {
    values.province = province;
  }

  const zipCodeRaw = typeof payload.zipCode === "string" ? payload.zipCode.trim().toUpperCase() : "";
  const zipCodeError = validatePostalCode(zipCodeRaw);
  if (zipCodeError) {
    errors.zipCode = zipCodeError;
  } else {
    values.zipCode = zipCodeRaw;
  }

  const description = typeof payload.description === "string" ? payload.description.trim() : "";
  const descriptionError = validateDescription(description);
  if (descriptionError) {
    errors.description = descriptionError;
  } else {
    values.description = description;
  }

  const password = typeof payload.password === "string" ? payload.password : "";
  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  } else {
    values.password = password;
  }

  return { errors, values };
}

module.exports = {
  validateRegistrationPayload,
};
