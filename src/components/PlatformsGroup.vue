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
</style>
