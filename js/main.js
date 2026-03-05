/* ============================================================
   WEISS LAWN CARE — main.js
   ============================================================ */

// ─── THEME SWITCHER ──────────────────────────────────────────

const THEMES = ['emerald', 'midnight', 'harvest', 'coastal'];
const STORAGE_KEY = 'wlc-theme';

const htmlEl      = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themePanel  = document.getElementById('theme-panel');
const swatches    = document.querySelectorAll('.theme-swatch');

function applyTheme(theme) {
  if (!THEMES.includes(theme)) theme = 'emerald';
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);

  swatches.forEach(swatch => {
    swatch.classList.toggle('active', swatch.dataset.theme === theme);
  });
}

// Load saved theme on page load
applyTheme(localStorage.getItem(STORAGE_KEY) || 'emerald');

themeToggle.addEventListener('click', () => {
  const isOpen = themePanel.classList.toggle('is-open');
  themeToggle.setAttribute('aria-expanded', isOpen);
});

swatches.forEach(swatch => {
  swatch.addEventListener('click', () => {
    applyTheme(swatch.dataset.theme);
    themePanel.classList.remove('is-open');
  });
});

// Close panel on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('#theme-switcher')) {
    themePanel.classList.remove('is-open');
  }
});

// ─── NAVIGATION ───────────────────────────────────────────────

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

// Sticky nav shadow on scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('nav--scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile hamburger
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  hamburger.classList.toggle('is-open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    hamburger.classList.remove('is-open');
  });
});

// ─── SMOOTH SCROLL OFFSET (for fixed nav) ─────────────────────

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── CONTACT FORM (Formspree AJAX) ────────────────────────────

const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        form.reset();
        showStatus('success', '✅ Message sent! We\'ll get back to you soon.');
      } else {
        const json = await response.json().catch(() => ({}));
        const msg = json.errors?.map(e => e.message).join(', ') || 'Something went wrong.';
        showStatus('error', `❌ ${msg} — please call us at 515-250-0911.`);
      }
    } catch {
      showStatus('error', '❌ Network error. Please call or text 515-250-0911.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
  });
}

function showStatus(type, message) {
  formStatus.textContent = message;
  formStatus.className = `form__status ${type}`;
  formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  if (type === 'success') {
    setTimeout(() => { formStatus.className = 'form__status'; formStatus.textContent = ''; }, 8000);
  }
}

// ─── FOOTER YEAR ──────────────────────────────────────────────

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── CARD REVEAL ANIMATION ────────────────────────────────────

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.card, .contact__item, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}
