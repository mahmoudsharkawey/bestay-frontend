// Admin dashboard chart colors and configuration

export const CHART_COLORS = [
  "hsl(32, 91%, 52%)", // orange (primary)
  "hsl(214, 60%, 27%)", // navy (secondary)
  "hsl(142, 71%, 45%)", // green
  "hsl(262, 80%, 60%)", // purple
  "hsl(199, 89%, 48%)", // sky blue
  "hsl(345, 82%, 60%)", // rose
];

export const PIE_COLORS = [
  "#f5a014",
  "#1b3d6f",
  "#16a34a",
  "#8b5cf6",
  "#0ea5e9",
  "#e11d48",
];

/**
 * Convert API response data (parallel labels/data arrays) into chart-compatible
 * array of { name, value } objects.
 */
export function buildChartArray(data) {
  if (Array.isArray(data)) return data;
  if (data?.labels && data?.data) {
    return data.labels.map((label, i) => ({
      name: label,
      value: data.data[i] || 0,
    }));
  }
  return [];
}
