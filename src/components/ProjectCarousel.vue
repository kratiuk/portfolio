<script setup>
import { computed, onUnmounted, ref, watch } from "vue";

import RepoCard from "@components/RepoCard.vue";

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
  autoplayMs: {
    type: Number,
    default: 5000,
  },
});

const currentIndex = ref(0);
const projectCount = computed(() => props.projects.length);
const currentProject = computed(() => props.projects[currentIndex.value]);
let autoplayId = null;

const stopAutoplay = () => {
  if (autoplayId) {
    window.clearInterval(autoplayId);
    autoplayId = null;
  }
};

const restartAutoplay = () => {
  stopAutoplay();

  if (projectCount.value < 2) {
    return;
  }

  autoplayId = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % projectCount.value;
  }, props.autoplayMs);
};

const selectProject = (index) => {
  currentIndex.value = index;
  restartAutoplay();
};

watch(
  [projectCount, () => props.autoplayMs],
  (length) => {
    if (!length[0]) {
      currentIndex.value = 0;
      restartAutoplay();
      return;
    }

    if (currentIndex.value >= length[0]) {
      currentIndex.value = 0;
    }

    restartAutoplay();
  },
  { immediate: true },
);

onUnmounted(() => {
  stopAutoplay();
});
</script>

<template>
  <div class="project-carousel">
    <Transition name="project-slide" mode="out-in">
      <article v-if="currentProject" :key="currentProject.title" class="project-card">
        <div class="project-image-wrapper">
          <img
            :src="currentProject.image"
            :alt="currentProject.imageAlt || currentProject.title"
            class="project-image"
            :class="currentProject.imageClass"
          />
        </div>

        <h3 class="project-title">{{ currentProject.title }}</h3>
        <p class="project-description">{{ currentProject.description }}</p>

        <RepoCard
          :url="currentProject.repoUrl"
          :showOwner="currentProject.showOwner ?? true"
          class="project-repo-card"
        />
      </article>
    </Transition>

    <div v-if="projectCount > 1" class="project-dots" aria-label="Project navigation">
      <button
        v-for="(project, index) in projects"
        :key="project.title"
        type="button"
        class="project-dot"
        :class="{ 'project-dot--active': index === currentIndex }"
        :aria-label="`Go to ${project.title}`"
        :aria-pressed="index === currentIndex"
        @click="selectProject(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.project-carousel {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.project-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 520px;
  box-sizing: border-box;
}

body.light-theme .project-card {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.project-image-wrapper {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(100%, 240px);
  height: min(100%, 240px);
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  image-rendering: auto;
  display: block;
  object-fit: fill;
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
  flex: 1 1 auto;
}

body.light-theme .project-description {
  color: rgba(26, 26, 26, 0.7);
}

.project-repo-card {
  display: inline-flex;
  margin-top: 0;
  align-self: center;
}

.project-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.project-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.18);
  cursor: pointer;
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
}

body.light-theme .project-dot {
  border-color: rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.12);
}

.project-dot:hover {
  transform: scale(1.08);
}

.project-dot--active {
  background: #fff;
  border-color: #fff;
  transform: scale(1.15);
}

body.light-theme .project-dot--active {
  background: #1a1a1a;
  border-color: #1a1a1a;
}

.project-slide-enter-active,
.project-slide-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.project-slide-enter-from,
.project-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .project-card {
    min-height: 0;
    padding: 1.5rem;
  }

  .project-image-wrapper {
    width: min(100%, 200px);
    height: 200px;
  }

  .project-image {
    height: 100%;
  }

  .project-title {
    font-size: 1.5rem;
  }

  .project-description {
    font-size: 1rem;
  }
}
</style>
