<script setup>
import { ref, onMounted } from "vue";
import ParticlesBackground from "./components/ParticlesBackground.vue";

// Avatar
import avatar from "./assets/images/avatar.webp";
import commentLinkingImage from "./assets/images/commentlinking.webp";

// Brand Icons
import githubIcon from "./assets/icons/brands/github.svg";
import gitlabIcon from "./assets/icons/brands/gitlab.svg";
import linkedinIcon from "./assets/icons/brands/linkedin.svg";
import telegramIcon from "./assets/icons/brands/telegram.svg";
import twitterIcon from "./assets/icons/brands/twitter.svg";
import blueskyIcon from "./assets/icons/brands/bluesky.svg";
import wakatimeIcon from "./assets/icons/brands/wakatime.svg";

// System Icons
import starIcon from "./assets/icons/github-star.svg";
import forkIcon from "./assets/icons/github-fork.svg";
import ukraineFlag from "./assets/icons/flags/ukraine-flag.svg";
import germanyFlag from "./assets/icons/flags/germany-flag.svg";

// Navigation Icons
import contactsIcon from "./assets/icons/contacts.svg";
import skillsIcon from "./assets/icons/skills.svg";
import projectsIcon from "./assets/icons/projects.svg";
import sunIcon from "./assets/icons/sun.svg";
import moonIcon from "./assets/icons/moon.svg";

// Technology Icons
import typescriptIcon from "./assets/icons/technologies/typescript.svg";
import javascriptIcon from "./assets/icons/technologies/javascript.svg";
import pythonIcon from "./assets/icons/technologies/python.svg";
import dartIcon from "./assets/icons/technologies/dart.svg";
import vueIcon from "./assets/icons/technologies/vue.svg";
import reactIcon from "./assets/icons/technologies/react.svg";
import nextjsIcon from "./assets/icons/technologies/nextjs.svg";
import flutterIcon from "./assets/icons/technologies/flutter.svg";
import tailwindIcon from "./assets/icons/technologies/tailwind.svg";
import supabaseIcon from "./assets/icons/technologies/supabase.svg";
import expoIcon from "./assets/icons/technologies/expo.svg";

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
const bio = ref(`${age.value}-year-old Full-Stack Developer from Rivne Oblast, Ukraine, currently living in Kaufungen, Germany`);

// Developer platforms
const devPlatforms = [
  { name: "GitHub", icon: githubIcon, url: "https://github.com/kratiuk" },
  { name: "GitLab", icon: gitlabIcon, url: "https://gitlab.com/kratiuk" },
  { name: "WakaTime", icon: wakatimeIcon, url: "https://wakatime.com/@kratiuk" },
];

// Social networks
const socialNetworks = [
  { name: "Telegram", icon: telegramIcon, url: "https://t.me/viktorkratiuk" },
  { name: "Twitter", icon: twitterIcon, url: "https://x.com/viktorkratiuk" },
  { name: "Bluesky", icon: blueskyIcon, url: "https://bsky.app/profile/kratiuk.bsky.social" },
  { name: "LinkedIn", icon: linkedinIcon, url: "https://www.linkedin.com/in/viktorkratiuk" },
];

// Skills by categories
const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "TypeScript", icon: typescriptIcon },
      { name: "JavaScript", icon: javascriptIcon },
      { name: "Python", icon: pythonIcon },
      { name: "Dart", icon: dartIcon },
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "Vue.js", icon: vueIcon },
      { name: "React", icon: reactIcon },
      { name: "Next.js", icon: nextjsIcon },
      { name: "Tailwind CSS", icon: tailwindIcon },
    ]
  },
  {
    title: "Mobile",
    skills: [
      { name: "Flutter", icon: flutterIcon },
      { name: "React Native", icon: reactIcon },
      { name: "Expo", icon: expoIcon },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Supabase", icon: supabaseIcon },
    ]
  },
];

// GitHub repo info
const repoInfo = ref({
  owner: "kratiuk",
  repo: "portfolio",
  stars: 0,
  forks: 0,
  loading: true,
});

const commentLinkingRepoInfo = ref({
  owner: "kratiuk",
  repo: "commentlinking",
  stars: 0,
  forks: 0,
  loading: true,
});

