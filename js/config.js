/**
 * config.js — Centralised configuration for Vistaar Infotech website
 *
 * ⚠️  LAUNCH CHECKLIST — Update these values before going live:
 *
 *  1. WHATSAPP_NUMBER  — Confirm the single approved WhatsApp business number.
 *                        Currently set to Arbaaz's number from the requirements doc.
 *  2. CONTACTS         — The requirements document (doc 1) lists Arbaaz, Pratham, Uttam.
 *                        The brochure (doc 2) lists Uttam Chauhan and Siddharth.
 *                        These two lists conflict. The primary website contacts below
 *                        follow doc 1 (the website requirements doc). Siddharth's number
 *                        from the brochure (+91 77108 85761) is included separately.
 *                        ▶ The business owner MUST confirm which numbers to display and
 *                          which number to use for WhatsApp before launch.
 *  3. EMAIL            — byteroot@gmail.com is marked as temporary. Replace with
 *                        info@vistaarinfotech.com once the domain email is configured.
 *  4. FORM_ENDPOINT    — Set to '' (no backend). Provide a real endpoint or service
 *                        key (e.g. Formspree, EmailJS) before forms can deliver emails.
 *  5. OFFICE_ADDRESS   — Placeholder. Collect the full postal address from the client.
 *  6. BUSINESS_HOURS   — Placeholder. Collect from the client.
 *  7. SOCIAL_LINKS     — Placeholder. Add once social profiles exist.
 *  8. ANALYTICS_ID     — Add Google Analytics measurement ID when ready.
 */

const CONFIG = {

  // ── Company ──────────────────────────────────────────────
  COMPANY_NAME:    'Vistaar Infotech Pvt. Ltd.',
  COMPANY_SHORT:   'Vistaar Infotech',
  TAGLINE:         'Expanding Technology. Empowering Business.',
  DOMAIN:          'vistaarinfotech.com',
  WEBSITE_URL:     'https://vistaarinfotech.com',

  // ── Primary contacts (from Website Requirements Document) ─
  // ⚠️  CONFLICT NOTED: Brochure (doc 2) uses Uttam Chauhan + Siddharth.
  //     Requirements doc (doc 1) uses Arbaaz + Pratham + Uttam.
  //     Displaying requirements doc contacts on the website.
  //     Siddharth's number kept in BROCHURE_CONTACTS for reference.
  CONTACTS: [
    { name: 'Arbaaz',  phone: '+919960385447',  display: '+91 99603 85447' },
    { name: 'Pratham', phone: '+918591757765',  display: '+91 85917 57765' },
    { name: 'Uttam',   phone: '+918425970308',  display: '+91 84259 70308' },
  ],

  // Brochure contacts — kept for reference; not displayed on website by default
  BROCHURE_CONTACTS: [
    { name: 'Uttam Chauhan', phone: '+918425970308', display: '+91 84259 70308' },
    { name: 'Siddharth',     phone: '+917710885761', display: '+91 77108 85761' },
  ],

  // ── WhatsApp ──────────────────────────────────────────────
  // ⚠️  CONFIRM: Which number is the approved WhatsApp business number?
  //     Using Arbaaz's number as the default. Change before launch.
  WHATSAPP_NUMBER: '919960385447',
  WHATSAPP_DEFAULT_MSG: encodeURIComponent(
    'Hello Vistaar Infotech, I would like to enquire about your services.'
  ),

  // ── Email ─────────────────────────────────────────────────
  // ⚠️  REPLACE with info@vistaarinfotech.com once domain email is live.
  EMAIL: 'byteroot@gmail.com',
  EMAIL_DISPLAY: 'byteroot@gmail.com',

  // ── Office ───────────────────────────────────────────────
  // ⚠️  PLACEHOLDER — collect full address from the client.
  OFFICE_CITY:    'Mumbai, Maharashtra, India',
  OFFICE_ADDRESS: '【Full Office Address to be confirmed by client】',
  MAPS_LINK:      '', // Google Maps URL — to be supplied by client

  // ── Business hours ────────────────────────────────────────
  // ⚠️  PLACEHOLDER — confirm with client.
  BUSINESS_HOURS: '【Business hours to be confirmed by client】',

  // ── Form integration ──────────────────────────────────────
  // ⚠️  NOT CONFIGURED — wire up a real backend before launch.
  //     Options: Formspree (https://formspree.io), EmailJS, a serverless function.
  //     Set FORM_ENDPOINT to your Formspree URL or custom endpoint.
  //     Do NOT put secret API keys here — use environment variables server-side.
  FORM_ENDPOINT: '', // e.g. 'https://formspree.io/f/YOUR_FORM_ID'
  FORM_PROVIDER:  'none', // 'formspree' | 'emailjs' | 'custom' | 'none'

  // ── Social media ──────────────────────────────────────────
  // ⚠️  PLACEHOLDER — add once profiles are created.
  SOCIAL: {
    linkedin:  '',
    facebook:  '',
    instagram: '',
    twitter:   '',
  },

  // ── Analytics ─────────────────────────────────────────────
  // ⚠️  Add your Google Analytics 4 Measurement ID (e.g. 'G-XXXXXXXXXX')
  ANALYTICS_ID: '',

};

// WhatsApp URL helper
function getWhatsAppURL(message) {
  const msg = message
    ? encodeURIComponent(message)
    : CONFIG.WHATSAPP_DEFAULT_MSG;
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${msg}`;
}

// Tel link helper
function getTelURL(phoneRaw) {
  return `tel:${phoneRaw}`;
}

// Mailto helper
function getMailtoURL(subject, body) {
  let url = `mailto:${CONFIG.EMAIL}`;
  const parts = [];
  if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
  if (body)    parts.push(`body=${encodeURIComponent(body)}`);
  if (parts.length) url += `?${parts.join('&')}`;
  return url;
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.VISTAAR = { CONFIG, getWhatsAppURL, getTelURL, getMailtoURL };
}
