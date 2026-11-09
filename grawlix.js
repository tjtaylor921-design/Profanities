// grawlix.js — turn profanity into comic-strip symbol swearing.
// Works in browsers (ES module) and Node 18+.

const SYMBOLS = ['@', '#', '$', '%', '&', '!', '*', '?', '§', '¤', '☠', '⚡', '✱', '♯'];

// Stems are matched at the start of a word, so "fuck" also catches "fucking".
export const STEMS = [
  'fuck', 'shit', 'bitch', 'bastard', 'damn', 'crap', 'piss', 'dick',
  'cock', 'wank', 'bollock', 'bugger', 'arse', 'asshole', 'bloody',
  'twat', 'prick', 'hell', 'goddamn', 'motherfuck', 'bullshit', 'jackass',
];

// Words that start with a stem but are perfectly polite.
const ALLOW = new Set([
  'hello', 'hellos', 'shell', 'shells', 'dickens', 'cockpit', 'cockpits',
  'cocktail', 'cocktails', 'cockatoo', 'cockroach', 'cockroaches', 'pissarro',
  'damnation', 'prickly', 'helleborine', 'hellenic', 'hellenistic',
]);

const WORD = /[\p{L}']+/gu;

export function isProfane(word) {
  const w = word.toLowerCase().replace(/'/g, '');
  if (ALLOW.has(w)) return false;
  return STEMS.some((s) => w.startsWith(s));
}

// Random symbol string of the given length, never repeating a symbol twice in a row.
export function grawlix(length, rand = Math.random) {
  let out = '';
  let prev = '';
  for (let i = 0; i < Math.max(1, length); i++) {
    let c;
    do c = SYMBOLS[Math.floor(rand() * SYMBOLS.length)];
    while (c === prev);
    out += c;
    prev = c;
  }
  return out;
}

// Split text into segments: { text, profane, replacement? }.
// With { everything: true }, every word gets censored.
export function tokenize(text, { everything = false, rand = Math.random } = {}) {
  const parts = [];
  let last = 0;
  for (const m of text.matchAll(WORD)) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), profane: false });
    const profane = everything || isProfane(m[0]);
    parts.push(profane
      ? { text: m[0], profane: true, replacement: grawlix(m[0].length, rand) }
      : { text: m[0], profane: false });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), profane: false });
  return parts;
}

export function censor(text, opts) {
  return tokenize(text, opts).map((p) => p.replacement ?? p.text).join('');
}

// 0–100: how angry the text is (swears, CAPS, exclamation marks).
export function rage(text) {
  const words = text.match(WORD) || [];
  if (!words.length) return 0;
  const swears = words.filter(isProfane).length;
  const letters = text.replace(/[^\p{L}]/gu, '');
  const caps = letters ? letters.replace(/[^\p{Lu}]/gu, '').length / letters.length : 0;
  const bangs = (text.match(/!/g) || []).length;
  const score = swears * 22 + (letters.length > 3 ? caps * 40 : 0) + Math.min(bangs, 6) * 6;
  return Math.max(0, Math.min(100, Math.round(score)));
}
