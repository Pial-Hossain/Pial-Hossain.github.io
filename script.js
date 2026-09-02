/* =========================================================
   Pial Hossain — portfolio scripts (plain JavaScript)
   ========================================================= */

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Dark / light theme toggle (remembers choice) ----
var root = document.documentElement;
var themeBtn = document.getElementById("theme-toggle");

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeBtn.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    themeBtn.textContent = "🌙";
  }
}

// Start from saved choice, else follow the system setting.
var saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
if (saved) {
  applyTheme(saved);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
}

themeBtn.addEventListener("click", function () {
  var isDark = root.getAttribute("data-theme") === "dark";
  var next = isDark ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ---- Typing effect in the hero ----
var roles = [
  "final-year ICT student.",
  "UI/UX designer.",
  "IT support technician.",
  "project manager.",
  "problem solver."
];
var typedEl = document.getElementById("typed");
var roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  var word = roles[roleIndex];
  if (deleting) {
    charIndex--;
  } else {
    charIndex++;
  }
  typedEl.textContent = word.substring(0, charIndex);

  var delay = deleting ? 45 : 90;
  if (!deleting && charIndex === word.length) {
    delay = 1600;            // pause at the end of a word
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 350;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

// ---- Scroll reveal ----
var revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { revealObs.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add("in"); });
}

// ---- Active nav link highlighting ----
var sections = document.querySelectorAll("section[id]");
var navLinks = document.querySelectorAll("#menu a");
if ("IntersectionObserver" in window) {
  var navObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute("id");
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (s) { navObs.observe(s); });
}

// ---- Scroll progress bar + back-to-top button ----
var progress = document.getElementById("progress");
var toTop = document.getElementById("to-top");

window.addEventListener("scroll", function () {
  var scrollTop = window.scrollY;
  var height = document.body.scrollHeight - window.innerHeight;
  var pct = height > 0 ? (scrollTop / height) * 100 : 0;
  progress.style.width = pct + "%";
  toTop.classList.toggle("show", scrollTop > 400);
});

toTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---- Mobile menu ----
var menuToggle = document.getElementById("menu-toggle");
var menu = document.getElementById("menu");
menuToggle.addEventListener("click", function () {
  menu.classList.toggle("open");
});
// Close the menu after tapping a link
navLinks.forEach(function (link) {
  link.addEventListener("click", function () { menu.classList.remove("open"); });
});
