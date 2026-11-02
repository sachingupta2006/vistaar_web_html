/**
 * contact.js — Quote form validation, submission, and feedback
 */

(function () {
  'use strict';

  // ── Helpers ───────────────────────────────────────────────
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

  function showError(input, msg) {
    input.classList.add('error');
    const errEl = input.parentElement.querySelector('.form-error');
    if (errEl) { errEl.textContent = msg; errEl.classList.add('show'); }
  }

  function clearError(input) {
    input.classList.remove('error');
    const errEl = input.parentElement.querySelector('.form-error');
    if (errEl) { errEl.classList.remove('show'); }
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
  }

  // Indian mobile: 10 digits optionally prefixed with +91 or 0.
  // Also accepts other international formats starting with +.
  function isValidPhone(val) {
    const cleaned = val.replace(/[\s\-().]/g, '');
    // International format
    if (cleaned.startsWith('+')) return cleaned.length >= 10 && cleaned.length <= 16;
    // Indian domestic
    const digits = cleaned.replace(/^0/, '');
    return /^[6-9]\d{9}$/.test(digits);
  }

  function isValidFileAttachment(file) {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg', 'image/png', 'image/webp',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const maxSizeMB = 5;
    if (!allowedTypes.includes(file.type)) {
      return { ok: false, msg: 'Allowed file types: PDF, JPG, PNG, WEBP, DOC, DOCX.' };
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return { ok: false, msg: `File must be smaller than ${maxSizeMB} MB.` };
    }
    return { ok: true };
  }

  // ── Service pre-selection from URL param ──────────────────
  function preselectService() {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    if (!service) return;
    const sel = document.getElementById('service');
    if (!sel) return;
    // Match case-insensitively
    const opt = [...sel.options].find(o =>
      o.value.toLowerCase().replace(/\s+/g, '-') === service.toLowerCase()
    );
    if (opt) sel.value = opt.value;
  }

  // ── Form validation ───────────────────────────────────────
  function validateForm(form) {
    let valid = true;

    const fields = {
      name:    { el: form.querySelector('#name'),    minLen: 2, label: 'Full name' },
      company: { el: form.querySelector('#company'), minLen: 2, label: 'Company name' },
      phone:   { el: form.querySelector('#phone'),   type: 'phone',  label: 'Phone number' },
      email:   { el: form.querySelector('#email'),   type: 'email',  label: 'Email address' },
      service: { el: form.querySelector('#service'), required: true, label: 'Service required' },
      message: { el: form.querySelector('#message'), minLen: 10,     label: 'Message' },
    };

    Object.values(fields).forEach(function (f) {
      if (!f.el) return;
      clearError(f.el);
      const val = f.el.value.trim();

      if (!val) {
        showError(f.el, `${f.label} is required.`);
        valid = false;
        return;
      }

      if (f.minLen && val.length < f.minLen) {
        showError(f.el, `${f.label} must be at least ${f.minLen} characters.`);
        valid = false;
        return;
      }

      if (f.type === 'email' && !isValidEmail(val)) {
        showError(f.el, 'Please enter a valid email address.');
        valid = false;
        return;
      }

      if (f.type === 'phone' && !isValidPhone(val)) {
        showError(f.el, 'Please enter a valid phone number (e.g. 98765 43210 or +44 7700 900000).');
        valid = false;
        return;
      }
    });

    // File attachment validation (optional field)
    const fileInput = form.querySelector('#attachment');
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const result = isValidFileAttachment(fileInput.files[0]);
      if (!result.ok) {
        showError(fileInput, result.msg);
        valid = false;
      }
    }

    return valid;
  }

  // ── Real-time inline validation ───────────────────────────
  function attachLiveValidation(form) {
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (el) {
      el.addEventListener('blur', function () {
        if (el.value.trim()) clearError(el);
      });
    });
  }

  // ── Form submission ───────────────────────────────────────
  async function submitForm(form, formEl, successEl) {
    const endpoint = (window.VISTAAR && window.VISTAAR.CONFIG.FORM_ENDPOINT) || '';

    // Show loading state
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    if (!endpoint) {
      // No backend connected — show info message
      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        const noticeEl = form.querySelector('.form-backend-notice');
        if (noticeEl) {
          noticeEl.style.display = 'block';
        } else {
          alert(
            'Thank you for your enquiry.\n\n' +
            'The contact form is not yet connected to a delivery service.\n' +
            'Please call or WhatsApp us directly while this is being configured.\n\n' +
            'Contact: +91 99603 85447 (Arbaaz)'
          );
        }
      }, 800);
      return;
    }

    // Collect form data
    const data = new FormData(form);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data,
      });

      if (res.ok) {
        // Show success state
        formEl.style.display = 'none';
        if (successEl) successEl.classList.add('show');
      } else {
        const json = await res.json().catch(() => ({}));
        const errMsg = (json.errors && json.errors.map(e => e.message).join(', '))
          || 'Submission failed. Please try again or contact us directly.';
        showSubmitError(form, errMsg);
      }
    } catch (err) {
      showSubmitError(form, 'Network error. Please check your connection and try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  function showSubmitError(form, msg) {
    let errBanner = form.querySelector('.form-submit-error');
    if (!errBanner) {
      errBanner = document.createElement('div');
      errBanner.className = 'form-submit-error notice-box notice-box--warn mt-4';
      errBanner.innerHTML = `<p class="notice-box-body"></p>`;
      form.querySelector('.form-submit-area').after(errBanner);
    }
    errBanner.querySelector('p').textContent = msg;
    errBanner.style.display = 'block';
  }

  // ── Initialise all forms on the page ─────────────────────
  function init() {
    preselectService();

    document.querySelectorAll('.quote-form').forEach(function (form) {
      const formWrapper = form.closest('.form-wrapper') || form;
      const successEl   = formWrapper.parentElement
        ? formWrapper.parentElement.querySelector('.form-success')
        : null;

      attachLiveValidation(form);

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm(form)) {
          submitForm(form, form, successEl);
        } else {
          // Focus first erroring field
          const firstErr = form.querySelector('.form-input.error, .form-select.error, .form-textarea.error');
          if (firstErr) firstErr.focus();
        }
      });
    });

    // Floating WhatsApp button
    const waBtn = document.getElementById('float-wa');
    if (waBtn && window.VISTAAR) {
      waBtn.href = window.VISTAAR.getWhatsAppURL();
    }

    // Mobile bar WhatsApp
    const mobileWa = document.getElementById('mobile-wa');
    if (mobileWa && window.VISTAAR) {
      mobileWa.href = window.VISTAAR.getWhatsAppURL();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
