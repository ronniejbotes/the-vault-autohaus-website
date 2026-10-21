# What still has to come from the client

Everything below is marked in the site so it's easy to find: visible text carries `class="ph" data-ph="<name>"` (shown dashed and amber), and code placeholders say `PLACEHOLDER`. Run `grep -rn "data-ph\|PLACEHOLDER" .` to list them.

| # | What | Where it goes |
|---|---|---|
| 1 | **Domain** (and hosting) | `<link rel="canonical">` and `og:url` in index.html, `sitemap.xml`, the `Sitemap:` line in `robots.txt` |
| 2 | **Street address** | Contact facts (`data-ph="address"`), the FAQ "Where are you?", structured data `address` |
| 3 | **Map** | The map slot in Contact (`data-ph="map"`): a Google Maps embed once the address is known |
| 4 | **Opening hours** | Contact facts (`data-ph="hours"`), structured data `openingHours` |
| 5 | **Email address** | Contact facts (`data-ph="email"`) |
| 6 | **Instagram, Facebook, TikTok links** | Contact facts (`data-ph="social"`), structured data `sameAs`, the footer |
| 7 | **Town or area served** | Title tag and meta description (for example "PPF and detailing in <town>"), hero kicker, llms.txt |
| 8 | **VAT**: do the prices include VAT? | Note under the price list (`data-ph="vat"`) |
| 9 | **Frontal PPF**: which panels it covers | Price list (`data-ph="frontal-panels"`) |
| 10 | **How long each job takes** | Booking step 3 (`data-ph="turnaround"`) |
| 11 | **Prices for polishing, ceramic coating, matte PPF and fitting exterior parts** | Price list (currently "quoted per car") |
| 12 | **Real photos of their work** | Replace the five illustrative images in `assets/img/` (hero, ppf-fit, wing, interior, ceramic). They were made with AI because the client had no job photos yet; they show no real car model and no badges |
| 13 | **Colour range**: confirm the 394 films in the supplier catalogue (DCL TPU colour PPF) are all available | Colour vault, Colour PPF copy, FAQ |
| 14 | **Google Business Profile** | Create and verify it at the street address, then link it here |
| 15 | **Analytics** (agency GA4 and Clarity) | Add once live, with a privacy policy page (POPIA) |
