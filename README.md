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

---

# Bramblewood (game)

An original side-scrolling platformer that runs in the browser, built for iPhone. Pip, a tiny
seedling, relights six lanterns across Bramblewood: meadow, hills, a honey-hive cave, the
treetop canopy, a dusk marsh and Thorn Keep.

- Touch controls (◀ ▶, **B** run/throw, **A** jump) in portrait or landscape; keyboard on desktop
- Hive blocks give dew (100 = extra life), golden acorns (grow + glide), ember seeds (boomerang throw)
- World map, saved progress, chiptune-style sound

Play it: serve the folder (`python3 -m http.server`) and open `/bramblewood/` in Safari, then
**Share → Add to Home Screen** to launch it full-screen like an app.
