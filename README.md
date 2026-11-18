# Anka Ljusic - portfolio

Portfolio site of Anka Ljusic, digital designer (ljsc-design.com), in English and Serbian. Content comes from the client's Maestro CMS instance and enters the site at build time.

Production since 16.11.2026: the CMS instance is `https://cms.ljsc-design.com/dashboard/` (Maestro CMS card MS.11b), and its public API `https://cms.ljsc-design.com/dashboard/api/v1` is the repository variable `CMS_API_URL`.

## Tech
- React + Vite
- Tailwind CSS
- Maestro CMS (read at build time by `scripts/fetch-cms-content.mjs`)
- Swiper
- Puppeteer prerender (`scripts/prerender.mjs`)
- PHP contact endpoint (`public/api/contact.php`)

## Local setup
1) Install deps
```
npm install
```

2) Create env file (root)
```
# .env.local
CMS_API_URL=http://127.0.0.1:8095/dashboard/api/v1
```
`CMS_API_URL` is the public API of a Maestro CMS instance (`.../api/v1`, without `/public`). A shell variable with the same name takes precedence over `.env.local`.

3) Run frontend
```
npm run dev
```

`npm run dev`, `npm run build` and `npm run sitemap` first run `scripts/fetch-cms-content.mjs`. It reads the newest published entry of each section and every published project and writes `src/generated/cms-content.json` (not in git). Without `CMS_API_URL`, without a response or without a published entry the command stops with a message instead of building a site without content.

## Content model (Maestro CMS)
The schema is `cms/content-schema.php`; the instance gets it as its `content-schema.php`. Every text has an English field and a Serbian one with the `_sr` suffix; the Serbian version of the site shows the Serbian text when it is not empty.

- `uvod` (Uvod, single): hero title lines and description.
- `usluge` (Usluge, single): services heading and the service items (tags one per line, preview image or the card image of a chosen project).
- `o-meni` (O meni, single): about heading, experience card, portrait, location, stats, tools with icons and testimonials.
- `podnozje` (Podnožje, single): footer texts, button, privacy link and social links.
- `projekti` (Projekti, collection): projects with card image, details, services one per line, gallery and sort order (lower first).

`src/lib/cms.js` gives the components the same shapes the former Sanity queries returned. Images load from the CMS public media (`thumb` 320 px, `medium` 768 px, `large` 1600 px variants); project cards and the portrait use `srcSet` from the variants.

## Build and deploy
- `npm run build`: CMS content, `public/sitemap.xml` from the CMS projects, Vite build, then the prerender of every sitemap route into `dist/`.
- `.github/workflows/deploy.yml`: runs on every push to `main`, after every CMS publish (the instance starts it through `workflow_dispatch`, `siteBuild` in the instance `client.php`) and manually from the Actions tab. Runs queue instead of cancelling each other. It needs the repository variables `CMS_API_URL` (https) and `FTP_SERVER_DIR`, and the secrets `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD`.
- The contact form posts to `public/api/contact.php`, which reads `public/api/config.php` on the server (template `config.example.php`, never in git).
- Old project addresses redirect to the current ones with 301 rules in `public/.htaccess`.

## Before the CMS (Sanity)
Until the switch on 16.11.2026 the site read its content from Sanity. The Sanity Studio (`sanity/`) and the import map (`cms/sanity-map.json`) were removed from the repository after the switch. The way back is commit `2511f29`, the last one that reads Sanity, built and uploaded the way the site was published before the switch, while the Sanity project still exists (the owner decides when it is shut down); the DNS name `cms.ljsc-design.com` does not get in the way.

## Other scripts
- `npm run og:cover`: social share cover image (`scripts/generate-og-cover.mjs`).
- `npm run optimize:images`: WebP versions of the local images (`scripts/to-webp.mjs`).
