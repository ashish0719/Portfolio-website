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

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((nav) => nav.classList.remove("active")); // Remove active from all
    this.classList.add("active"); // Add to the clicked one
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

typeEffect();
const projectsData = {
  WebD: [
    "Portfolio Website",
    "Weather Website",
    "Quiz App",
    "Language Translator",
  ],
  DS: [
    // "Machine Learning Model",
    // "Data Visualization",
    // "Stock Price Prediction",
    "Coming Soon",
  ],
  BChain: [
    // "NFT Marketplace",
    // "Smart Contract DApp",
    // "Blockchain Voting System",
    "Coming Soon",
  ],
};

const projectDescriptions = {
  "Portfolio Website":
    "Built a personal portfolio website with a responsive design to showcase skills, projects, and contact details, focusing on clean UI and frontend practices. HTML | CSS | JavaScript |",

  "Weather Website":
    "Created a weather forecast app that displays real-time weather data based on user input, showcasing API integration and dynamic data rendering. HTML | CSS | JavaScript | Weather API | ",

  "Quiz App":
    "Developed an interactive quiz application with multiple-choice questions, score tracking, and dynamic UI updates to enhance user engagement and logic handling. HTML | CSS | JavaScript | DOM Manipulation |",

  "Language Translator":
    "Built a web-based language translator that allows users to translate text between multiple languages, highlighting API integration and intuitive UI design. HTML | CSS | JavaScript | Translation API |&nbsp &nbsp;<a href='https://language-translator-faczwj8ry-ashishs-projects-1448cb93.vercel.app/'>View Project</a>",
};

document.querySelectorAll(".btns").forEach((button) => {
  button.addEventListener("click", function () {
    const category = this.getAttribute("data-category");
    const allCards = document.querySelectorAll(".card");
    const container = document.querySelector(".cards-container");
    const projectListContainer = document.getElementById(
      "selected-project-container"
    );
    const listContent = document.getElementById("projects-list");
    const isBack = this.classList.contains("back-btn");

    if (isBack) {
      allCards.forEach((card) => {
        card.style.display = "flex";
      });
      container.style.justifyContent = "center";
      projectListContainer.classList.add("hidden");
      projectListContainer.classList.remove("scrollable");
      this.textContent = "Explore";
      this.classList.remove("back-btn");
    } else {
      allCards.forEach((card) => {
        card.style.display = card.classList.contains(category)
          ? "flex"
          : "none";
      });
      container.style.justifyContent = "flex-start";
      projectListContainer.classList.remove("hidden");
      projectListContainer.classList.add("scrollable");
      listContent.innerHTML = "";
      projectsData[category].forEach((project) => {
        const timelineItem = document.createElement("li");
        timelineItem.classList.add("timeline-item");
        timelineItem.innerHTML = `<h3>${project}</h3><p class='project-description'>${
          projectDescriptions[project] || "No description available."
        }</p>`;
        listContent.appendChild(timelineItem);
      });
      this.textContent = "Back";
      this.classList.add("back-btn");
    }
  });
});
