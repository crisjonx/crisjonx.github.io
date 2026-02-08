// script.js — handles projects toggle, icon behavior, hover name, pinning, time

// Elements
const icons = document.getElementById('icons');
const displayName = document.getElementById('display-name');
const avatarImg = document.getElementById('avatar-img');
const myTimeEl = document.getElementById('my-time');
const projectsBtn = document.getElementById('projects-btn');
const backBtn = document.getElementById('back-btn');
const tagList = document.getElementById('tag-list');
const projectsContainer = document.getElementById('projects-container');

const ORIGINAL = { name: displayName.textContent, avatar: avatarImg.getAttribute('src') };

// ---------- Projects: template placeholders (all "Project 1") ----------
const NUM_PLACEHOLDERS = 5;
const projects = Array.from({length: NUM_PLACEHOLDERS}, (_,i) => ({
  name: 'Project 1',
  href: '/projects/project-1',
  desc: 'A short, one-line project description.'
}));
// -------------------------------------------------------------------

function renderProjects(){
  projectsContainer.innerHTML = '';
  projects.forEach(p => {
    const item = document.createElement('div');
    item.className = 'project-item';

    const a = document.createElement('a');
    a.className = 'project-link';
    a.href = p.href;
    a.textContent = p.name;
    a.style.display = 'inline-block';

    const desc = document.createElement('div');
    desc.className = 'project-desc';
    desc.textContent = p.desc;

    // whole item click navigates same tab
    item.addEventListener('click', (ev) => {
      // if user clicked with modifier or middle click, respect it (let anchor handle it)
      if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.button === 1) return;
      window.location.href = p.href;
    });

    item.appendChild(a);
    item.appendChild(desc);
    projectsContainer.appendChild(item);
  });
}

// Enter / Exit Projects view
function enterProjects(){
  icons.classList.add('hidden');
  displayName.textContent = 'projects';           // requested: show "projects"
  tagList.classList.add('hidden');
  renderProjects();
  projectsContainer.classList.remove('hidden');
  backBtn.classList.add('visible');               // arrow becomes visible (only)
}

function exitProjects(){
  icons.classList.remove('hidden');
  displayName.textContent = ORIGINAL.name;
  tagList.classList.remove('hidden');
  projectsContainer.classList.add('hidden');
  backBtn.classList.remove('visible');
}

projectsBtn.addEventListener('click', enterProjects);
backBtn.addEventListener('click', exitProjects);

// Icons: same-tab redirect on click
icons.addEventListener('click', e => {
  const btn = e.target.closest('.social-link');
  if (!btn) return;
  const url = btn.dataset.url;
  if (!url) return;
  // respect modifier clicks (let browser do new tab) — only change same-tab for normal clicks
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
  window.location.href = url;
});

// Hover: show username only (no avatar change)
icons.addEventListener('pointerover', e => {
  const btn = e.target.closest('.social-link');
  if (!btn) return;
  const name = btn.dataset.username || '';
  if (name) displayName.textContent = name;
});
icons.addEventListener('pointerout', () => { displayName.textContent = ORIGINAL.name; });

// Double-click pin: toggle pinned avatar (unchanged)
let pinned = null;
icons.addEventListener('dblclick', e => {
  const btn = e.target.closest('.social-link');
  if (!btn) return;
  if (pinned === btn) {
    btn.classList.remove('pinned');
    pinned = null;
    displayName.textContent = ORIGINAL.name;
    avatarImg.setAttribute('src', ORIGINAL.avatar);
    return;
  }
  if (pinned) pinned.classList.remove('pinned');
  pinned = btn;
  pinned.classList.add('pinned');
  const img = btn.dataset.img || null;
  if (img) avatarImg.setAttribute('src', img);
  const name = btn.dataset.username || '';
  if (name) displayName.textContent = name;
});

// Preload icons
(function preload(){
  document.querySelectorAll('.social-link').forEach(btn => {
    const src = btn.dataset.img;
    if (!src) return;
    const img = new Image(); img.src = src;
  });
})();

// Time display (UTC-5)
function updateTime(){
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const target = new Date(utc + (-5 * 3600000));
  let hours = target.getHours();
  const minutes = target.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12; hours = hours ? hours : 12;
  const mm = minutes.toString().padStart(2,'0');
  myTimeEl.textContent = `my time is ${hours}:${mm} ${ampm}, UTC-5`;
}
updateTime();
setInterval(updateTime, 60000);
