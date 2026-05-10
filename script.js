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

// ===== Skills =====
const skillStacks = [
  {
    title: 'Frontend',
    count: 6,
    items: [
      { name: 'HTML5', iconUrl: 'https://cdn.simpleicons.org/html5/E34F26' },
      { name: 'CSS3', iconUrl: 'https://cdn.simpleicons.org/css/1572B6' },
      { name: 'JavaScript', iconUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
      { name: 'React.js', iconUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Next.js', iconUrl: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF' },
      { name: 'Tailwind CSS', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/38BDF8' },
    ],
  },
  {
    title: 'Backend',
    count: 4,
    items: [
      { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/nodedotjs/68A063' },
      { name: 'Express.js', iconUrl: 'https://cdn.simpleicons.org/express/FFFFFF' },
      { name: 'REST API', iconUrl: 'https://cdn.simpleicons.org/openapiinitiative/6BA539' },
      { name: 'JWT / OAuth', iconUrl: 'https://cdn.simpleicons.org/auth0/EB5424' },
    ],
  },
  {
    title: 'Database',
    count: 4,
    items: [
      { name: 'MongoDB', iconUrl: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'MySQL', iconUrl: 'https://cdn.simpleicons.org/mysql/00758F' },
      { name: 'PostgreSQL', iconUrl: 'https://cdn.simpleicons.org/postgresql/336791' },
      { name: 'Firebase', iconUrl: 'https://cdn.simpleicons.org/firebase/FFCA28' },
    ],
  },
  {
    title: 'Tools & Platforms',
    count: 6,
    items: [
      { name: 'Git', iconUrl: 'https://cdn.simpleicons.org/git/F05032' },
      { name: 'GitHub', iconUrl: 'https://cdn.simpleicons.org/github/FFFFFF' },
      { name: 'VS Code', iconUrl: 'https://cdn.simpleicons.org/visualstudiocode/007ACC' },
      { name: 'Postman', iconUrl: 'https://cdn.simpleicons.org/postman/FF6C37' },
      { name: 'Firebase', iconUrl: 'https://cdn.simpleicons.org/firebase/FFCA28' },
      { name: 'Vercel', iconUrl: 'https://cdn.simpleicons.org/vercel/FFFFFF' },
    ],
  },
  {
    title: 'Programming Languages',
    count: 4,
    items: [
      { name: 'JavaScript', iconUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
      { name: 'Python', iconUrl: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'Java', iconUrl: 'https://cdn-icons-png.flaticon.com/512/226/226777.png' },
      { name: 'C', iconUrl: 'https://cdn.simpleicons.org/c/00599C' },
    ],
  },
];

const skillStacksContainer = document.getElementById('skillStacks');
if (skillStacksContainer) {
  skillStacksContainer.innerHTML = skillStacks.map((stack, stackIndex) => `
    <article class="skill-stack-card glass reveal">
      <div class="skill-stack-head">
        <h3>${stack.title}</h3>
        <span>${stack.count} tools</span>
      </div>
      <div class="skill-tile-grid">
        ${stack.items.map((skill, skillIndex) => {
          const fallbackLabel = (skill.name || '').slice(0, 2).toUpperCase();
          return `
          <div class="skill-tile">
            <div class="skill-icon-wrap">
              <img class="skill-icon" src="${skill.iconUrl}" alt="${skill.name} logo" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';" />
              <span class="skill-icon-fallback" style="display:none;">${fallbackLabel}</span>
            </div>
            <span>${skill.name}</span>
          </div>`;
        }).join('')}
      </div>
    </article>
  `).join('');
  skillStacksContainer.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
}

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
