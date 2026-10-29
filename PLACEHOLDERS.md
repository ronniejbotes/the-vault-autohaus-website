# What still has to come from the client

Everything still open is marked in the site so it's easy to find: visible text carries `class="ph" data-ph="<name>"` (shown dashed and amber). Run `grep -rn "data-ph\|PLACEHOLDER" .` to list them.

## Done (client's answers, 23 Oct and 28 Oct 2026)

Second-round answers: `seo-program/plans/the-vault-autohaus/content/client-answers-2026-10-28.md`. Feedback on the site (29 Oct): `seo-program/plans/the-vault-autohaus/client-feedback/2026-10-29.md`.

| What | Answer | Where it went |
|---|---|---|
| **Name** (28 Oct) | "The Vault": take "Autohaus" out of the name and logo completely ("we aren't a dealership anymore"). Instagram is The Vault SA | Titles, og:site_name, structured data (`name` The Vault SA, `alternateName` The Vault), alt text, footer, WhatsApp messages, manifest, llms.txt. The AUTOHAUS line is removed from `logo-wordmark.*` and `og-image.jpg` |
| **Domain** (28 Oct) | thevaultppf.co.za (the old thevaultsa.co.za login is lost) | Canonical and `og:url` on every page, structured data URLs, `sitemap.xml`, the `Sitemap:` line in `robots.txt`, llms.txt |
| **Area served** | Germiston and Bedfordview, Gauteng | Every title, H1 and meta description, the home hero kicker, contact facts, the "Where are you?" questions, structured data `areaServed`, llms.txt |
| **Premises** (28 Oct) | Secured in Bedfordview (last signing and payment); no street address yet | "Studio in Bedfordview: street address to follow" in contact facts and the "Where are you?" questions |
| **Hours** | By appointment only | Contact facts, booking steps, llms.txt. No `openingHours` in the structured data |
| **VAT** | Not VAT registered, so no VAT is added | Note under every price list, the price questions |
| **Large SUVs** | Up to R3 000 extra for clear PPF and up to R5 000 extra for colour PPF | Price notes on the home, PPF and colour PPF pages, the price questions, Offer descriptions |
| **Frontal PPF panels** | Complete front bumper (painted sections included), entire bonnet, both front fenders, both painted side-mirror caps | Home price list, PPF page, Offer descriptions |
| **Warranty** (28 Oct) | 5 years, "on PPF as a whole" | Home PPF list, price lede and question; PPF and colour PPF pages; `warranty` on the PPF offers |
| **Matte PPF price** (28 Oct) | Same as gloss | Home price note and question, PPF page table, aside and questions |
| **Wings and other parts** (28 Oct) | Quoted per part and vehicle | Home services, price note and question |
| **Turnaround** (28 Oct) | 4 to 5 working days "for clear ppf, colour enhancing and full detail"; ceramic 1 to 3 days | Home booking step and question, PPF, colour PPF and detailing pages |
| **Colour PPF** (28 Oct) | Door shuts included; 2 to 3 week order period | Home services and price list, colour PPF page (steps, aside, questions, Offer) |
| **Detailing** | Full checklist; mainly Detail Ease, Meguiar's when needed; interior and exterior details both done (28 Oct); engine bay detailing after an inspection (28 Oct) | Detailing page |
| **Headlights** (28 Oct) | Headlight and tail light restoration, R2 000, depending on the damage | Home price list and services, detailing page, structured data |
| **Polishing prices** | Basic gloss polish from R1 200, light correction from R2 000, medium correction from R3 500, heavy correction after an inspection | Home, polishing and ceramic page, detailing page, structured data |
| **Ceramic coating** (28 Oct) | Three packages: Essential Gloss R2 500 to R3 500 (6 to 12 months), Signature Ceramic R4 500 to R6 000 (up to 2 years), Premium Ceramic R6 500 to R8 500 (3 to 5 years), "should the client take appropriate care of their vehicle"; Detail Ease or Meguiar's; 1 to 3 days. Replaces "from R5 000" | Home price list, polishing and ceramic page (packages section, table, aside, questions, Offers), detailing page |
| **Coating over PPF** (28 Oct) | Yes over gloss PPF; over matte PPF it takes the effect away | Polishing and ceramic page, PPF page |
| **Inspection before booking** | Required, for a professional recommendation | Booking steps on every page, the price questions |
| **Instagram, TikTok, Facebook** | instagram.com/the.vault_sa, tiktok.com/@the.vault.sa, facebook.com/people/TheVault-Autohaus/61574753161941 | Contact facts, footers, structured data `sameAs`, llms.txt. The Facebook address still says "TheVault-Autohaus" because it is their page's own URL |
| **Film brands** | Colour film brand not named; clear PPF brand not disclosed ("we can stipulate in house") | Neither is named anywhere on the site |
| **Gmail for the Business Profile** (28 Oct) | Leighcalitz@gmail.com | Not on the site; for creating the profile |

## Still open

| # | What | Where it goes |
|---|---|---|
| 1 | **Street address** in Bedfordview | Contact facts and the "Where are you?" questions (`data-ph="address"`, `street-address`), structured data `address` |
| 2 | **Map** | Contact (`data-ph="map"`): a Google Maps embed once the address is known |
| 3 | **Email address** | Contact facts (`data-ph="email"`) |
| 4 | **Days before the first wash after PPF** | PPF page (`number-of-days`) |
| 5 | **Ceramic coating cure time and first-wash advice** | Polishing and ceramic page (`cure-time-and-first-wash-advice-for-the-`) |
| 6 | **Film samples to view at the studio** | Colour PPF page (`confirm-film-samples-to-view-at-the-stud`) |
| 7 | **Turnaround wording**: is it 4 to 5 working days for each of clear PPF, colour PPF and a full detail, or for all three together? The site reads it as each | Home booking step and question, PPF, colour PPF and detailing pages |
| 8 | **Real photos and videos of their work** | Replace the five illustrative images in `assets/img/` (hero, ppf-fit, wing, interior, ceramic). They were made with AI because the client had no job photos yet; they show no real car model and no badges |
| 9 | **Colour range**: confirm all 394 films in the supplier catalogue are available | Colour vault, colour PPF copy, questions |
| 10 | **Postal code** | Structured data `address`, with the street address |
| 11 | **Reviews**: "I'll get some reviews sorted"; we still want 10 to 20 customers to ask | Google Business Profile |
| 12 | **Google Business Profile** | Create with Leighcalitz@gmail.com and verify once there is a street address, then link it here |
| 13 | **Analytics** (agency GA4 and Clarity) | Add once live, with a privacy policy page (POPIA) |
| 14 | **Facebook page name**: still "TheVault-Autohaus" in its address | The client can rename the page; update the link if the address changes |
| 15 | **Part fitment "from" price** (29 Oct feedback, point 10: "part fitment starting from x") | Home price list and services page say "quoted per part" until there is a number |
| 16 | **"Complimentary detail with each service"** (29 Oct, point 10): with every service, or with PPF jobs only? The site says every PPF job (frontal, full, colour), as in the 21 Oct prices | Home price list, services page, detailing page |
| 17 | **Hard wax coating** (29 Oct, point 1): a service we should list? Price? It is left off the site until confirmed | Home service line, services page |
| 18 | **Headlight and tail light restoration "from R2 000"**: the 28 Oct answer was "R2000.00 (depending on the progression of damage)"; the site now says "from R2 000" to follow point 9 | Home, services, detailing, FAQ |
