# Digital Platforms Test Drive

Companion site for the Digital Platforms course — MSc Marketing Management & Digital, ESSEC Business School (Asia-Pacific campus). Taught by Madina Kalyayeva. Built by Camille Hyvert.

Plain HTML/CSS/JS — no build step, no dependencies.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Structure

```
index.html      All pages (Welcome, Objectives, Schedule, Readings, Game Hub, Question, Results, Locked)
css/styles.css  Peach visual identity (colour tokens at the top in :root)
js/data.js      ALL course content — objectives, sessions, readings, game questions
js/app.js       Hash routing, tabs, quiz logic
```

## Updating content

Edit `js/data.js` only:

- **Sessions**: dates, topics, speakers, and `open: true/false` to unlock a session's game.
- **Readings**: `readings.prof[session]` and `readings.guest[session]` — set `url` to the real PDF/link.
- **Game questions**: `games[session].rounds[i].questions` — each has `title`, `prompt`, `options`, `answer`, `explain`. For a typed answer, give `accept` (a list of accepted answers) instead of `options`. Question counts and max scores are calculated automatically, and questions are shuffled within each round on every play.

Placeholders still to fill in are written in `[brackets]`.

## Deploy

Works as-is on GitHub Pages, Netlify or Vercel (static).
