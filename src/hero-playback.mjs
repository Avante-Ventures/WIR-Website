export const SESSION_KEY = 'wir-scale-film-v1';
let seenInMemory = false;
export function filmPhase(seconds) { return seconds < 2 ? 0 : seconds < 5 ? 1 : 2; }
export function mayPlay({ wanted, visible, hidden, finished }) { return wanted && visible && !hidden && !finished; }
export function readSeen() {
  try { return seenInMemory || sessionStorage.getItem(SESSION_KEY) === 'seen'; }
  catch { return seenInMemory; }
}
export function rememberSeen() {
  seenInMemory = true;
  try { sessionStorage.setItem(SESSION_KEY, 'seen'); } catch { /* Storage may be unavailable. */ }
}