onMounted(async () => {
  // Fetch GitHub repo info
  try {
    const response = await fetch(
      "https://api.github.com/repos/kratiuk/portfolio"
    );
    const data = await response.json();
    repoInfo.value = {
      owner: "kratiuk",
      repo: "portfolio",
      stars: data.stargazers_count,
      forks: data.forks_count,
      loading: false,
    };
  } catch (error) {
    console.error("Failed to fetch repo info:", error);
    repoInfo.value.loading = false;
  }

  // Fetch Comment Linking repo info
  try {
    const response = await fetch(
      "https://api.github.com/repos/kratiuk/commentlinking"
    );
    const data = await response.json();
    commentLinkingRepoInfo.value = {
      owner: "kratiuk",
      repo: "commentlinking",
      stars: data.stargazers_count,
      forks: data.forks_count,
      loading: false,
    };
  } catch (error) {
    console.error("Failed to fetch Comment Linking repo info:", error);
    commentLinkingRepoInfo.value.loading = false;
  }

  // Set initial theme based on system preference
  document.body.classList.toggle('light-theme', !isDarkTheme.value);

  // Show app after Vue is mounted (only if not mobile)
  if (!document.body.classList.contains('is-mobile')) {
    document.getElementById('app').style.display = 'block';
  }

  // Handle initial hash if it was saved
  if (window.initialHash) {
    setTimeout(() => {
      scrollToSection(window.initialHash);
    }, 100);
  }
});

const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};

