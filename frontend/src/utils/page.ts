/**
 * Get history length
 */
export function getHistoryLength() {
  const { state } = window.history;
  return state ? state.position : 0;
}