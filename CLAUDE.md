# Notes for Claude Code

- Static site: plain HTML/CSS/JS, no framework, no build step. Keep it that way unless asked.
- Content lives in `js/data.js`; layout in `index.html`; logic in `js/app.js`; styles in `css/styles.css`.
- Visual identity: peach palette (Peach Fuzz `#FFBE98` for decoration only, `#FFE1CF` for text panels), plum-brown ink `#3B1A1F`, rose accent `#B8494A`. Fraunces for headings, Inter for body. Pill buttons, 20px card radius, no gradients, no emoji.
- Accessibility: keep text contrast ≥ 4.5:1, touch targets ≥ 44px, real `<button>`/`<a>` elements, tabs with `role="tab"` + `aria-selected`.
- Placeholders in `[brackets]` are content still missing from the course team — don't invent dates, readings or statistics.
- Site copy is in English.
