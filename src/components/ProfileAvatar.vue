<script setup>
defineProps({
    avatarUrl: {
        type: String,
        required: true
    }
});
</script>

<template>
    <div class="avatar-wrapper">
        <img :src="avatarUrl" alt="" class="avatar" />
    </div>
</template>

<style scoped>
.avatar-wrapper {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 3px solid #fff;
    margin-left: -1rem;
    overflow: hidden;
}

.avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}
</style>

<style>
body.light-theme .avatar-wrapper {
    border-color: #1a1a1a !important;
}
</style>
