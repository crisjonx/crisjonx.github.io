// =========================
// ELEMENTS
// =========================
const linksBtn = document.getElementById("links-btn");
const projectsBtn = document.getElementById("projects-btn");

const tagList = document.getElementById("tag-list");
const icons = document.getElementById("icons");
const projectsContainer = document.getElementById("projects-container");

const displayName = document.getElementById("display-name");
const timeEl = document.getElementById("my-time");

const ORIGINAL_NAME = displayName.textContent;


// =========================
// PROJECTS (TEMPLATE)
// =========================
const projects = [
  {
    name: "Project 1",
    desc: "short one-line description",
    url: "#"
  },
  {
    name: "Project 1",
    desc: "short one-line description",
    url: "#"
  },
  {
    name: "Project 1",
    desc: "short one-line description",
    url: "#"
  }
];

projectsContainer.innerHTML = projects.map(p => `
  <div class="project">
    <a href="${p.url}" class="project-name">${p.name}</a>
    <span class="project-desc">${p.desc}</span>
  </div>
`).join("");


// =========================
// VIEW SWITCHING
// =========================
function showLinks() {
  tagList.style.display = "flex";
  icons.style.display = "flex";
  projectsContainer.classList.add("hidden");

  displayName.textContent = ORIGINAL_NAME;

  linksBtn.classList.add("active");
  projectsBtn.classList.remove("active");
}

function showProjects() {
  tagList.style.display = "none";
  icons.style.display = "none";
  projectsContainer.classList.remove("hidden");

  displayName.textContent = "projects";

  projectsBtn.classList.add("active");
  linksBtn.classList.remove("active");
}

linksBtn.addEventListener("click", showLinks);
projectsBtn.addEventListener("click", showProjects);

// default
showLinks();


// =========================
// SOCIAL ICON BEHAVIOR
// =========================
icons.addEventListener("pointerover", e => {
  const btn = e.target.closest(".social-link");
  if (!btn) return;

  displayName.textContent = btn.dataset.username || ORIGINAL_NAME;
  displayName.classList.add("pop");
});

icons.addEventListener("pointerout", () => {
  displayName.textContent = ORIGINAL_NAME;
  displayName.classList.remove("pop");
});

// redirect SAME TAB
icons.addEventListener("click", e => {
  const btn = e.target.closest(".social-link");
  if (!btn) return;

  const url = btn.dataset.url;
  if (url) window.location.href = url;
});


// =========================
// CLOCK (UTC-5)
// =========================
function updateTime() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const target = new Date(utc - 5 * 3600000);

  let h = target.getHours();
  const m = target.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;

  timeEl.textContent = `my time is ${h}:${m} ${ampm}, UTC-5`;
}

updateTime();
setInterval(updateTime, 60000);
