<script setup>
import avatar from "@assets/images/avatar.webp";
</script>

<template>
  <img :src="avatar" alt="Avatar" class="avatar" />
</template>

<style scoped>
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  margin-left: -1rem;
}

:global(body.light-theme) .avatar {
  border-color: #1a1a1a;
}
</style>
