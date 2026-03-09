/**
 * Get uppercase initials from a user's name.
 * @param {string} name - Full name string
 * @param {number} [maxLen=2] - Maximum number of initials to return
 * @returns {string} Uppercase initials (e.g. "JD" for "John Doe")
 */
export function getInitials(name, maxLen = 2) {
  if (!name) return "User";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, maxLen);
}
