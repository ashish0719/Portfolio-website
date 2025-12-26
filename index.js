const textElement = document.querySelector(".typewriter-text");

const texts = [
  "I am a Frontend Developer",
  "I keep learning new things",
  "Let's learn together",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const navLinks = document.querySelectorAll(".nav-link");
// NEW: Get the collapsible navbar element
const navbarCollapse = document.getElementById("navbarNav");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((nav) => nav.classList.remove("active")); // Remove active from all
    this.classList.add("active"); // Add to the clicked one

    // NEW LOGIC: Close the mobile menu if it is open (requires Bootstrap JS to be loaded)
    if (navbarCollapse.classList.contains("show")) {
      // Use Bootstrap's Collapse utility to hide the menu
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  });
});

function typeEffect() {
  let currentText = texts[textIndex];

  if (isDeleting) {
    textElement.textContent = currentText.substring(0, charIndex);
    charIndex--; // Move this after setting text to avoid skipping letters
  } else {
    textElement.textContent = currentText.substring(0, charIndex);
    charIndex++; // Increment after setting text
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentText.length + 1) {
    speed = 1500; // Pause before deleting
    isDeleting = true;
    charIndex--; // Ensure we don't over-increment
  } else if (isDeleting && charIndex === -1) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length; // Move to next sentence
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

const allProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    img: "Assets/Images/portfolio.PNG",
    description:
      "Built a personal portfolio website with a responsive design to showcase skills, projects, and contact details, focusing on clean UI and frontend practices.",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://portfolio-website-psi-three-31.vercel.app/",
    category: "WebD",
  },
  {
    id: 2,
    title: "The Indian Bawarchi",
    img: "/Assets/Images/IndianBawarchi.png",
    description:
      "A full-stack food blogging and recipe management website showcasing Indian cuisine, with user authentication, recipe creation, and interactive browsing.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    liveLink: "https://theindianbawarchi.vercel.app/",
    category: "Web",
  },
  {
    id: 3,
    title: "Sweet Inventory Management System",
    img: "/Assets/Images/SweetInventory.png",
    description:
      "A backend-focused inventory management system for managing sweets, built using Test-Driven Development (TDD) with Jest to ensure reliability, accurate stock tracking, and robust API behavior.",
    techStack: ["Node.js", "Express.js", "MongoDB", "Jest", "TDD"],
    liveLink: "https://sweet-shop-management-system-gff3.vercel.app/",
    category: "Backend",
  },

  {
    id: 4,
    title: "Weather Website",
    img: "/Assets/Images/Weather.png",
    description:
      "Created a weather forecast app that displays real-time weather data based on user input, showcasing API integration and dynamic data rendering.",
    techStack: ["HTML", "CSS", "JavaScript", "Weather API"],
    liveLink: "https://weather-forecasting-website-mauve.vercel.app/",
    category: "WebD",
  },
  {
    id: 5,
    title: "Quiz App",
    img: "/Assets/Images/quiz.png",
    description:
      "Developed an interactive quiz application with multiple-choice questions, score tracking, and dynamic UI updates to enhance user engagement.",
    techStack: ["HTML", "CSS", "JavaScript", "DOM Manipulation"],
    liveLink: "https://quiz-website-liard.vercel.app/",
    category: "WebD",
  },
  {
    id: 6,
    title: "Language Translator",
    img: "/Assets/Images/language.png",
    description:
      "Built a web-based language translator that allows users to translate text between multiple languages, highlighting API integration and intuitive UI design.",
    techStack: ["HTML", "CSS", "JavaScript", "Translation API"],
    liveLink: "https://language-translator-murex.vercel.app/",
    category: "WebD",
  },
];

const cardsContainer = document.getElementById("cards-container");
const detailsContainer = document.getElementById("project-details-container");

