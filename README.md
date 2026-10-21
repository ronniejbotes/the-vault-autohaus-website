# The Vault Autohaus website

Static site for The Vault Autohaus (paint protection film, colour PPF, exterior parts, detailing, polishing and ceramic coating). Plain HTML, CSS and JavaScript: no build step, no framework. Built by Position Xero, October 2026.

## Files

- `index.html`: the whole site (one page: services, prices, colour vault, booking, questions, contact).
- `assets/css/site.css`: all styles. Colour tokens and fonts are at the top.
- `assets/js/site.js`: menu, scroll reveals and the colour vault (finish and colour filters, search, the car preview).
- `assets/js/films.js`: the 394 colour PPF films, read from the supplier catalogue the client sent (`DCL TPU COLOR PPF.pdf`, 21 Oct 2026). Names were read from each catalogue page; colours were sampled from the catalogue photos, so they are a guide only (the site says so).
- `assets/img/`: logo cut from the client's logo file, favicon and app icons from its "V", and five illustrative photos (see PLACEHOLDERS.md, item 12).
- `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`.

## Before launch

Fill in everything in `PLACEHOLDERS.md` (the domain first). Contact links use +27 84 407 6980 for calls and WhatsApp.

## Deploy

Same as the other static client sites on Hostinger: the site's `public_html` is a git checkout of this repo's `main`; push to `main`, then pull on the server (or press Deploy under Advanced > Git in hPanel). Check the live page after every deploy.
