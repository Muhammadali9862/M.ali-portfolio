// ============================================================
// Muhammad Ali Touheed — Portfolio interactions
// Theme toggle · mobile nav · scroll reveal · counters · nav spy
// ============================================================

(function () {
  'use strict';

  const root = document.documentElement;

  // ---------- Theme toggle (persisted) ----------
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ---------- Mobile nav ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    })
  );

  // ---------- Navbar shadow + back-to-top on scroll ----------
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  backToTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal, .reveal-right');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // ---------- Animated counters ----------
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        counterObserver.unobserve(entry.target);

        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const decimals = parseInt(el.dataset.decimal || '0', 10);
        const duration = 1600;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          el.textContent = (target * eased).toFixed(decimals) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  // ---------- Active nav link (scroll spy) ----------
  const sections = document.querySelectorAll('section[id]');
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.querySelectorAll('a').forEach((a) =>
          a.classList.toggle('active', a.getAttribute('href') === '#' + id)
        );
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => spyObserver.observe(s));

  // ---------- Rotating hero role (typewriter) ----------
  const roleEl = document.getElementById('rotatingRole');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (roleEl && !reducedMotion) {
    const roles = [
      'Senior Android Developer',
      'Kotlin & Java Expert',
      'Jetpack Compose Developer',
      'Firebase & Real-Time Systems',
      'Google Maps & Live Tracking',
      'React Native (Learning)'
    ];
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;

    function typeLoop() {
      const current = roles[roleIndex];

      if (deleting) {
        charIndex--;
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeLoop, 350);
          return;
        }
        setTimeout(typeLoop, 38);
      } else {
        charIndex++;
        roleEl.textContent = roles[roleIndex].slice(0, charIndex);
        if (charIndex === roles[roleIndex].length) {
          deleting = true;
          setTimeout(typeLoop, 1700); // hold the full word
          return;
        }
        setTimeout(typeLoop, 72);
      }
    }
    setTimeout(typeLoop, 2200); // initial hold before first cycle
  }

  // ---------- Footer year ----------
  document.getElementById('year').textContent = new Date().getFullYear();
})();
