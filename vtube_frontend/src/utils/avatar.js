/**
 * Generates a consistent background color for a given string.
 * @param {string} name - The username or name to generate a color for.
 * @returns {string} - A Tailwind-compatible hex color or CSS color name.
 */
export const getAvatarColor = (name) => {
  const colors = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#6B7280'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Gets the initials (first letter) of a name.
 * @param {string} name - The username or name.
 * @returns {string} - The first letter in uppercase.
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name.charAt(0).toUpperCase();
};
