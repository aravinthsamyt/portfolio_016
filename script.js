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
    title: 'EV charge Analyser',
    desc: 'A smart charging analysis system designed to monitor and analyze EV charging performance and efficiency.Provides real-time insights, data visualization, and optimized charging statistics using interactive dashboards.',
    img: 'assets/projects/zeon_charge.jpeg',
    tech: ['React','Tailwind CSS', 'Node.js', 'Firebase', 'TypeScript'],
    duration: 'Jan 2025-March 2025',
    demo: 'https://github.com/aravinthsamyt/zeon_logs/tree/main/Zeon-Logs-main', code: 'https://github.com/aravinthsamyt/zeon_logs/tree/main/Zeon-Logs-main'
  },
  {
    title: 'Fabric Defect Detection',
    desc: 'An image-processing based application developed to detect defects in fabrics automatically for quality assurance.Uses computer vision techniques to identify irregularities and improve manufacturing inspection accuracy.',
    img: 'assets/projects/fabric_project.png',
    tech: ['React', 'Tailwind CSS', 'PyTorch','Python', 'Firebase','OpenCV'],
    duration: 'Feb 2025-Apr 2025',
    demo: 'https://github.com/aravinthsamyt/fabric_project', code: 'https://github.com/aravinthsamyt/fabric_project'
  },
  {
    title: 'Blog space',
    desc: 'A full-stack blogging platform where users can create, edit, and publish articles with a clean and responsive interface.Implemented authentication, dynamic content management, and modern UI features for a smooth user experience.',
    img: 'assets/projects/blog.png',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    duration: 'Nov 2024-Jan 2025',
    demo: 'https://github.com/aravinthsamyt/blog_website/tree/main/blogging-main', code: 'https://github.com/aravinthsamyt/blog_website/tree/main/blogging-main'
  },
  {
    title: 'Single page CV',
    desc: 'A modern single-page resume website built to showcase skills, projects, and achievements in a professional layout.Designed with responsive UI and smooth navigation for an engaging portfolio experience.',
    img: 'assets/projects/singlepage_cv.png',
    tech: ['HTML', 'CSS'],
    duration: 'Oct 2024-Nov 2024',
    demo: 'https://single-page-cv-livid-theta.vercel.app/', code: 'https://github.com/aravinthsamyt/single_pageCv'
  },
  {
    title: 'Changelog',
    desc: 'An animated timeline website built using HTML and CSS to showcase the historical evolution of cars and bikes through different eras.Features smooth animations and interactive visual transitions to present vehicle milestones and establishment years in an engaging way.',
    img: 'assets/projects/changelog.png',
    tech: ['HTML', 'CSS'],
    duration: 'Sep 2024-Oct 2024',
    demo: 'https://changelog-lime.vercel.app/', code: 'https://github.com/aravinthsamyt/changelog'
  },
  {
    title: 'Calculator',
    desc: 'A responsive calculator application capable of performing basic arithmetic and scientific operations efficiently.Designed with an intuitive interface and optimized logic for accurate real-time calculations.',
    img: 'assets/projects/calculator.png',
    tech: ['HTML', 'CSS', 'JavaScript'],
    duration: 'Aug 2024-Sep 2024',
    demo: 'https://calculater-pi-three.vercel.app/', code: 'https://github.com/aravinthsamyt/calculater'
  },
];
const grid = document.getElementById('projectsGrid');
projects.forEach((p, idx) => {
  const card = document.createElement('article');
  card.className = 'project reveal';
  const liveDemoHtml = idx < 3
    ? `<a class="btn btn-icon live-demo" href="${p.demo}" target="_blank" rel="noreferrer" title="View on GitHub"><i class="ri-github-fill"></i></a>`
    : `<a class="btn btn-icon live-demo" href="${p.demo}" target="_blank" rel="noreferrer" title="Live demo"><i class="icon-external-link"></i></a>`;

  card.innerHTML = `
    <div class="project-img">
      <img src="${p.img}" alt="${p.title}" loading="lazy"/>
    </div>
    <div class="project-body">
      <div class="project-title-row">
        <h3 class="project-title">${p.title}</h3>
        ${liveDemoHtml}
      </div>
      <p class="project-desc">${p.desc}</p>
      <div class="tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="project-meta">
        <div class="project-date"><i class="icon-calendar"></i><span>${p.duration || 'Jan 2025-March 2025'}</span></div>
        <a class="github-link" href="${p.code}" target="_blank" rel="noreferrer" title="View on GitHub"><i class="ri-github-fill"></i><span class="github-label">Github</span></a>
      </div>
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

// ===== Resume download (force download fallback) =====
const resumeBtn = document.querySelector('.footer-resume-btn');
if (resumeBtn) {
  resumeBtn.addEventListener('click', async (e) => {
    // Let native download happen on non-JS or if user holds modifier keys
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const url = resumeBtn.getAttribute('href');
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network error');
      const blob = await res.blob();
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      // Use the download attribute if provided, otherwise fallback to filename from URL
      const filename = resumeBtn.getAttribute('download') || url.split('/').pop();
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      // Fallback: navigate to file which may open in new tab
      window.location.href = url;
    }
  });
}

// ===== Achievements =====
const achievements = [
  {
    name: 'Electroathon Hackathon',
    location: 'EEE Department KEC',
    date: 'May 2025',
    year: 2025,
    img: 'assets/EEEhackathon.jpeg',
    linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7431355310453460992/'
  },
  {
    name: '30 hrs Hackathon',
    location: 'ECE Department KEC',
    date: 'June 2025',
    year: 2025,
    img: 'assets/ECEhackathon.jpeg',
    linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7436095828579991553/'
  },{
    name: 'MERN Stack Mastery',
    location: 'Coursera',
    date: 'July 2025',
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
  const awardBadge = (idx < 2) ? `<div class="award-badge"><span class="award-icon award-emoji" aria-hidden="true">🎀</span>1st Prize</div>` : '';
  const linkedinBadge = achievement.linkedin
    ? `<a class="achievement-pill achievement-link-pill" href="${achievement.linkedin}" target="_blank" rel="noreferrer"><i class="ri-linkedin-fill"></i><span>LinkedIn Post</span></a>`
    : `<span class="achievement-pill achievement-link-pill is-static"><i class="ri-linkedin-fill"></i><span>LinkedIn Post</span></span>`;
  card.innerHTML = `
    ${awardBadge}
    <div class="project-img">
      <img src="${achievement.img}" alt="${achievement.name}" loading="lazy"/>
      
    </div>
    <div class="project-body">
      <div class="project-title-row">
        <h3 class="project-title">${achievement.name}</h3>
      </div>
      <p class="project-desc achievement-location">${achievement.location}</p>
      <span class="achievement-underline" aria-hidden="true"></span>
      <div class="achievement-footer">
        <span class="achievement-pill achievement-date-pill"><i class="ri-calendar-line"></i><span>${achievement.date}</span></span>
        ${linkedinBadge}
      </div>
    </div>`;
  achievementsGrid.appendChild(card);
  revealObs.observe(card);
});

achievementsContainer.appendChild(achievementsGrid);

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
