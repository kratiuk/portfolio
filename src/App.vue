<script setup>
import { onMounted, onUnmounted, ref } from "vue";

import contactsIcon from "@assets/icons/contacts.svg";
import ukraineFlag from "@assets/icons/flags/ukraine-flag.svg";
import moonIcon from "@assets/icons/moon.svg";
import projectsIcon from "@assets/icons/projects.svg";
import skillsIcon from "@assets/icons/skills.svg";
import sunIcon from "@assets/icons/sun.svg";
import avatar from "@assets/images/avatar.webp";
import commentLinkingImage from "@assets/images/commentlinking.webp";

import Footer from "@components/Footer.vue";
import ParticlesBackground from "@components/ParticlesBackground.vue";
import PlatformsGroup from "@components/PlatformsGroup.vue";
import RepoCard from "@components/RepoCard.vue";
import SectionTitle from "@components/SectionTitle.vue";
import SkillCategory from "@components/SkillCategory.vue";

import { devPlatforms, socialNetworks } from "@data/platforms.js";
import { skillCategories } from "@data/skills.js";

const name = ref("Viktor Kratiuk");// Theme management
const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const isDarkTheme = ref(getSystemTheme());

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  document.body.classList.toggle('light-theme', !isDarkTheme.value);
};

// Listen to system theme changes
const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
themeMediaQuery.addEventListener('change', (e) => {
  isDarkTheme.value = e.matches;
  document.body.classList.toggle('light-theme', !isDarkTheme.value);
});

// Calculate age from birthdate
const calculateAge = () => {
  const birthDate = new Date("2005-08-05T00:00:00+03:00"); // Ukraine timezone (UTC+3)
  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();

  // Adjust if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const age = ref(calculateAge());

onMounted(async () => {
  // Set initial theme based on system preference
  document.body.classList.toggle('light-theme', !isDarkTheme.value);

  // Show app after Vue is mounted
  document.getElementById('app').style.display = 'block';

  // Handle initial hash if it was saved
  if (window.initialHash) {
    setTimeout(() => {
      scrollToSection(window.initialHash);
    }, 100);
  }

  // Setup scroll-based URL anchor updates
  setupScrollObserver();
});

// Cleanup observer on component unmount
onUnmounted(() => {
  cleanupScrollObserver();
});

const scrollToSection = (sectionId) => {
  const element = document.querySelector(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // URL is updated automatically by Intersection Observer on scroll
  }
};

let sectionObserver = null;

const setupScrollObserver = () => {
  const sections = ['contact', 'skills', 'projects'];

  const observerOptions = {
    root: null, // viewport
    rootMargin: '-5% 0px -90% 0px', // Trigger only when section reaches top 5% of viewport
    threshold: 0
  };

  sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        const currentHash = window.location.hash.slice(1);

        // Only update if hash actually changed
        if (currentHash !== sectionId) {
          if (sectionId === 'contact') {
            // For contact/hero section, remove hash from URL
            history.replaceState(null, '', window.location.pathname);
          } else {
            // For skills and projects, set the hash
            history.replaceState(null, '', `#${sectionId}`);
          }
        }
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      sectionObserver.observe(element);
    }
  });
};

const cleanupScrollObserver = () => {
  if (sectionObserver) {
    sectionObserver.disconnect();
    sectionObserver = null;
  }
};
</script>

