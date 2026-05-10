// ===== Title Card Animation =====
const titleCard = document.getElementById('titleCard');
if (titleCard) {
  let duration = 5000; // Default for desktop
  if (window.innerWidth <= 768) duration = 4000; // Tablet
  if (window.innerWidth <= 480) duration = 3500; // Mobile
  
  setTimeout(() => {
    titleCard.classList.add('remove');
  }, duration);
}

// ===== Theme toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

const setTheme = (t) => {
  body.classList.toggle('dark', t === 'dark');
  themeIcon.className = t === 'dark' ? 'icon-sun' : 'icon-moon';
  localStorage.setItem('theme', t);
};
setTheme(localStorage.getItem('theme') || 'dark');
themeToggle.addEventListener('click', () => {
  setTheme(body.classList.contains('dark') ? 'light' : 'dark');
});

// ===== Navbar scrolled state =====
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll);
onScroll();

// ===== Smooth scroll + active link =====
const sections = ['home','about','achievements','skills','projects','certification','contact'];
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); closeMobile(); }
  });
});

const navLinks = document.querySelectorAll('.nav-link, .m-link');
const setActive = (id) => navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(id => { const el = document.getElementById(id); if (el) sectionObserver.observe(el); });

// ===== Mobile menu =====
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobile = () => mobileMenu.classList.add('hidden');
menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// ===== Typewriter =====
(function () {
  const el = document.getElementById('typed');
  const words = ['Full Stack Developer', 'MERN Developer', 'Problem Solver'];
  let i = 0, j = 0, deleting = false;
  const tick = () => {
    const word = words[i % words.length];
    el.textContent = word.substring(0, j);
    if (!deleting && j === word.length) { setTimeout(() => { deleting = true; tick(); }, 1500); return; }
    if (deleting && j === 0) { deleting = false; i++; setTimeout(tick, 200); return; }
    j += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 50 : 90);
  };
  tick();
})();

// ===== Reveal on scroll =====
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

// ===== Skills (animated rings) =====
const skills = [
  { name: 'React', value: 95 },
  { name: 'Node.js', value: 90 },
  { name: 'MongoDB', value: 85 },
  { name: 'Express', value: 88 },
  { name: 'TypeScript', value: 92 },
  { name: 'Next.js', value: 80 },
  { name: 'Tailwind', value: 95 },
  { name: 'GraphQL', value: 75 },
];
const skillsCard = document.getElementById('skillsCard');
const skillsGrid = skillsCard.querySelector('.skills-grid');
const r = 42, c = 2 * Math.PI * r;
skills.forEach((s, idx) => {
  const wrap = document.createElement('div');
  wrap.className = 'ring';
  wrap.innerHTML = `
    <div class="ring-svg">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--border)" stroke-width="6"/>
        <circle class="progress" cx="50" cy="50" r="${r}" fill="none" stroke="url(#g${idx})" stroke-width="6" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c}"/>
        <defs><linearGradient id="g${idx}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="var(--primary)"/><stop offset="100%" stop-color="var(--primary-glow)"/></linearGradient></defs>
      </svg>
      <div class="ring-value" data-target="${s.value}">0%</div>
    </div>
    <div class="ring-name">${s.name}</div>`;
  skillsGrid.appendChild(wrap);
});

const skillsObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    skillsCard.querySelectorAll('.ring').forEach((ring, i) => {
      const val = skills[i].value;
      const offset = c - (val / 100) * c;
      ring.querySelector('.progress').style.strokeDashoffset = offset;
      const valEl = ring.querySelector('.ring-value');
      let n = 0;
      const step = Math.max(1, Math.round(val / 30));
      const id = setInterval(() => {
        n += step; if (n >= val) { n = val; clearInterval(id); }
        valEl.textContent = n + '%';
      }, 50);
    });
    skillsObs.disconnect();
  });
}, { threshold: 0.25 });
skillsObs.observe(skillsCard);

// ===== Projects =====
const projects = [
  {
    title: 'NovaCommerce',
    desc: 'Full-stack e-commerce platform with real-time inventory, Stripe checkout and a custom admin dashboard.',
    img: 'assets/project1.jpg',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demo: '#', code: '#'
  },
  {
    title: 'PulseChat',
    desc: 'Realtime chat application with end-to-end encryption, presence indicators and rich media sharing.',
    img: 'assets/project2.jpg',
    tech: ['Next.js', 'Socket.io', 'Express', 'Redis'],
    demo: '#', code: '#'
  },
  {
    title: 'TaskOrbit',
    desc: 'Project management tool with drag-and-drop boards, team workspaces and granular permissions.',
    img: 'assets/project3.jpg',
    tech: ['React', 'TypeScript', 'GraphQL', 'PostgreSQL'],
    demo: '#', code: '#'
  },
];
const grid = document.getElementById('projectsGrid');
projects.forEach(p => {
  const card = document.createElement('article');
  card.className = 'project reveal';
  card.innerHTML = `
    <div class="project-img">
      <img src="${p.img}" alt="${p.title}" loading="lazy"/>
      <div class="project-overlay">
        <a class="btn btn-primary" href="${p.demo}" target="_blank" rel="noreferrer"><i class="icon-external-link"></i> Live Demo</a>
        <a class="btn btn-outline" href="${p.code}" target="_blank" rel="noreferrer"><i class="icon-github"></i> GitHub</a>
      </div>
    </div>
    <div class="project-body">
      <h3 class="project-title">${p.title}</h3>
      <p class="project-desc">${p.desc}</p>
      <div class="tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
    </div>`;
  grid.appendChild(card);
  revealObs.observe(card);
});

// ===== Contact form =====
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  toast.textContent = '✓ Message sent! I\'ll get back to you soon.';
  toast.classList.remove('hidden');
  form.reset();
  setTimeout(() => toast.classList.add('hidden'), 3500);
});

// ===== Achievements =====
const achievements = [
  {
    name: 'Electroathon Hackathon',
    location: 'EEE Department KEC',
    year: 2025,
    img: 'assets/EEEhackathon.jpeg',
    linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7431355310453460992/'
  },
  {
    name: '30 hrs Hackathon',
    location: 'ECE Department KEC',
    year: 2025,
    img: 'assets/ECEhackathon.jpeg',
    linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7436095828579991553/'
  },{
    name: 'MERN Stack Mastery',
    location: 'Coursera',
    year: 2025,
    img: 'assets/loading1.jpeg',
    linkedin: ''
  }
];

const achievementsContainer = document.getElementById('achievementsContainer');
const achievementsGrid = document.createElement('div');
achievementsGrid.className = 'achievements-grid';

achievements.forEach((achievement, idx) => {
  const card = document.createElement('article');
  card.className = 'project reveal';
  // add a small award badge to the first two achievements (use Remix Icon)
  const awardBadge = (idx < 2) ? `<div class="award-badge"><i class="ri-award-line award-icon"></i>1st Prize</div>` : '';
  card.innerHTML = `
    ${awardBadge}
    <div class="project-img">
      <img src="${achievement.img}" alt="${achievement.name}" loading="lazy"/>
      <div class="project-overlay">
        <a class="btn btn-primary" href="${achievement.linkedin}" target="_blank" rel="noreferrer"><i class="icon-external-link"></i> View on LinkedIn</a>
      </div>
    </div>
    <div class="project-body">
      <h3 class="project-title">${achievement.name}</h3>
      <p class="project-desc">${achievement.location} • ${achievement.year}</p>
      <div class="tech"></div>
    </div>`;
  achievementsGrid.appendChild(card);
  revealObs.observe(card);
});

achievementsContainer.appendChild(achievementsGrid);

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
