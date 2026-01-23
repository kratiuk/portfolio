<script setup>
import cssIcon from "@assets/icons/technologies/css.svg";
import htmlIcon from "@assets/icons/technologies/html.svg";
import javascriptIcon from "@assets/icons/technologies/javascript.svg";
import vueIcon from "@assets/icons/technologies/vue.svg";

import packageJson from "@root/package.json";

const currentYear = new Date().getFullYear();
const version = packageJson.version;

const techStack = [
    { name: "Vue.js", icon: vueIcon },
    { name: "JavaScript", icon: javascriptIcon },
    { name: "HTML", icon: htmlIcon },
    { name: "CSS", icon: cssIcon },
];
</script>

<template>
    <footer class="footer">
        <div class="footer-row">
            <div class="footer-left">
                <p class="copyright">© 2025–{{ currentYear }} Viktor Kratiuk<br />Licensed under MIT</p>
            </div>
            <div class="footer-center">
                <div class="built-with">
                    <span>Built with</span>
                    <div class="tech-icons">
                        <img v-for="tech in techStack" :key="tech.name" :src="tech.icon" :alt="tech.name"
                            class="tech-icon" :title="tech.name" />
                    </div>
                </div>
                <p class="version">Version: v{{ version }}</p>
            </div>
            <div class="footer-right">
                <p class="fonts-info">
                    Open licensed fonts are used:
                    <a href="https://fonts.google.com/specimen/Space+Mono/license" target="_blank"
                        rel="noopener noreferrer">Space Mono</a>,
                    <a href="https://jack-daw.com/fonts/" target="_blank" rel="noopener noreferrer">Stoicheion</a>
                </p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    width: 100%;
    padding: 4rem 2rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    background: rgba(255, 255, 255, 0.06);
    background-image: none;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(4px) saturate(110%);
    box-sizing: border-box;
}

.footer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
}

.footer-left,
.footer-right {
    flex: 1;
    display: flex;
    align-items: center;
    max-width: 280px;
}

.footer-left {
    justify-content: flex-start;
}

.footer-right {
    justify-content: flex-end;
}

.footer-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.copyright {
    margin: 0;
    line-height: 1.4;
    text-align: center;
}

.fonts-info {
    margin: 0;
    line-height: 1.4;
    text-align: center;
}

.version {
    margin: 0;
    opacity: 0.5;
}

.built-with {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    font-size: 1.25rem;
}

.tech-icons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.tech-icon {
    width: 32px;
    height: 32px;
}

.fonts-info a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: underline;
    transition: color 0.3s;
}

.fonts-info a:hover {
    color: rgba(255, 255, 255, 0.9);
}

body.light-theme .footer {
    color: rgba(10, 10, 10, 0.7);
    background: rgba(0, 0, 0, 0.06);
    background-image: none;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(4px) saturate(110%);
}

body.light-theme .fonts-info a {
    color: rgba(0, 0, 0, 0.6);
}

body.light-theme .fonts-info a:hover {
    color: rgba(0, 0, 0, 0.9);
}
</style>
