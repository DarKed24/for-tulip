# 🌷 for Tulip

A little garden, grown for someone special. Live at **https://darked24.github.io/for-tulip/**

## Before you send it

Everything personal lives in **`config.js`** — open it and fill in:

1. **The 19 notes** (`garden.notes`) — one memory/reason per tulip. Defaults are sweet but generic; make them yours.
2. **The letter** (`letter.paragraphs`) — the big one. Write from the heart.
3. **Hero tagline + section intros** if you want.
4. **Photos** — drop images into `photos/` (e.g. `photos/01.jpg`) and set each
   `{ src: "photos/01.jpg", caption: "..." }` in `gallery.photos`.

Then commit & push — GitHub Pages redeploys automatically in ~1 minute.

## The midnight gate

The site shows a starry countdown until **midnight, 24 July 2026** (her local
time — it uses the visitor's clock), then blooms open on its own.

**Your secret preview link** (skips the countdown):
`https://darked24.github.io/for-tulip/?sneakpeek`

Send *her* the plain link without the query string.

## What's inside

- **Garden of Nineteen** — 19 tulip buds; tapping one blooms it and reveals a note. Progress is remembered on her device.
- **Paper Tulip Studio** — interactive origami: she makes each fold herself, opens the petals, grows the stem, and every finished tulip joins a bouquet in a vase (also remembered).
- **Photo wall** — polaroid frames.
- **The letter** — sealed envelope, tap to open.

No build step, no dependencies — plain HTML/CSS/JS.
