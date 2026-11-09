# Grawlix Machine 🤬 → @#$%&!

Type something rude and get it back as cartoon swearing. In comics, the jumble of symbols
that stands in for a swear word is called a **grawlix**.

- Speech bubble where the symbols jitter and re-roll every couple of seconds
- Hover or focus a grawlix to see the word underneath
- **Rage meter** that scores swears, CAPS and exclamation marks (Zen → NUCLEAR)
- A painted, curvy, red-haired 1950s pinup who says it: a smile and a wave when calm, then arched brows, a flush, a shaking fist, and steam at NUCLEAR
- "Censor everything" mode, copy to clipboard, light and dark themes

## Run it

```sh
python3 -m http.server   # then open http://localhost:8000
```

(It loads `grawlix.js` as an ES module, so opening `index.html` straight from disk won't work.)

## Use the filter

```js
import { censor, isProfane, rage } from './grawlix.js';

censor('oh shit, the damn printer');   // "oh %☠#@, the ⚡&$! printer"
isProfane('Fucking');                  // true
isProfane('cocktail');                 // false
rage('WHAT THE HELL!!!');              // 0–100
```

## Test

```sh
npm test
```
