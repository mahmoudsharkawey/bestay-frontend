/**
 * Calculate password strength based on complexity criteria.
 * @param {string} value - The password string to evaluate
 * @returns {{ score: number, strength: 'weak'|'medium'|'strong'|null, hasUpper: boolean, hasNumber: boolean, hasSymbol: boolean, isLong: boolean }}
 */
export function getPasswordStrength(value) {
  if (!value || value.length === 0) {
    return {
      score: 0,
      strength: null,
      hasUpper: false,
      hasNumber: false,
      hasSymbol: false,
      isLong: false,
    };
  }

  const hasUpper = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[^A-Za-z0-9]/.test(value);
  const isLong = value.length >= 8;
  const score = [hasUpper, hasNumber, hasSymbol, isLong].filter(Boolean).length;
  const strength = score >= 4 ? "strong" : score >= 2 ? "medium" : "weak";

  return { score, strength, hasUpper, hasNumber, hasSymbol, isLong };
}
