# What still has to come from the client

Everything still open is marked in the site so it's easy to find: visible text carries `class="ph" data-ph="<name>"` (shown dashed and amber). Run `grep -rn "data-ph\|PLACEHOLDER" .` to list them.

## Done (client's answers, 23 Oct 2026)

| What | Answer | Where it went |
|---|---|---|
| **Domain** | www.thevaultsa.co.za | Canonical and `og:url` on every page, structured data URLs, `sitemap.xml`, the `Sitemap:` line in `robots.txt`, llms.txt |
| **Area served** | Germiston and Bedfordview, Gauteng | Every title, H1 and meta description, the home hero kicker, contact facts, the "Where are you?" questions, structured data `areaServed`, llms.txt |
| **Hours** | By appointment only | Contact facts, booking steps, llms.txt. No `openingHours` in the structured data, because there are no set hours |
| **VAT** | Not VAT registered, so no VAT is added | Note under every price list, the price questions |
| **Large SUVs** | Can cost up to R3 000 extra for clear PPF and up to R5 000 extra for colour PPF | Price notes on the home, PPF and colour PPF pages, the price questions, Offer descriptions |
| **Frontal PPF panels** | Complete front bumper (painted sections included), entire bonnet, both front fenders, both painted side-mirror caps | Home price list, PPF page (list and price table), Offer descriptions |
| **The detail checklist** | Exterior, interior and optional add-ons, line by line | Detailing page; the old generic list is gone |
| **Products** | Mainly Detail Ease; alternatives such as Meguiar's when the car needs it | Detailing page and its questions, llms.txt |
| **Ceramic coating price and time** | From R5 000, depending on vehicle size and coating brand; 1 to 3 days | Home price list and booking step 3, polishing and ceramic page, structured data |
| **Polishing prices** | Basic gloss polish from R1 200, light correction from R2 000, medium correction from R3 500, heavy correction after an inspection | Home price list, polishing and ceramic page, detailing page, structured data |
| **Inspection before booking** | Required, for a professional recommendation | Booking steps on every page, the price questions, a new home question. It also replaces "what sets the price within the R4 000 to R6 000 range" on the detailing page |
| **Instagram, TikTok, Facebook** | instagram.com/the.vault_sa, tiktok.com/@the.vault.sa, facebook.com/people/TheVault-Autohaus/61574753161941 | Contact facts, every footer, structured data `sameAs`, llms.txt |
| **Colour film brand** | Not to be named | Stays unnamed everywhere on the site |

## Still open

| # | What | Where it goes |
|---|---|---|
| 1 | **Street address** (premises not secured yet) | Contact facts and the "Where are you?" questions (`data-ph="address"`, `street-address`), structured data `address` |
| 2 | **Map** | Contact (`data-ph="map"`, a short line for now): a Google Maps embed once the address is known |
| 3 | **Email address** | Contact facts (`data-ph="email"`) |
| 4 | **Clear PPF brand** | PPF page (`clear-ppf-brand`) |
| 5 | **Film lifespan and warranty**. The client said "standard 5 year warranty as the brand is still fairly new", but not which product it covers. Keep 5 years off the site until that's clear | PPF page (`film-lifespan`, `warranty`) |
| 6 | **Days before the first wash after PPF** | PPF page (`number-of-days`) |
| 7 | **Ceramic coating brand, lifespan, cure time and first-wash advice** | Polishing and ceramic page (`ceramic-coating-brand`, `coating-lifespan`, `cure-time-and-first-wash-advice-for-the-`) |
| 8 | **Whether they coat over PPF, and the price** | Polishing and ceramic page (`confirm-does-the-vault-coat-over-ppf-and`) |
| 9 | **Matte PPF price and the price for fitting exterior parts** | Shown as "quoted per car" on the home and PPF pages |
| 10 | **How long PPF, colour PPF and a detail take** (only ceramic coating is known: 1 to 3 days) | Home booking step 3 (`turnaround`), PPF page (`how-long-a-ppf-job-takes`), colour PPF page (`how-long-a-colour-change-takes`), detailing page (`how-long-a-detail-takes`) |
| 11 | **Colour PPF: lead time to order a colour, whether door shuts are included, samples at the studio** | Colour PPF page (`lead-time-if-the-colour-has-to-be-ordere`, `confirm-are-door-shuts-included`, `confirm-film-samples-to-view-at-the-stud`) |
| 12 | **Whether an interior-only (or exterior-only) detail is offered** | Detailing page (`confirm-these-are-offered`, `confirm-interior-only-detail-offered`) |
| 13 | **Real photos of their work** | Replace the five illustrative images in `assets/img/` (hero, ppf-fit, wing, interior, ceramic). They were made with AI because the client had no job photos yet; they show no real car model and no badges |
| 14 | **Colour range**: confirm all 394 films in the supplier catalogue are available | Colour vault, colour PPF copy, questions |
| 15 | **Province and postal code beyond "Gauteng"** | Structured data `address`, with the street address |
| 16 | **Google Business Profile** | Create and verify it once there is a street address, then link it here |
| 17 | **Analytics** (agency GA4 and Clarity) | Add once live, with a privacy policy page (POPIA) |
