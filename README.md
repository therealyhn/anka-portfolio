# Anka Ljusic - portfolio

Portfolio site of Anka Ljusic, digital designer (ljsc-design.com), in English and Serbian. Content comes from the client's Maestro CMS instance and enters the site at build time.

Production since 16.11.2026: the CMS instance is `https://cms.ljsc-design.com/dashboard/` (Maestro CMS card MS.11b), and its public API `https://cms.ljsc-design.com/dashboard/api/v1` is the repository variable `CMS_API_URL`.

## Tech
- React + Vite
- Tailwind CSS
- Maestro CMS (read at build time by `scripts/fetch-cms-content.mjs`)
- Swiper
- Puppeteer prerender (`scripts/prerender.mjs`)
- PHP contact endpoint with PHPMailer (`public/api/contact.php`)

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
- After every upload the workflow checks the contact form on the live site (see below).
- Old project addresses redirect to the current ones with 301 rules in `public/.htaccess`.

## Contact form
The form (`src/hooks/useContactForm.js`) posts JSON to `/api/contact.php` on the same domain. The endpoint sends the message through the SMTP mailbox of the site domain with PHPMailer; there is no `mail()` fallback, so a broken config or SMTP shows up as HTTP 500 or 502, never as a silent success. The contract is `maestro-cms/docs/plans/kontakt-forma/plan.md` §2.

- `public/api/contact.php`: only the site block (domain, allowed origins, form fields).
- `public/api/lib/kontakt.php`: all logic (origin, method, JSON body up to 16 KiB, field validation, honeypot `website`, limit of 5 messages per hour per IP and 100 per UTC day, sending). The same file is used by every Maestro client site.
- `public/api/.htaccess`: denies everything in `api/` except `contact.php` (`vendor/` and `lib/` return 403).
- Config: `kontakt-config.php` in the folder above `public_html` (`/home/<account>/domains/ljsc-design.com/`), permissions 600 or 640, created by hand on the server from the template `server/kontakt-config.example.php`. It is never in git, never in `public/` and the FTP upload never sees it. The endpoint creates `kontakt-stanje/` next to it (counters with an HMAC of the IP address, never the address itself, and `greske.log` without visitor data).
- PHPMailer: `server/composer.json` and `server/composer.lock`; `server/vendor/` is not in git. The workflow runs `composer validate --strict`, `composer audit --locked` (fails on an advisory) and `composer install --no-dev`, then copies `server/vendor` into `dist/api/vendor`.
- Live check in `deploy.yml` (step `Provera forme na sajtu`): an empty POST must return 422 (config, vendor and origin in place, no email is sent) and `api/vendor/autoload.php` and `api/lib/kontakt.php` must return 403; requests are repeated only on a bare 307 or 000 from the Hostinger CDN.

Local test (20 cases, PHP built-in server and Mailpit, no config in the repository):
```
composer install --working-dir=server
docker run -d --name kf01-mailpit -p 127.0.0.1:1025:1025 -p 127.0.0.1:8025:8025 axllent/mailpit:v1.32.0
PHP_BIN=C:/xampp/php/php.exe MAILPIT_URL=http://127.0.0.1:8025 node server/tests/kontakt-test.mjs
docker rm -f kf01-mailpit
```
The test builds a temporary `<base>` outside the repository (copy of `public/api` plus `server/vendor`, a config for Mailpit on 127.0.0.1:1025), runs `php -S 127.0.0.1:8099` and prints `N passed, M failed`. Site specific data is in `server/tests/primer.json`. `KONTAKT_KEEP=1` leaves the PHP server running and prints `<base>` and the PID. `php -S` ignores `.htaccess`, so the 403 for `api/vendor/` and `api/lib/` is proven only on the live site.

## Before the CMS (Sanity)
Until the switch on 16.11.2026 the site read its content from Sanity. The Sanity Studio (`sanity/`) and the import map (`cms/sanity-map.json`) were removed from the repository after the switch. The way back is commit `2511f29`, the last one that reads Sanity, built and uploaded the way the site was published before the switch, while the Sanity project still exists (the owner decides when it is shut down); the DNS name `cms.ljsc-design.com` does not get in the way.

## Other scripts
- `npm run og:cover`: social share cover image (`scripts/generate-og-cover.mjs`).
- `npm run optimize:images`: WebP versions of the local images (`scripts/to-webp.mjs`).
