/* ============================
   DANCEPIRATION - SCRIPT.JS
   ============================ */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Floating particles in hero ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['#6b21d4', '#f97316', '#f59e0b', '#8b45e8', '#fb923c'];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 8 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 10;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      bottom: -10px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ---- Scroll reveal ----
function addRevealClasses() {
  const targets = document.querySelectorAll(
    '.service-card, .testimonial-card, .timing-block, .gallery-item, .about-stats .stat, .contact-card, .festival-chips .chip'
  );
  targets.forEach(el => el.classList.add('reveal'));
}
addRevealClasses();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0) * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- WhatsApp Registration Form ----
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const age = document.getElementById('fage').value.trim();
  const classType = document.getElementById('fclass').value.trim();
  const timing = document.getElementById('ftiming').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !phone || !age || !classType || !timing) {
    alert('Please fill in all required fields.');
    return;
  }

  const waMessage =
    `Hello! 🙏 I want to join *Dancepiration Dance Academy & Fitness Center*.\n\n` +
    `📋 *My Details:*\n` +
    `👤 Name: ${name}\n` +
    `📞 Phone: ${phone}\n` +
    `🎂 Age: ${age}\n` +
    `💃 Class Interested: ${classType}\n` +
    `⏰ Preferred Timing: ${timing}\n` +
    (message ? `💬 Message: ${message}\n` : '') +
    `\nPlease confirm my enrollment. Thank you! 🌟`;

  const encoded = encodeURIComponent(waMessage);
  const waURL = `https://wa.me/919039005654?text=${encoded}`;
  window.open(waURL, '_blank');

  // Show success
  this.reset();
  showToast('Your message has been sent on WhatsApp! 🎉');
});

// ---- Toast notification ----
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 28px;
    background: linear-gradient(135deg, #6b21d4, #f97316);
    color: white;
    padding: 14px 24px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.95rem;
    z-index: 99999;
    box-shadow: 0 8px 32px rgba(107,33,212,0.4);
    animation: toastIn 0.4s ease forwards;
    max-width: 320px;
  `;
  document.body.appendChild(toast);

  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes toastIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(styleEl);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ---- Smooth active nav link highlighting ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active && !active.classList.contains('nav-cta')) {
        active.style.color = '#f97316';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ---- Counter animation for stats ----
function animateCounters() {
  const stats = document.querySelectorAll('.stat strong');
  stats.forEach(stat => {
    const text = stat.textContent;
    const num = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/[0-9]/g, '');
    if (isNaN(num)) return;

    let current = 0;
    const increment = num / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        current = num;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current) + suffix;
    }, 30);
  });
}

const aboutSection = document.querySelector('.about');
if (aboutSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      counterObserver.disconnect();
    }
  }, { threshold: 0.4 });
  counterObserver.observe(aboutSection);
}

// ---- Gallery lightbox (simple) ----
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.dataset.caption || '';

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(5,2,15,0.95);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 24px;
      cursor: pointer;
      backdrop-filter: blur(12px);
    `;

    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.style.cssText = `
      max-height: 80vh; max-width: 90vw;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(107,33,212,0.5);
      object-fit: contain;
    `;

    const capEl = document.createElement('p');
    capEl.textContent = caption;
    capEl.style.cssText = `
      color: white; font-weight: 700; font-size: 1.1rem;
      margin-top: 20px; text-align: center;
    `;

    const closeEl = document.createElement('div');
    closeEl.textContent = '✕ Close';
    closeEl.style.cssText = `
      color: rgba(255,255,255,0.5); font-size: 0.9rem;
      margin-top: 16px; cursor: pointer;
      letter-spacing: 1px;
    `;

    overlay.appendChild(imgEl);
    overlay.appendChild(capEl);
    overlay.appendChild(closeEl);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => overlay.remove());
  });
});

// ---- Marquee pause on hover ----
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

console.log('🎉 Dancepiration Academy website loaded successfully!');
