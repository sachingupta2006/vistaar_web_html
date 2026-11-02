/**
 * navigation.js — Header, mobile menu, dropdown, sticky scroll
 */

(function () {
  'use strict';

  const header    = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay   = document.querySelector('.nav-overlay');

  // ── Sticky header ────────────────────────────────────────
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile menu toggle ────────────────────────────────────
  function openMobileNav() {
    if (!hamburger || !mobileNav) return;
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!hamburger || !mobileNav) return;
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav && mobileNav.classList.contains('open');
      isOpen ? closeMobileNav() : openMobileNav();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', closeMobileNav);
  }

  // Close when clicking a mobile nav link
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // ── Active nav link ───────────────────────────────────────
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  allNavLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.replace(/\/$/, '');
    if (
      linkPath === currentPath ||
      (currentPath.endsWith(linkPath) && linkPath !== '' && linkPath !== '/')
    ) {
      link.classList.add('active');
    }
  });

  // ── Smooth scroll for anchor links ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--header-h'), 10) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── Keyboard accessible dropdowns ─────────────────────────
  document.querySelectorAll('.nav-item').forEach(function (item) {
    const trigger = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');
    if (!trigger || !dropdown) return;

    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('focus', function () {
      trigger.setAttribute('aria-expanded', 'true');
    });

    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

})();
