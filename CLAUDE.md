# Notes for Claude Code

- Static site: plain HTML/CSS/JS, no framework, no build step. Keep it that way unless asked.
- Content lives in `js/data.js`; layout in `index.html`; logic in `js/app.js`; styles in `css/styles.css`.
- Visual identity "Peach Satin" (mood board: Peach Fuzz, apricot, blush, sunset glow, satin), luxury-coded and professional:
  - Colours are tokens in `:root` of `css/styles.css`. Peach Fuzz `#FFBE98`, apricot `#F7A986`, blush `#F4C6BD`, rose `#E9A3A0` are decorative (swatches, orb, glow) — never behind small text. Text panels use `#FCE3D5`. Ink is cocoa `#2E1A17`; primary buttons are cocoa with ivory text; eyebrows/numerals rose `#A0524A`.
  - Type: Bodoni Moda (Didone headings), Pinyon Script (calligraphic accents — only `<em>` inside headings and numerals, never body text), Jost (body + uppercase labels letter-spaced ~0.22em).
  - Details: 1px hairlines, pill buttons, soft radial "sunset glow" only on hero panels, swatch-chip cards. No emoji, no illustrations, no loud gradients, no heavy shadows.
- Navigation: a single dropdown menu top-right (`#menu-panel`), built in `buildMenu()` — groups: The course / Readings (prof, guest) / Game Hub (one entry per session).
- Game engine (`js/app.js`): round types `choice`, `oldai`, `higherlower`; per-question timer (`secondsPerQuestion`), streaks, progress dots, sparkle burst, shake on wrong, Web Audio sounds (toggle), confetti ≥ 80%. Keyboard: A–J for choices, ← → for old/AI, ↑ ↓ for higher/lower, Enter to continue. Respect `prefers-reduced-motion`.
- Accessibility: keep text contrast ≥ 4.5:1, touch targets ≥ 44px, real `<button>`/`<a>` elements, tabs with `role="tab"` + `aria-selected`.
- Placeholders in `[brackets]` are content still missing from the course team — don't invent dates, readings or statistics.
- Site copy is in English.
