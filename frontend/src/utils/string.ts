/**
 * Check if email is valid
 * @param email Email to validate
 */
export function isEmail(email: string): boolean {
  return /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email);
}

/**
 * Convert value to currency
 */
export function toCurrency(value: string | number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
}