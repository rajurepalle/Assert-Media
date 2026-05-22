const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const navLinks = [...document.querySelectorAll('a[href^="#"]')];
const revealEls = document.querySelectorAll('.reveal');

function setHeaderState() {
  if (window.scrollY > 12) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach(el => observer.observe(el));

document.addEventListener('click', (e) => {
  const insideHeader = e.target.closest('.site-header');
  if (!insideHeader && mobileNav.classList.contains('open')) {
    mobileNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }
});
