# The Vault website (thevaultppf.co.za)

Static site for The Vault (paint protection film, colour PPF, exterior parts, detailing, polishing and ceramic coating). Plain HTML, CSS and JavaScript: no build step, no framework. Built by Position Xero, October 2026.

## Files

Nine pages since the client's feedback of 29 Oct 2026 (it was one long page before):

- `index.html`: home. Headline, what we do (the client's own wording), services with starting prices, area and hours, the scrolling marquee, the car that changes colour as you scroll, links to the other pages and a WhatsApp call to action.
- `services.html`: every service with what it includes and its prices, and how a job works.
- `colour-changer.html`: the colour changer (all 394 films on a car; pick a circle, the car changes, send it on WhatsApp).
- `faq.html`: the questions, grouped (prices and VAT, booking and timing, PPF, colour PPF, detailing, where). Holds the FAQPage structured data.
- `contact.html`: WhatsApp, phone, area, hours, social media.
- `ppf.html`, `colour-ppf.html`, `detailing.html`, `polishing-ceramic-coating.html`: the detail pages for each service (indexed since 29 Oct 2026; keep their URLs).
- `assets/css/site.css`: all styles. Tokens at the top: `--cta` (the one red for every call-to-action button), `--key` (the one highlight colour for prices, area, hours and the phone number), `--display` (solid heading face, Big Shoulders Display) and `--display-fun` (the stencil cut, used only in the scrolling marquee, as the client asked). Prices are in the body face.
- `assets/js/site.js`: menu, the colour car, the picker and the light motion (GSAP 3.13 with ScrollTrigger, Lenis smooth scroll, from jsDelivr at pinned versions): studio-light intro on the home hero, film-laying image reveals, the marquee, the pinned showroom and the booking steps. Without the libraries (or with reduced motion) everything shows and nothing moves. The custom cursor, magnetic buttons, counting prices and letter-by-letter titles were taken out on 29 Oct 2026 so the pages read at once.
- `assets/car/`: the colour preview car (an F80 M3-style saloon, made with Higgsfield in chroma green, badges and wheel-centre logos painted out). `car-base.webp` is the photo with the paint neutralised, `car-shade.webp` holds the paint's light (red) and reflections (green), `car-mask.png` marks the painted panels. The script repaints the panels in any film, in the browser, with different handling for gloss, satin, matte, metallic, pearl, chrome, carbon and holographic.
- `assets/js/films.js`: the 394 colour PPF films, read from the supplier catalogue the client sent (`DCL TPU COLOR PPF.pdf`, 21 Oct 2026). Names were read from each catalogue page; colours were sampled from the catalogue photos, so they are a guide only (the site says so).
- `assets/img/`: logo cut from the client's logo file (its "AUTOHAUS" line removed on 28 Oct 2026, at the client's request), favicon and app icons from its "V", and five illustrative photos (see PLACEHOLDERS.md, item 8).
- `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`.

The pages share one header, footer and phone dock, copied into each file (there is no build step): change all nine when the menu or footer changes.

## Before launch

The domain is thevaultppf.co.za, without www (canonicals, sitemap and robots point there). The business dropped "Autohaus" from its name on 27 Oct 2026: it is The Vault (The Vault SA on Instagram); the repo keeps its old name. Fill in what is still open in `PLACEHOLDERS.md`. Contact links use +27 84 407 6980 for calls and WhatsApp.

## Deploy

Same as the other static client sites on Hostinger: the site's `public_html` is a git checkout of this repo's `main`; push to `main`, then pull on the server (or press Deploy under Advanced > Git in hPanel). Check the live page after every deploy.