const scrollToSection = (sectionId) => {
  const element = document.querySelector(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Update URL without triggering browser's default jump
    if (sectionId === '#skills' || sectionId === '#projects') {
      history.pushState(null, '', sectionId);
    } else if (sectionId === '#contact') {
      history.pushState(null, '', window.location.pathname);
    }
  }
};
</script>

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
        <a href="https://github.com/kratiuk/portfolio" target="_blank" rel="noopener noreferrer" class="repo-card">
          <img :src="githubIcon" alt="GitHub" class="repo-icon" />
          <span class="repo-name">{{ repoInfo.owner }}/{{ repoInfo.repo }}</span>
          <div class="repo-stats">
            <span class="stat">
              <img :src="starIcon" alt="stars" class="stat-icon" />
              {{ formatNumber(repoInfo.stars) }}
            </span>
            <span class="stat">
              <img :src="forkIcon" alt="forks" class="stat-icon" />
              {{ formatNumber(repoInfo.forks) }}
            </span>
          </div>
        </a>
      </div>
    </header>

    <section id="contact" class="hero">
      <img :src="avatar" alt="Avatar" class="avatar" />
      <h1>{{ name }}</h1>
      <p class="bio">
        <span class="bio-text">{{ age }}-year-old Full-Stack Developer from Rivne Oblast, </span>
        <img :src="ukraineFlag" alt="Ukraine" class="flag" />
        <span class="bio-text"> Ukraine, currently living in Kaufungen, </span>
        <img :src="germanyFlag" alt="Germany" class="flag" />
        <span class="bio-text"> Germany</span>
      </p>

      <!-- Developer platforms -->
      <div class="socials-section">
        <div class="socials-group">
          <h3 class="socials-label">Developer platforms</h3>
          <div class="socials">
            <a v-for="social in devPlatforms" :key="social.name" :href="social.url" target="_blank"
              rel="noopener noreferrer" class="social-icon">
              <img :src="social.icon" :alt="social.name" />
            </a>
          </div>
        </div>

        <div class="socials-divider"></div>

        <!-- Social networks -->
        <div class="socials-group">
          <h3 class="socials-label">Social networks</h3>
          <div class="socials">
            <a v-for="social in socialNetworks" :key="social.name" :href="social.url" target="_blank"
              rel="noopener noreferrer" class="social-icon">
              <img :src="social.icon" :alt="social.name" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="skills-section">
      <h2 class="section-title">
        <img :src="skillsIcon" alt="Skills" class="title-icon" />
        Skills
      </h2>

      <div class="categories-container">
        <div v-for="category in skillCategories" :key="category.title" class="skill-category">
          <h3 class="category-title">{{ category.title }}</h3>
          <div class="skills-grid">
            <div v-for="skill in category.skills" :key="skill.name" class="skill-item">
              <img :src="skill.icon" :alt="skill.name" class="skill-icon" />
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects-section">
      <h2 class="section-title">
        <img :src="projectsIcon" alt="Projects" class="title-icon" />
        Projects
      </h2>

      <div class="project-card">
        <div class="project-image-wrapper">
          <img :src="commentLinkingImage" alt="Comment Linking" class="project-image" />
        </div>
        <h3 class="project-title">Comment Linking</h3>
        <p class="project-description">
          Extension for Visual Studio Code that allows you to create anchors and links in comments
          and navigate between them with ease across your entire codebase
        </p>

        <a :href="`https://github.com/${commentLinkingRepoInfo.owner}/${commentLinkingRepoInfo.repo}`" target="_blank"
          rel="noopener noreferrer" class="repo-card project-repo-card">
          <img :src="githubIcon" alt="GitHub" class="repo-icon" />
          <span class="repo-name">{{ commentLinkingRepoInfo.repo }}</span>
          <div class="repo-stats">
            <div class="stat">
              <img :src="starIcon" alt="Stars" class="stat-icon" />
              <span>{{ formatNumber(commentLinkingRepoInfo.stars) }}</span>
            </div>
            <div class="stat">
              <img :src="forkIcon" alt="Forks" class="stat-icon" />
              <span>{{ formatNumber(commentLinkingRepoInfo.forks) }}</span>
            </div>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.portfolio {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
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

.repo-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

body.light-theme .repo-card {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #1a1a1a;
}

.repo-card:hover {
  background: rgba(255, 255, 255, 0.15);
}

body.light-theme .repo-card:hover {
  background: rgba(0, 0, 0, 0.1);
}

.repo-icon {
  width: 24px;
  height: 24px;
  filter: invert(1);
}

body.light-theme .repo-icon {
  filter: invert(0);
}

.repo-name {
  font-size: 0.9rem;
  font-weight: 500;
}

.repo-stats {
  display: flex;
  gap: 1rem;
  margin-left: 0.5rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  opacity: 0.9;
}

.stat-icon {
  width: 14px;
  height: 14px;
  filter: invert(1);
}

body.light-theme .stat-icon {
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

.socials-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

.socials-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-weight: 400;
  text-transform: lowercase;
}

body.light-theme .socials-label {
  color: rgba(26, 26, 26, 0.6);
}

.socials {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.social-icon {
  width: 32px;
  height: 32px;
  transition: transform 0.2s;
  cursor: pointer;
}

.social-icon:hover {
  transform: translateY(-3px);
}

.social-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: invert(1);
}

body.light-theme .social-icon img {
  filter: invert(0);
}

/* Skills Section */
.skills-section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
}

.section-title {
  font-size: 2.5rem;
  margin: 0 0 2.5rem 0;
  color: #fff;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: -7rem;
}

body.light-theme .section-title {
  color: #1a1a1a;
}

.title-icon {
  width: 2.5rem;
  height: 2.5rem;
  filter: invert(1);
}

body.light-theme .title-icon {
  filter: invert(0);
}

.categories-container {
  display: flex;
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
  padding-right: 4rem;
  align-items: center;
}

.skill-category {
  flex: 1;
  min-width: 0;
}

.category-title {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.75rem;
  text-align: center;
}

body.light-theme .category-title {
  color: rgba(26, 26, 26, 0.7);
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  min-height: 120px;
}

.skill-item {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-size: 0.9rem;
  transition: all 0.3s;
}

body.light-theme .skill-item {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #1a1a1a;
}

.skill-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.2);
}

body.light-theme .skill-item:hover {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.2);
}

.skill-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.skill-icon[alt="Expo"] {
  filter: invert(1);
}

.skill-name {
  font-weight: 500;
}

/* Projects Section */
.projects-section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
}

.projects-section .section-title {
  margin-left: -7rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  text-align: center;
  margin-left: -6rem;
}

body.light-theme .project-card {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.project-image-wrapper {
  margin-bottom: 1.5rem;
  display: inline-block;
  transform: scale(1.3);
}

.project-image {
  width: auto;
  height: auto;
  max-width: 120%;
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
