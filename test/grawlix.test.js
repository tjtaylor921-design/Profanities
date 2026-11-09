import { test } from 'node:test';
import assert from 'node:assert/strict';
import { censor, grawlix, isProfane, rage, tokenize } from '../grawlix.js';

test('flags stems and their inflections', () => {
  for (const w of ['fuck', 'Fucking', 'SHIT', 'bastards', 'damn', 'bullshit']) assert.ok(isProfane(w), w);
});

test('leaves polite lookalikes alone', () => {
  for (const w of ['hello', 'shell', 'cocktail', 'Dickens', 'grass', 'class']) assert.ok(!isProfane(w), w);
});

test('censor keeps length and punctuation', () => {
  const out = censor('Oh shit, the damn printer!');
  assert.match(out, /^Oh \S{4}, the \S{4} printer!$/u);
  assert.ok(!/shit|damn/.test(out));
});

test('grawlix never repeats a symbol back to back', () => {
  const g = [...grawlix(500)];
  assert.equal(g.length, 500);
  for (let i = 1; i < g.length; i++) assert.notEqual(g[i], g[i - 1]);
});

test('everything mode censors every word', () => {
  assert.ok(tokenize('nice kind words', { everything: true }).filter((p) => p.profane).length === 3);
});

test('rage is calm for polite text and maxes out for fury', () => {
  assert.equal(rage('have a lovely day'), 0);
  assert.equal(rage('WHAT THE FUCK IS THIS SHIT!!!'), 100);
});
