const KEY = 'emberbond-hollow-vale-v1';

export function loadSave() {
  try {
    const raw = globalThis.localStorage?.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || data.version !== 1 || !data.party?.length) return null;
    return data;
  } catch {
    return null;
  }
}

export function writeSave(state) {
  const payload = JSON.stringify(state);
  globalThis.localStorage?.setItem(KEY, payload);
  return payload;
}

export function clearSave() {
  globalThis.localStorage?.removeItem(KEY);
}

export { KEY as SAVE_KEY };
