# Vistaar Infotech — Website

Production-ready static website for **Vistaar Infotech Pvt. Ltd.**, Mumbai.  
Built with HTML5 · CSS3 · Vanilla JavaScript (ES6+). No frameworks. No build step.

---

## Project Structure

```
vistaar_infotech/
├── index.html               Homepage
├── services.html            Services overview
├── devops.html              DevOps services
├── networking.html          Networking & Firewalls
├── servers.html             Server installation & infrastructure
├── cloud.html               Cloud setup & migration
├── products.html            Products & device sales catalogue
├── brands.html              Technology brands
├── about.html               About Vistaar Infotech
├── contact.html             Contact & Quote form
├── privacy-policy.html      Privacy policy (requires legal review)
├── terms.html               Terms & conditions (requires legal review)
├── sitemap.xml              XML sitemap for search engines
├── robots.txt               Search engine crawl rules
├── css/
│   ├── style.css            Core design system & all global styles
│   ├── responsive.css       Breakpoints (1024px, 768px, 480px), print, focus
│   └── components.css       Page-specific component styles
├── js/
│   ├── config.js            ⚠️  All configurable values — EDIT BEFORE LAUNCH
│   ├── navigation.js        Sticky header, mobile menu, dropdowns, keyboard nav
│   ├── main.js              Scroll animations, FAQ accordion, cookie consent
│   └── contact.js           Form validation, service preselection, submission
└── assets/
    └── icons/
        └── favicon.svg      Placeholder favicon (replace with official logo)
```

---

## Local Preview

No build step required. Open any HTML file directly in a browser:

```
open index.html
# or drag index.html into Chrome/Firefox/Edge
```

For a local dev server (optional, avoids some CORS restrictions):

```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## ⚠️ Before Launch — Required Actions

### 1. Configure `js/config.js`

Open [`js/config.js`](js/config.js) and update:

| Variable | Current value | Action required |
|---|---|---|
| `WHATSAPP_NUMBER` | `'919960385447'` | **Confirm** this is the correct WhatsApp Business number |
| `EMAIL` | `'byteroot@gmail.com'` | **Replace** with `info@vistaarinfotech.com` or confirmed address |
| `FORM_ENDPOINT` | `''` (empty) | **Set** to Formspree URL or backend endpoint to enable form submission |
| `ANALYTICS_ID` | `''` (empty) | **Set** to Google Analytics GA4 measurement ID (optional) |

### 2. Replace the Logo Placeholder

The logo is currently a text-based wordmark ("V" mark + "VISTAAR INFOTECH").  
To replace with the official logo, find every instance of `.logo-mark` in all HTML files and replace with an `<img>` tag pointing to the official logo file.

Search across all HTML files for:
```html
<div class="logo-mark" aria-hidden="true">V</div>
```

Replace with (once you have the file):
```html
<img src="assets/logo/vistaar-logo.svg" alt="Vistaar Infotech" height="36" />
```

Also replace `favicon.svg` in `assets/icons/` with the official icon.

### 3. Contact Details — Conflict Notice

**Doc 1 (Website Requirements)** lists:
- Arbaaz: +91 99603 85447
- Pratham: +91 85917 57765
- Uttam: +91 84259 70308

**Doc 2 (Brochure)** lists:
- Uttam Chauhan (same person)
- Siddharth: +91 77108 85761 (not displayed on site — stored in `config.js` `BROCHURE_CONTACTS` for reference only)

**Client must confirm** which contacts to display and confirm the correct WhatsApp number before going live.

### 4. Office Address

No street address was provided in the source documents.  
Add the registered office address in:
- Footer (all 12 HTML pages)
- `contact.html` contact card
- `privacy-policy.html` and `terms.html`
- JSON-LD schema in `index.html`

### 5. Legal Pages

`privacy-policy.html` and `terms.html` contain draft content.  
**These pages require review by a qualified legal professional before launch.**

### 6. Company Registration Details

Add CIN (Company Identification Number) and GSTIN to:
- Footer (optional but recommended for B2B credibility)
- Legal pages

### 7. Social Media

No social media profiles were provided. Add confirmed URLs to `config.js` → `SOCIAL_LINKS` and to the footer HTML.

### 8. Business Hours

Add confirmed business hours to `contact.html` and `about.html` if applicable.

### 9. Update `sitemap.xml`

Replace `https://vistaarinfotech.com` with the actual live domain throughout `sitemap.xml` and `robots.txt` if different.

---

## Form Submission Setup

The contact form in `contact.html` requires a backend endpoint.

**Recommended: Formspree (free tier available)**

1. Create account at [formspree.io](https://formspree.io)
2. Create a new form and copy the endpoint URL (e.g. `https://formspree.io/f/xxxxxxxx`)
3. Set `FORM_ENDPOINT` in `js/config.js` to that URL

Until set, the form shows a warning notice and does not attempt submission.

---

## Analytics Setup

1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)
2. Copy the Measurement ID (format: `G-XXXXXXXXXX`)
3. Set `ANALYTICS_ID` in `js/config.js`

The GA4 script is not loaded if `ANALYTICS_ID` is empty.

---

## Deployment

This is a static website. Deploy by uploading all files to any static host:

| Host | Method |
|---|---|
| **Netlify** | Drag the project folder to [app.netlify.com/drop](https://app.netlify.com/drop) |
| **GitHub Pages** | Push to a GitHub repo → Settings → Pages → Deploy from branch |
| **cPanel / Shared Hosting** | Upload all files via File Manager or FTP to `public_html/` |
| **Vercel** | `vercel --prod` from the project directory |

No build commands needed. Just upload the files as-is.

---

## Pre-Launch Checklist

- [ ] Update all values in `js/config.js`
- [ ] Replace logo placeholder with official logo file
- [ ] Replace `favicon.svg` with official branded favicon
- [ ] Confirm and update all contact details
- [ ] Add office address to footer and contact page
- [ ] Confirm WhatsApp number for floating button
- [ ] Replace temporary email with business email
- [ ] Set `FORM_ENDPOINT` in config.js (Formspree or backend)
- [ ] Legal review of `privacy-policy.html` and `terms.html`
- [ ] Add CIN and GSTIN to footer if required
- [ ] Add social media links to `config.js` and footer
- [ ] Set `ANALYTICS_ID` in config.js
- [ ] Update `sitemap.xml` domain if not `vistaarinfotech.com`
- [ ] Test all pages on mobile (iOS Safari, Android Chrome)
- [ ] Test all navigation links and form validation
- [ ] Test WhatsApp and call links on a real device
- [ ] Verify no console errors in browser DevTools

---

## Technology Stack

- **HTML5** — Semantic markup, ARIA attributes, structured data (JSON-LD)
- **CSS3** — Custom properties, grid, flexbox, animations, all responsive
- **JavaScript (ES6+)** — Vanilla JS, no frameworks, no dependencies
- **Google Fonts** — Space Grotesk + JetBrains Mono
- **Lucide Icons** — Via CDN (`unpkg.com/lucide`)

---

*© 2026 Vistaar Infotech Pvt. Ltd. — Internal documentation. Not for distribution.*
