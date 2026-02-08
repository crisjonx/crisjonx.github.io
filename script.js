// script.js

// ---- page switching (Links <-> Projects) ----
const linksBtn = document.getElementById("links-btn");
const projectsBtn = document.getElementById("projects-btn");

const linksPage = document.getElementById("links-page");
const projectsPage = document.getElementById("projects-page");

function showLinks() {
  linksPage.style.display = "block";
  projectsPage.style.display = "none";

  linksBtn.classList.add("active");
  projectsBtn.classList.remove("active");
}

function showProjects() {
  linksPage.style.display = "none";
  projectsPage.style.display = "block";

  projectsBtn.classList.add("active");
  linksBtn.classList.remove("active");
}

if (linksBtn && projectsBtn) {
  linksBtn.addEventListener("click", showLinks);
  projectsBtn.addEventListener("click", showProjects);
}

// default page
showLinks();


// ---- live clock (bottom center) ----
const timeEl = document.getElementById("time");

function updateTime() {
  if (!timeEl) return;

  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  timeEl.textContent = `${hours}:${minutes}`;
}

updateTime();
setInterval(updateTime, 1000);
