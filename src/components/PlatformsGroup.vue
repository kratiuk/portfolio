<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="socials-group">
    <h3 class="socials-label">{{ label }}</h3>
    <div class="socials">
      <a v-for="social in items" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer"
        class="social-icon">
        <img :src="social.icon" :alt="social.name" />
        <span class="social-tooltip">{{ social.name }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.socials-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
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
  position: relative;
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

.social-tooltip {
  position: absolute;
  left: 50%;
  top: calc(100% + 18px);
  transform: translateX(-50%) translateY(-4px);
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: #111;
  font-size: 0.75rem;
  line-height: 1;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
}

.social-tooltip::before {
  content: "";
  position: absolute;
  top: -9px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 6px 9px;
  border-style: solid;
  border-color: transparent transparent rgba(255, 255, 255, 0.95);
}

.social-icon:hover .social-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

body.light-theme .social-tooltip {
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
}

body.light-theme .social-tooltip::before {
  border-color: transparent transparent rgba(0, 0, 0, 0.9);
}
</style>
