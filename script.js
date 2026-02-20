/* ─────────────────────────────────────────
   Kevin Monga Portfolio — script.js
   ───────────────────────────────────────── */

// ════════════════════════════════
// CUSTOM CURSOR
// ════════════════════════════════
const cur  = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

// hide cursor when leaving browser window
document.addEventListener('mouseleave', () => {
  cur.style.opacity = '0';
  ring.style.opacity = '0';
});

// show cursor again when entering
document.addEventListener('mouseenter', () => {
  cur.style.opacity = '1';
  ring.style.opacity = '1';
});

// ring follows with smooth lag
(function rafLoop() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(rafLoop);
})();

// hover state on interactive elements
document.querySelectorAll('a, button, .proj-item, .sk, .soc, .tl-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hs'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hs'));
});

// disable cursor on touch devices
if ('ontouchstart' in window) {
  cur.style.display  = 'none';
  ring.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ════════════════════════════════
// SCROLL PROGRESS BAR
// ════════════════════════════════
const prog = document.getElementById('prog');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  prog.style.width = pct + '%';
}, { passive: true });

// ════════════════════════════════
// NAV — shrink on scroll
// ════════════════════════════════
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 50);
}, { passive: true });

// ════════════════════════════════
// HAMBURGER / MOBILE MENU
// ════════════════════════════════
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mob');
let menuOpen = false;

hbg.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mob.classList.toggle('show', menuOpen);
  const spans = hbg.querySelectorAll('span');
  spans[0].style.transform = menuOpen ? 'rotate(45deg) translate(4.5px,4.5px)' : '';
  spans[1].style.opacity   = menuOpen ? '0' : '1';
  spans[2].style.transform = menuOpen ? 'rotate(-45deg) translate(4.5px,-4.5px)' : '';
});

function closeMob() {
  menuOpen = false;
  mob.classList.remove('show');
  hbg.querySelectorAll('span').forEach(s => {
    s.style.transform = '';
    s.style.opacity   = '1';
  });
}
// expose to inline onclick handlers in HTML
window.closeMob = closeMob;

// ════════════════════════════════
// SCROLL REVEAL
// ════════════════════════════════
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('on');
  });
}, { threshold: 0.07 });

document.querySelectorAll('.r').forEach(el => revealObs.observe(el));

// ════════════════════════════════
// PROFICIENCY BARS — animate on enter
// ════════════════════════════════
const profObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.prof-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      profObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const profRows = document.getElementById('profRows');
if (profRows) profObs.observe(profRows);

// ════════════════════════════════
// HERO PARALLAX — subtle depth on scroll
// ════════════════════════════════
const heroEl = document.getElementById('hero');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const limit = window.innerHeight;
  if (y < limit) {
    heroEl.style.transform = `translateY(${y * 0.2}px)`;
    heroEl.style.opacity   = 1 - (y / limit) * 1.1;
  }
}, { passive: true });

// ════════════════════════════════
// TIMELINE CARDS — stagger reveal
// ════════════════════════════════
const tlCards = document.querySelectorAll('.tl-card');
const tlObs   = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
      }, i * 120);
      tlObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

tlCards.forEach(card => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)';
  tlObs.observe(card);
});