<script setup>
import ukraineFlag from "@assets/icons/flags/ukraine-flag.svg";

defineProps({
  age: {
    type: Number,
    required: true,
  },
  profile: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <p class="bio">
    <span class="bio-text">{{ age }}-year-old Full-Stack Developer from {{ profile.region }}, </span>
    <img :src="ukraineFlag" alt="Ukraine" class="flag" />
    <span class="bio-text"> {{ profile.country }}</span>
  </p>
</template>

<style scoped>
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

:global(body.light-theme) .bio {
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
</style>
