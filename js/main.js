/**
 * main.js — Scroll animations, accordions, misc interactions
 */

(function () {
  'use strict';

  // ── Scroll-triggered fade-up animations ──────────────────
  function initScrollAnimations() {
    const els = document.querySelectorAll('.animate-fade-up');
    if (!els.length) return;

    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  // ── FAQ / Accordion ───────────────────────────────────────
  function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(function (header) {
      header.addEventListener('click', function () {
        const body = this.nextElementSibling;
        const isOpen = this.classList.contains('open');

        // Close all siblings (one-at-a-time accordion)
        const accordion = this.closest('.accordion');
        if (accordion) {
          accordion.querySelectorAll('.accordion-header.open').forEach(function (h) {
            if (h !== header) {
              h.classList.remove('open');
              h.setAttribute('aria-expanded', 'false');
              const b = h.nextElementSibling;
              if (b) b.classList.remove('open');
            }
          });
        }

        if (isOpen) {
          this.classList.remove('open');
          this.setAttribute('aria-expanded', 'false');
          if (body) body.classList.remove('open');
        } else {
          this.classList.add('open');
          this.setAttribute('aria-expanded', 'true');
          if (body) body.classList.add('open');
        }
      });

      // Keyboard support
      header.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });

      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');
      header.setAttribute('aria-expanded', 'false');
    });
  }

  // ── Cookie consent banner ─────────────────────────────────
  function initCookieConsent() {
    // Only show if analytics is configured
    if (!window.VISTAAR || !window.VISTAAR.CONFIG.ANALYTICS_ID) return;
    if (localStorage.getItem('vi_cookie_consent')) return;

    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    banner.style.display = 'flex';

    const acceptBtn = banner.querySelector('.cookie-accept');
    const declineBtn = banner.querySelector('.cookie-decline');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem('vi_cookie_consent', 'accepted');
        banner.style.display = 'none';
        // TODO: enable analytics tracking here
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        localStorage.setItem('vi_cookie_consent', 'declined');
        banner.style.display = 'none';
      });
    }
  }

  // ── Lazy-load images ──────────────────────────────────────
  function initLazyImages() {
    if (!('IntersectionObserver' in window)) return;

    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    const imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    images.forEach(function (img) { imgObserver.observe(img); });
  }

  // ── Active section highlighting in nav ────────────────────
  function initSectionTracking() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const navLinks = document.querySelectorAll('.nav-link[href*="#"], .mobile-nav-link[href*="#"]');
    if (!navLinks.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle(
            'active',
            link.getAttribute('href').endsWith('#' + id)
          );
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

  // ── Service card "Learn More" → contact with preselect ────
  function initServiceLinks() {
    document.querySelectorAll('[data-service-link]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const service = this.dataset.serviceLink;
        if (!service) return;
        // Navigate to contact with service preselected via URL param
        window.location.href = `contact.html?service=${encodeURIComponent(service)}`;
        e.preventDefault();
      });
    });
  }

  // ── Initialise ────────────────────────────────────────────
  function init() {
    initScrollAnimations();
    initAccordions();
    initCookieConsent();
    initLazyImages();
    initSectionTracking();
    initServiceLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
