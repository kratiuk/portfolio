<script setup>
import githubIcon from "../assets/icons/brands/github.svg";
import starIcon from "../assets/icons/github-star.svg";
import forkIcon from "../assets/icons/github-fork.svg";

const props = defineProps({
    owner: {
        type: String,
        required: true,
    },
    repo: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        default: 0,
    },
    forks: {
        type: Number,
        default: 0,
    },
    showOwner: {
        type: Boolean,
        default: true,
    },
});

const formatNumber = (num) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
};
</script>

<template>
    <a :href="`https://github.com/${owner}/${repo}`" target="_blank" rel="noopener noreferrer" class="repo-card">
        <img :src="githubIcon" alt="GitHub" class="repo-icon" />
        <span class="repo-name">{{ showOwner ? `${owner}/${repo}` : repo }}</span>
        <div class="repo-stats">
            <span class="stat">
                <img :src="starIcon" alt="stars" class="stat-icon" />
                {{ formatNumber(stars) }}
            </span>
            <span class="stat">
                <img :src="forkIcon" alt="forks" class="stat-icon" />
                {{ formatNumber(forks) }}
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
</style>
