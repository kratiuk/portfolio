<script setup>
import { onMounted, ref } from "vue";

import githubIcon from "@assets/icons/brands/github.svg";
import forkIcon from "@assets/icons/github-fork.svg";
import starIcon from "@assets/icons/github-star.svg";
import tagIcon from "@assets/icons/github-tag.svg";

import { fetchGithubRepoInfo } from "@data/github.js";

const props = defineProps({
    url: { type: String, required: true },
    showOwner: { type: Boolean, default: true },
});

const info = ref({ owner: '', repo: '', stars: 0, forks: 0, tag: '' });
const statsReady = ref(false);

try {
    const url = new URL(props.url);
    const [owner, repo] = url.pathname.replace(/^\//, '').split('/');
    if (owner && repo) {
        info.value.owner = owner;
        info.value.repo = repo;
    }
} catch (e) {
    console.error('RepoCard parse error:', e);
}

const formatNumber = (num) => (num ?? 0) >= 1000 ? ((num ?? 0) / 1000).toFixed(1) + "k" : (num ?? 0).toString();

onMounted(async () => {
    try {
        const { owner, repo } = info.value;
        if (owner && repo) {
            const data = await fetchGithubRepoInfo(owner, repo);
            if (data) {
                Object.assign(info.value, data);
                statsReady.value = true;
            }
        }
    } catch (e) {
        console.error('RepoCard fetch error:', e);
    }
});
</script>

<template>
    <a :href="props.url" target="_blank" rel="noopener noreferrer" class="repo-card" :class="{ 'repo-card--ready': statsReady }">
        <img :src="githubIcon" alt="GitHub" class="repo-icon" />
        <span class="repo-name">
            <template v-if="props.showOwner && info.owner && info.repo">{{ info.owner + '/' + info.repo }}</template>
            <template v-else-if="info.repo">{{ info.repo }}</template>
        </span>
        <div class="repo-stats">
            <span class="stat">
                <img :src="starIcon" alt="stars" class="stat-icon" />
                {{ formatNumber(info.stars) }}
            </span>
            <span class="stat">
                <img :src="forkIcon" alt="forks" class="stat-icon" />
                {{ formatNumber(info.forks) }}
            </span>
            <span class="stat">
                <img :src="tagIcon" alt="tag" class="stat-icon" />
                <template v-if="info.tag && info.tag.length">
                    {{ info.tag }}
                </template>
            </span>
        </div>
    </a>
</template>

<style>
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
    color: #fff;
}

body.light-theme .repo-card:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #1a1a1a;
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
    margin-left: 0;
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    transform: translateX(-4px);
    transition: max-width 0.35s ease, opacity 0.25s ease, transform 0.35s ease, margin-left 0.35s ease;
}

.repo-card--ready .repo-stats {
    margin-left: 0.5rem;
    max-width: 240px;
    opacity: 1;
    transform: translateX(0);
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
</style>