<!-- Website template -->
<template>
  <ParticlesBackground />
  <div class="portfolio">
    <!-- Header with navigation -->
    <header class="header">
      <nav class="nav">
        <a @click.prevent="scrollToSection('#contact')" href="#contact" class="nav-link">
          <img :src="contactsIcon" alt="" class="nav-icon" />
          Contact
        </a>
        <a @click.prevent="scrollToSection('#skills')" href="#skills" class="nav-link">
          <img :src="skillsIcon" alt="" class="nav-icon" />
          Skills
        </a>
        <a @click.prevent="scrollToSection('#projects')" href="#projects" class="nav-link">
          <img :src="projectsIcon" alt="" class="nav-icon" />
          Projects
        </a>
      </nav>
      <div class="header-right">
        <button @click="toggleTheme" class="theme-toggle"
          :aria-label="isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'">
          <img :src="isDarkTheme ? sunIcon : moonIcon" alt="Theme toggle" class="theme-icon" />
        </button>
        <RepoCard url="https://github.com/kratiuk/portfolio" :showOwner="true" />
      </div>
    </header>

    <section id="contact" class="hero">
      <img :src="avatar" alt="Avatar" class="avatar" />
      <h1>{{ name }}</h1>
      <p class="bio">
        <span class="bio-text">{{ age }}-year-old Full-Stack Developer from Rivne Oblast, </span>
        <img :src="ukraineFlag" alt="Ukraine" class="flag" />
        <span class="bio-text"> Ukraine</span>
      </p>

      <div class="socials-section">
        <PlatformsGroup label="Developer platforms" :items="devPlatforms" />

        <div class="socials-divider"></div>

        <PlatformsGroup label="Social networks" :items="socialNetworks" />
      </div>
    </section>

    <section id="skills" class="skills-section">
      <SectionTitle title="Skills" />

      <div class="categories-container">
        <!-- Generates skill category blocks for each category in skillCategories -->
        <SkillCategory v-for="category in skillCategories" :key="category.title" :title="category.title"
          :skills="category.skills" />
      </div>
    </section>

    <section id="projects" class="projects-section">
      <SectionTitle title="Projects" />

      <div class="project-card">
        <div class="project-image-wrapper">
          <img :src="commentLinkingImage" alt="Comment Linking" class="project-image" />
        </div>
        <h3 class="project-title">Comment Linking</h3>
        <p class="project-description">
          Extension for Visual Studio Code that allows you to create anchors and links in comments
          and navigate between them with ease across your entire codebase
        </p>

        <RepoCard url="https://github.com/kratiuk/commentlinking" :showOwner="true" class="project-repo-card" />
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.portfolio {
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  z-index: 1;
}

/* Header */
.header {
  position: fixed;
  top: 2rem;
  left: 0;
  right: 0;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  z-index: 100;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

body.light-theme .nav-link {
  color: #1a1a1a;
}

.nav-icon {
  width: 20px;
  height: 20px;
  filter: invert(1);
}

body.light-theme .nav-icon {
  filter: invert(0);
}

.nav-link:hover {
  opacity: 0.7;
}

.theme-toggle {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

body.light-theme .theme-toggle {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
}

body.light-theme .theme-toggle:hover {
  background: rgba(0, 0, 0, 0.1);
}

.theme-icon {
  width: 24px;
  height: 24px;
  filter: invert(1);
}

body.light-theme .theme-icon {
  filter: invert(0);
}

.hero {
  text-align: center;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.hero h1 {
  font-size: 3rem;
  margin: 0;
  color: #fff;
}

body.light-theme .hero h1 {
  color: #1a1a1a;
}

.bio {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 1150px;
  margin: -1rem 0 0 0;
  line-height: 1.6;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
}

body.light-theme .bio {
  color: rgba(26, 26, 26, 0.8);
}

.bio-text {
  display: inline;
}

.flag {
  width: 20px;
  height: 15px;
  display: inline-block;
  vertical-align: middle;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  margin-left: -1rem;
}

body.light-theme .avatar {
  border-color: #1a1a1a;
}

.socials-section {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  align-items: center;
}

.socials-divider {
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
}

body.light-theme .socials-divider {
  background: rgba(0, 0, 0, 0.2);
}

/* Skills Section */
.skills-section {
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow-x: hidden;
  box-sizing: border-box;
}

.categories-container {
  display: flex;
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
  align-items: center;
  margin-top: -1rem;
}

/* Projects Section */
.projects-section {
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow-x: hidden;
  box-sizing: border-box;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  text-align: center;
}

body.light-theme .project-card {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.project-image-wrapper {
  margin-bottom: 1.5rem;
  display: inline-block;
  transform: scale(1.3);
  max-width: 100%;
}

.project-image {
  width: auto;
  height: auto;
  max-width: 100%;
  border-radius: 4px;
  image-rendering: auto;
  display: block;
  filter: drop-shadow(0 8px 30px rgba(0, 0, 0, 0.5)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
}

.project-title {
  font-size: 1.8rem;
  margin: 0 0 1rem 0;
  color: #fff;
}

body.light-theme .project-title {
  color: #1a1a1a;
}

.project-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1.5rem 0;
}

body.light-theme .project-description {
  color: rgba(26, 26, 26, 0.7);
}

.project-repo-card {
  display: inline-flex;
  margin-top: 0;
}
</style>