function renderProjects() {
  cardsContainer.innerHTML = "";
  allProjects.forEach((project) => {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.innerHTML = `
      <img src="${project.img}" alt="${project.title}">
      <h3>${project.title}</h3>
      <div class="btn-group">
        <button class="project-btn btn-live">
          <a href="${project.liveLink}" target="_blank">Go Live</a>
        </button>
        <button class="project-btn btn-about" onclick="showProjectDetails(${project.id})">About</button>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

function showProjectDetails(id) {
  const project = allProjects.find((p) => p.id === id);
  if (!project) return;

  cardsContainer.classList.add("hidden");
  detailsContainer.classList.remove("hidden");

  // Uses iframe for live preview
  detailsContainer.innerHTML = `
    <div class="details-content">
      <div class="details-header">
        <h2>${project.title}</h2>
        <button class="btn-close-details" onclick="hideProjectDetails()">&times;</button>
      </div>
      
      <div class="details-body">
        <div class="info-section">
           <p>${project.description}</p>
           <div class="tech-stack">
            ${project.techStack
              .map((tech) => `<span class="tech-badge">${tech}</span>`)
              .join("")}
           </div>
           <div class="action-buttons">
              <a href="${
                project.liveLink
              }" target="_blank" class="btn-live-large">Open Full Site <i class="fas fa-external-link-alt"></i></a>
           </div>
        </div>
        
        <div class="preview-section">
          ${
            project.liveLink !== "#"
              ? `<iframe src="${project.liveLink}" title="${project.title}" class="project-iframe"></iframe>`
              : `<div class="placeholder-preview"><img src="${project.img}" alt="Preview"><span>Live Preview Not Available</span></div>`
          }
        </div>
      </div>
    </div>
  `;
}

function hideProjectDetails() {
  detailsContainer.classList.add("hidden");
  cardsContainer.classList.remove("hidden");
  detailsContainer.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
});

window.showProjectDetails = showProjectDetails;
window.hideProjectDetails = hideProjectDetails;

/* --- Skills Orbit Logic --- */
const skills = [
  { name: "HTML", icon: "Assets/Images/html.svg", type: "img", orbit: "inner" },
  { name: "CSS", icon: "Assets/Images/css.svg", type: "img", orbit: "inner" },
  {
    name: "JavaScript",
    icon: "Assets/Images/javascript.svg",
    type: "img",
    orbit: "inner",
  },
  { name: "C++", icon: "Assets/Images/c.svg", type: "img", orbit: "inner" },
  {
    name: "Python",
    icon: "Assets/Images/python-4.svg",
    type: "img",
    orbit: "inner",
  },
  { name: "Node.js", icon: "fa-brands fa-node", type: "icon", orbit: "inner" },
  {
    name: "Express",
    icon: "fa-brands fa-node-js",
    type: "icon",
    orbit: "inner",
  },
  {
    name: "MySQL",
    icon: "Assets/Images/mysql.svg",
    type: "img",
    orbit: "inner",
  },
  {
    name: "MongoDB",
    icon: "fa-solid fa-database",
    type: "icon",
    orbit: "inner",
  },

  {
    name: "React",
    icon: "Assets/Images/react.svg",
    type: "img",
    orbit: "outer",
  },
  {
    name: "Bootstrap",
    icon: "fa-brands fa-bootstrap",
    type: "icon",
    orbit: "outer",
  },
  { name: "Tailwind", icon: "fa-solid fa-wind", type: "icon", orbit: "outer" },
  { name: "Git", icon: "fa-brands fa-git-alt", type: "icon", orbit: "outer" },
  {
    name: "GitHub",
    icon: "Assets/Images/github.svg",
    type: "img",
    orbit: "outer",
  },
  {
    name: "REST API",
    icon: "fa-solid fa-server",
    type: "icon",
    orbit: "outer",
  },
  { name: "JWT", icon: "fa-solid fa-key", type: "icon", orbit: "outer" },
  { name: "Gemini", icon: "fa-solid fa-star", type: "icon", orbit: "outer" },
  { name: "OpenAI", icon: "fa-solid fa-robot", type: "icon", orbit: "outer" },
  {
    name: "VS Code",
    icon: "Assets/Images/vscode.svg",
    type: "img",
    orbit: "outer",
  },
  { name: "Vercel", icon: "fa-solid fa-upload", type: "icon", orbit: "outer" },
];

function createSkillElement(skill) {
  const div = document.createElement("div");
  div.className = "skill-item";

  if (skill.type === "img") {
    div.innerHTML = `<img src="${skill.icon}" alt="${skill.name}"><span>${skill.name}</span>`;
  } else {
    div.innerHTML = `<i class="${skill.icon}"></i><span>${skill.name}</span>`;
  }
  return div;
}

function distributeSkills() {
  const innerOrbit = document.getElementById("inner-orbit");
  const outerOrbit = document.getElementById("outer-orbit");

  innerOrbit.innerHTML = "";
  outerOrbit.innerHTML = "";

  const innerSkills = skills.filter((s) => s.orbit === "inner");
  const outerSkills = skills.filter((s) => s.orbit === "outer");

  const innerRadius = 100; // Decreased radius
  const innerStep = 360 / innerSkills.length;

  innerSkills.forEach((skill, index) => {
    const el = createSkillElement(skill);
    const angle = index * innerStep;
    const rad = (angle * Math.PI) / 180;
    const x = innerRadius * Math.cos(rad);
    const y = innerRadius * Math.sin(rad);

    el.style.left = `calc(50% + ${x}px)`;
    el.style.top = `calc(50% + ${y}px)`;

    innerOrbit.appendChild(el);
  });

  const outerRadius = 220; // Decreased radius
  const outerStep = 360 / outerSkills.length;

  outerSkills.forEach((skill, index) => {
    const el = createSkillElement(skill);
    const angle = index * outerStep;
    const rad = (angle * Math.PI) / 180;
    const x = outerRadius * Math.cos(rad);
    const y = outerRadius * Math.sin(rad);

    el.style.left = `calc(50% + ${x}px)`;
    el.style.top = `calc(50% + ${y}px)`;

    outerOrbit.appendChild(el);
  });
}

document.addEventListener("DOMContentLoaded", distributeSkills);

/* --- Contact Form Logic --- */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:sauravashish.0000@gmail.com?subject=${subject}&body=${body}`;
  });
}
